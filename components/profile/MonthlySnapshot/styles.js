import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: colors.error,
    marginBottom: 8,
  },
  achievement: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  tip: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: "italic",
  },
  badge: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 8,
  },
});
