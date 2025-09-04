import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import AvatarCard from "../../components/profile/AvatarCard";
import MonthlySnapshot from "../../components/profile/MonthlySnapshot";
import ScoreCard from "../../components/profile/ScoreCard";
import colors from "../../theme/colors";

import { avatar, monthlySnapshot } from "../../services/profileData";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          console.log("[ProfilePage] Loaded user from storage:", parsed);
          setUser(parsed);
        }
      } catch (err) {
        console.log("[ProfilePage] Failed to load user:", err.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <PageHeader
          title="My Profile"
          onNotificationPress={() => console.log("Notifications Pressed")}
          onSettingsPress={() => router.push("/SettingsPage")}
          showSettings={true}
        />

        {/* Score Card (Carbon Points) */}
        {user && (
          <ScoreCard
            data={{
              title: "Carbon Points",
              value: user.carbonPoints,
              progress: user.carbonPoints / 1000,
              icon: { name: "eco" },
              level: {
                icon: { name: "star" },
                text:
                  user.user_carbon_point >= 500
                    ? "Eco Warrior"
                    : "Getting Started",
              },
            }}
          />
        )}

        <AvatarCard {...avatar} />
        <MonthlySnapshot {...monthlySnapshot} />

        <CTAButton
          label="View My Rewards"
          onPress={() => router.push("/RewardsPage")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ProfilePage;
