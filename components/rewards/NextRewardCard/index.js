import { Text, View } from "react-native";
import CTAButton from "../../CTAButton";
import styles from "./styles";

const NextRewardCard = ({ title, message, cta }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <CTAButton
        label={cta}
        variant="primary"
        onPress={() => console.log("Go to Challenges")}
      />
    </View>
  );
};

export default NextRewardCard;
