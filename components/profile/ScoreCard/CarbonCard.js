/**
 * @fileoverview CarbonCard component.
 * Displays carbon points with tree-ring progress visualization and level.
 * Adds SharePosterModal integration (top-right share icon).
 */

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../../context/UserContext";
import colors from "../../../theme/colors";
import TreeRingProgress from "../../progress/TreeRingProgress";
import { getLevelTier } from "../../../utils/levelTiers";
import SharePosterModal from "../../rewards/SharePosterModal/index";
import styles from "./styles";

/**
 * CarbonCard for displaying carbon score with tree-ring visualization.
 *
 * @param {Object} props
 * @param {Object} props.data - Data for the carbon score card.
 * @param {string} props.data.title - Title of the card.
 * @param {number} props.data.value - Carbon points value.
 * @param {number} [props.data.progress] - Progress ratio (legacy support).
 * @param {{ name: string }} props.data.icon - Icon object.
 * @returns {JSX.Element}
 */
const MAX_POINTS_FALLBACK = 1000; // Used when value is missing but progress is provided
const POINTS_PER_RING = 500;

const CarbonCard = ({ data }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const { user } = useUser();

  if (!data) return null;

  const parsedValue = Number(data.value);
  const fallbackPoints =
    typeof data.progress === "number"
      ? Math.round(Math.max(data.progress, 0) * MAX_POINTS_FALLBACK)
      : 0;

  const points = Math.max(
    Number.isFinite(parsedValue) ? parsedValue : fallbackPoints,
    0
  );
  const levelTier = getLevelTier(points);
  const stage = Math.floor(points / POINTS_PER_RING) + 1;
  const pointsIntoCurrentRing = points % POINTS_PER_RING;
  const pointsToNextMilestone =
    pointsIntoCurrentRing === 0 ? POINTS_PER_RING : POINTS_PER_RING - pointsIntoCurrentRing;
  const levelText = data.level?.text || levelTier.name;
  const co2SavedKg = Number.isFinite(points)
    ? Number((points / 18).toFixed(1))
    : 0;
  const username = user?.name || "Verde User";
  const handleOpenShare = () => setShowShareModal(true);
  const handleCloseShare = () => setShowShareModal(false);

  return (
    <View style={styles.carbon.card}>
      {/* Header */}
      <View style={styles.carbon.header}>
        {data.icon?.name && (
          <MaterialIcons
            name={data.icon.name}
            size={20}
            color={colors.eco.yellow}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={styles.carbon.title}>{data.title}</Text>
        <TouchableOpacity
          style={styles.carbon.shareIcon}
          onPress={handleOpenShare}
          activeOpacity={0.7}
        >
          <Ionicons
            name="share-outline"
            size={22}
            color={colors.eco.green[600]}
          />
        </TouchableOpacity>
      </View>

      {/* Points display and tree ring visualization */}
      <View style={styles.carbon.mainRow}>
        <View style={styles.carbon.pointsContainer}>
          <Text style={styles.carbon.value}>{String(points)}</Text>
          <Text style={styles.carbon.pointsLabel}>Carbon Points</Text>
        </View>

        {/* Tree-Ring Progress with 500 points per ring */}
        <TreeRingProgress
          points={points}
          size={120}
          strokeWidth={10}
          maxPerRing={POINTS_PER_RING}
        >
          {/* Centered Stage badge design */}
          <View style={styles.carbon.stageBadge}>
            <Text style={styles.carbon.stageBadgeText}>
              Stage {stage}
            </Text>
          </View>
        </TreeRingProgress>
      </View>

      {/* Level row with subtitle */}
      <View style={styles.carbon.levelRow}>
        {data.level?.icon?.name && (
          <MaterialIcons
            name={data.level.icon.name}
            size={18}
            color={colors.eco.purple}
            style={{ marginRight: 6 }}
          />
        )}
        <View style={styles.carbon.levelTextContainer}>
          <Text style={styles.carbon.levelText}>{levelText}</Text>
          <Text style={styles.carbon.levelSubtitle}>
            Stage {stage} · {levelTier.min}-{levelTier.max === Infinity ? "∞" : levelTier.max} pts
          </Text>
        </View>
      </View>

      {/* Next reward hint with eco-themed icon */}
      <View style={styles.carbon.rewardHint}>
        <MaterialIcons
          name="emoji-events"
          size={16}
          color={colors.eco.green[700]}
        />
        <Text style={styles.carbon.rewardText}>
          Earn {pointsToNextMilestone} pts more to unlock next stage!
        </Text>
      </View>

      <SharePosterModal
        visible={showShareModal}
        onClose={handleCloseShare}
        points={points}
        co2SavedKg={co2SavedKg}
        badgeName={levelTier.name}
        username={username}
        dateRangeLabel="this month"
      />
    </View>
  );
};

export default CarbonCard;
