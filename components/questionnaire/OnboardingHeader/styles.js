import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

/**
 * @constant {object} styles
 * @description Style definitions for OnboardingHeader layout and elements.
 */
export default StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral.white,
  },

  sideSlot: {
    width: 96,
    alignItems: "flex-start",
  },

  rightSlot: {
    alignItems: "flex-end",
  },

  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
    shadowColor: colors.neutral.gray900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  progressContainer: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },

  stepText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    textAlign: "center",
  },

  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(34, 197, 94, 0.14)",
    shadowColor: colors.eco.green[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  skipText: {
    color: colors.eco.green[600],
    fontSize: 15,
    fontWeight: "600",
  },

  skipIcon: {
    marginLeft: 4,
    marginTop: 1,
  },
});
