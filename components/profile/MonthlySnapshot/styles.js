import { Platform, StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 6,
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
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: colors.neutral.gray50,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
  },
  totalSection: {
    marginBottom: 16,
    paddingVertical: 6,
  },

  totalLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  totalValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.eco.green[500],
  },
});
