import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import colors from "../../theme/colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = colors.eco.green[600];
  const inactiveColor = colors.neutral.gray600;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopWidth: 1,
            borderTopColor: colors.neutral.gray200,
            backgroundColor: colors.neutral.white,
          },
          default: {
            borderTopWidth: 1,
            borderTopColor: colors.neutral.gray200,
            backgroundColor: colors.neutral.white,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="ProfilePage"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ResultsPage"
        options={{
          title: "Results",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ChallengesPage"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="RewardsPage"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TrackingPage"
        options={{
          title: "Tracking",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CommunityPage"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="LearningPage"
        options={{
          title: "Learning",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
