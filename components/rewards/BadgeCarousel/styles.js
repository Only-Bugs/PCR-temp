import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    paddingHorizontal: 16,
    paddingTop: 8,
  },
  badgeWrapper: {
    width: "48%",
    marginBottom: 16,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray300,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.eco.green[600],
  },
});
