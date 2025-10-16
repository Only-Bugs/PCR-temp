/**
 * @fileoverview CarbonCard component.
 * Displays carbon points with tree-ring progress visualization and level.
 * Adds SharePosterModal integration (top-right share icon).
 */

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../../context/UserContext";
import colors from "../../../theme/colors";
import { getLevelTier } from "../../../utils/levelTiers";
import TreeRingProgress from "../../progress/TreeRingProgress";
import SharePosterModal from "../../rewards/SharePosterModal/index";
import styles from "./styles";

const POINTS_PER_RING = 500;

const CarbonCard = ({ data }) => {
  if (!data) return null;

  const [showShareModal, setShowShareModal] = useState(false);
  const { user } = useUser();

  // 安全读取与下限保护
  const rawPoints = Number(data.value);
  const points = Number.isFinite(rawPoints) && rawPoints >= 0 ? rawPoints : 0;

  const levelTier = getLevelTier(points);
  const stage = Math.floor(points / POINTS_PER_RING) + 1;

  const pointsIntoCurrentRing = points % POINTS_PER_RING;
  const pointsToNextMilestone =
    pointsIntoCurrentRing === 0 ? 0 : POINTS_PER_RING - pointsIntoCurrentRing;
  const nextStage = pointsToNextMilestone === 0 ? stage : stage + 1;

  // 估算碳减排（占位公式）
  const co2SavedKg = Number((points / 18).toFixed(1));

  return (
    <View style={styles.carbon.card}>
      <View style={styles.carbon.header}>
        <Text style={styles.carbon.title}>{data.title}</Text>

        <TouchableOpacity
          style={styles.carbon.shareChip}
          onPress={() => setShowShareModal(true)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Share progress"
        >
          <Ionicons
            name="share-outline"
            size={22}
            color={colors.eco.green[600]}
          />
          <Text style={styles.carbon.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Points + Tree-ring */}
      <View style={styles.carbon.mainRow}>
        <View style={styles.carbon.pointsContainer}>
          <Text style={styles.carbon.value}>{String(points)}</Text>
          <Text style={styles.carbon.pointsLabel}>Carbon Points</Text>
        </View>

        <View style={styles.carbon.avatarColumn}>
          <TreeRingProgress
            points={points}
            size={120}
            strokeWidth={10}
            maxPerRing={POINTS_PER_RING}
          >
            <View style={styles.carbon.stageBadge}>
              <Text style={styles.carbon.stageBadgeText}>Stage {stage}</Text>
            </View>
          </TreeRingProgress>
        </View>
      </View>

      <View style={styles.carbon.stageDetails}>
        <Text style={styles.carbon.stageSubtitle}>
          Stage {stage} · {levelTier.min}–
          {levelTier.max === Infinity ? "∞" : levelTier.max} pts
        </Text>
        <Text style={styles.carbon.progressMessage}>
          {pointsToNextMilestone > 0
            ? `Only ${pointsToNextMilestone} pts left for Stage ${nextStage}.`
            : "Stage unlocked! Keep up the momentum with your next action."}
        </Text>
      </View>

      <View style={styles.carbon.infoRow}>
        <Ionicons
          name="leaf-outline"
          size={18}
          color={colors.eco.green[600]}
          style={styles.carbon.infoIcon}
        />
        <Text style={styles.carbon.infoText}>
          Earn points by finishing challenges and keeping up with your daily tracking mission.
        </Text>
      </View>

      {/* Share Poster Modal */}
      <SharePosterModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        points={points}
        co2SavedKg={co2SavedKg}
        badgeName={data.level?.text || levelTier.name}
        username={user?.name || "Verde User"}
        dateRangeLabel="this month"
      />
    </View>
  );
};

export default CarbonCard;
