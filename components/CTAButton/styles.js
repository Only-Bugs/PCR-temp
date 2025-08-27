import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({
  button: {
    padding: 16,
    marginVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  // Primary (solid green)
  primary: {
    backgroundColor: colors.eco.green[600],
  },
  primaryText: {
    color: colors.neutral.white,
  },

  // Outline (white background, green border)
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.eco.green[600],
    borderRadius: 20, // pill shape
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  outlineText: {
    color: colors.eco.green[600],
    fontWeight: "600",
  },

  // OutlineLight (transparent, white border → for dark/colored backgrounds)
  outlineLight: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.neutral.white,
  },
  outlineLightText: {
    color: colors.neutral.white,
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
  },
});
