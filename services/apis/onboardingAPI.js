/**
 * @fileoverview Onboarding API functions using Axios.
 * Handles fetching questions and submitting responses for baseline.
 */

import axios from "axios";
import apiConfig from "../../config/apiConfig";
import { handleApiError } from "../../utils/apiErrorHandler";

const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Fetches onboarding questionnaire questions.
 * @async
 * @returns {Promise<any>} - Questionnaire data.
 */
export async function getBaselineQuestions() {
  try {
    console.log("[API] GET /baseline");

    const res = await api.get(apiConfig.endpoints.baseline);

    console.log("[API] GET /baseline successful");
    return res.data;
  } catch (error) {
    handleApiError(error, "GET /baseline");
  }
}

/**
 * Submits onboarding responses and returns eco_id + baseline.
 * @async
 * @param {{ responses: Array<{question_id: number, question_response: any}> }} payload
 * @returns {Promise<{ eco_id: string, baseline: number }>} Parsed eco_id and Baseline.
 */
export async function submitBaselineResponses(payload) {
  try {
    console.log("[API] POST /baseline");
    console.log("[API] Payload:", JSON.stringify(payload, null, 2));

    const res = await api.post(apiConfig.endpoints.baseline, payload);

    console.log("[API] Full Response Data:", JSON.stringify(res.data, null, 2));

    const eco_id = res.data?.data?.eco_id ?? null;
    const baseline = res.data?.data?.Baseline ?? null;

    if (!eco_id || baseline === null) {
      throw new Error("Invalid API response: eco_id or Baseline missing");
    }

    console.log("[API] Extracted Eco ID:", eco_id);
    console.log("[API] Extracted Baseline:", baseline);

    return { eco_id, baseline };
  } catch (error) {
    handleApiError(error, "POST /baseline");
    throw error;
  }
}
