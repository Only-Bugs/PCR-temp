import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const CTAButton = ({ label, onPress, variant = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CTAButton;
