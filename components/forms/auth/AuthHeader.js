import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

/**
 * AuthHeader component
 * Shows back button on the left and a centered leaf icon.
 */
const AuthHeader = ({ onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Center Icon */}
      <Ionicons name="leaf-outline" size={32} color={colors.eco.green[600]} />

      {/* Spacer to balance layout */}
      <View style={{ width: 24 }} />
    </View>
  );
};

export default AuthHeader;
