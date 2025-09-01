/**
 * @fileoverview Styles for CTAButton component.
 */

import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

/**
 * @constant {object} styles
 * @description Style definitions for CTAButton states.
 */
export default StyleSheet.create({
  buttonWrapper: {
    width: "100%",
  },

  gradientButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  gradientButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.neutral.white,
  },

  defaultButton: {
    backgroundColor: colors.eco.green[500],
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  defaultButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.neutral.white,
  },

  outlineButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: colors.neutral.white,
  },

  outlineButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
