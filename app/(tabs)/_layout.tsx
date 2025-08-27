import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import colors from "../../theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // 🚫 hide labels
        tabBarActiveTintColor: colors.eco.green[600],
        tabBarInactiveTintColor: colors.neutral.gray600,
        sceneStyle: { backgroundColor: colors.background },
        tabBarStyle: {
          backgroundColor: colors.neutral.white,
          borderTopColor: colors.neutral.gray200,
          borderTopWidth: 1,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === "ProfilePage") {
            iconName = focused ? "person" : "person-outline"; // ✅ filled when active
          } else if (route.name === "TrackingPage") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "ChallengePage") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "CommunityPage") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "LearningPage") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="ProfilePage" />
      <Tabs.Screen name="TrackingPage" />
      <Tabs.Screen name="ChallengePage" />
      <Tabs.Screen name="CommunityPage" />
      <Tabs.Screen name="LearningPage" />
    </Tabs>
  );
}
