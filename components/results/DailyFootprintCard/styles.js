import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: "center",
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.eco.green[600],
    textAlign: "center",
  },
  unit: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
});
