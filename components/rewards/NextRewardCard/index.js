import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import CTAButton from "../../CTAButton";
import styles from "./styles";

const NextRewardCard = ({ title, message, cta, icon, color }) => {
  return (
    <LinearGradient
      colors={["#FFF8E1", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Icon + Text */}
      <View style={styles.row}>
        <View style={[styles.iconCircle, { backgroundColor: color }]}>
          <MaterialIcons name={icon} size={24} color="white" />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>

      {/* CTA */}
      <CTAButton
        label={cta}
        variant="primary"
        onPress={() => console.log("Go to Challenges")}
      />
    </LinearGradient>
  );
};

export default NextRewardCard;
