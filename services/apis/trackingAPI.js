import apiConfig from "../../config/apiConfig";

/**
 * Fetches tracking activity categories and structure for a specific user.
 * Returns the available activity types and their subcategories.
 *
 * @param {string} ecoId - User's eco_id
 * @returns {Promise<any[]>} Array of activity categories with structure
 */
export const fetchTrackingCategories = async (ecoId) => {
  try {
    const url = `${apiConfig.baseURL}/user/${ecoId}/tracking`;
    console.log("[fetchTrackingCategories] URL:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch tracking categories");

    const result = await response.json();
    console.log(
      "[fetchTrackingCategories] Response:",
      JSON.stringify(result, null, 2)
    );

    return result.data || [];
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
    const url = `${apiConfig.baseURL}/user/${ecoId}/tracking`;

    console.log("[submitTrackingActivity] URL:", url);
    console.log(
      "[submitTrackingActivity] Payload:",
      JSON.stringify(payload, null, 2)
    );

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("[submitTrackingActivity] Raw response text:", text);

    if (!response.ok) throw new Error("Failed to submit tracking activity");

    const result = text ? JSON.parse(text) : { success: true };
    console.log(
      "[submitTrackingActivity] Parsed response:",
      JSON.stringify(result, null, 2)
    );

    return result;
  } catch (error) {
    console.error("[trackingAPI] submitTrackingActivity error:", error);
    throw error;
  }
};