import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import layout from "../../../theme/layout";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: layout.cardSpacing,
    marginBottom: layout.cardSpacing,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: layout.cardSpacing,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.success,
    marginBottom: 4,
  },
  edit: {
    fontSize: 14,
    color: colors.eco.blue,
    fontWeight: "500",
  },
});
