/**
 * @fileoverview Onboarding questionnaire page.
 * Fetches questions, captures answers, validates, submits to API, and stores UID.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const currentQuestion = questions[currentIndex];
  const completedSteps = Object.keys(answers).length;

  const isAnswerValid = () => {
    if (!currentQuestion) return false;
    const value = answers[currentQuestion.question_id];
    return validateInput(currentQuestion.input_type, value);
  };

  /**
   * Advances to the next question or submits responses if at the end.
   * @async
   */
  const handleNext = async () => {
    if (!isAnswerValid()) return;

    const isLastQuestion = currentIndex === questions.length - 1;

    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        responses: Object.entries(answers).map(([id, value]) => ({
          question_id: Number(id),
          question_response: Number(value),
        })),
      };
      console.log(payload);

      const { eco_id, baseline } = await submitBaselineResponses(payload);

      if (!eco_id) {
        throw new Error("eco_id not found in API response");
      }

      await AsyncStorage.setItem("eco_id", eco_id.toString());
      await AsyncStorage.setItem("baseline", baseline.toString());

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
      throw err; // don’t swallow — surface it up
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
            totalSteps={questions.length}
            onBack={handleBack}
          />

          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              value={answers[currentQuestion.question_id] || ""}
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
