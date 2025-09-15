/**
 * @fileoverview Styles for SignInPage.
 */

import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.eco.green[700],
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: colors.error,
    marginBottom: 12,
    textAlign: "center",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: colors.eco.green[600],
    fontWeight: "600",
  },
});
