import StorageService from "../storage";
import mockMonthlySnapshot from "../../serverDataSimulation/monthlySnapshot.json";

/**
 * Fetch monthly snapshot for a user by eco_id.
 * Saves it to AsyncStorage for reuse.
 *
 * @param {string} ecoId - user eco_id
 * @returns {Promise<object>} - raw monthly snapshot response
 */
export const fetchMonthlySnapshot = async (ecoId) => {
  try {
    // For demo: use local mock snapshot instead of network.
    await StorageService.setMonthlySnapshot(mockMonthlySnapshot);
    return mockMonthlySnapshot;
  } catch (err) {
    console.error("[monthlySnapshotAPI] fetchMonthlySnapshot error:", err);
    throw err;
  }
};

/**
 * Load monthly snapshot from AsyncStorage if available.
 * @returns {Promise<object|null>}
 */
export const getStoredMonthlySnapshot = async () => {
  try {
    return await StorageService.getMonthlySnapshot();
  } catch (err) {
    console.error("[monthlySnapshotAPI] getStoredMonthlySnapshot error:", err);
    return null;
  }
};
