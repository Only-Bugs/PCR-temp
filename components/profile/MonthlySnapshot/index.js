import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const MonthlySnapshot = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="show-chart" size={20} color={colors.info} />
        <Text style={styles.title}>Monthly Snapshot</Text>
      </View>

      {/* Performance Box */}
      <View style={styles.performanceBox}>
        <View>
          <Text style={styles.performanceTitle}>vs. Last Month</Text>
          <Text style={styles.performanceSub}>
            You reduced car trips by 8 days this month
          </Text>
        </View>
        <View style={styles.performanceRight}>
          <MaterialIcons
            name="arrow-downward"
            size={16}
            color={colors.success}
          />
          <Text style={styles.performanceChange}>-12%</Text>
        </View>
      </View>

      {/* Top Emission Sources */}
      <Text style={styles.sectionTitle}>Top Emission Sources</Text>

      <View style={styles.sourceRow}>
        <View style={styles.sourceLeft}>
          <MaterialIcons name="directions-car" size={20} color="#FF7043" />
          <Text style={styles.sourceLabel}>Transport</Text>
        </View>
        <Text style={[styles.sourceValue, { color: "#FF7043" }]}>45%</Text>
      </View>

      <View style={styles.sourceRow}>
        <View style={styles.sourceLeft}>
          <MaterialIcons name="restaurant" size={20} color="#4CAF50" />
          <Text style={styles.sourceLabel}>Food</Text>
        </View>
        <Text style={[styles.sourceValue, { color: "#4CAF50" }]}>30%</Text>
      </View>

      <View style={styles.sourceRow}>
        <View style={styles.sourceLeft}>
          <MaterialIcons name="bolt" size={20} color="#FFC107" />
          <Text style={styles.sourceLabel}>Energy</Text>
        </View>
        <Text style={[styles.sourceValue, { color: "#FFC107" }]}>25%</Text>
      </View>

      {/* Tip Box */}
      <View style={styles.tipBox}>
        <MaterialIcons name="lightbulb-outline" size={20} color="#FFC107" />
        <Text style={styles.tipText}>
          Try replacing 2 car trips with cycling for even better progress
        </Text>
      </View>

      {/* Badge Box */}
      <View style={styles.badgeBox}>
        <MaterialIcons name="emoji-events" size={20} color={colors.purple} />
        <Text style={styles.badgeText}>
          You’re greener than <Text style={styles.highlight}>65%</Text> of users
          in Melbourne
        </Text>
      </View>
    </View>
  );
};

export default MonthlySnapshot;
