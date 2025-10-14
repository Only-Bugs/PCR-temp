import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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

/**
 * @component SelectEnumInput
 * @description Dropdown selector for select_enum questions with instant close and bounce animation.
 *
 * @param {Object} props
 * @param {string} props.value - Current selected value
 * @param {Function} props.onChange - Callback when a value is selected
 * @param {string[]} props.options - List of available options
 * @param {Record<string, string>} [props.optionDetails] - Optional map of option
 * descriptions keyed by option value (case-insensitive).
 */
const SelectEnumInput = ({
  value,
  onChange,
  options = [],
  optionDetails,
}) => {
  const [visible, setVisible] = useState(false);
  const scaleY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleY, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }).start();
    } else {
      scaleY.setValue(0);
    }
  }, [visible]);

  const handleSelect = (option) => {
    // ✅ update value immediately
    onChange(option);

    // ✅ close dropdown right away
    setVisible(false);

    // still play bounce collapse for polish (even if modal disappears fast)
    Animated.spring(scaleY, {
      toValue: 0,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.selectBoxText}>
          {value ? getDisplayLabel(value, optionDetails) : "Select an option"}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[styles.dropdownContent, { transform: [{ scaleY }] }]}
            >
              <FlatList
                data={options}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => {
                  const selected = item === value;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.dropdownOption,
                        selected && styles.dropdownOptionSelected,
                      ]}
                      onPress={() => handleSelect(item)}
                    >
                      <Text
                        style={[
                          styles.dropdownOptionText,
                          selected && styles.dropdownOptionTextSelected,
                        ]}
                      >
                        {getDisplayLabel(item, optionDetails)}
                      </Text>
                      {selected && (
                        <MaterialIcons
                          name="check"
                          size={20}
                          color={colors.eco.green[600]}
                          style={styles.checkIcon}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SelectEnumInput;
