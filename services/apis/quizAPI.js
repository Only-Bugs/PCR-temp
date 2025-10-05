import apiConfig from "../../config/apiConfig";

/**
 * Fetches all quiz topics and their questions.
 * @returns {Promise<any[]>}
 */
export const fetchQuizzes = async () => {
  try {
    const url = `${apiConfig.baseURL}${apiConfig.endpoints.quiz}`;
    console.log("[fetchQuizzes] URL:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch quizzes");

    const result = await response.json();

    return result;

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
export const fetchQuizByIndex = async (index = 0) => {
  try {
    const quizzes = await fetchQuizzes();
    return quizzes[index] || null;
  } catch (error) {
    console.error("[quizAPI] fetchQuizByIndex error:", error);
    throw error;
  }
};
