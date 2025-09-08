import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

/**
 * @constant {object} styles
 * @description Style definitions for OnboardingHeader layout and elements.
 */
export default StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  backButton: {
    position: "absolute",
    left: 16,
    top: 12,
    zIndex: 2,
  },

  skipButton: {
    position: "absolute",
    right: 16,
    top: 12,
    zIndex: 2,
  },

  skipText: {
    color: colors.eco.blue,
    fontSize: 14,
    fontWeight: "500",
  },

  progressContainer: {
    width: "70%",
    alignItems: "center",
  },

  stepText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    textAlign: "center",
  },
});
