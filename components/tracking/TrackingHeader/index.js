import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";

const TrackingHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracking</Text>
      <View style={styles.bellWrapper}>
        <MaterialIcons name="notifications-none" size={24} color="black" />
        <View style={styles.redDot} />
      </View>
    </View>
  );
};

export default TrackingHeader;
