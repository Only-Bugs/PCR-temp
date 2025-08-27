import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#2E7D32", // fallback, ideally use colors.successDark
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 8,
  },
  badge: {
    backgroundColor: "#FFA726",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "white",
    opacity: 0.85,
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: "white",
    opacity: 0.85,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  rewardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "white",
  },
});
