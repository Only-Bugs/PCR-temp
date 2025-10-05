import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const ICON_MAP = {
  "Energy Wiz": { icon: "bolt", bg: "#22C55E" },
  "Green Thumb": { icon: "eco", bg: "#16A34A" },
  "Recycle Hero": { icon: "recycling", bg: "#F59E0B" },
  "Water Wise": { icon: "water-drop", bg: "#0EA5E9" },
  default: { icon: "quiz", bg: colors.eco.blue },
};

const QuizCard = ({ quiz }) => {
  const router = useRouter();

  const isCompleted = quiz.status === "completed";
  const isInProgress = quiz.status === "in_progress";

  const buttonLabel = isCompleted
    ? "Completed"
    : isInProgress
    ? "Continue Quiz"
    : "Start Quiz";

  const iconData = ICON_MAP[quiz.title] || ICON_MAP.default;

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: iconData.bg }]}>
          <MaterialIcons name={iconData.icon} size={28} color="white" />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{quiz.title}</Text>
          <Text style={styles.subtitle}>{quiz.subtitle}</Text>
        </View>
      </View>

      {/* Footer Button */}
      <TouchableOpacity
        style={[styles.button, isCompleted && styles.buttonCompleted]}
        activeOpacity={isCompleted ? 1 : 0.85}
        onPress={() => {
          if (!isCompleted) {
            router.push({
              pathname: "/QuizScreen",
              params: { quiz: JSON.stringify(quiz) },
            });
          }
        }}
      >
        <Text
          style={[
            styles.buttonLabel,
            isCompleted && styles.buttonLabelCompleted,
          ]}
        >
          {buttonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizCard;
