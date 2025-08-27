import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import CTAButton from "../../CTAButton";
import styles from "./styles";

const AchievementBanner = ({ title, message, cta }) => {
  return (
    <LinearGradient
      colors={["#E8FEE7", "#FFF8F1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <CTAButton
        label={cta}
        variant="outline"
        onPress={() => console.log("Share pressed")}
      />
    </LinearGradient>
  );
};

export default AchievementBanner;
