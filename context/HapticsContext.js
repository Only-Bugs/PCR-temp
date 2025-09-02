/**
 * @fileoverview Global context for managing haptic feedback settings.
 * Provides toggle functionality and persists preference in AsyncStorage.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {Object} HapticsContextValue
 * @property {boolean} enabled - Whether haptics are currently enabled.
 * @property {Function} toggleHaptics - Toggles haptic feedback on/off.
 */

/** @type {React.Context<HapticsContextValue>} */
const HapticsContext = createContext();

/**
 * HapticsProvider component wraps the app and provides haptic settings.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} Haptics context provider.
 */
export const HapticsProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(true);

  /** Load haptic preference from AsyncStorage on mount */
  useEffect(() => {
    AsyncStorage.getItem("hapticsEnabled").then((value) => {
      if (value !== null) setEnabled(value === "true");
    });
  }, []);

  /**
   * Toggles haptic feedback on/off and saves preference.
   * @async
   * @returns {Promise<void>}
   */
  const toggleHaptics = async () => {
    const newValue = !enabled;
    setEnabled(newValue);
    await AsyncStorage.setItem("hapticsEnabled", String(newValue));
  };

  return (
    <HapticsContext.Provider value={{ enabled, toggleHaptics }}>
      {children}
    </HapticsContext.Provider>
  );
};

/**
 * Hook to access haptic feedback settings and toggle function.
 *
 * @returns {HapticsContextValue} Current haptics state and toggle handler.
 */
export const useHaptics = () => useContext(HapticsContext);
