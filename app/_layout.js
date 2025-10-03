import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticsProvider } from '../context/HapticsContext';
import { TrackingProvider } from '../context/TrackingContext';
import { UserProvider } from '../context/UserContext';
import colors from '../theme/colors';
import { toastConfig } from '../utils/toastConfig';
import { getSeenIntro } from '../lib/storage/firstRun';

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

        const isIntroRoute = segments?.[0] === '(intro)';

        if (hasSeenIntro && isIntroRoute) {
          setReady(false);
          router.replace('/');
          return;
        }

        if (!hasSeenIntro && !isIntroRoute) {
          setReady(false);
          router.replace('/(intro)/intro');
          return;
        }

        setReady(true);
      } catch (error) {
        if (__DEV__) {
          console.warn('[RootLayout] intro guard failed', error);
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
      <UserProvider>
        <HapticsProvider>
          <TrackingProvider>
            {Platform.OS === 'android' ? (
              <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
                {ready ? <Slot /> : null}
              </SafeAreaView>
            ) : (
              <SafeAreaView style={styles.container}>{ready ? <Slot /> : null}</SafeAreaView>
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
