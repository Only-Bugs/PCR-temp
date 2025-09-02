/**
 * @fileoverview Styles for PageHeader component.
 */

import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

/**
 * Styles for PageHeader layout, title, and actions.
 */
export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.neutral.white,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
});
