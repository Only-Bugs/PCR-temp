import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const WeeklySummary = ({ total, baseline }) => {
  // Calculate saved amount vs. baseline
  const saved = baseline - total;

  return (
    <View style={styles.card}>
      {/* Header */}
      <Text style={styles.header}>Weekly Total</Text>

      {/* Total */}
      <Text style={styles.total}>{total}kg CO₂</Text>
      <Text style={styles.baseline}>vs baseline {baseline}kg CO₂</Text>

      {/* Progress Box */}
      <View style={styles.progressBox}>
        <MaterialIcons
          name="emoji-events"
          size={20}
          color={colors.eco.yellow}
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.progressTitle}>Great Progress!</Text>
          <Text style={styles.progressText}>
            You saved {saved}kg CO₂ this week compared to last week 🎉
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeeklySummary;
