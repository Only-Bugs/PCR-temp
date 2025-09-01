import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    marginVertical: 12,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.neutral.white,
  },
  stepperWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },

  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 22, // circle
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral.white, // outline version = white background
    borderWidth: 2,
    borderColor: colors.eco.green[500],
  },

  stepperButtonText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.eco.green[500], // green text
  },

  stepperButtonDisabled: {
    borderColor: colors.neutral.gray300, // gray border when disabled
    backgroundColor: colors.neutral.white,
  },

  stepperButtonTextDisabled: {
    color: colors.neutral.gray400, // gray text when disabled
  },

  stepperValue: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  boolWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
    gap: 16, // space between Yes/No buttons
  },

  boolButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#22c55e", // eco.green[500]
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  boolButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#22c55e", // eco.green[500]
  },

  // ✅ Selected styles
  boolButtonSelected: {
    backgroundColor: "#22c55e", // eco.green[500]
  },

  boolButtonTextSelected: {
    color: "#ffffff",
  },
});

export default styles;
