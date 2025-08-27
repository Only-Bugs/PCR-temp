import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import styles from "./styles";

const EncouragementBanner = () => {
  return (
    <LinearGradient
      colors={["#FBBF24", "#EC4899"]} // yellow → pink gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.row}>
        <MaterialIcons name="celebration" size={22} color="white" />
        <Text style={styles.title}>
          Keep it up! You’re making real progress
        </Text>
      </View>
      <Text style={styles.subtitle}>
        Every small action counts towards a sustainable future
      </Text>
    </LinearGradient>
  );
};

export default EncouragementBanner;
