import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.eco.green[50],
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconWrapper: {
    backgroundColor: colors.eco.green[100],
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 4,
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  brand: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.eco.green[600],
    marginBottom: 40,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: colors.eco.purple,
  },
  signInText: {
    color: colors.neutral.white,
    fontWeight: "600",
    fontSize: 16,
  },
  newUserButton: {
    backgroundColor: colors.eco.green[500],
  },
  newUserText: {
    color: colors.neutral.white,
    fontWeight: "600",
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: colors.neutral.gray100,
    borderRadius: 12,
    padding: 12,
    marginTop: 40,
    width: "100%",
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
