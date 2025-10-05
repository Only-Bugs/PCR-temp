// app/quizResult.jsx
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";

const QuizResultScreen = () => {
  const { score, total, percentage, title } = useLocalSearchParams();
  const router = useRouter();

  const numericPercentage = parseInt(percentage, 10);

  // Color feedback by performance
  const isGood = numericPercentage >= 70;
  const isOkay = numericPercentage >= 40 && numericPercentage < 70;

  return (
    <View style={styles.container}>
      {/* Result Card */}
      <View style={styles.resultCard}>
        <View
          style={[
            styles.iconWrapper,
            isGood
              ? styles.iconGood
              : isOkay
              ? styles.iconOkay
              : styles.iconBad,
          ]}
        >
          <MaterialIcons
            name={isGood ? "emoji-events" : isOkay ? "psychology" : "error"}
            size={36}
            color={
              isGood
                ? colors.eco.green[600]
                : isOkay
                ? colors.eco.blue
                : "#ef4444"
            }
          />
        </View>

        <Text style={styles.header}>Quiz Completed</Text>
        <Text style={styles.subHeader}>{title}</Text>

        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            {score} / {total} correct
          </Text>
          <Text
            style={[
              styles.percentage,
              isGood
                ? { color: colors.eco.green[600] }
                : isOkay
                ? { color: colors.eco.blue }
                : { color: "#ef4444" },
            ]}
          >
            {percentage}%
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/LearningPage")}
      >
        <Text style={styles.primaryButtonLabel}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.eco.blueSoft,
    justifyContent: "center",
  },

  resultCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  iconWrapper: {
    padding: 16,
    borderRadius: 999,
    marginBottom: 12,
  },
  iconGood: { backgroundColor: "rgba(34,197,94,0.12)" },
  iconOkay: { backgroundColor: "rgba(14,165,233,0.12)" },
  iconBad: { backgroundColor: "rgba(239,68,68,0.12)" },

  header: { fontSize: 20, fontWeight: "700", color: colors.textPrimary },
  subHeader: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },

  resultBox: { alignItems: "center" },
  resultText: { fontSize: 16, fontWeight: "600", color: colors.textPrimary },
  percentage: { fontSize: 32, fontWeight: "700", marginTop: 6 },

  primaryButton: {
    backgroundColor: colors.eco.blue,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonLabel: {
    color: colors.neutral.white,
    fontWeight: "600",
    fontSize: 16,
  },

  secondaryButton: {
    borderColor: colors.eco.blue,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonLabel: {
    color: colors.eco.blue,
    fontWeight: "600",
    fontSize: 15,
  },
});

export default QuizResultScreen;
