import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

import { useUser } from "../../../context/UserContext";
import AvatarCircle from "../AvatarCircle";

/**
 * AvatarCard
 *
 * Displays the user’s carbon persona with stage-specific animation and messages.
 *
 * @returns {JSX.Element}
 */
const AvatarCard = () => {
  const { user } = useUser();

  const personaMap = {
    leaf: {
      status: "Just Starting",
      title: "Your First Leaf",
      message: "Every journey begins with a single step. Keep going!",
    },
    sapling: {
      status: "Growing Strong",
      title: "Your Green Guardian",
      message:
        "Great job! Your sapling is thriving. Stay consistent with your actions.",
    },
    tree: {
      status: "Eco Warrior",
      title: "Your Flourishing Tree",
      message:
        "Amazing! Your tree is fully grown, showing the impact of your sustainable choices.",
    },
  };

  const stage = user?.personaStage || "leaf";
  const { status, title, message } = personaMap[stage];

  return (
    <LinearGradient
      colors={[colors.eco.green[50], colors.eco.green[100]]}
      style={styles.card}
    >
      <AvatarCircle stage={stage} status={status} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </LinearGradient>
  );
};

export default AvatarCard;
