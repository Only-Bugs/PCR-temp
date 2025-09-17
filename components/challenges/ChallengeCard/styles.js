import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  // Left column (tick + title)
  leftColumn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.neutral.gray900,
    flexShrink: 1,
  },

  tickCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(34,197,94,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  tickCircleCompleted: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },

  rightColumn: {
    width: 100,
    alignItems: "flex-end",
  },

  infoWrapper: {
    marginBottom: 4,
  },

  progressContainer: {
    width: "100%",
    alignItems: "flex-end",
  },

  progressText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.neutral.gray600,
    marginBottom: 4,
    textAlign: "right",
  },

  completionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  completionText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#22C55E",
    textAlign: "center",
  },
});
