import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ProgressBar from "../../ProgressBar";
import styles from "./styles";

const ChallengeCard = ({
  icon = "star",
  title = "Untitled Challenge",
  progress = 0,
  total = 1,
  status = "Active",
}) => {
  const completion = total > 0 ? progress / total : 0;

  return (
    <View style={styles.card}>
      {/* Top Row: icon + title + badge */}
      <View style={styles.topRow}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name={icon} size={22} color="black" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>

      {/* Progress Text */}
      <Text style={styles.progressText}>
        {progress} of {total} completed
      </Text>

      {/* Progress Bar */}
      <ProgressBar progress={completion} height={8} color="#4CAF50" />
    </View>
  );
};

export default ChallengeCard;
