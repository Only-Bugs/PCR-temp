import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useUser } from "../../../context/UserContext";
import EmissionSourceList from "../EmissionSourceList";
import styles from "./styles";

/**
 * MonthlySnapshot component.
 * Shows the user’s daily baseline emissions and top sources.
 *
 * @param {object} props
 * @param {object} props.data - Monthly snapshot data (from API or storage)
 * @returns {JSX.Element}
 */
const MonthlySnapshot = ({ data }) => {
  const { user } = useUser();
  const dailyValue = Number(user?.daily);
  const monthlyValue = Number(user?.monthly);

  const dailyLabel =
    dailyValue > 0
      ? `${dailyValue.toFixed(2)} Kg CO₂`
      : `${monthlyValue.toFixed(2)} Kg CO₂`;

  if (!data) return null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="show-chart" size={20} color="#1E88E5" />
        <Text style={styles.title}>Your Baseline Snapshot</Text>
      </View>

      {/* Total Value */}
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total Emissions</Text>
        <Text style={styles.totalValue}>{dailyLabel}</Text>
      </View>

      {/* Top Sources */}
      <Text style={styles.sectionTitle}>Top Emission Sources</Text>
      <EmissionSourceList data={data} />

      {/* Optional Tip */}
      <View style={styles.tipBox}>
        <MaterialIcons name="lightbulb-outline" size={20} color="#FFC107" />
        <Text style={styles.tipText}>
          Try cycling twice this week to lower your footprint.
        </Text>
      </View>
    </View>
  );
};

export default MonthlySnapshot;
