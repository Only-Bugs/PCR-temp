import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.gray100,
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.eco.green[600],
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
