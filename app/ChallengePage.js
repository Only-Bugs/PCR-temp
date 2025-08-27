import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CTAButton from "../components/CTAButton";
import ChallengeCard from "../components/challenges/ChallengeCard";
import ChallengeHeader from "../components/challenges/ChallengeHeader";
import CreateChallengeCard from "../components/challenges/CreateChallengeCard";
import EncouragementBanner from "../components/challenges/EncouragementBanner";
import FeaturedChallengeCard from "../components/challenges/FeaturedChallengeCard";
import colors from "../theme/colors";

const ChallengePage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <ChallengeHeader />

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
          onPress={() => console.log("Navigate to Rewards")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ChallengePage;
