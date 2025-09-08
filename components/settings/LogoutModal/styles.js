import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: colors.textPrimary,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  ecoIdBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  ecoIdValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  copyHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emailIconWrapper: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.eco.green[50],
    justifyContent: "center",
    alignItems: "center",
  },
  noEcoId: {
    fontSize: 14,
    color: colors.error,
    marginBottom: 16,
    textAlign: "center",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: colors.textPrimary,
  },
  modalActions: {
    marginTop: 20,
  },
  confirmBtn: {
    backgroundColor: "#DC2626",
  },
});
