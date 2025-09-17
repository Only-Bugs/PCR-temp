import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";

/**
 * EmissionSourceList
 *
 * Accepts raw monthly snapshot data and renders
 * Transport, Food, and Energy with correct % values.
 *
 * @param {object} props
 * @param {object} props.data - API response with baseline values
 * @returns {JSX.Element}
 */
const EmissionSourceList = ({ data }) => {
  if (!data) return null;

  return (
    <View>
      {/* Transport */}
      <View style={styles.row}>
        <View style={styles.left}>
          <MaterialIcons name="directions-car" size={20} color="#FF7043" />
          <Text style={styles.label}>Transport</Text>
        </View>
        <Text style={[styles.value, { color: "#FF7043" }]}>
          {(data.user_baseline_monthly_transport * 100).toFixed(1)}%
        </Text>
      </View>

      {/* Food */}
      <View style={styles.row}>
        <View style={styles.left}>
          <MaterialIcons name="restaurant" size={20} color="#4CAF50" />
          <Text style={styles.label}>Food</Text>
        </View>
        <Text style={[styles.value, { color: "#4CAF50" }]}>
          {(data.user_baseline_monthly_diet * 100).toFixed(1)}%
        </Text>
      </View>

      {/* Energy */}
      <View style={styles.row}>
        <View style={styles.left}>
          <MaterialIcons name="bolt" size={20} color="#FFC107" />
          <Text style={styles.label}>Energy</Text>
        </View>
        <Text style={[styles.value, { color: "#FFC107" }]}>
          {(data.user_baseline_monthly_energy * 100).toFixed(1)}%
        </Text>
      </View>
    </View>
  );
};

export default EmissionSourceList;
