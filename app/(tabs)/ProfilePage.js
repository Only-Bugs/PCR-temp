import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import AvatarCard from "../../components/profile/AvatarCard";
import MonthlySnapshot from "../../components/profile/MonthlySnapshot";
import ScoreCard from "../../components/profile/ScoreCard";
import colors from "../../theme/colors";

import { useUser } from "../../context/UserContext";
import {
  fetchMonthlySnapshot,
  getStoredMonthlySnapshot,
} from "../../services/apis/monthlySnapshotAPI";
import { avatar } from "../../services/profileData";

/**
 * ProfilePage
 *
 * Displays user profile with:
 * - Carbon score card
 * - Avatar progress
 * - Monthly emissions snapshot (API + AsyncStorage)
 * - Rewards navigation
 */
const ProfilePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [snapshotData, setSnapshotData] = useState(null);

  useEffect(() => {
    const loadSnapshot = async () => {
      try {
        // 1. Load cached snapshot first
        const stored = await getStoredMonthlySnapshot();
        if (stored) {
          setSnapshotData(stored);
        }

        // 2. Fetch fresh snapshot if eco_id is available
        if (user?.eco_id) {
          const fresh = await fetchMonthlySnapshot(user.eco_id);
          if (fresh) setSnapshotData(fresh);
        }
      } catch (err) {
        console.error("[ProfilePage] Failed to load monthly snapshot:", err);
      }
    };

    loadSnapshot();
  }, [user?.eco_id]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <PageHeader
          title="My Profile"
          onNotificationPress={() => console.log("Notifications Pressed")}
          onSettingsPress={() => router.push("/SettingsPage")}
          showSettings={true}
        />

        {/* Carbon Points */}
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

        {/* Avatar */}
        <AvatarCard {...avatar} />

        {/* Monthly Snapshot */}
        {snapshotData && <MonthlySnapshot data={snapshotData} />}

        {/* Rewards */}
        <CTAButton
          label="View My Rewards"
          onPress={() => router.push("/RewardsPage")}
        />

        <CTAButton
          label="View async object"
          onPress={async () => {
            const stored = await getStoredMonthlySnapshot();
            console.log("[Async Monthly Snapshot]", stored);
          }}
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
