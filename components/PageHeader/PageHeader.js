/**
 * @fileoverview PageHeader component.
 * Displays a title and an optional settings icon.
 */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import layout from "../../theme/layout";
import { useHapticsUtils } from "../../utils/haptics";
import styles from "./styles";

const PageHeader = ({
  title,
  onSettingsPress,
  showSettings = false,
  showBack = false,
  onBackPress,
}) => {
  const { hapticPress } = useHapticsUtils();
  const router = useRouter();

  const handleSettings = async () => {
    try {
      await hapticPress();
    } catch {
      console.log("[PageHeader] haptics skipped (settings)");
    }
    onSettingsPress?.();
  };

  const handleBack = async () => {
    try {
      await hapticPress();
    } catch {
      console.log("[PageHeader] haptics skipped (back)");
    }
    if (onBackPress) {
      onBackPress();
      return;
    }
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leading}>
        {showBack ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={handleBack}
            hitSlop={layout.hitSlop}
            style={[styles.iconButton, styles.backButton]}
          >
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : null}
        <Text
          style={[styles.title, showBack && styles.titleWithBack]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
      <View style={styles.actions}>
        {showSettings && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            accessibilityHint="Takes you to profile settings"
            onPress={handleSettings}
            hitSlop={layout.hitSlop}
            style={styles.iconButton}
          >
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
