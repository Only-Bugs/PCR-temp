import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.gray100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  text: {
    color: colors.textSecondary,
  },
});
