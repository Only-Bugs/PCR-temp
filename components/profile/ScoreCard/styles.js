import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  progress: {
    height: 8,
    borderRadius: 4,
  },
  circleContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  circle: {
    width: 80,
    height: 80,
    borderWidth: 6,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
});
