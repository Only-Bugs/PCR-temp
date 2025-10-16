import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "../utils/logger";
import { fetchRewardsMapping } from "./apis/rewardsAPI";

const DEFAULT_MAPPING = {
  diet: { daily_log: 5 },
  shopping: { daily_log: 5 },
  transport: { daily_log: 5 },
  energy: { monthly_log: 100 },
};

const STORAGE_KEYS = {
  mapping: "rewards:mapping",
  daily: "rewards:lastAwardedDaily",
  monthly: "rewards:lastAwardedMonthly",
};

const DEFAULT_USER_KEY = "__default__";
const makeUserKey = (ecoId) =>
  ecoId && String(ecoId).trim().length > 0
    ? `user:${String(ecoId)}`
    : DEFAULT_USER_KEY;

let inMemoryMapping = null;
let inflightPromise = null;
let dailyCache = null;
let monthlyCache = null;

const readJSON = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.warn(`[rewards] failed reading ${key}:`, error);
    return null;
  }
};

const writeJSON = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.warn(`[rewards] failed writing ${key}:`, error);
  }
};

const normalizeAwardCache = (cache) => {
  const base =
    cache && typeof cache === "object" && !Array.isArray(cache) ? cache : {};
  const entries = Object.entries(base);
  const hasLegacyFormat = entries.some(([, value]) => typeof value === "string");

  if (!hasLegacyFormat) {
    const copy = {};
    entries.forEach(([key, value]) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        copy[key] = { ...value };
      }
    });
    return { cache: copy, migrated: false };
  }

  const normalized = {};
  const legacyBucket = {};

  entries.forEach(([key, value]) => {
    if (typeof value === "string") {
      legacyBucket[key] = value;
      return;
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      normalized[key] = { ...value };
    }
  });

  if (Object.keys(legacyBucket).length) {
    normalized[DEFAULT_USER_KEY] = {
      ...(normalized[DEFAULT_USER_KEY] || {}),
      ...legacyBucket,
    };
  }

  return { cache: normalized, migrated: true };
};

const loadAwardCache = async (type) => {
  if (type === "daily") {
    if (dailyCache) return dailyCache;
    const stored = await readJSON(STORAGE_KEYS.daily);
    const { cache, migrated } = normalizeAwardCache(stored);
    dailyCache = cache;
    if (migrated) {
      await persistAwardCache("daily", cache);
    }
    return dailyCache;
  }
  if (monthlyCache) return monthlyCache;
  const stored = await readJSON(STORAGE_KEYS.monthly);
  const { cache, migrated } = normalizeAwardCache(stored);
  monthlyCache = cache;
  if (migrated) {
    await persistAwardCache("monthly", cache);
  }
  return monthlyCache;
};

const persistAwardCache = async (type, data) => {
  if (type === "daily") {
    dailyCache = data;
    await writeJSON(STORAGE_KEYS.daily, data);
    return;
  }
  monthlyCache = data;
  await writeJSON(STORAGE_KEYS.monthly, data);
};

const applyOverrides = (mapping) => {
  const override = globalThis?.__VERDE_REWARDS_OVERRIDE__;
  if (!override || typeof override !== "object") return mapping;
  return {
    ...mapping,
    ...override,
  };
};

const mergeMapping = (remote, fallback) => {
  const result = { ...fallback };
  Object.entries(remote || {}).forEach(([category, actions]) => {
    if (!result[category]) result[category] = {};
    Object.entries(actions || {}).forEach(([action, points]) => {
      result[category][action] = points;
    });
  });
  return result;
};

export const DEFAULT_REWARD_MAPPING = { ...DEFAULT_MAPPING };

export const loadRewardsMapping = async (ecoId, { forceRefresh = false } = {}) => {
  if (inMemoryMapping && !forceRefresh) {
    return { ...inMemoryMapping };
  }

  if (!forceRefresh && inflightPromise) {
    await inflightPromise;
    return { ...inMemoryMapping };
  }

  inflightPromise = (async () => {
    if (!forceRefresh && !inMemoryMapping) {
      const cached = await readJSON(STORAGE_KEYS.mapping);
      if (cached) {
        inMemoryMapping = mergeMapping(applyOverrides(cached), DEFAULT_MAPPING);
        logger.info("[rewards] loaded mapping from cache");
        inflightPromise = null;
        return;
      }
    }

    try {
      const fetched = await fetchRewardsMapping({ ecoId, skipAuth: !ecoId });
      inMemoryMapping = mergeMapping(applyOverrides(fetched), DEFAULT_MAPPING);
      await writeJSON(STORAGE_KEYS.mapping, inMemoryMapping);
      logger.info(
        "[rewards] mapping loaded:",
        JSON.stringify(inMemoryMapping)
      );
    } catch (error) {
      logger.warn("[rewards] falling back to default mapping:", error);
      if (!inMemoryMapping) {
        inMemoryMapping = { ...DEFAULT_MAPPING };
      }
    } finally {
      inflightPromise = null;
    }
  })();

  await inflightPromise;
  return { ...inMemoryMapping };
};

export const getRewardPoints = async (category, action, options = {}) => {
  const mapping = await loadRewardsMapping(options.ecoId, options);
  const categoryKey = String(category || "").toLowerCase();
  const actionKey = String(action || "").toLowerCase();
  return mapping?.[categoryKey]?.[actionKey] ?? 0;
};

export const canAwardToday = async (category, dateKey, ecoId) => {
  const cache = await loadAwardCache("daily");
  const categoryKey = String(category || "").toLowerCase();
  const userKey = makeUserKey(ecoId);
  const userCache = cache[userKey];

  if (userCache && userCache[categoryKey] === dateKey) {
    return false;
  }

  // Allow awarding when no user-specific record exists (legacy global records are ignored).
  return true;
};

export const markAwardedToday = async (category, dateKey, ecoId) => {
  const cache = await loadAwardCache("daily");
  const categoryKey = String(category || "").toLowerCase();
  const userKey = makeUserKey(ecoId);

  if (!cache[userKey]) {
    cache[userKey] = {};
  }

  cache[userKey][categoryKey] = dateKey;

  if (ecoId && cache[DEFAULT_USER_KEY]) {
    delete cache[DEFAULT_USER_KEY][categoryKey];
    if (Object.keys(cache[DEFAULT_USER_KEY]).length === 0) {
      delete cache[DEFAULT_USER_KEY];
    }
  }

  await persistAwardCache("daily", cache);
};

export const canAwardThisMonth = async (category, monthKey, ecoId) => {
  const cache = await loadAwardCache("monthly");
  const categoryKey = String(category || "").toLowerCase();
  const userKey = makeUserKey(ecoId);
  const userCache = cache[userKey];

  if (userCache && userCache[categoryKey] === monthKey) {
    return false;
  }

  // Allow awarding when no user-specific record exists (legacy global records are ignored).
  return true;
};

export const markAwardedThisMonth = async (category, monthKey, ecoId) => {
  const cache = await loadAwardCache("monthly");
  const categoryKey = String(category || "").toLowerCase();
  const userKey = makeUserKey(ecoId);

  if (!cache[userKey]) {
    cache[userKey] = {};
  }

  cache[userKey][categoryKey] = monthKey;

  if (ecoId && cache[DEFAULT_USER_KEY]) {
    delete cache[DEFAULT_USER_KEY][categoryKey];
    if (Object.keys(cache[DEFAULT_USER_KEY]).length === 0) {
      delete cache[DEFAULT_USER_KEY];
    }
  }

  await persistAwardCache("monthly", cache);
};

export const resetRewardStateForTests = async () => {
  inMemoryMapping = null;
  inflightPromise = null;
  dailyCache = {};
  monthlyCache = {};
  await AsyncStorage.removeItem(STORAGE_KEYS.mapping);
  await AsyncStorage.removeItem(STORAGE_KEYS.daily);
  await AsyncStorage.removeItem(STORAGE_KEYS.monthly);
};

export default {
  loadRewardsMapping,
  getRewardPoints,
  canAwardToday,
  markAwardedToday,
  canAwardThisMonth,
  markAwardedThisMonth,
};
