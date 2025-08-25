import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: spacing.sm, // 0.5rem → 8px
    backgroundColor: colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 12, // since typography.js defines Tailwind-like strings, direct RN fontSize works here
    marginTop: 4,
  },
});
