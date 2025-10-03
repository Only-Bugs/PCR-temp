/**
 * @fileoverview Layout for intro route group.
 * Provides stack navigation for intro screens.
 */

import { Stack } from 'expo-router';

export default function IntroLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
