import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textPrimary,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
});
