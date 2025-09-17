import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";

/**
 * AllChallengesComplete
 *
 * Shown when user has completed all available challenges.
 * Displays a congratulatory card with badges and info text.
 *
 * @returns {JSX.Element}
 */
const AllChallengesComplete = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialIcons name="check-circle" size={24} color="#fff" />
        <Text style={styles.headerText}>All done!</Text>
      </View>
      <Text style={styles.subText}>
        {`You've completed all available challenges.`}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Great job exploring!</Text>
        <Text style={styles.sectionText}>
          {`You've completed all challenges. New ones will be added soon—check
          back anytime for updates!`}
        </Text>
      </View>

      <View style={styles.badgeRow}>
        <View style={styles.badgePill}>
          <MaterialIcons name="star" size={18} color="#FFD700" />
          <Text style={styles.badgeText}>Challenge Master</Text>
        </View>
        <View style={styles.badgePill}>
          <MaterialIcons name="emoji-events" size={18} color="#FFD700" />
          <Text style={styles.badgeText}>All Complete</Text>
        </View>
      </View>
    </View>
  );
};

export default AllChallengesComplete;
