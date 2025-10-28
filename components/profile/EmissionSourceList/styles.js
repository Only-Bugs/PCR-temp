import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  barContainer: {
    width: 60,
    height: 6,
    backgroundColor: colors.neutral.gray200,
    borderRadius: 3,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 3,
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
    minWidth: 60,
    textAlign: "right",
  },
});
