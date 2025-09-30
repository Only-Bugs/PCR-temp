import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.neutral.gray200,
    borderRadius: 8,
    padding: 2,
    height: 32,
    width: 100,
    alignSelf: "flex-end",
    marginTop: 6,
  },
  button: {
    flex: 1,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  buttonActive: {
    backgroundColor: colors.eco.green[600],
    shadowColor: colors.eco.green[600],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    includeFontPadding: false,
    textAlign: "center",
  },
  labelActive: {
    color: colors.neutral.white,
    fontWeight: "700",
  },
});