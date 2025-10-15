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
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: colors.neutral.white,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  shareChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(34, 197, 94, 0.12)",
  },
  shareText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.eco.green[600],
    marginLeft: 6,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  pointsContainer: {
    flex: 1,
  },
  value: { fontSize: 34, fontWeight: "700", color: colors.textPrimary },
  pointsLabel: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
  avatarColumn: {
    alignItems: "center",
  },
  stageBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.neutral.white,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 6,
  },
  stageBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  stageDetails: {
    alignItems: "center",
    marginTop: 8,
  },
  stageSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: colors.neutral.gray50,
  },
  infoIcon: { marginRight: 8 },
  infoText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  progressMessage: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },
});

export default { base, carbon };
