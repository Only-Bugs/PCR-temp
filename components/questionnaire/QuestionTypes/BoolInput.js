import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const BoolInput = ({ value, onChange }) => {
  return (
    <View style={styles.boolWrapper}>
      <TouchableOpacity
        style={[styles.boolButton, value === true && styles.boolButtonSelected]}
        onPress={() => onChange(true)}
      >
        <Text
          style={[
            styles.boolButtonText,
            value === true && styles.boolButtonTextSelected,
          ]}
        >
          Yes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.boolButton,
          value === false && styles.boolButtonSelected,
        ]}
        onPress={() => onChange(false)}
      >
        <Text
          style={[
            styles.boolButtonText,
            value === false && styles.boolButtonTextSelected,
          ]}
        >
          No
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BoolInput;
