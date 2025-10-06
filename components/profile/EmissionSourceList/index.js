import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";

/**
 * EmissionSourceList
 *
 * Accepts raw monthly snapshot data and renders
 * Transport, Food, and Energy with correct values and visual bars.
 *
 * @param {object} props
 * @param {object} props.data - API response with baseline values (kg CO2)
 * @returns {JSX.Element}
 */
const EmissionSourceList = ({ data }) => {
  if (!data) return null;

  // Parse values as kg CO2 (not percentages)
  const transport = parseFloat(data.user_baseline_monthly_transport) || 0;
  const food = parseFloat(data.user_baseline_monthly_diet) || 0;
  const energy = parseFloat(data.user_baseline_monthly_energy) || 0;

  const total = transport + food + energy;

  // Calculate percentages of total emissions
  const transportPct = total > 0 ? (transport / total) * 100 : 0;
  const foodPct = total > 0 ? (food / total) * 100 : 0;
  const energyPct = total > 0 ? (energy / total) * 100 : 0;

  const sources = [
    {
      icon: "directions-car",
      label: "Transport",
      value: transport,
      percentage: transportPct,
      color: "#FF7043",
    },
    {
      icon: "restaurant",
      label: "Food",
      value: food,
      percentage: foodPct,
      color: "#4CAF50",
    },
    {
      icon: "bolt",
      label: "Energy",
      value: energy,
      percentage: energyPct,
      color: "#FFC107",
    },
  ];

  return (
    <View>
      {sources.map((source, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.left}>
            <MaterialIcons name={source.icon} size={20} color={source.color} />
            <Text style={styles.label}>{source.label}</Text>
          </View>
          <View style={styles.right}>
            {/* Progress bar */}
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${source.percentage}%`,
                    backgroundColor: source.color,
                  },
                ]}
              />
            </View>
            {/* Display as kg CO2 */}
            <Text style={[styles.value, { color: source.color }]}>
              {source.value.toFixed(1)} kg
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default EmissionSourceList;
