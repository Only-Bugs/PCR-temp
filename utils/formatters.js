/**
 * @fileoverview Utility formatters for display values.
 */

/**
 * Truncates an Eco ID for display (e.g. 4bde26...5402f).
 * @param {string} ecoId - The full Eco ID.
 * @param {number} [front=6] - Number of chars to keep from start.
 * @param {number} [back=6] - Number of chars to keep from end.
 * @returns {string} Truncated Eco ID or empty string if invalid.
 */
export const truncateEcoId = (ecoId, front = 6, back = 6) => {
  if (!ecoId || ecoId.length <= front + back) return ecoId || "";
  return `${ecoId.slice(0, front)}...${ecoId.slice(-back)}`;
};
