import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";

const ChallengeHeader = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Challenges</Text>

      {/* Notification bell with red dot */}
      <View style={styles.notificationWrapper}>
        <MaterialIcons name="notifications-none" size={26} color="black" />
        <View style={styles.redDot} />
      </View>
    </View>
  );
};

export default ChallengeHeader;
