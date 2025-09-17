import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

/**
 * CompletionOverlay
 *
 * Inline celebration banner for completed challenges.
 * Shows animation on the left and points text on the right.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Whether the overlay is visible
 * @param {number} props.points - Points earned
 * @param {() => void} props.onClose - Callback when animation finishes
 * @returns {JSX.Element|null}
 */
const CompletionOverlay = ({ visible, points = 0, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/confetti.json")}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={() => onClose?.()}
      />
      <Text style={styles.text}> + {points} points!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row", // animation left, text right
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.95)",
    marginTop: 8,
  },
  animation: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#22C55E",
    flexShrink: 1,
  },
});

export default CompletionOverlay;
