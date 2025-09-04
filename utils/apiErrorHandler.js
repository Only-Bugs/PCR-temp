/**
 * @fileoverview Utility for handling API errors consistently.
 * Logs errors in a structured, professional format for debugging.
 */

/**
 * Handles and logs API errors in a consistent format.
 * @param {import('axios').AxiosError | any} error - The error object thrown by Axios.
 * @param {string} context - Short label for which API call failed.
 */
export function handleApiError(error, context = "API Request") {
  console.log("--------------------------------------------------");
  console.log(`[${context}] FAILED`);
  console.log("--------------------------------------------------");

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", JSON.stringify(error.response.data, null, 2));
    console.log("Headers:", JSON.stringify(error.response.headers, null, 2));
  } else if (error.request) {
    console.log("No response received. Request details:", error.request);
  } else {
    console.log("Request setup error:", error.message);
  }

  console.log("--------------------------------------------------");

  // Re-throw for UI-level handling (toast, alert, etc.)
  throw error;
}
