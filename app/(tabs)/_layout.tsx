/**
 * @fileoverview Tab layout configuration with haptic feedback.
 * Adds SafeArea adjustments for Android and provides haptic feedback
 * when switching between tabs.
 */

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../../theme/colors";
import { useHapticsUtils } from "../../utils/haptics";

/**
 * TabsLayout sets up the main bottom tab navigation with haptic feedback.
 *
 * @component
 * @returns {JSX.Element} Configured tab navigator with SafeArea adjustments.
 */
export default function TabsLayout() {
  const { hapticPress } = useHapticsUtils();

  /**
   * Wraps the default tab bar button with haptic feedback on press.
   *
   * @param {Object} props - Props forwarded to the tab bar button.
   * @returns {JSX.Element} TouchableOpacity with haptic feedback.
   */
  const withHaptics = (props) => (
    <TouchableOpacity
      {...props}
      onPress={async () => {
        await hapticPress();
        props.onPress?.();
      }}
    />
  );

  const tabContent = (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.eco.green[600],
        tabBarInactiveTintColor: colors.neutral.gray600,
        tabBarStyle: {
          backgroundColor: colors.neutral.white,
          borderTopColor: colors.neutral.gray200,
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 6,
          height: 64,
        },
        tabBarButton: withHaptics,
        tabBarIcon: ({ color, focused }) => {
          /** @type {string} */
          let iconName;

          switch (route.name) {
            case "ProfilePage":
              iconName = focused ? "person" : "person-outline";
              break;
            case "TrackingPage":
              iconName = focused ? "stats-chart" : "stats-chart-outline";
              break;
            case "ChallengePage":
              iconName = focused ? "trophy" : "trophy-outline";
              break;
            case "CommunityPage":
              iconName = focused ? "people" : "people-outline";
              break;
            case "LearningPage":
              iconName = focused ? "book" : "book-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="ProfilePage" options={{ tabBarLabel: "Profile" }} />
      <Tabs.Screen name="TrackingPage" options={{ tabBarLabel: "Tracking" }} />
      <Tabs.Screen
        name="ChallengePage"
        options={{ tabBarLabel: "Challenges" }}
      />
      <Tabs.Screen
        name="CommunityPage"
        options={{ tabBarLabel: "Community" }}
      />
      <Tabs.Screen name="LearningPage" options={{ tabBarLabel: "Learning" }} />
    </Tabs>
  );

  const wrappedTabs =
    Platform.OS === "android" ? (
      <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
        {tabContent}
      </SafeAreaView>
    ) : (
      tabContent
    );

  return wrappedTabs;
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
