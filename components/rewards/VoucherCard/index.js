import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import CTAButton from "../../CTAButton";
import styles from "./styles";

const VoucherCard = ({ title, subtitle, expiry, icon, color }) => {
  return (
    <View style={styles.card}>
      {/* Left Icon */}
      <View style={[styles.iconCircle, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>

      {/* Voucher Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.expiry}>{expiry}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <CTAButton
          label="Redeem"
          variant="primary"
          onPress={() => console.log("Redeem")}
        />
        <CTAButton
          label="Details"
          variant="outline"
          onPress={() => console.log("Details")}
        />
      </View>
    </View>
  );
};

export default VoucherCard;
