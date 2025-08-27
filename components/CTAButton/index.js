import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const CTAButton = ({ label }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CTAButton;
