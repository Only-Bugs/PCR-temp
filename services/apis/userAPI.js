/**
 * @fileoverview User API functions using Axios.
 * Handles fetching user profile by eco_id.
 */

import axios from "axios";
import apiConfig from "../../config/apiConfig";
import { handleApiError } from "../../utils/apiErrorHandler";

const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Fetches user profile data by eco_id.
 * @async
 * @param {string} ecoId - The eco_id of the user.
 * @returns {Promise<{ eco_id: string, daily: number, monthly: number, yearly: number, carbonPoints: number }>}
 */
export async function getUser(ecoId) {
  try {
    console.log("[API] GET /user/:ecoId", ecoId);

    const res = await api.get(`${apiConfig.endpoints.getUser}/${ecoId}`);

    console.log("[API] Full Response Data:", JSON.stringify(res.data, null, 2));

    const data = res.data?.data;
    if (!data?.eco_id) {
      throw new Error("eco_id not found in API response");
    }

    return {
      eco_id: data.eco_id,
      daily: data.user_baseline_daily,
      monthly: data.user_baseline_monthly,
      yearly: data.user_baseline_yearly,
      carbonPoints: data.user_carbon_point,
    };
  } catch (error) {
    handleApiError(error, "GET /user");
    throw error;
  }
}
