import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CTAButton from "../components/CTAButton";
import OnboardingHeader from "../components/questionnaire/OnboardingHeader";
import QuestionCard from "../components/questionnaire/QuestionCard";
import { validateInput } from "../components/questionnaire/validation";
import { useUser } from "../context/UserContext";
import {
  getBaselineQuestions,
  submitBaselineResponses,
} from "../services/apis/onboardingAPI";
import colors from "../theme/colors";
import { hapticError, hapticSuccess } from "../utils/haptics";

const HOUSEHOLD_SIZE_CODES = ["Q2", "HOUSEHOLD_SIZE"];
const TRANSPORT_CODES = [
  "Q9",
  "TRANSPORT_USAGE",
  "PUBLIC_TRANSPORT_FREQUENCY",
  "PUBLIC_TRANSPORT",
];

const getIntegerMinimum = (question) => {
  if (!question) return 0;
  if (typeof question.minimum_value === "number") {
    return Number(question.minimum_value);
  }
  if (question.question_code) {
    const code = String(question.question_code).toUpperCase();
    if (HOUSEHOLD_SIZE_CODES.includes(code)) {
      return 1;
    }
  }
  if (question.question_id === 2) {
    return 1;
  }
  return 0;
};

const isTransportQuestion = (question) => {
  if (!question) return false;
  const code = question.question_code
    ? String(question.question_code).toUpperCase()
    : "";
  const text = (question.text_en || question.text || "")
    .toString()
    .toLowerCase();
  return (
    TRANSPORT_CODES.includes(code) ||
    code.includes("TRANSPORT") ||
    text.includes("public transport")
  );
};

const OnboardingPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { updateUser } = useUser();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getBaselineQuestions();
        setQuestions(data.data || []);
      } catch (err) {
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const activeQuestions = questions.filter((q) => {
    if (q.question_code === "Q4A" || q.question_code === "Q4B") {
      const drives = answers[4];
      if (drives === false) return false;
    }
    return true;
  });

  const currentQuestion = activeQuestions[currentIndex];
  const totalSteps = activeQuestions.length;
  const completedSteps = Object.keys(answers).filter(
    (id) =>
      answers[id] !== null && answers[id] !== undefined && answers[id] !== ""
  ).length;

  const isAnswerValid = () => {
    if (!currentQuestion) return false;
    const value = answers[currentQuestion.question_id];
    const validationOptions =
      currentQuestion.input_type === "number_int"
        ? { min: getIntegerMinimum(currentQuestion) }
        : currentQuestion.input_type === "enum_range" && isTransportQuestion(currentQuestion)
        ? {}
        : undefined;
    return validateInput(
      currentQuestion.input_type,
      value,
      validationOptions
    );
  };

  const handleNext = async () => {
    if (!isAnswerValid()) return;

    const isLastQuestion = currentIndex === activeQuestions.length - 1;

    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        responses: questions.map((q) => {
          const value = answers[q.question_id];

          if (value === undefined || value === null || value === "") {
            return {
              question_id: q.question_id,
              question_response: q.default_option ?? null,
            };
          }

          let response;
          switch (q.input_type) {
            case "number":
            case "number_int":
              response = Number(value);
              break;
            case "bool":
              response =
                value === true ||
                value === "1" ||
                value === "true" ||
                value === 1;
              break;
            case "enum_range":
            case "select_enum":
              response = String(value);
              break;
            default:
              response = value;
          }

          return {
            question_id: q.question_id,
            question_response: response,
          };
        }),
      };

      const { eco_id, baseline } = await submitBaselineResponses(payload);

      if (!eco_id) {
        throw new Error("eco_id not found in API response");
      }

      const newUser = {
        eco_id: eco_id.toString(),
        carbonPoints: 0,
        daily: Number(baseline),
        monthly: 0,
        yearly: 0,
      };
      await updateUser(newUser);

      try {
        await hapticSuccess();
      } catch {
        /* noop */
      }

      router.replace("/ProfileCreatedPage");
    } catch (err) {
      try {
        await hapticError();
      } catch {
        /* noop */
      }
      setError("Failed to submit answers. Please try again.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handles progression when the user skips a question.
   * Applies default values if provided, including for dependent children.
   */
  const handleSkip = () => {
    const current = currentQuestion;

    if (current) {
      setAnswers((prev) => {
        const updated = { ...prev };

        if (current.question_code === "Q4") {
          updated[current.question_id] = false;
          const q4 = questions.find((q) => q.question_code === "Q4");
          const q4A = questions.find((q) => q.question_code === "Q4A");
          const q4B = questions.find((q) => q.question_code === "Q4B");
          if (q4) updated[q4.question_id] = q4.default_option;
          if (q4A) updated[q4A.question_id] = q4A.default_option;
          if (q4B) updated[q4B.question_id] = q4B.default_option;
        } else {
          const defaultOption = current.default_option;
          switch (current.input_type) {
            case "number":
            case "number_int":
              updated[current.question_id] = Number(defaultOption);
              break;
            case "bool":
              updated[current.question_id] =
                defaultOption === "1" ||
                defaultOption === true ||
                defaultOption === "true";
              break;
            case "enum_range":
            case "select_enum":
              updated[current.question_id] = String(defaultOption);
              break;
            default:
              updated[current.question_id] = defaultOption ?? null;
          }
        }

        return updated;
      });
    }

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace("/ProfileCreatedPage");
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      router.replace("/SignInPage");
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.eco.green[600]} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <OnboardingHeader
            currentStep={currentIndex + 1}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            onBack={handleBack}
            onSkip={handleSkip}
          />

          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              value={
                Object.prototype.hasOwnProperty.call(
                  answers,
                  currentQuestion.question_id
                )
                  ? answers[currentQuestion.question_id]
                  : currentQuestion.input_type === "number" ||
                    currentQuestion.input_type === "number_int"
                  ? ""
                  : null
              }
              setValue={(val) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.question_id]: val,
                }))
              }
            />
          )}

          <CTAButton
            label="Next"
            variant="filled"
            loading={submitting}
            disabled={!isAnswerValid() || submitting}
            onPress={handleNext}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.neutral.white,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingPage;
