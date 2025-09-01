import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const StepperInput = ({ value = 1, onChange, min = 1 }) => {
  const numericValue = Number(value) || 1;

  const decrease = () => {
    if (numericValue > min) onChange(numericValue - 1);
  };

  const increase = () => {
    onChange(numericValue + 1);
  };

  return (
    <View style={styles.stepperWrapper}>
      <TouchableOpacity
        style={[
          styles.stepperButton,
          numericValue <= min && styles.stepperButtonDisabled,
        ]}
        onPress={decrease}
        disabled={numericValue <= min}
      >
        <Text
          style={[
            styles.stepperButtonText,
            numericValue <= min && styles.stepperButtonTextDisabled,
          ]}
        >
          -
        </Text>
      </TouchableOpacity>

      <Text style={styles.stepperValue}>{numericValue}</Text>

      <TouchableOpacity style={styles.stepperButton} onPress={increase}>
        <Text style={styles.stepperButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepperInput;
