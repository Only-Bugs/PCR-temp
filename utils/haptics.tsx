// src/utils/Haptics.js or Haptics.ts

import * as Haptics from "expo-haptics";
import { useHaptics } from "../context/HapticsContext";

type HapticsUtils = {
  hapticPress: () => Promise<void>,
  hapticSuccess: () => Promise<void>,
  hapticError: () => Promise<void>,
};

/**
 * Hook exposing haptic utility functions.
 * Functions will no-op if haptics are disabled in context.
 *
 * @returns {HapticsUtils} Object containing haptic functions
 */
export const useHapticsUtils = (): HapticsUtils => {
  const { enabled } = useHaptics();

  const hapticPress = async () => {
    if (!enabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const hapticSuccess = async () => {
    if (!enabled) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const hapticError = async () => {
    if (!enabled) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  return { hapticPress, hapticSuccess, hapticError };
};
