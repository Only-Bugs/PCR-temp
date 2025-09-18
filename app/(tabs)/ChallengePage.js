// app/(tabs)/ChallengePage.js
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ChallengeCard from "../../components/challenges/ChallengeCard";
import ChallengeDetailsModal from "../../components/challenges/ChallengeDetailsModal";
import EncouragementBanner from "../../components/challenges/EncouragementBanner";
import FeaturedChallengeCard from "../../components/challenges/FeaturedChallengeCard";
import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import { useUser } from "../../context/UserContext";
import colors from "../../theme/colors";

/**
 * ChallengePage component.
 *
 * Manages active challenges, completion handling, and challenge details modal.
 *
 * @returns {JSX.Element}
 */
const ChallengePage = () => {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [hasCompletedAny, setHasCompletedAny] = useState(false);
  const { user, setCarbonPoints } = useUser();
  const router = useRouter();

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Activates a new challenge and adds it to the active list.
   * @param {Object} challenge - Challenge object to activate
   */
  const handleActivateChallenge = (challenge) => {
    setActiveChallenges((prev) => [challenge, ...prev]);
  };

  /**
   * Handles completion of a challenge.
   * Updates user carbon points in context.
   * Challenge is removed from active list once animation finishes.
   *
   * @async
   * @param {Object} challenge - Completed challenge
   */
  const handleCompleteChallenge = async (challenge) => {
    try {
      if (user) {
        const pointsEarned = challenge.rewards?.points || 0;
        await setCarbonPoints((user.carbonPoints || 0) + pointsEarned);
      }

      if (challenge.finished) {
        setHasCompletedAny(true);
        setActiveChallenges((prev) =>
          prev.filter((c) => c.id !== challenge.id)
        );
      }
    } catch (err) {
      console.error("[ChallengePage] Failed to update challenge:", err);
    }
  };

  /**
   * Renders message when there are no active challenges.
   */
  const renderEmptyState = () => {
    if (!hasCompletedAny) {
      return (
        <Text style={styles.emptyStateText}>
          Pick a challenge above to get started!
        </Text>
      );
    }
    return (
      <Text style={styles.emptyStateText}>
        Well done! You’ve completed your active challenges. Pick a new one to
        keep going!
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PageHeader title="Challenges" />

        <View style={styles.featuredWrapper}>
          <FeaturedChallengeCard
            onActivateChallenge={handleActivateChallenge}
            activeCount={activeChallenges.length}
          />
        </View>

        <View style={styles.activeSection}>
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          {activeChallenges.length > 0
            ? activeChallenges.map((challenge) => (
                <View key={challenge.id} style={styles.cardWrapper}>
                  <ChallengeCard
                    id={challenge.id}
                    title={challenge.title}
                    initialProgress={challenge.progress?.current || 0}
                    total={challenge.progress?.target || 1}
                    rewards={challenge.rewards}
                    onInfoPress={() => {
                      setSelectedChallenge(challenge);
                      setModalVisible(true);
                    }}
                    onComplete={handleCompleteChallenge}
                  />
                </View>
              ))
            : renderEmptyState()}
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

      <ChallengeDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        challenge={selectedChallenge}
      />
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
  },
  activeSection: {
    marginTop: 16,
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
    color: colors.textPrimary,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
});

export default ChallengePage;
