import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ProgressBar from "../../ProgressBar";
import CompletionOverlay from "../CompletionOverlay";
import styles from "./styles";

/**
 * ChallengeCard
 *
 * - Tick button increments progress locally
 * - Shows card-scoped overlay on completion
 * - Calls onComplete(challenge) when progress reaches total
 */
const ChallengeCard = ({
  id,
  title = "Untitled Challenge",
  initialProgress = 0,
  total = 1,
  rewards = { points: 0 },
  onInfoPress,
  onComplete,
}) => {
  const [progress, setProgress] = useState(initialProgress);
  const [textWidth, setTextWidth] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const remaining = Math.max(total - progress, 0);
  const completion = total > 0 ? progress / total : 0;
  const isCompleted = progress >= total;

  const handleTickPress = () => {
    if (isCompleted) return;

    const newProgress = Math.min(progress + 1, total);
    setProgress(newProgress);

    if (newProgress === total) {
      setShowOverlay(true); // show overlay inside the card
      onComplete?.({
        id,
        title,
        rewards,
        progress: newProgress,
        target: total,
      });
    }
  };

  // Auto-hide overlay after 2s (parent will remove card)
  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showOverlay]);

  return (
    <View style={styles.card}>
      {/* Regular card content */}
      <View style={styles.topRow}>
        <View style={styles.leftColumn}>
          <Pressable onPress={handleTickPress}>
            <View
              style={[
                styles.tickCircle,
                isCompleted && styles.tickCircleCompleted,
              ]}
            >
              <MaterialIcons
                name="check"
                size={18}
                color={isCompleted ? "#fff" : "#22C55E"}
              />
            </View>
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightColumn}>
          <Pressable onPress={onInfoPress} style={styles.infoWrapper}>
            <MaterialIcons name="info-outline" size={22} color="#2563EB" />
          </Pressable>

          <View style={styles.progressContainer}>
            <Text
              style={styles.progressText}
              onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                setTextWidth(width);
              }}
            >
              {isCompleted ? "Completed 🎉" : `${remaining} more to go`}
            </Text>

            {textWidth > 0 && (
              <View style={{ width: textWidth }}>
                <ProgressBar
                  progress={completion}
                  height={6}
                  color={isCompleted ? "#9CA3AF" : "#22C55E"}
                  backgroundColor="#E5E7EB"
                />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* !Todo: Replace with completion overlay */}
      {/* Overlay on completion */}

      {showOverlay && (
        <CompletionOverlay
          visible={showOverlay}
          points={rewards?.points || 0}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </View>
  );
};

export default ChallengeCard;
