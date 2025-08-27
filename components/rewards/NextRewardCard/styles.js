import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.gray100,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  text: {
    color: colors.textSecondary,
  },
});
