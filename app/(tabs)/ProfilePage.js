import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import AvatarCard from "../../components/profile/AvatarCard";
import MonthlySnapshot from "../../components/profile/MonthlySnapshot";
import ScoreCard from "../../components/profile/ScoreCard";
import colors from "../../theme/colors";

import { useUser } from "../../context/UserContext";
import { avatar, monthlySnapshot } from "../../services/profileData";

const ProfilePage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("[ProfilePage] user changed:", user);
  }, [user]);

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
            key={user.carbonPoints}
            data={{
              title: "Carbon Points",
              value: user.carbonPoints,
              progress: user.carbonPoints / 1000,
              icon: { name: "eco" },
              level: {
                icon: { name: "star" },
                text:
                  user.carbonPoints >= 500 ? "Eco Warrior" : "Getting Started",
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
        <CTAButton
          label="view async object"
          onPress={() => console.log(user)}
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
