import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import styles from "./styles";

const NotificationBell = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.notification}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name="notifications-none"
        size={24}
        color={colors.neutral.gray900}
      />
      <View style={styles.badge} />
    </TouchableOpacity>
  );
};

export default NotificationBell;
