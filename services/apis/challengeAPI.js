import apiConfig from "../../config/apiConfig";

/**
 * Fetches challenges for a specific user.
 * @param {string} userId
 * @returns {Promise<any[]>}
 */
export const fetchUserChallenges = async (ecoId) => {
  try {
    const url = `${apiConfig.baseURL}/user/${ecoId}/challenge`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch challenges");

    const result = await response.json();

    return result.data.map((challenge) => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      progress: challenge.progress,
      rewards: {
        points: challenge.rewards?.points || 0,
        badge: challenge.rewards?.badge || null,
      },
      status: challenge.status,
      isActive: challenge.isActive,
      icon: challenge.icon || "eco",
    }));
  } catch (error) {
    console.error("[challengeAPI] fetchUserChallenges error:", error);
    throw error;
  }
};
