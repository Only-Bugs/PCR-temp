/**
 * @fileoverview Styles for ComparedToAverageCard.
 */

import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  comparisonBox: {
    marginTop: 12,
    backgroundColor: "#E6F6EC",
    padding: 10,
    borderRadius: 8,
  },
  comparison: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.eco.green[600],
    textAlign: "center",
  },
});
