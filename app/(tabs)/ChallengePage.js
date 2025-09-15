// src/pages/ChallengePage/index.js
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ChallengeCard from "../../components/challenges/ChallengeCard";
import EncouragementBanner from "../../components/challenges/EncouragementBanner";
import FeaturedChallengeCard from "../../components/challenges/FeaturedChallengeCard";
import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import colors from "../../theme/colors";

/**
 * ChallengePage
 *
 * Main challenges screen.
 * - Displays featured swipe deck of challenges.
 * - Shows active challenges added by the user.
 * - Includes create challenge option, encouragement banner, and rewards button.
 *
 * @returns {JSX.Element}
 */
const ChallengePage = () => {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const router = useRouter();

  /**
   * Handles adding a challenge to the active list.
   * New challenges are placed at the top.
   * @param {object} challenge - Activated challenge object
   */
  const handleActivateChallenge = (challenge) => {
    setActiveChallenges((prev) => [challenge, ...prev]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <PageHeader title="Challenges" />

        <View style={styles.featuredWrapper}>
          <FeaturedChallengeCard
            onActivateChallenge={handleActivateChallenge}
            activeCount={activeChallenges.length}
          />
        </View>

        <View style={styles.activeSection}>
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          {activeChallenges.length > 0 ? (
            activeChallenges.map((challenge) => (
              <View key={challenge.id} style={styles.cardWrapper}>
                <ChallengeCard title={challenge.title} />
              </View>
            ))
          ) : (
            <></>
          )}
        </View>

        <View style={styles.section}>
          <EncouragementBanner />
        </View>

        <View style={styles.section}>
          <CTAButton
            label="View My Rewards"
            onPress={() => router.replace("/RewardsPage")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  featuredWrapper: {
    height: 300,
    marginBottom: 48,
    zIndex: 10,
  },
  activeSection: {
    marginBottom: 32,
    zIndex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    marginTop: 24,
    color: colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: colors.neutral.gray600,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});

export default ChallengePage;
