import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useHapticsUtils } from "../../utils/haptics";
import styles from "./styles";

/**
 * CTAButton component for primary actions.
 *
 * @param {Object} props
 * @param {string} props.label - Text inside the button.
 * @param {Function} props.onPress - Press handler.
 * @param {boolean} [props.disabled=false] - Disable interaction.
 * @param {"filled"|"outline"} [props.variant="filled"] - Visual style.
 * @param {JSX.Element} [props.iconLeft] - Optional left icon.
 * @param {JSX.Element} [props.iconRight] - Optional right icon.
 * @param {boolean} [props.loading=false] - Show spinner instead of text.
 */
const CTAButton = ({
  label = "",
  onPress,
  disabled = false,
  variant = "filled",
  iconLeft,
  iconRight,
  loading = false,
}) => {
  const { hapticPress } = useHapticsUtils();

  const handlePress = async () => {
    if (loading || disabled) return;
    await hapticPress();
    onPress?.();
  };

  const isFilled = variant === "filled";

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.baseButton,
        isFilled ? styles.filledButton : styles.outlineButton,
        (disabled || loading) && styles.disabledButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isFilled ? "white" : styles.outlineText.color}
        />
      ) : (
        <>
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          <Text
            style={[
              styles.baseText,
              isFilled ? styles.filledText : styles.outlineText,
            ]}
          >
            {label}
          </Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CTAButton;
