import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import layout from "../../../theme/layout";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.eco.green[50], // ✅ light green tint background
    borderRadius: 16,
    padding: layout.cardSpacing,
    marginTop: layout.sectionSpacing,
    shadowColor: "#000",
    shadowOpacity: 0.04, // ✅ subtle shadow
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
    color: colors.textPrimary,
  },
  total: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.eco.green[600],
    textAlign: "center",
  },
  baseline: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 18,
  },
  progressBox: {
    flexDirection: "row",
    alignItems: "flex-start", // ✅ align icon to text top
    backgroundColor: colors.neutral.white, // ✅ subtle white card
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  icon: {
    marginRight: 8,
    marginTop: 2, // ✅ aligns icon with text
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "600", // ✅ medium-bold (not too heavy)
    marginBottom: 2,
    color: colors.textPrimary,
  },
  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
