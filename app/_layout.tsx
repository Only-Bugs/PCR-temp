/**
 * @fileoverview Root layout for the app.
 * Wraps all pages with GestureHandlerRootView, SafeAreaView, UserProvider, and HapticsProvider.
 */

import { Slot } from "expo-router";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import { HapticsProvider } from "../context/HapticsContext";
import { TrackingProvider } from "../context/TrackingContext";
import { UserProvider } from "../context/UserContext";
import colors from "../theme/colors";
import { toastConfig } from "../utils/toastConfig";

/**
 * RootLayout provides safe area handling and global context.
 *
 * @component
 * @returns {JSX.Element} Root app wrapper with providers.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <HapticsProvider>
          <TrackingProvider>
            {Platform.OS === "android" ? (
              <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
                <Slot />
              </SafeAreaView>
            ) : (
              <SafeAreaView style={styles.container}>
                <Slot />
              </SafeAreaView>
            )}
          </TrackingProvider>
        </HapticsProvider>
      </UserProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  androidSafeArea: {
    paddingTop: 12,
    paddingBottom: 4,
  },
});
