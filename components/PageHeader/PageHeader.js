/**
 * @fileoverview PageHeader component.
 * Displays a title, notification icon, and an optional settings icon.
 */

import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import { useHapticsUtils } from "../../utils/haptics";
import styles from "./styles";

const PageHeader = ({
  title,
  onNotificationPress,
  onSettingsPress,
  showSettings = false,
}) => {
  const { hapticPress } = useHapticsUtils();

  const handleNotification = async () => {
    try {
      await hapticPress();
    } catch {
      console.log("[PageHeader] haptics skipped (notification)");
    }
    onNotificationPress?.();
  };

  const handleSettings = async () => {
    try {
      await hapticPress();
    } catch {
      console.log("[PageHeader] haptics skipped (settings)");
    }
    onSettingsPress?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleNotification}
          style={styles.iconButton}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        {showSettings && (
          <TouchableOpacity onPress={handleSettings} style={styles.iconButton}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PageHeader;
