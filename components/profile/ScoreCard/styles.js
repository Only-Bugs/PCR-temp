import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  baselineCard: {
    backgroundColor: "#E6F7EE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary, // not green
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.success, // ✅ green
  },
  unit: {
    fontSize: 13,
    color: colors.textSecondary, // ✅ muted gray
  },
  subText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  change: {
    fontSize: 13,
    color: colors.success,
    marginLeft: 4,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "500",
    color: colors.purple,
  },
});
