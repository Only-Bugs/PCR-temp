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
  // EnumRangeInput styles
  enumContainer: {
    marginTop: 12,
  },
  enumOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  enumOptionText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.textPrimary,
  },

  // SelectEnumInput styles

  modalContent: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    maxHeight: "60%",
  },
  modalOptionRow: {
    paddingVertical: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
    borderRadius: 8,
    marginTop: 12,
  },
  selectBoxText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContent: {
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    width: "80%",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  dropdownOptionSelected: {
    backgroundColor: colors.eco.green[50],
    borderRadius: 6,
  },

  dropdownOptionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  dropdownOptionTextSelected: {
    color: colors.eco.green[700],
    fontWeight: "600",
  },

  checkIcon: {
    marginLeft: 8,
  },
});

export default styles;
