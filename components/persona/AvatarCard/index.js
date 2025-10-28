import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

import { useUser } from "../../../context/UserContext";
import AvatarCircle from "../AvatarCircle";

/**
 * AvatarCard
 *
 * Displays the user's carbon persona with stage-specific animation and messages.
 *
 * @returns {JSX.Element}
 */
const AvatarCard = ({ stage: stageOverride } = {}) => {
  const { user } = useUser();

  const personaMap = {
    seed: {
      status: "Just Starting",
      title: "Your First Seed",
      message:
        "Every journey begins with a single seed. Plant the change today!",
    },
    leaf: {
      status: "Sprouting",
      title: "Fresh Sprout",
      message: "Your first shoots are appearing. Keep the momentum going!",
    },
    sapling: {
      status: "Growing Strong",
      title: "Young Sapling",
      message:
        "Great job! Your sapling is thriving. Stay consistent with your actions.",
    },
    youngPlant: {
      status: "Rising Up",
      title: "Eco Warrior",
      message:
        "Your canopy is taking shape. Keep nurturing those eco-friendly habits.",
    },
    matureTree: {
      status: "Climate Legend",
      title: "Forest Guardian",
      message:
        "You've reached the forest canopy. Your impact is transforming the world. Thank you for leading the change!",
    },
  };

  const resolvedStage = stageOverride || user?.personaStage || "seed";
  const { status, title, message } =
    personaMap[resolvedStage] || personaMap.seed;
  return (
    <LinearGradient
      colors={[colors.eco.green[50], colors.eco.green[100]]}
      style={styles.card}
    >
      <AvatarCircle stage={resolvedStage} status={status} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </LinearGradient>
  );
};

export default AvatarCard;
