/**
 * @fileoverview EnumRangeInput component.
 * Renders a list of radio-style options for enum_range questions.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const isAllCaps = (value) =>
  typeof value === "string" && value === value.toUpperCase();

const isAllLowerCase = (value) =>
  typeof value === "string" && value === value.toLowerCase();

const capitalizeFirstLetter = (value) => {
  if (!value) return value;
  const lowerValue = value.toLowerCase();
  return lowerValue.charAt(0).toUpperCase() + lowerValue.slice(1);
};

const formatOptionLabel = (option) => {
  if (typeof option !== "string") return option;
  const trimmed = option.trim();
  if (!trimmed) return trimmed;
  if (isAllCaps(trimmed) || isAllLowerCase(trimmed)) {
    return capitalizeFirstLetter(trimmed);
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

const getDisplayLabel = (option, optionDetails) => {
  if (typeof option !== "string") return option;
  const normalizedKey = option.toLowerCase();
  const detail =
    optionDetails?.[option] ??
    (typeof optionDetails?.[normalizedKey] === "string"
      ? optionDetails[normalizedKey]
      : undefined);
  const label = formatOptionLabel(option);
  if (!detail) return label;
  const detailLabel =
    typeof detail === "string" ? detail : String(detail);
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
