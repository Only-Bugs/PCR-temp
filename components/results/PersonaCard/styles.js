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
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    backgroundColor: "#E6F6EC",
    borderRadius: 50,
    padding: 20,
  },
  persona: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
});
