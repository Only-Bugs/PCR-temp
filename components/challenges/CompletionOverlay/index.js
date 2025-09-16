// import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const CompletionOverlay = ({ visible, points = 0, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 2000); // auto close after 2s
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* <LottieView
        source={require("../../../assets/animations/swipe-right.json")}
        autoPlay
        loop={false}
        style={{ width: 120, height: 120 }}
      /> */}
      <Text style={styles.text}>
        🎉 Congratulations! You earned +{points} points
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#22C55E",
  },
});

export default CompletionOverlay;
