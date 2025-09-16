// src/components/challenges/FeaturedChallengeCard/index.js
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { fetchUserChallenges } from "../../../services/apis/challengeAPI";
import { useHapticsUtils } from "../../../utils/haptics";
import styles from "./styles";

/**
 * FeaturedChallengeCard
 *
 * Swipeable deck of challenges.
 * - Swipe right: activates a challenge unless max active limit reached.
 * - Swipe left: cycles challenge to back of stack.
 * - Overlay shown only on first run.
 *
 * @param {object} props
 * @param {(challenge: object) => void} props.onActivateChallenge - Callback when a challenge is activated
 * @param {number} props.activeCount - Current number of active challenges
 * @returns {JSX.Element}
 */
const FeaturedChallengeCard = ({ onActivateChallenge, activeCount }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const { hapticSuccess, hapticError } = useHapticsUtils();
  const swiperRef = useRef(null);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) return;
        const { eco_id } = JSON.parse(storedUser);
        if (!eco_id) return;
        const data = await fetchUserChallenges(eco_id);
        setChallenges(data);
      } catch (error) {
        console.error("Failed to load challenges", error);
      }
    };
    loadChallenges();
  }, []);

  const handleSwipeRight = async (index) => {
    if (activeCount >= 5) {
      const blocked = challenges[index];
      if (blocked) {
        // move it to back instead of activating
        const updated = challenges.filter((_, i) => i !== index);
        setChallenges([...updated, blocked]);
        setCardIndex(0);
        await hapticError();
        console.log("Blocked right swipe 👎 - Limit reached", blocked);
      }
      return;
    }

    const activated = challenges[index];
    if (!activated) return;
    const updated = challenges.filter((_, i) => i !== index);
    setChallenges(updated);
    setCardIndex(0);
    await hapticSuccess();
    if (onActivateChallenge) onActivateChallenge(activated);
    console.log("Challenge Activated ✅", activated);
  };

  const handleSwipeLeft = async (index) => {
    const skipped = challenges[index];
    if (!skipped) return;
    const updated = challenges.filter((_, i) => i !== index);
    setChallenges([...updated, skipped]);
    setCardIndex(0);
    await hapticError();
    console.log("Challenge sent to back 👈", skipped);
  };

  useEffect(() => {
    const checkOverlay = async () => {
      const seen = await AsyncStorage.getItem("hasSeenSwipeOverlay");
      if (!seen) {
        setShowOverlay(true);
        setTimeout(() => {
          setShowOverlay(false);
          AsyncStorage.setItem("hasSeenSwipeOverlay", "true");
        }, 3000);
      }
    };
    checkOverlay();
  }, []);

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center" }}
      pointerEvents="box-none"
    >
      <Swiper
        ref={swiperRef}
        key={challenges.map((c) => c.id).join("-")}
        cards={challenges}
        cardIndex={cardIndex}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        onSwipedAll={() => setCardIndex(0)}
        disableTopSwipe={true}
        disableBottomSwipe={true}
        scrollEnabled={false}
        verticalSwipe={false}
        stackSize={3}
        stackSeparation={15}
        animateCardOpacity
        backgroundColor="transparent"
        containerStyle={{ height: 300 }}
        cardStyle={{ width: "90%", alignSelf: "center" }}
        renderCard={(challenge, index) =>
          challenge && (
            <LinearGradient
              colors={["#22C55E", "#16A34A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.card,
                // index === challenges.length - 2 && styles.ghostCardFirst,
                // index === challenges.length - 1 && styles.ghostCardSecond,
              ]}
            >
              <View style={styles.topRow}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons
                    name={challenge.icon || "eco"}
                    size={24}
                    color="white"
                  />
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Featured</Text>
                </View>
              </View>

              <Text style={styles.title}>{challenge.title}</Text>
              <Text
                style={styles.subtitle}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {challenge.description}
              </Text>

              <View style={styles.rewardsRow}>
                <View style={styles.rewardPill}>
                  <MaterialIcons name="emoji-events" size={18} color="gold" />
                  <Text style={styles.rewardText}>
                    +{challenge.rewards.points} points
                  </Text>
                </View>
                {challenge.rewards.badge && (
                  <View style={styles.rewardPill}>
                    <MaterialIcons
                      name="military-tech"
                      size={18}
                      color="gold"
                    />
                    <Text style={styles.rewardText}>
                      {challenge.rewards.badge} badge
                    </Text>
                  </View>
                )}
              </View>

              {showOverlay && (
                <View style={styles.overlay}>
                  <LottieView
                    source={require("../../../assets/animations/swipe-right.json")}
                    autoPlay
                    loop={false}
                    style={{ width: 120, height: 120 }}
                  />
                </View>
              )}
            </LinearGradient>
          )
        }
      />
    </View>
  );
};

export default FeaturedChallengeCard;
