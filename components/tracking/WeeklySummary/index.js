import { Text, View } from "react-native";
import styles from "./styles";

const WeeklySummary = ({ total, baseline }) => {
  const difference = baseline - total;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Total</Text>
      <Text style={styles.value}>{total}kg CO₂</Text>
      <Text style={styles.subtitle}>
        vs baseline {baseline}kg CO₂ (
        {difference > 0 ? `-${difference} saved` : "no savings"})
      </Text>
    </View>
  );
};

export default WeeklySummary;
