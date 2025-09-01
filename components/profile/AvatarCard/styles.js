import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    backgroundColor: colors.neutral.white,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.neutral.gray900,
    marginTop: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    color: colors.neutral.gray600,
    lineHeight: 20,
  },
});
