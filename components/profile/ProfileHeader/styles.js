import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  subText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  notification: {
    position: "relative",
    padding: 8,
  },
  bell: {
    fontSize: 20,
  },
  badge: {
    position: "absolute",
    right: 6,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
});
