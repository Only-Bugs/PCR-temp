/**
 * @file storage.ts
 * @description Centralized AsyncStorage service for user, settings, and challenge data.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  eco_id: string;
  carbonPoints: number;
  daily: number;
  monthly: number;
  yearly: number;
};

class StorageService {
  // ---------- USER ----------
  static async getUser(): Promise<User | null> {
    try {
      const json = await AsyncStorage.getItem("user");
      return json ? JSON.parse(json) : null;
    } catch (err) {
      console.error("[StorageService] getUser error:", err);
      return null;
    }
  }

  static async setUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("[StorageService] setUser error:", err);
    }
  }

  // ---------- ECO ID ----------
  static async getEcoId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("eco_id");
    } catch (err) {
      console.error("[StorageService] getEcoId error:", err);
      return null;
    }
  }

  static async setEcoId(ecoId: string): Promise<void> {
    try {
      await AsyncStorage.setItem("eco_id", ecoId);
    } catch (err) {
      console.error("[StorageService] setEcoId error:", err);
    }
  }

  // ---------- BASELINE ----------
  static async getBaseline(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("baseline");
    } catch (err) {
      console.error("[StorageService] getBaseline error:", err);
      return null;
    }
  }

  static async setBaseline(baseline: string): Promise<void> {
    try {
      await AsyncStorage.setItem("baseline", baseline);
    } catch (err) {
      console.error("[StorageService] setBaseline error:", err);
    }
  }

  // ---------- SETTINGS ----------
  static async getHapticsEnabled(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem("hapticsEnabled");
      return value === "true";
    } catch (err) {
      console.error("[StorageService] getHapticsEnabled error:", err);
      return false;
    }
  }

  static async setHapticsEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem("hapticsEnabled", String(enabled));
    } catch (err) {
      console.error("[StorageService] setHapticsEnabled error:", err);
    }
  }

  // ---------- CHALLENGES ----------
  static async getChallenges(): Promise<any | null> {
    try {
      const json = await AsyncStorage.getItem("challenges");
      return json ? JSON.parse(json) : null;
    } catch (err) {
      console.error("[StorageService] getChallenges error:", err);
      return null;
    }
  }

  static async setChallenges(challenges: any): Promise<void> {
    try {
      await AsyncStorage.setItem("challenges", JSON.stringify(challenges));
    } catch (err) {
      console.error("[StorageService] setChallenges error:", err);
    }
  }

  // ---------- MONTHLY SNAPSHOT ----------
  static async getMonthlySnapshot(): Promise<any | null> {
    try {
      const json = await AsyncStorage.getItem("monthlySnapshot");
      return json ? JSON.parse(json) : null;
    } catch (err) {
      console.error("[StorageService] getMonthlySnapshot error:", err);
      return null;
    }
  }

  static async setMonthlySnapshot(snapshot: any): Promise<void> {
    try {
      await AsyncStorage.setItem("monthlySnapshot", JSON.stringify(snapshot));
    } catch (err) {
      console.error("[StorageService] setMonthlySnapshot error:", err);
    }
  }

  // ---------- FLAGS ----------
  static async getHasSeenSwipeOverlay(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem("hasSeenSwipeOverlay");
      return value === "true";
    } catch (err) {
      console.error("[StorageService] getHasSeenSwipeOverlay error:", err);
      return false;
    }
  }

  static async setHasSeenSwipeOverlay(seen: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem("hasSeenSwipeOverlay", String(seen));
    } catch (err) {
      console.error("[StorageService] setHasSeenSwipeOverlay error:", err);
    }
  }

  // ---------- CLEAR ----------
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.error("[StorageService] clearAll error:", err);
    }
  }
}

export default StorageService;
