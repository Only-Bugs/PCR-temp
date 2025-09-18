/**
 * @fileoverview Global context for managing user data (eco_id, carbonPoints, snapshots, etc.).
 * Syncs with AsyncStorage via StorageService and provides live updates across the app.
 */

import { createContext, useContext, useEffect, useState } from "react";
import StorageService from "../services/storage";

const UserContext = createContext(null);

/**
 * UserProvider wraps the app and provides user state + updater methods.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} User context provider.
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * Load user from storage on mount.
   */
  useEffect(() => {
    const loadUser = async () => {
      const stored = await StorageService.getUser();
      if (stored) setUser({ ...stored });
    };
    loadUser();
  }, []);

  /**
   * Update user both in memory (context) and storage.
   *
   * @param {object} newUser - Updated user object.
   * @returns {Promise<void>}
   */
  const updateUser = async (newUser) => {
    setUser({ ...newUser });
    await StorageService.setUser(newUser);
  };

  /**
   * Set carbon points value.
   *
   * @param {number} points - New carbon points value.
   * @returns {Promise<void>}
   */
  const setCarbonPoints = async (points) => {
    if (!user) return;
    const updated = { ...user, carbonPoints: points };
    setUser(updated);
    await StorageService.setCarbonPoints(points);
  };

  /**
   * Set monthly snapshot data.
   *
   * @param {any} snapshot - Snapshot data object.
   * @returns {Promise<void>}
   */
  const setMonthlySnapshot = async (snapshot) => {
    if (!user) return;
    await StorageService.setMonthlySnapshot(snapshot);
  };

  /**
   * Get monthly snapshot data.
   *
   * @returns {Promise<any|null>} Monthly snapshot data or null.
   */
  const getMonthlySnapshot = async () => {
    return await StorageService.getMonthlySnapshot();
  };

  /**
   * Reset user completely (logout).
   *
   * @returns {Promise<void>}
   */
  const resetUser = async () => {
    setUser(null);
    await StorageService.clearUserData();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        setCarbonPoints,
        setMonthlySnapshot,
        getMonthlySnapshot,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook to access user data and updater methods.
 *
 * @returns {object} User state and updater functions.
 */
export const useUser = () => useContext(UserContext);
