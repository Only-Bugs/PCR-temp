/**
 * @fileoverview Onboarding questionnaire page.
 * Handles rendering questions, tracking progress, validation, and navigation.
 */

import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CTAButton from "../components/CTAButton";
import OnboardingHeader from "../components/questionnaire/OnboardingHeader";
import QuestionCard from "../components/questionnaire/QuestionCard";
import { validateInput } from "../components/questionnaire/validation";
import { questionnaireData } from "../services/questionnaireData";
import colors from "../theme/colors";

const OnboardingPage = () => {
  const questions = questionnaireData.body.data;
  const [currentIndex, setCurrentIndex] = useState(0);

  /** @type {Record<number, any>} Stores answers keyed by question_id */
  const [answers, setAnswers] = useState({});
  const router = useRouter();

  const currentQuestion = questions[currentIndex];
  const completedSteps = Object.keys(answers).length;

  /**
   * Checks if the current question's answer is valid.
   * @returns {boolean}
   */
  const isAnswerValid = () => {
    const value = answers[currentQuestion.question_id];
    return validateInput(currentQuestion.input_type, value);
  };

  /**
   * Handles moving to the next step or completion.
   */
  const handleNext = () => {
    if (!isAnswerValid()) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace("/TransitionPage");
    }
  };

  /**
   * Handles back navigation, with special case for first step.
   */
  const handleBack = () => {
    if (currentIndex === 0) {
      router.replace("/WelcomePage");
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

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

          <CTAButton
            label={currentIndex === questions.length - 1 ? "Complete" : "Next"}
            onPress={handleNext}
            variant="gradient"
            disabled={!isAnswerValid()}
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
});

export default OnboardingPage;
