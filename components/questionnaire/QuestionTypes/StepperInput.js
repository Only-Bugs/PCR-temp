import { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const StepperInput = ({ value, onChange, min = 1 }) => {
  const fallback = Number.isFinite(Number(min)) ? Number(min) : 0;
  const hasValue = value !== null && value !== undefined && value !== "";
  const parsedValue = Number(value);
  const numericValue =
    hasValue && Number.isFinite(parsedValue) ? parsedValue : fallback;
  const isDecrementDisabled = numericValue <= fallback;
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!hasValue && typeof onChangeRef.current === "function") {
      onChangeRef.current(fallback);
    }
  }, [fallback, hasValue]);

  const decrease = () => {
    if (isDecrementDisabled) return;
    onChange(numericValue - 1);
  };

  const increase = () => {
    onChange(numericValue + 1);
  };

  return (
    <View style={styles.stepperWrapper}>
      <TouchableOpacity
        style={[
          styles.stepperButton,
          isDecrementDisabled && styles.stepperButtonDisabled,
        ]}
        onPress={decrease}
        disabled={isDecrementDisabled}
      >
        <Text
          style={[
            styles.stepperButtonText,
            isDecrementDisabled && styles.stepperButtonTextDisabled,
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
