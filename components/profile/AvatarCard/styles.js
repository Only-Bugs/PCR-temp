import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  treeImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusPill: {
    position: "absolute",
    bottom: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.success,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 13,
    textAlign: "center",
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
