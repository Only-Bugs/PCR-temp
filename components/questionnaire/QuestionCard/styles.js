/**
 * @fileoverview Styles for QuestionCard component.
 */

import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

/**
 * @constant {object} styles
 * @description Style definitions for QuestionCard layout and elements.
 */
export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    alignItems: "center",
    marginBottom: 16,
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  question: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 20,
  },

  hintRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },

  hintText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6b7280",
    marginLeft: 4,
    flex: 1,
    textAlign: "left",
  },
});
