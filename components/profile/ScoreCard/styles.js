import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

const base = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  left: { flex: 1 },
  right: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  value: { fontSize: 28, fontWeight: "700", color: colors.textPrimary },
  unit: { fontSize: 13, color: colors.textSecondary },
  subText: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  changeRow: { flexDirection: "row", alignItems: "center" },
  change: { fontSize: 12, marginLeft: 4, color: colors.textPrimary },
});

const carbon = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    backgroundColor: colors.neutral.white,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray100,
  },
  pointsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  value: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.textPrimary,
    lineHeight: 48,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginTop: 4,
  },
  stageBadge: {
    backgroundColor: colors.eco.green[600],
    paddingHorizontal: 6, // Reduced from 8
    paddingVertical: 3, // Reduced from 4
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.neutral.white,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  stageBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.neutral.white,
    letterSpacing: 0.5,
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  levelTextContainer: {
    alignItems: "center",
  },
  levelText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.eco.green[700],
  },
  levelSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.neutral.gray400, // Lighter grey
    marginTop: 2,
  },
  rewardHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.eco.green[50],
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.eco.green[700],
    marginLeft: 6,
  },
});

export default { base, carbon };
