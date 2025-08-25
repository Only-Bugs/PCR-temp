import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import ProgressBar from "../../ProgressBar"; // ✅ updated import
import styles from "./styles";

const ScoreCard = ({ variant }) => {
  if (variant === "baseline") {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Your Lifestyle Baseline</Text>
        <Text style={styles.value}>8.2 tonnes CO₂/year</Text>
        <Text style={styles.subText}>
          National avg: 15.3 tonnes — 46% below average
        </Text>
        <ProgressBar progress={0.54} color={colors.success} height={8} />
      </View>
    );
  }

  if (variant === "carbon") {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Carbon Score</Text>
        <Text style={styles.value}>742</Text>
        <Text style={styles.subText}>Level 2: Conscious Explorer</Text>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, { borderColor: colors.success }]}>
            <Text style={styles.circleText}>74%</Text>
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default ScoreCard;
