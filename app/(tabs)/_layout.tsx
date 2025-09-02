/**
 * @fileoverview Tab layout configuration with SafeAreaView.
 * Ensures Android and iOS handle safe areas consistently.
 */

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../theme/colors";

export default function TabsLayout() {
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        Platform.OS === "android" && { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
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
            let iconName: keyof typeof Ionicons.glyphMap | "ellipse-outline" =
              "ellipse-outline";

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
            }

            return <Ionicons name={iconName} size={26} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="ProfilePage" options={{ tabBarLabel: "Profile" }} />
        <Tabs.Screen
          name="TrackingPage"
          options={{ tabBarLabel: "Tracking" }}
        />
        <Tabs.Screen
          name="ChallengePage"
          options={{ tabBarLabel: "Challenges" }}
        />
        <Tabs.Screen
          name="CommunityPage"
          options={{ tabBarLabel: "Community" }}
        />
        <Tabs.Screen
          name="LearningPage"
          options={{ tabBarLabel: "Learning" }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
});
