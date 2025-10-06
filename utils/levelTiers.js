/**
 * Level Tier System for Verde Carbon Points
 * Defines eco-themed progression levels and utilities
 */

export const LEVEL_TIERS = [
  { min: 0, max: 99, name: "Seedling", color: "#86efac" },
  { min: 100, max: 249, name: "Sprout", color: "#4ade80" },
  { min: 250, max: 499, name: "Young Sapling", color: "#22c55e" },
  { min: 500, max: 749, name: "Eco Warrior", color: "#16a34a" },
  { min: 750, max: 999, name: "Forest Guardian", color: "#15803d" },
  { min: 1000, max: 1999, name: "Blooming Grove", color: "#14532d" },
  { min: 2000, max: 2999, name: "Earth Ally", color: "#1DA96B" },
  { min: 3000, max: 4999, name: "Planet Protector", color: "#0F8F5F" },
  { min: 5000, max: Infinity, name: "Climate Champion", color: "#0A7A50" },
];

/**
 * Get the current level tier based on carbon points
 * @param {number} points - User's carbon points
 * @returns {object} Level tier object with min, max, name, color
 */
export const getLevelTier = (points) => {
  const tier = LEVEL_TIERS.find(
    (tier) => points >= tier.min && points <= tier.max
  );
  return tier || LEVEL_TIERS[0];
};

/**
 * Calculate stage and progress for tree-ring visualization
 * @param {number} points - User's carbon points
 * @param {number} maxPerRing - Points per ring (default: 1000)
 * @returns {object} { stage, progress, completedRings }
 */
export const getTreeRingData = (points, maxPerRing = 1000) => {
  const stage = Math.floor(points / maxPerRing);
  const progress = (points % maxPerRing) / maxPerRing;
  const completedRings = stage;

  return {
    stage: stage + 1, // Stage 1 = 0-999, Stage 2 = 1000-1999, etc.
    progress, // 0.0 to 1.0 for current ring
    completedRings, // Number of fully completed rings
    pointsInCurrentRing: points % maxPerRing,
    pointsToNextRing: maxPerRing - (points % maxPerRing),
  };
};

/**
 * Get level progress within current tier
 * @param {number} points - User's carbon points
 * @returns {object} { progress, pointsInTier, pointsToNextTier }
 */
export const getLevelProgress = (points) => {
  const tier = getLevelTier(points);
  const pointsInTier = points - tier.min;
  const tierRange = tier.max - tier.min + 1;
  const progress = pointsInTier / tierRange;
  const pointsToNextTier = tier.max - points + 1;

  return {
    progress: Math.min(progress, 1), // 0.0 to 1.0
    pointsInTier,
    pointsToNextTier: tier.max === Infinity ? 0 : pointsToNextTier,
    currentTier: tier,
  };
};

/**
 * Format points with commas (e.g., 1247 → "1,247")
 * @param {number} points - Points to format
 * @returns {string} Formatted points string
 */
export const formatPoints = (points) => {
  return points.toLocaleString();
};
