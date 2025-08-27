import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import ProgressBar from "../../ProgressBar";
import ProgressCircle from "../../ProgressCircle"; // ✅ add this
import styles from "./styles";

const ScoreCard = ({ variant }) => {
  if (variant === "baseline") {
    return (
      <View style={[styles.card, styles.baselineCard]}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="insights" size={20} color={colors.success} />
          <Text style={styles.title}>Your Lifestyle Baseline</Text>
        </View>

        {/* Values */}
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.value}>8.2</Text>
            <Text style={styles.unit}>tonnes CO₂/year</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.subText}>National avg: 15.3 tonnes</Text>
            <View style={styles.changeRow}>
              <MaterialIcons
                name="arrow-downward"
                size={14}
                color={colors.success}
              />
              <Text style={styles.change}>46% below average</Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <ProgressBar progress={0.54} color={colors.success} height={10} />
      </View>
    );
  }

  if (variant === "carbon") {
    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="star" size={20} color="#FFC107" />
          <Text style={styles.title}>Carbon Score</Text>
        </View>

        {/* Value + Progress Circle */}
        <View style={styles.row}>
          <Text style={styles.value}>742</Text>
          <ProgressCircle progress={0.74} size={72} strokeWidth={8} />
        </View>

        {/* Level / Subtext */}
        <View style={styles.levelRow}>
          <MaterialIcons name="emoji-events" size={18} color={colors.purple} />
          <Text style={styles.levelText}>Level 2: Conscious Explorer</Text>
        </View>
      </View>
    );
  }

  return null;
};

export default ScoreCard;
