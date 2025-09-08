/**
 * @fileoverview EnumRangeInput component.
 * Renders a list of radio-style options for enum_range questions.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const EnumRangeInput = ({ value, onChange, options = [] }) => {
  return (
    <View style={styles.enumContainer}>
      {options.map((option, idx) => {
        const selected = value === option;
        return (
          <TouchableOpacity
            key={idx}
            style={styles.enumOptionRow}
            onPress={() => onChange(option)}
          >
            <MaterialIcons
              name={
                selected ? "radio-button-checked" : "radio-button-unchecked"
              }
              size={20}
              color={selected ? colors.eco.green[600] : colors.neutral.gray600}
            />
            <Text style={styles.enumOptionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default EnumRangeInput;
