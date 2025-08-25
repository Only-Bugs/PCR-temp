import { Text, View } from "react-native";
import EmissionSourceList from "../EmissionSourceList";
import styles from "./styles";

const MonthlySnapshot = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Monthly Snapshot</Text>
      <Text style={styles.subText}>vs. Last Month ↓ -12%</Text>
      <Text style={styles.achievement}>
        You reduced car trips by 8 days this month 🎉
      </Text>
      <EmissionSourceList />
      <Text style={styles.tip}>
        Try replacing 2 car trips with cycling for even better progress
      </Text>
      <Text style={styles.badge}>
        You’re greener than 65% of users in Melbourne 🏆
      </Text>
    </View>
  );
};

export default MonthlySnapshot;
