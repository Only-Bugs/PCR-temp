/**
 * @fileoverview TipOfTheDayCard component.
 * Displays a sustainability tip.
 */

import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import colors from "../../../theme/colors";

const TipOfTheDayCard = ({ tip }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tip of the Day</Text>
      <View style={styles.tipBox}>
        <Ionicons
          name="bulb-outline"
          size={20}
          color={colors.eco.green[600]}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.tipText}>{tip}</Text>
      </View>
    </View>
  );
};

export default TipOfTheDayCard;
