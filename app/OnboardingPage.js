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
    return validateInput(currentQuestion.input_type, value);
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
            return { question_id: q.question_id, question_response: null };
          }

          let response;
          switch (q.input_type) {
            case "number":
            case "number_int":
              response = Number(value);
              break;
            case "bool":
              response = value;
              break;
            case "enum_range":
            case "select_enum":
              response = String(value);
              break;
            default:
              response = null;
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

      // Seed context + storage with initial user object
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

  const handleBack = () => {
    if (currentIndex === 0) {
      router.replace("/WelcomePage");
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleSkip = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace("/ProfileCreatedPage");
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
