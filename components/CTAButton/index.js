/**
 * @fileoverview CTAButton component for primary actions.
 * Supports gradient (enabled) and outline (disabled) states.
 */

import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import styles from "./styles";

/**
 * @component CTAButton
 * @param {Object} props - Component props
 * @param {string} props.label - Text displayed inside the button
 * @param {Function} props.onPress - Callback when button is pressed
 * @param {boolean} [props.disabled=false] - If true, button is non-interactive
 * @param {string} [props.variant="gradient"] - Button style variant
 * @returns {JSX.Element}
 */
const CTAButton = ({
  label,
  onPress,
  disabled = false,
  variant = "gradient",
}) => {
  if (disabled) {
    const outlineStyles =
      variant === "gradient"
        ? {
            borderColor: colors.eco.purple,
            textColor: colors.eco.purple,
          }
        : {
            borderColor: colors.eco.green[500],
            textColor: colors.eco.green[500],
          };

    return (
      <TouchableOpacity
        style={[
          styles.outlineButton,
          { borderColor: outlineStyles.borderColor },
        ]}
        disabled
      >
        <Text
          style={[styles.outlineButtonText, { color: outlineStyles.textColor }]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  if (variant === "gradient") {
    return (
      <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
        <LinearGradient
          colors={[colors.eco.purple, colors.eco.blue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.gradientButtonText}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.defaultButton}>
      <Text style={styles.defaultButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CTAButton;
