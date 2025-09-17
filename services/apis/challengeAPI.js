import apiConfig from "../../config/apiConfig";

/**
 * Fetches challenges for a specific user.
 * @param {string} ecoId
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

/**
 * Marks a challenge as complete or updates its progress.
 * @param {string} ecoId - User Eco ID
 * @param {string} challengeId - Challenge identifier
 * @param {number} userProgress - Updated progress value
 * @returns {Promise<any>} Updated challenge or user data
 */
export const completeUserChallenge = async (
  ecoId,
  challengeId,
  userProgress = 1
) => {
  try {
    const url = `${apiConfig.baseURL}/user/${ecoId}/challenge`;
    const payload = {
      challenges: [
        {
          challenge_id: challengeId,
          user_progress: userProgress,
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to complete challenge");

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("[challengeAPI] completeUserChallenge error:", error);
    throw error;
  }
};
