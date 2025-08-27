import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.eco.blue,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: colors.neutral.white,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.neutral.gray100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.neutral.gray900,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: colors.neutral.gray600,
    marginBottom: 16,
  },
});
