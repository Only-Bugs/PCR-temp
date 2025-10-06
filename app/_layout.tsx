import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

import { HapticsProvider } from "../context/HapticsContext";
import { TrackingProvider } from "../context/TrackingContext";
import { UserProvider } from "../context/UserContext";
import { getSeenIntro } from "../lib/storage/firstRun";
import colors from "../theme/colors";
import { toastConfig } from "../utils/toastConfig";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const evaluateIntroState = async () => {
      try {
        const hasSeenIntro = await getSeenIntro();
        if (!isMounted) {
          return;
        }

        const isIntroRoute = segments?.[0] === "(intro)";

        if (hasSeenIntro && isIntroRoute) {
          setReady(false);
          router.replace("/");
          return;
        }

        if (!hasSeenIntro && !isIntroRoute) {
          setReady(false);
          router.replace("/(intro)/intro");
          return;
        }

        setReady(true);
      } catch (error) {
        if (__DEV__) {
          console.warn("[RootLayout] intro guard failed", error);
        }
        if (isMounted) {
          setReady(true);
        }
      }
    };

    evaluateIntroState();

    return () => {
      isMounted = false;
    };
  }, [segments, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          style="dark"
          backgroundColor={colors.background}
          translucent={false}
        />
        <UserProvider>
          <HapticsProvider>
            <TrackingProvider>
              <SafeAreaView style={styles.safeAreaShell} edges={EDGES}>
                <View style={styles.container}>
                  {ready ? <Slot /> : null}
                </View>
              </SafeAreaView>
            </TrackingProvider>
          </HapticsProvider>
        </UserProvider>
      </SafeAreaProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeAreaShell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // androidSafeArea: {
  //   paddingTop: 12,
  //   paddingBottom: 4,
  // },
});

const EDGES: Array<"top" | "bottom" | "left" | "right"> = [
  "top",
  "right",
  "bottom",
  "left",
];
