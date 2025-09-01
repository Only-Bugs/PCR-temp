import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  // Variants
  primary: {
    backgroundColor: colors.eco.green[600],
  },
  primaryText: {
    color: colors.neutral.white,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.eco.green[600],
    backgroundColor: "transparent",
  },
  outlineText: {
    color: colors.eco.green[600],
  },
  gradient: {
    borderRadius: 12,
  },
  // Full-width wrapper for gradient
  fullWidth: {
    width: "100%",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
