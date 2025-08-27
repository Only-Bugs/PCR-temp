import { Text, View } from "react-native";
import CTAButton from "../../CTAButton";
import styles from "./styles";

const VoucherCard = ({ title, subtitle, expiry }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.expiry}>{expiry}</Text>
      <CTAButton
        label="Redeem"
        variant="primary"
        onPress={() => console.log("Redeem")}
      />
    </View>
  );
};

export default VoucherCard;
