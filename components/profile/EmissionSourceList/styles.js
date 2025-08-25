import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
});
