import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const RangeSwitch = ({ value, onChange }) => {
  const handlePress = (newValue) => {
    if (onChange && newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      {/* 7D Button */}
      <TouchableOpacity
        style={[styles.button, value === "7D" && styles.buttonActive]}
        onPress={() => handlePress("7D")}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Show past 7 days"
        accessibilityState={{ selected: value === "7D" }}
        activeOpacity={0.7}
      >
        <Text style={[styles.label, value === "7D" && styles.labelActive]}>
          7D
        </Text>
      </TouchableOpacity>

      {/* 30D Button */}
      <TouchableOpacity
        style={[styles.button, value === "30D" && styles.buttonActive]}
        onPress={() => handlePress("30D")}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Show past 30 days"
        accessibilityState={{ selected: value === "30D" }}
        activeOpacity={0.7}
      >
        <Text style={[styles.label, value === "30D" && styles.labelActive]}>
          30D
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RangeSwitch;