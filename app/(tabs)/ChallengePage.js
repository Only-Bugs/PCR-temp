import { ScrollView, StyleSheet, View } from "react-native";
import ChallengeCard from "../../components/challenges/ChallengeCard";
import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";

import { router } from "expo-router";
import CreateChallengeCard from "../../components/challenges/CreateChallengeCard";
import EncouragementBanner from "../../components/challenges/EncouragementBanner";
import FeaturedChallengeCard from "../../components/challenges/FeaturedChallengeCard";
import colors from "../../theme/colors";

const ChallengePage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <PageHeader title="Challenges" />

        {/* Featured Challenge */}
        <FeaturedChallengeCard />

        {/* Active Challenges */}
        <ChallengeCard title="Go meat-free 2 days this week" />
        <ChallengeCard title="Recycle 5 items this week" />
        <ChallengeCard title="Use LED bulbs in 3 rooms" />

        {/* Create Your Challenge */}
        <CreateChallengeCard />

        {/* Encouragement Banner */}
        <EncouragementBanner />

        {/* Rewards Button */}
        <CTAButton
          label="View My Rewards"
          onPress={() => router.replace("/RewardsPage")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
});

export default ChallengePage;
