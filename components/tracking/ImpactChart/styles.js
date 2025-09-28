import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: colors.eco.green[50],
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
  },
  chartWrapper: {
    width: "100%",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metric: {
    flex: 1,
    paddingRight: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  metricValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  metricValueWarning: {
    color: colors.warning,
  },
  chartArea: {
    width: "100%",
    height: 168,
    borderRadius: 16,
    backgroundColor: colors.neutral.gray50,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    justifyContent: "center",
    overflow: "hidden",
  },
  labelsRow: {
    position: "relative",
    height: 56,
    marginTop: 12,
    alignSelf: "center",
  },
  valueLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.eco.green[600],
  },
  dayLabel: {
    fontSize: 11,
    marginTop: 4,
    color: colors.textSecondary,
    transform: [{ rotate: "-28deg" }],
  },
  axisLabel: {
    position: "absolute",
    width: 60,
    alignItems: "center",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 18,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginTop: 8,
  },
  legendBullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendBulletDaily: {
    backgroundColor: colors.eco.green[500],
  },
  legendLine: {
    width: 28,
    height: 0,
    borderBottomWidth: 2,
    marginRight: 8,
  },
  legendLineTrend: {
    borderStyle: "solid",
    borderBottomColor: colors.eco.green[600],
  },
  legendLineBaseline: {
    borderStyle: "solid",
    borderBottomColor: colors.neutral.gray300,
  },
  legendLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
  },
  emptyBaseline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
    width: "100%",
  },
  emptyColumn: {
    alignItems: "center",
    flex: 1,
  },
  emptyIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray200,
    marginBottom: 8,
  },
  emptyDay: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
