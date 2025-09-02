/**
 * @fileoverview Centralized haptic feedback utility functions.
 * Uses HapticsContext to respect user settings.
 */

import * as Haptics from "expo-haptics";
import { useHaptics } from "../context/HapticsContext";

/**
 * Hook exposing haptic utility functions.
 * Functions will no-op if haptics are disabled in context.
 *
 * @returns {Object} Haptic utility functions.
 * @returns {Function} return.hapticPress - Medium impact press feedback.
 * @returns {Function} return.hapticSuccess - Success notification feedback.
 * @returns {Function} return.hapticError - Error notification feedback.
 */
export const useHapticsUtils = () => {
  const { enabled } = useHaptics();

  /**
   * Fires medium impact haptic feedback (e.g., button press).
   * @async
   * @returns {Promise<void>}
   */
  const hapticPress = async () => {
    if (!enabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  /**
   * Fires success notification haptic (e.g., onboarding completed).
   * @async
   * @returns {Promise<void>}
   */
  const hapticSuccess = async () => {
    if (!enabled) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  /**
   * Fires error notification haptic (e.g., form validation failed).
   * @async
   * @returns {Promise<void>}
   */
  const hapticError = async () => {
    if (!enabled) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  return { hapticPress, hapticSuccess, hapticError };
};
