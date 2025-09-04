/**
 * @fileoverview Styles for CTAButton component.
 */

import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

/**
 * CTAButton styles.
 */
export default StyleSheet.create({
  baseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  filledButton: {
    backgroundColor: colors.eco.green[600],
  },
  outlineButton: {
    backgroundColor: colors.neutral.white,
    borderWidth: 2,
    borderColor: colors.eco.green[600],
  },
  disabledButton: {
    opacity: 0.5,
  },
  baseText: {
    fontSize: 16,
    fontWeight: "600",
  },
  filledText: {
    color: colors.neutral.white,
  },
  outlineText: {
    color: colors.eco.green[600],
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
