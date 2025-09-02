/**
 * @fileoverview ComparedToAverageCard component.
 * Displays user baseline vs national average and a comparison statement.
 */

import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import colors from "../../../theme/colors";

const ComparedToAverageCard = ({ baseline, nationalAverage }) => {
  if (!baseline) return null;

  const diff = ((nationalAverage - baseline) / nationalAverage) * 100;
  const comparisonText =
    diff > 0
      ? `You’re ${diff.toFixed(1)}% below the national average!`
      : `You’re ${Math.abs(diff).toFixed(1)}% above the national average.`;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="stats-chart"
          size={20}
          color={colors.eco.green[600]}
          style={styles.icon}
        />
        <Text style={styles.title}>Compared to Average</Text>
      </View>

      {/* Values */}
      <View style={styles.row}>
        <Text style={styles.label}>You</Text>
        <Text style={styles.value}>{baseline} kg</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>National Average</Text>
        <Text style={styles.value}>{nationalAverage} kg</Text>
      </View>

      {/* Comparison Result */}
      <View style={styles.comparisonBox}>
        <Text style={styles.comparison}>{comparisonText}</Text>
      </View>
    </View>
  );
};

export default ComparedToAverageCard;
