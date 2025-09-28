import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import { useUser } from "./UserContext";
import { logAnalyticsEvent } from "../utils/analytics";
import {
  longTermActivities as baseLongTermActivities,
  todaysActivities as baseTodaysActivities,
  weeklyImpact as baseWeeklyImpact,
} from "../services/trackingData";

const TrackingContext = createContext(null);

const HOBART_TZ = "Australia/Hobart";
const WEEKDAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CATEGORY_KEYS = {
  transport: "Transport",
  meals: "Meals",
  shopping: "Shopping",
  energy: "Energy",
};

const TRANSPORT_LABELS = {
  "diesel-car": "Diesel car",
  "petrol-car": "Petrol car",
  "electric-car": "Electric car",
  "plug-in-hybrid": "Plug-in hybrid",
  motorbike: "Motorbike",
  "short-haul-flight": "Short-haul flight",
  "long-haul-flight": "Long-haul flight",
  train: "Train",
  bus: "Bus",
  bike: "Bike",
  "on-foot": "On Foot",
};

const TRANSPORT_IMPACT_FACTORS = {
  "diesel-car": 0.27,
  "petrol-car": 0.24,
  "electric-car": 0.08,
  "plug-in-hybrid": 0.12,
  motorbike: 0.18,
  "short-haul-flight": 0.38,
  "long-haul-flight": 0.45,
  train: 0.09,
  bus: 0.07,
  bike: 0,
  "on-foot": 0,
};

const DEFAULT_TRANSPORT_FACTOR = 0.12;

const MEAL_DIET_FACTORS = {
  vegan: 0.3,
  vegetarian: 0.5,
  flexitarian: 0.8,
  omnivore: 1.0,
  "heavy-meat": 1.6,
};

const MEAL_ITEM_ADJUSTMENTS = {
  "plant-based": -0.1,
  seafood: 0.2,
  dairy: 0.15,
  poultry: 0.25,
  "red-meat": 0.45,
  dessert: 0.1,
};

const MEAL_ITEM_LABELS = {
  "plant-based": "Plant-based",
  seafood: "Seafood",
  dairy: "Dairy",
  poultry: "Poultry",
  "red-meat": "Red meat",
  dessert: "Dessert",
};

const DEFAULT_MEAL_FACTOR = 0.9;
const SHOPPING_EMISSION_FACTOR = 0.0018;
const ENERGY_EMISSION_FACTORS = {
  electricity: 0.00042,
  gas: 0.00053,
};

const REWARD_POINTS = {
  transport: 10,
  meals: 10,
  shopping: 10,
  energy: 50,
};

const AWARD_MODE = 'per_category'; // 'global' | 'per_category'

const formatPositive = (value) => `+${value.toFixed(1)} kg CO₂`;
const formatCurrency = (value) => `$${value.toFixed(2)}`;
const clampToStep = (value) => parseFloat(value.toFixed(1));

const getDatePartsInTimeZone = (date, timeZone) => {
  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const partValue = (type) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: partValue("year"),
    month: partValue("month"),
    day: partValue("day"),
  };
};

const getWeekdayLabelInTimeZone = (date, timeZone) =>
  new Intl.DateTimeFormat("en-AU", { timeZone, weekday: "short" }).format(date);

const formatDateKey = (parts) => `${parts.year}-${parts.month}-${parts.day}`;

const buildWeekTemplate = () => {
  const now = new Date();
  const currentLabel = getWeekdayLabelInTimeZone(now, HOBART_TZ);
  const offset = WEEKDAY_ORDER.indexOf(currentLabel);
  const template = [];

  for (let i = 0; i < WEEKDAY_ORDER.length; i += 1) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() + (i - offset));
    date.setUTCHours(0, 0, 0, 0);

    const parts = getDatePartsInTimeZone(date, HOBART_TZ);
    template.push({
      dateKey: formatDateKey(parts),
      label: WEEKDAY_ORDER[i],
      value: 0,
    });
  }

  return template;
};

const mergeTrendWithTemplate = (baseTrend = []) => {
  const template = buildWeekTemplate();

  if (!Array.isArray(baseTrend) || baseTrend.length === 0) {
    return template;
  }

  return template.map((entry) => {
    const match =
      baseTrend.find((item) => item.dateKey === entry.dateKey) ||
      baseTrend.find((item) => item.day === entry.label);

    return {
      ...entry,
      value: clampToStep(match?.value ?? 0),
    };
  });
};

const getTodayInfo = () => {
  const now = new Date();
  const parts = getDatePartsInTimeZone(now, HOBART_TZ);
  return {
    dateKey: formatDateKey(parts),
    label: getWeekdayLabelInTimeZone(now, HOBART_TZ),
  };
};

const buildTransportSummary = (entries) => {
  const segments = Object.entries(entries)
    .map(([transportId, distanceValue]) => {
      const parsedDistance = parseFloat(distanceValue);

      if (Number.isNaN(parsedDistance) || parsedDistance <= 0) {
        return null;
      }

      const label = TRANSPORT_LABELS[transportId] ?? transportId;
      const factor = TRANSPORT_IMPACT_FACTORS[transportId] ?? DEFAULT_TRANSPORT_FACTOR;
      const distanceText = `${clampToStep(parsedDistance)}km`;

      return factor === 0
        ? `${label} ${distanceText} • 0kg CO₂`
        : `${label} ${distanceText}`;
    })
    .filter(Boolean);

  if (!segments.length) {
    return "Log your first transport activity.";
  }

  return segments.join(" • ");
};

const buildMealSummary = ({ dietLabel, selectedItems, spending }) => {
  const displayItems = (selectedItems ?? [])
    .map((item) => MEAL_ITEM_LABELS[item] ?? item)
    .join(" • ");

  const parts = [dietLabel];

  if (displayItems) {
    parts.push(displayItems);
  }

  parts.push(formatCurrency(spending));

  return parts.join(" • ");
};

const getAnalyticsTimestamp = () =>
  new Date().toLocaleString("en-AU", { timeZone: HOBART_TZ });

const getMonthInfo = () => {
  const now = new Date();
  const parts = getDatePartsInTimeZone(now, HOBART_TZ);
  const monthFormatter = new Intl.DateTimeFormat('en-AU', { timeZone: HOBART_TZ, month: 'long', year: 'numeric' });

  return {
    monthKey: `${parts.year}-${parts.month}`,
    label: monthFormatter.format(now),
  };
};

export const TrackingProvider = ({ children }) => {
  const { addCarbonPoints } = useUser();

  const [weeklyImpact, setWeeklyImpact] = useState(() => {
    const baseline = baseWeeklyImpact.baseline ?? 0;
    const template = mergeTrendWithTemplate(baseWeeklyImpact.trend);
    const total = clampToStep(template.reduce((sum, point) => sum + (point.value ?? 0), 0));
    const saved = clampToStep(Math.max(baseline - total, 0));

    return {
      baseline,
      previous: baseWeeklyImpact.previous ?? 0,
      emitted: baseWeeklyImpact.emitted ?? 0,
      trend: template,
      total,
      saved,
    };
  });

  const [todaysActivities, setTodaysActivities] = useState(() =>
    (baseTodaysActivities ?? []).map((activity) => ({ ...activity }))
  );

  const [longTermActivities, setLongTermActivities] = useState(() =>
    (baseLongTermActivities ?? []).map((activity) => ({ ...activity }))
  );

  const categoryTotalsRef = useRef({
    [CATEGORY_KEYS.transport]: 0,
    [CATEGORY_KEYS.meals]: 0,
    [CATEGORY_KEYS.shopping]: 0,
  });

  const categoryDayRef = useRef({
    [CATEGORY_KEYS.transport]: null,
    [CATEGORY_KEYS.meals]: null,
    [CATEGORY_KEYS.shopping]: null,
  });

  const shoppingSpendRef = useRef(0);
  const shoppingSpendDayRef = useRef(null);
  const [energyRecord, setEnergyRecord] = useState(null);
  const rewardStateRef = useRef({});

  const getRewardKey = useCallback(
    (categoryKey) => (AWARD_MODE === 'per_category' ? categoryKey : 'global'),
    []
  );

  const hasAwardedToday = useCallback(
    (categoryKey, dayInfo) =>
      rewardStateRef.current[getRewardKey(categoryKey)] === dayInfo.dateKey,
    [getRewardKey]
  );

  const markAwardedToday = useCallback(
    (categoryKey, dayInfo) => {
      rewardStateRef.current[getRewardKey(categoryKey)] = dayInfo.dateKey;
    },
    [getRewardKey]
  );


const applyImpactToTrend = useCallback((impact, dayInfo) => {
  let dayTotal = 0;

  setWeeklyImpact((previous) => {
      const updatedTrend = previous.trend.map((point) => {
        if (point.dateKey !== dayInfo.dateKey) {
          return point;
        }

        const value = clampToStep((point.value ?? 0) + impact);
        dayTotal = value;
        return { ...point, value };
      });

      const total = clampToStep(updatedTrend.reduce((sum, point) => sum + point.value, 0));
      const saved = clampToStep(Math.max(previous.baseline - total, 0));

      return {
        ...previous,
        trend: updatedTrend,
        total,
        saved,
      };
    });

    return dayTotal;
  }, []);

  const ensureWeekData = useCallback((dayInfo) => {
    let templateCreated = false;

    setWeeklyImpact((previous) => {
      if (previous.trend.some((point) => point.dateKey === dayInfo.dateKey)) {
        return previous;
      }

      templateCreated = true;
      const template = buildWeekTemplate();

     return {
       ...previous,
       previous: previous.total,
       trend: template,
       total: 0,
        saved: clampToStep(Math.max(previous.baseline - 0, 0)),
     };
    });

    if (templateCreated) {
      Object.keys(categoryDayRef.current).forEach((key) => {
        categoryDayRef.current[key] = null;
        categoryTotalsRef.current[key] = 0;
      });
      shoppingSpendRef.current = 0;
      shoppingSpendDayRef.current = null;
      rewardStateRef.current = {};
    }
  }, []);

  const ensureDailyReset = useCallback((categoryKey, dayInfo) => {
    if (categoryDayRef.current[categoryKey] === dayInfo.dateKey) {
      return;
    }

    categoryDayRef.current[categoryKey] = dayInfo.dateKey;
    categoryTotalsRef.current[categoryKey] = 0;

    if (categoryKey === CATEGORY_KEYS.shopping) {
      shoppingSpendRef.current = 0;
      shoppingSpendDayRef.current = dayInfo.dateKey;

      setLongTermActivities((previous) =>
        previous.map((activity) =>
          activity.title === CATEGORY_KEYS.shopping
            ? {
                ...activity,
                value: "+0 kg CO₂",
                description: "Track mindful purchases",
              }
            : activity
        )
      );
    }

    if (categoryKey === CATEGORY_KEYS.transport || categoryKey === CATEGORY_KEYS.meals) {
      setTodaysActivities((previous) =>
        previous.map((activity) =>
          activity.title === categoryKey
            ? {
                ...activity,
                value: "+0 kg CO₂",
              }
            : activity
        )
      );
    }
  }, []);

  const updateLongTermActivity = useCallback((title, updater) => {
    setLongTermActivities((previous) =>
      previous.map((activity) =>
        activity.title === title ? updater(activity) : activity
      )
    );
  }, []);

  const logTransportActivity = useCallback(
    async (entries) => {
      const dayInfo = getTodayInfo();
      ensureWeekData(dayInfo);
      ensureDailyReset(CATEGORY_KEYS.transport, dayInfo);

      const impact = clampToStep(
        Object.entries(entries).reduce((runningTotal, [transportId, distanceValue]) => {
          const parsedDistance = parseFloat(distanceValue);

          if (Number.isNaN(parsedDistance) || parsedDistance <= 0) {
            return runningTotal;
          }

          const factor = TRANSPORT_IMPACT_FACTORS[transportId] ?? DEFAULT_TRANSPORT_FACTOR;
          return runningTotal + parsedDistance * factor;
        }, 0)
      );

      const summary = buildTransportSummary(entries);
      applyImpactToTrend(impact, dayInfo);

      const previousTotal = categoryTotalsRef.current[CATEGORY_KEYS.transport] ?? 0;
      const categoryTotal = clampToStep(previousTotal + impact);
      categoryTotalsRef.current[CATEGORY_KEYS.transport] = categoryTotal;

      setTodaysActivities((previousActivities) =>
        previousActivities.map((activity) => {
          if (activity.title !== CATEGORY_KEYS.transport) {
            return activity;
          }

          return {
            ...activity,
            value: categoryTotal > 0 ? formatPositive(categoryTotal) : activity.value,
            description: summary,
          };
        })
      );

      let pointsAwarded = 0;
      let awarded = false;

      if (!hasAwardedToday(CATEGORY_KEYS.transport, dayInfo)) {
        await addCarbonPoints(REWARD_POINTS.transport);
        markAwardedToday(CATEGORY_KEYS.transport, dayInfo);
        logAnalyticsEvent("points_awarded", {
          category: "transport",
          points: REWARD_POINTS.transport,
          dateLocal: getAnalyticsTimestamp(),
        });
        pointsAwarded = REWARD_POINTS.transport;
        awarded = true;
      }

      return { points: pointsAwarded, awarded };
    },
    [addCarbonPoints, applyImpactToTrend, ensureDailyReset, ensureWeekData]
  );

  const logMealActivity = useCallback(
    async ({ dietType, dietLabel, selectedItems = [], spendingValue }) => {
      const dayInfo = getTodayInfo();
      ensureWeekData(dayInfo);
      ensureDailyReset(CATEGORY_KEYS.meals, dayInfo);

      const dietImpact = MEAL_DIET_FACTORS[dietType] ?? DEFAULT_MEAL_FACTOR;
      const itemImpact = selectedItems.reduce(
        (total, item) => total + (MEAL_ITEM_ADJUSTMENTS[item] ?? 0),
        0
      );

      const impact = clampToStep(Math.max(dietImpact + itemImpact, 0));
      const spending = Math.max(parseFloat(spendingValue) || 0, 0);

      applyImpactToTrend(impact, dayInfo);

      const previousTotal = categoryTotalsRef.current[CATEGORY_KEYS.meals] ?? 0;
      const categoryTotal = clampToStep(previousTotal + impact);
      categoryTotalsRef.current[CATEGORY_KEYS.meals] = categoryTotal;

      const description = buildMealSummary({
        dietLabel,
        selectedItems,
        spending,
      });

      setTodaysActivities((previousActivities) =>
        previousActivities.map((activity) => {
          if (activity.title !== CATEGORY_KEYS.meals) {
            return activity;
          }

          return {
            ...activity,
            value: categoryTotal > 0 ? formatPositive(categoryTotal) : activity.value,
            description,
          };
        })
      );

      let pointsAwarded = 0;
      let awarded = false;

      if (!hasAwardedToday(CATEGORY_KEYS.meals, dayInfo)) {
        await addCarbonPoints(REWARD_POINTS.meals);
        markAwardedToday(CATEGORY_KEYS.meals, dayInfo);
        logAnalyticsEvent("points_awarded", {
          category: "meals",
          points: REWARD_POINTS.meals,
          dateLocal: getAnalyticsTimestamp(),
        });
        pointsAwarded = REWARD_POINTS.meals;
        awarded = true;
      }

      return { points: pointsAwarded, awarded };
    },
    [addCarbonPoints, applyImpactToTrend, ensureDailyReset, ensureWeekData]
  );

  const logShoppingActivity = useCallback(
    async ({ entries }) => {
      if (!entries?.length) {
        return;
      }

      const dayInfo = getTodayInfo();
      ensureWeekData(dayInfo);
      ensureDailyReset(CATEGORY_KEYS.shopping, dayInfo);

      const totalSpend = entries.reduce((sum, entry) => sum + (entry.spend ?? 0), 0);
      const totalImpact = clampToStep(
        entries.reduce(
          (sum, entry) =>
            sum + (entry.impact ?? entry.spend * SHOPPING_EMISSION_FACTOR),
          0
        )
      );

      if (totalSpend <= 0 && totalImpact <= 0) {
        return;
      }

      applyImpactToTrend(totalImpact, dayInfo);

      const previousTotal = categoryTotalsRef.current[CATEGORY_KEYS.shopping] ?? 0;
      const categoryTotal = clampToStep(previousTotal + totalImpact);
      categoryTotalsRef.current[CATEGORY_KEYS.shopping] = categoryTotal;

      const cumulativeSpend = parseFloat((shoppingSpendRef.current + totalSpend).toFixed(2));
      shoppingSpendRef.current = cumulativeSpend;
      shoppingSpendDayRef.current = dayInfo.dateKey;

      updateLongTermActivity(CATEGORY_KEYS.shopping, (activity) => ({
        ...activity,
        value: categoryTotal > 0 ? formatPositive(categoryTotal) : "+0 kg CO₂",
        description: `Daily spend ${formatCurrency(cumulativeSpend)}`,
      }));

      let pointsAwarded = 0;
      let awarded = false;

      if (!hasAwardedToday(CATEGORY_KEYS.shopping, dayInfo)) {
        await addCarbonPoints(REWARD_POINTS.shopping);
        markAwardedToday(CATEGORY_KEYS.shopping, dayInfo);
        logAnalyticsEvent("points_awarded", {
          category: "shopping",
          points: REWARD_POINTS.shopping,
          dateLocal: getAnalyticsTimestamp(),
        });
        pointsAwarded = REWARD_POINTS.shopping;
        awarded = true;
      }

      return { points: pointsAwarded, awarded };
    },
    [addCarbonPoints, applyImpactToTrend, ensureDailyReset, ensureWeekData, hasAwardedToday, markAwardedToday, updateLongTermActivity]
  );

  const energyRewardMonthRef = useRef(null);

  const logEnergyActivity = useCallback(
    async ({ electricityValue = 0, gasValue = 0 }) => {
      const electricity = Math.max(electricityValue, 0);
      const gas = Math.max(gasValue, 0);

      const impact = clampToStep(
        electricity * ENERGY_EMISSION_FACTORS.electricity +
          gas * ENERGY_EMISSION_FACTORS.gas
      );

      setEnergyRecord({
        electricity,
        gas,
        impact,
        month: new Date().toISOString(),
      });

      const descriptionParts = [
        electricity > 0 ? `Electric ${formatCurrency(electricity)}` : null,
        gas > 0 ? `Gas ${formatCurrency(gas)}` : null,
      ].filter(Boolean);

      updateLongTermActivity(CATEGORY_KEYS.energy, (activity) => ({
        ...activity,
        value: impact > 0 ? formatPositive(impact) : "+0 kg CO₂",
        description: descriptionParts.length
          ? descriptionParts.join(" • ")
          : activity.description,
      }));

      let pointsAwarded = 0;
      let awarded = false;

      const { monthKey } = getMonthInfo();

      if (energyRewardMonthRef.current !== monthKey) {
        await addCarbonPoints(REWARD_POINTS.energy);
        energyRewardMonthRef.current = monthKey;
        logAnalyticsEvent("points_awarded", {
          category: "energy",
          points: REWARD_POINTS.energy,
          dateLocal: getAnalyticsTimestamp(),
        });
        pointsAwarded = REWARD_POINTS.energy;
        awarded = true;
      }

      return { points: pointsAwarded, awarded, monthKey };
    },
    [addCarbonPoints, updateLongTermActivity]
  );

  const value = useMemo(
    () => ({
      weeklyImpact,
      todaysActivities,
      longTermActivities,
      logTransportActivity,
      logMealActivity,
      logShoppingActivity,
      logEnergyActivity,
      energyRecord,
      rewardPoints: REWARD_POINTS,
    }),
    [
      weeklyImpact,
      todaysActivities,
      longTermActivities,
      logTransportActivity,
      logMealActivity,
      logShoppingActivity,
      logEnergyActivity,
      energyRecord,
    ]
  );

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export const useTracking = () => {
  const context = useContext(TrackingContext);

  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }

  return context;
};
