import quizzesMock from "../../serverDataSimulation/quizzes.json";
import StorageService from "../storage";

/**
 * Fetches all quiz topics and their questions.
 * @returns {Promise<any[]>}
 */
export const fetchQuizzes = async (ecoId, { skipAuth = false } = {}) => {
  try {
    // For demo: return local mock quizzes and skip network entirely.
    return quizzesMock;

    // return (result.data || []).map((topic) => ({
    //   name: topic.topic_name,
    //   description: topic.topic_description,
    //   questions: (topic.questions || []).map((q) => ({
    //     id: q.quiz_ques_id,
    //     text: q.quiz_ques_text,
    //     options: (q.options || []).map((opt) => ({
    //       id: opt.quiz_option_id,
    //       text: opt.quiz_option_text,
    //       isCorrect: opt.quiz_option_is_correct === 1,
    //       explanation: opt.quiz_option_explanation,
    //     })),
    //   })),
    // }));
  } catch (error) {
    console.error("[quizAPI] fetchQuizzes error:", error);
    throw error;
  }
};

/**
 * Fetches a single quiz topic by index (or ID if backend adds it later).
 * @param {number} index - Index in the data array (0-based).
 * @returns {Promise<any>}
 */
export const fetchQuizByIndex = async (index = 0, ecoId, options) => {
  try {
    const quizzes = await fetchQuizzes(ecoId, options);
    return quizzes[index] || null;
  } catch (error) {
    console.error("[quizAPI] fetchQuizByIndex error:", error);
    throw error;
  }
};

// ---------- Quiz Points Awarding ----------

// Note: Quiz awards are handled client-side only
// Points are calculated locally and updated via UserContext
// No backend endpoint exists for quiz point awards

const calculateAwardedPoints = (correct, total) => {
  const safeCorrect = Math.max(0, Number.isFinite(correct) ? correct : 0);
  const safeTotal = Math.max(0, Number.isFinite(total) ? total : 0);
  return Math.max(0, Math.min(safeCorrect, safeTotal));
};

const postQuizAward = async (payload) => {
  const { ecoId, awardedPoints, idempotencyKey } = payload;

  console.log("[postQuizAward] Processing quiz award:", {
    ecoId,
    awardedPoints,
    idempotencyKey,
  });

  // Quiz points are awarded client-side only
  // The QuizScreen component will handle updating the user's carbon points
  // via UserContext (addCarbonPoints or setCarbonPoints)

  console.log("[postQuizAward] Success: Quiz award processed (client-side only)");

  return {
    awardedPoints,
    newBalance: undefined, // Will be calculated by UserContext
    reason: "quiz_completion",
  };
};

/**
 * Attempts to award quiz points. On network failure, rethrows after queuing
 * the payload so it can be retried later.
 */
export const awardQuizPoints = async ({
  ecoId,
  quizId,
  correct,
  total,
  idempotencyKey,
}) => {
  if (!ecoId || !quizId) {
    return {
      awardedPoints: calculateAwardedPoints(correct, total),
      newBalance: undefined,
      idempotencyKey,
      skipped: true,
    };
  }

  const key =
    idempotencyKey || `${quizId}:${ecoId}:${new Date().toISOString()}`;
  const awardedPoints = calculateAwardedPoints(correct, total);

  const payload = {
    ecoId,
    quizId,
    correct: Math.max(0, Number.isFinite(correct) ? correct : 0),
    total: Math.max(0, Number.isFinite(total) ? total : 0),
    awardedPoints,
    idempotencyKey: key,
  };

  try {
    const result = await postQuizAward(payload);
    return {
      awardedPoints: result.awardedPoints ?? awardedPoints,
      newBalance: result.newBalance,
      reason: result.reason,
      idempotencyKey: key,
    };
  } catch (err) {
    await StorageService.enqueueQuizAward(payload);
    const error = new Error(err?.message || "Failed to award quiz points");
    error.cause = err;
    error.awardedPoints = awardedPoints;
    error.idempotencyKey = key;
    error.wasQueued = true;
    throw error;
  }
};

/**
 * Clears the entire quiz award queue.
 * Use this to remove corrupted or outdated queued items.
 */
export const clearQuizAwardQueue = async () => {
  try {
    await StorageService.setQuizAwardQueue([]);
    console.log("[clearQuizAwardQueue] Queue cleared successfully");
    return true;
  } catch (err) {
    console.error("[clearQuizAwardQueue] Failed to clear queue:", err);
    return false;
  }
};

/**
 * Flush any queued quiz award requests (e.g., when back online).
 * Returns an array of results for successfully processed payloads.
 */
export const flushQuizAwardQueue = async ({ clearOnError = false } = {}) => {
  const queue = await StorageService.getQuizAwardQueue();
  if (!queue.length) {
    console.log("[flushQuizAwardQueue] Queue is empty");
    return [];
  }

  console.log(`[flushQuizAwardQueue] Processing ${queue.length} queued items`);

  const processed = [];
  const failed = [];

  for (const payload of queue) {
    console.log("[flushQuizAwardQueue] Processing payload:", payload.idempotencyKey);
    console.log("[flushQuizAwardQueue] Payload data:", JSON.stringify(payload, null, 2));

    try {
      const result = await postQuizAward(payload);
      await StorageService.removeQuizAward(payload.idempotencyKey);
      processed.push({
        payload,
        awardedPoints: result.awardedPoints ?? payload.awardedPoints,
        newBalance: result.newBalance,
        reason: result.reason,
      });
      console.log("[flushQuizAwardQueue] Successfully processed:", payload.idempotencyKey);
    } catch (err) {
      console.error(
        "[quizAPI] flushQuizAwardQueue failed for payload:",
        payload.idempotencyKey,
        err?.message || err
      );
      failed.push({ payload, error: err?.message });

      // If clearOnError is true, remove the failed item and continue
      if (clearOnError) {
        console.log("[flushQuizAwardQueue] Removing failed item from queue:", payload.idempotencyKey);
        await StorageService.removeQuizAward(payload.idempotencyKey);
        continue;
      }

      // Otherwise, stop processing on first error
      break;
    }
  }

  console.log(`[flushQuizAwardQueue] Completed: ${processed.length} succeeded, ${failed.length} failed out of ${queue.length} items`);
  return processed;
};
