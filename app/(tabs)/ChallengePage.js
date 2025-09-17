import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ChallengeCard from "../../components/challenges/ChallengeCard";
// import CompletionOverlay from "../../components/challenges/CompletionOverlay";
import EncouragementBanner from "../../components/challenges/EncouragementBanner";
import FeaturedChallengeCard from "../../components/challenges/FeaturedChallengeCard";
import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import { useUser } from "../../context/UserContext";
import colors from "../../theme/colors";

/**
 * ChallengePage component.
 *
 * @returns {JSX.Element}
 */
const ChallengePage = () => {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayPoints, setOverlayPoints] = useState(0);
  const { user, updateUser } = useUser(); // 🔑 use global context
  const router = useRouter();

  const handleActivateChallenge = (challenge) => {
    setActiveChallenges((prev) => [challenge, ...prev]);
  };

  const handleCompleteChallenge = async (challenge) => {
    try {
      setOverlayPoints(challenge.rewards?.points || 0);
      setOverlayVisible(true);

      if (user) {
        const updatedUser = {
          ...user,
          carbonPoints:
            (user.carbonPoints || 0) + (challenge.rewards?.points || 0),
        };
        await updateUser(updatedUser); // 🔑 updates context + storage
      }

      setTimeout(() => {
        setActiveChallenges((prev) =>
          prev.filter((c) => c.id !== challenge.id)
        );
      }, 2000);
    } catch (err) {
      console.error("[ChallengePage] Failed to update points:", err);
    }
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
                    title={challenge.title}
                    initialProgress={challenge.progress?.current || 0}
                    total={challenge.progress?.target || 1}
                    onInfoPress={() => console.log("Info pressed")}
                    onComplete={() => handleCompleteChallenge(challenge)}
                  />
                </View>
              ))
            : null}
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

      {/* <CompletionOverlay
        visible={overlayVisible}
        points={overlayPoints}
        onClose={() => setOverlayVisible(false)}
      /> */}
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
});

export default ChallengePage;
