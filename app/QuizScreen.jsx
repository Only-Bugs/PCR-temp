import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../theme/colors";

const QuizScreen = () => {
  const { quiz } = useLocalSearchParams();
  const parsedQuiz = JSON.parse(quiz);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const question = parsedQuiz.questions[currentIndex];

  const handleSelectOption = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setShowExplanation(true);

    setAnswers((prev) => [
      ...prev,
      {
        quesId: question.quiz_ques_id,
        isCorrect: option.quiz_option_is_correct === 1,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < parsedQuiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const correctCount = answers.filter((a) => a.isCorrect).length;
      const total = parsedQuiz.questions.length;
      const percentage = Math.round((correctCount / total) * 100);

      router.push({
        pathname: "/quizResult",
        params: {
          score: correctCount,
          total,
          percentage,
          title: parsedQuiz.topic_name,
        },
      });
    }
  };

  const handleBackPress = () => setConfirmVisible(true);
  const handleCancelExit = () => setConfirmVisible(false);
  const handleConfirmExit = () => {
    setConfirmVisible(false);
    router.push("/LearningPage");
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <Pressable
          onPress={handleBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name="arrow-back"
            size={26}
            color={colors.textPrimary}
          />
        </Pressable>
        <Text style={styles.headerTitle}>{parsedQuiz.topic_name}</Text>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="eco" size={28} color={colors.eco.green[600]} />
        </View>
        <Text style={styles.questionText}>{question.quiz_ques_text}</Text>
      </View>

      {/* Options */}
      <FlatList
        data={question.options}
        keyExtractor={(item) => item.quiz_option_id.toString()}
        renderItem={({ item }) => {
          const isSelected =
            selectedOption?.quiz_option_id === item.quiz_option_id;
          const isCorrect = item.quiz_option_is_correct === 1;

          let optionStyle = styles.optionCard;
          let optionTextStyle = styles.optionText;

          if (selectedOption) {
            if (isCorrect) {
              optionStyle = [optionStyle, styles.optionCardCorrect];
              optionTextStyle = [optionTextStyle, styles.optionTextCorrect];
            } else if (isSelected) {
              optionStyle = [optionStyle, styles.optionCardWrong];
              optionTextStyle = [optionTextStyle, styles.optionTextWrong];
            }
          } else if (isSelected) {
            optionStyle = [optionStyle, styles.optionCardSelected];
            optionTextStyle = [optionTextStyle, styles.optionTextSelected];
          }

          return (
            <TouchableOpacity
              style={optionStyle}
              onPress={() => handleSelectOption(item)}
              disabled={!!selectedOption}
            >
              <Text style={optionTextStyle}>{item.quiz_option_text}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Explanation */}
      {showExplanation && selectedOption && (
        <View
          style={[
            styles.explanationContainer,
            selectedOption.quiz_option_is_correct === 1
              ? styles.explanationCorrect
              : styles.explanationWrong,
          ]}
        >
          <View style={styles.explanationHeader}>
            <MaterialIcons
              name={
                selectedOption.quiz_option_is_correct === 1
                  ? "check-circle"
                  : "cancel"
              }
              size={22}
              color={
                selectedOption.quiz_option_is_correct === 1
                  ? colors.eco.green[600]
                  : "#ef4444"
              }
            />
            <Text
              style={[
                styles.explanationTitle,
                {
                  color:
                    selectedOption.quiz_option_is_correct === 1
                      ? colors.eco.green[700]
                      : "#b91c1c",
                },
              ]}
            >
              {selectedOption.quiz_option_is_correct === 1
                ? "Correct Answer"
                : "Incorrect Answer"}
            </Text>
          </View>

          <Text style={styles.explanationTextModern}>
            {selectedOption.quiz_option_explanation}
          </Text>
        </View>
      )}

      {/* Next Button */}
      {showExplanation && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonLabel}>
            {currentIndex === parsedQuiz.questions.length - 1
              ? "Finish"
              : "Next"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Exit Confirmation Modal */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelExit}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Leave Quiz?</Text>
            <Text style={styles.modalMessage}>
              Your current progress will be lost. Are you sure you want to
              return to the Learning Page?
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                onPress={handleCancelExit}
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.modalButtonSecondary,
                  pressed && styles.modalButtonSecondaryPressed,
                ]}
              >
                <Text style={styles.modalButtonSecondaryLabel}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmExit}
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.modalButtonPrimary,
                  pressed && styles.modalButtonPrimaryPressed,
                ]}
              >
                <Text style={styles.modalButtonPrimaryLabel}>Leave Quiz</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.eco.blueSoft },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginLeft: 8,
  },
  questionCard: {
    backgroundColor: colors.neutral.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconWrapper: {
    backgroundColor: "rgba(34,197,94,0.12)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  optionCard: {
    backgroundColor: colors.neutral.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
  },
  optionCardSelected: {
    borderColor: colors.eco.blue,
    backgroundColor: "rgba(14,165,233,0.08)",
  },
  optionCardCorrect: {
    borderColor: colors.eco.green[600],
    backgroundColor: "rgba(34,197,94,0.12)",
  },
  optionCardWrong: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239,68,68,0.12)",
  },
  optionText: { fontSize: 15, color: colors.textPrimary },
  optionTextSelected: { color: colors.eco.blue, fontWeight: "600" },
  optionTextCorrect: { color: colors.eco.green[600], fontWeight: "600" },
  optionTextWrong: { color: "#ef4444", fontWeight: "600" },
  explanationContainer: {
    marginTop: 24,
    marginBottom: 28,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  explanationCorrect: {
    backgroundColor: "rgba(34,197,94,0.12)",
    borderLeftWidth: 4,
    borderLeftColor: colors.eco.green[600],
  },
  explanationWrong: {
    backgroundColor: "rgba(239,68,68,0.12)",
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
  explanationTextModern: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },

  nextButton: {
    marginTop: "auto",
    backgroundColor: colors.eco.blue,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  nextButtonLabel: {
    fontWeight: "600",
    color: colors.neutral.white,
    fontSize: 16,
  },

  // Modal styles (reused from ArticleCard)
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    shadowColor: "#0F172A",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  modalMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  modalButton: {
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minWidth: 96,
    alignItems: "center",
  },
  modalButtonSecondary: {
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
  },
  modalButtonSecondaryPressed: {
    backgroundColor: colors.neutral.gray100,
  },
  modalButtonPrimary: {
    backgroundColor: colors.eco.green[600],
  },
  modalButtonPrimaryPressed: {
    backgroundColor: colors.eco.green[700] || colors.eco.green[600],
  },
  modalButtonSecondaryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  modalButtonPrimaryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.neutral.white,
  },
});

export default QuizScreen;
