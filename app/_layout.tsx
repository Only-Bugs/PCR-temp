import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import colors from "../theme/colors"; // adjust path if needed

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.eco.green[600],
        tabBarInactiveTintColor: colors.neutral.gray600,
        tabBarStyle: {
          backgroundColor: colors.neutral.white,
          borderTopColor: colors.neutral.gray200,
          borderTopWidth: 1,
        },
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
        name="ChallengePage"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy-outline" size={22} color={color} />
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
    </Tabs>
  );
}
