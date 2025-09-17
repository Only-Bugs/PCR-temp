/**
 * @fileoverview Global context for managing haptic feedback settings.
 * Provides toggle functionality and persists preference in StorageService.
 */

import { createContext, useContext, useEffect, useState } from "react";
import StorageService from "../services/storage";

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
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const HapticsProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(true);

  /** Load haptic preference from StorageService on mount */
  useEffect(() => {
    const loadPreference = async () => {
      const stored = await StorageService.getHapticsEnabled();
      setEnabled(stored);
    };
    loadPreference();
  }, []);

  /**
   * Toggles haptic feedback on/off and saves preference.
   * @async
   * @returns {Promise<void>}
   */
  const toggleHaptics = async () => {
    const newValue = !enabled;
    setEnabled(newValue);
    await StorageService.setHapticsEnabled(newValue);
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
 * @returns {HapticsContextValue}
 */
export const useHaptics = () => useContext(HapticsContext);
