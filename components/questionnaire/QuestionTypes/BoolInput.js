/**
 * @fileoverview BoolInput component.
 * Handles yes/no toggle with correct highlighting for both true/false and 1/0.
 */

import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

/**
 * @component BoolInput
 * @description Yes/No toggle input for boolean questions.
 *
 * @param {Object} props
 * @param {boolean|number|null} props.value - Current value (true/false or 1/0).
 * @param {Function} props.onChange - Callback to update value.
 */
const BoolInput = ({ value, onChange }) => {
  const isYesSelected = value === true || value === 1;
  const isNoSelected = value === false || value === 0;

  return (
    <View style={styles.boolWrapper}>
      <TouchableOpacity
        style={[styles.boolButton, isYesSelected && styles.boolButtonSelected]}
        onPress={() => onChange(true)}
      >
        <Text
          style={[
            styles.boolButtonText,
            isYesSelected && styles.boolButtonTextSelected,
          ]}
        >
          Yes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.boolButton, isNoSelected && styles.boolButtonSelected]}
        onPress={() => onChange(false)}
      >
        <Text
          style={[
            styles.boolButtonText,
            isNoSelected && styles.boolButtonTextSelected,
          ]}
        >
          No
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BoolInput;
