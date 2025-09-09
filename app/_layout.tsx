/**
 * @fileoverview Root layout for the app.
 * Wraps all pages with GestureHandlerRootView, SafeAreaView, and HapticsProvider.
 */

import { Slot } from "expo-router";
import Toast from "react-native-toast-message";

import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HapticsProvider } from "../context/HapticsContext";
import colors from "../theme/colors";

/**
 * RootLayout provides safe area handling and global context.
 *
 * @component
 * @returns {JSX.Element} Root app wrapper with providers.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HapticsProvider>
        {Platform.OS === "android" ? (
          <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
            <Slot />
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.container}>
            <Slot />
          </SafeAreaView>
        )}
      </HapticsProvider>
      <Toast />
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
