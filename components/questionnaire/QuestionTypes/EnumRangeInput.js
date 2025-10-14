/**
 * @fileoverview EnumRangeInput component.
 * Renders a list of radio-style options for enum_range questions.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const normalizeToUpper = (option) => {
  if (typeof option !== "string") return option;
  return option.toUpperCase();
};

const getDisplayLabel = (option, optionDetails) => {
  if (typeof option !== "string") return option;
  const normalizedKey = option.toLowerCase();
  const detail =
    optionDetails?.[option] ??
    (typeof optionDetails?.[normalizedKey] === "string"
      ? optionDetails[normalizedKey]
      : undefined);
  const label = normalizeToUpper(option);
  if (!detail) return label;
  const detailLabel =
    typeof detail === "string" ? detail.toUpperCase() : String(detail).toUpperCase();
  return `${label} (${detailLabel})`;
};

const EnumRangeInput = ({ value, onChange, options = [], optionDetails }) => {
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
            <Text style={styles.enumOptionText}>
              {getDisplayLabel(option, optionDetails)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default EnumRangeInput;
