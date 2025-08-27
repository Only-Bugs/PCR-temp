import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
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
    color: colors.textPrimary,
  },
  performanceBox: {
    backgroundColor: colors.successTint,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  performanceTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  performanceSub: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  performanceRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  performanceChange: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.success,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    marginBottom: 8,
  },
  sourceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sourceLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textPrimary,
  },
  sourceValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  tipBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.infoTint,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
  },
  badgeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purpleTint,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  badgeText: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textPrimary,
    flex: 1,
  },
  highlight: {
    fontWeight: "700",
    color: colors.purple,
  },
});
