import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 8,
  },
});
