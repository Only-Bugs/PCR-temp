/**
 * @fileoverview CarbonCard component.
 * Displays carbon points with tree-ring progress visualization and level.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import TreeRingProgress from "../../progress/TreeRingProgress";
import { getLevelTier } from "../../../utils/levelTiers";
import styles from "./styles";

/**
 * CarbonCard for displaying carbon score with tree-ring visualization.
 *
 * @param {Object} props
 * @param {Object} props.data - Data for the carbon score card.
 * @param {string} props.data.title - Title of the card.
 * @param {number} props.data.value - Carbon points value.
 * @param {{ name: string }} props.data.icon - Icon object.
 * @returns {JSX.Element}
 */
const CarbonCard = ({ data }) => {
  const points = data.value || 0;
  const levelTier = getLevelTier(points);
  const stage = Math.floor(points / 500) + 1; // Updated: 500 points per ring
  const pointsToNextMilestone = 500 - (points % 500); // Updated: 500 points per ring

  return (
    <View style={styles.carbon.card}>
      {/* Header - no icon per requirement */}
      <View style={styles.carbon.header}>
        <Text style={styles.carbon.title}>{data.title}</Text>
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
          maxPerRing={500}
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
        <MaterialIcons
          name="eco"
          size={20}
          color={colors.eco.green[600]}
        />
        <View style={styles.carbon.levelTextContainer}>
          <Text style={styles.carbon.levelText}>{levelTier.name}</Text>
          <Text style={styles.carbon.levelSubtitle}>
            Stage {stage} · {levelTier.min}-{levelTier.max === Infinity ? '∞' : levelTier.max} pts
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
    </View>
  );
};

export default CarbonCard;
