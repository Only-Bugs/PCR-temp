import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  banner: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: colors.neutral.white,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 13,
    color: colors.neutral.gray50,
  },
});
