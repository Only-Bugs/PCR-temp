import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceLight,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.successLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  tree: {
    fontSize: 64,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.success,
    marginBottom: 6,
  },
  message: {
    fontSize: 13,
    textAlign: "center",
    color: colors.textSecondary,
  },
});
