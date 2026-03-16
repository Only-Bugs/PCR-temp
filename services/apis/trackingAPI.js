// Demo-mode tracking API: return local mock data instead of hitting the network.

import apiConfig from "../../config/apiConfig";
import { authorizedFetch } from "../apiClient";

/**
 * Fetches tracking activity categories and structure for a specific user.
 * Returns the available activity types and their subcategories.
 *
 * @param {string} ecoId - User's eco_id
 * @returns {Promise<any[]>} Array of activity categories with structure
 */
export const fetchTrackingCategories = async (ecoId) => {
  try {
    // For the demo we don't need real category metadata; return a simple static structure.
    return [
      { activity_name: "transport", items: { "Diesel car": 20, Bus: 40 } },
      { activity_name: "diet", items: { Flexitarian: 14 } },
      { activity_name: "shopping", items: { "Clothing & Footwear": "$151–300" } },
      { activity_name: "energy", items: { "Electricity Bill": 120 } },
    ];
  } catch (error) {
    console.error("[trackingAPI] fetchTrackingCategories error:", error);
    throw error;
  }
};

/**
 * Submits a tracking activity to the backend.
 *
 * Payload format varies by activity_name:
 * - transport: { activity_name: "transport", items: { "Diesel car": 1.4, "Bus": 50 } }
 * - diet: { activity_name: "diet", items: { "Flexitarian": 15 } }
 * - shopping: { activity_name: "shopping", items: { "Clothing & Footwear": "$301+" } }
 * - energy: { activity_name: "energy", items: { "Electricity Bill": 100 } }
 *
 * @param {string} ecoId - User's eco_id
 * @param {Object} payload - Activity data with activity_name and items
 * @param {string} payload.activity_name - Type of activity (transport, diet, shopping, energy)
 * @param {Object} payload.items - Key-value pairs of activity items
 * @returns {Promise<any>} Response from backend
 */
export const submitTrackingActivity = async (ecoId, payload) => {
  try {
    // No-op success in demo mode so UI flows continue without a backend.
    console.log("[submitTrackingActivity] Demo mode payload:", payload);
    return { success: true };
  } catch (error) {
    console.error("[trackingAPI] submitTrackingActivity error:", error);
    throw error;
  }
};

/**
 * Fetches the weekly emissions snapshot for a user (past 7 days).
 *
 * @param {string} ecoId - User's eco_id
 * @returns {Promise<number[]>} Array of emission values ordered oldest -> newest
 */
export const fetchWeeklySnapshot = async (ecoId) => {
  try {
    // Return a static weekly snapshot that matches the nice chart in trackingData.
    // Ordered oldest -> newest; values are in kg CO₂.
    return [1.8, 2.4, 1.2, 2.9, 3.1, 2.2, 1.6];
  } catch (error) {
    console.error("[trackingAPI] fetchWeeklySnapshot error:", error);
    throw error;
  }
};

/**
 * Fetches the daily emissions snapshot for the latest date.
 *
 * @param {string} ecoId - User's eco_id
 * @returns {Promise<{ date: string, totals_kg: Record<string, number> }>} Snapshot payload
 */
export const fetchDailySnapshot = async (ecoId) => {
  try {
    // Static daily snapshot for a nice "today" view on the tracking cards.
    return {
      date: new Date().toISOString().slice(0, 10),
      totals_kg: {
        transport: 2.3,
        meals: 1.1,
        shopping: 0.8,
        energy: 3.4,
      },
    };
  } catch (error) {
    console.error("[trackingAPI] fetchDailySnapshot error:", error);
    throw error;
  }
};

/**
 * Fetches the user's baseline information (daily/weekly/monthly/yearly totals).
 *
 * @param {string} ecoId - User's eco_id
 * @returns {Promise<{ user_baseline_weekly?: number }>} Baseline payload
 */
export const fetchUserBaseline = async (ecoId) => {
  try {
    // Simple baseline matching the weeklyImpact.baseline in trackingData.
    return {
      user_baseline_weekly: 18,
      user_baseline_daily: 18 / 7,
    };
  } catch (error) {
    console.error("[trackingAPI] fetchUserBaseline error:", error);
    throw error;
  }
};
