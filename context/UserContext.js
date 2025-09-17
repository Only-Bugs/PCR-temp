/**
 * @fileoverview Global context for managing user data (eco_id, carbonPoints, etc.).
 * Syncs with AsyncStorage via StorageService and provides live updates across the app.
 */

import { createContext, useContext, useEffect, useState } from "react";
import StorageService from "../services/storage";

const UserContext = createContext(null);

/**
 * UserProvider wraps the app and provides user state + updater.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} User context provider.
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * Load user from storage on mount.
   * Ensures a fresh object reference to trigger re-renders.
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
   * Always spreads into a new object reference to trigger reactivity.
   *
   * @param {object} newUser - Updated user object.
   * @returns {Promise<void>}
   */
  const updateUser = async (newUser) => {
    setUser({ ...newUser });
    await StorageService.setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook to access user data and updater.
 *
 * @returns {{ user: object|null, updateUser: function }} User state and updater.
 */
export const useUser = () => useContext(UserContext);
