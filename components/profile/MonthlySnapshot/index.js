import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import EmissionSourceList from "../EmissionSourceList";
import styles from "./styles";

/**
 * MonthlySnapshot component.
 *
 * @param {object} props
 * @param {object} props.data - Monthly snapshot data (from API or storage)
 * @returns {JSX.Element}
 */
const MonthlySnapshot = ({ data }) => {
  if (!data) return null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="show-chart" size={20} color="blue" />
        <Text style={styles.title}>Monthly Snapshot</Text>
      </View>

      {/* Performance Box */}
      <View style={styles.performanceBox}>
        <View>
          <Text style={styles.performanceTitle}>vs. Last Month</Text>
          <Text style={styles.performanceSub}>
            You reduced car trips this month
          </Text>
        </View>
        <View style={styles.performanceRight}>
          <MaterialIcons name="arrow-downward" size={16} color="green" />
          <Text style={styles.performanceChange}>-12%</Text>
        </View>
      </View>

      {/* Top Emission Sources */}
      <Text style={styles.sectionTitle}>Top Emission Sources</Text>
      <EmissionSourceList data={data} />

      {/* Tip Box */}
      <View style={styles.tipBox}>
        <MaterialIcons name="lightbulb-outline" size={20} color="#FFC107" />
        <Text style={styles.tipText}>
          Try replacing 2 car trips with cycling for even better progress
        </Text>
      </View>

      {/* Badge Box */}
      <View style={styles.badgeBox}>
        <MaterialIcons name="emoji-events" size={20} color="purple" />
        <Text style={styles.badgeText}>
          You’re greener than 65% of users in Melbourne
        </Text>
      </View>
    </View>
  );
};

export default MonthlySnapshot;
