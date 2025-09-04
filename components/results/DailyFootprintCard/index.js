/**
 * @fileoverview DailyFootprintCard component.
 * Displays the user’s estimated daily carbon footprint.
 */

import { View, Text } from "react-native";
import styles from "./styles";

const DailyFootprintCard = ({ baseline }) => {
  if (!baseline) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Estimated Daily Footprint</Text>
      <Text style={styles.value}>{baseline}</Text>
      <Text style={styles.unit}>kg CO₂e/day</Text>
    </View>
  );
};

export default DailyFootprintCard;
