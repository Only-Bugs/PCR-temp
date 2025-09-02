/**
 * @fileoverview Styles for UserInfoCard component.
 */

import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textWrapper: {
    flexDirection: "column",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ecoIdWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 44,
    justifyContent: "space-between",
  },
  ecoIdText: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  copyButton: {
    backgroundColor: colors.eco.green[600],
    borderRadius: 6,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
