import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import AvatarCard from "../../components/profile/AvatarCard";
import MonthlySnapshot from "../../components/profile/MonthlySnapshot";
import ScoreCard from "../../components/profile/ScoreCard";
import colors from "../../theme/colors";

import {
  avatar,
  monthlySnapshot,
  scoreCards,
} from "../../services/profileData";

const ProfilePage = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <PageHeader
          title="My Profile"
          onNotificationPress={() => console.log("Notifications pressed")}
        />

        {/* Score Cards */}
        <ScoreCard variant="carbon" data={scoreCards.carbon} />

        {/* Avatar */}
        <AvatarCard {...avatar} />

        {/* Monthly Snapshot */}
        <MonthlySnapshot {...monthlySnapshot} />

        {/* CTA */}
        <CTAButton
          label="View My Rewards"
          variant="gradient"
          iconLeft="card-giftcard"
          iconRight="arrow-forward-ios"
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
