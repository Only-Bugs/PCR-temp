/**
 * @fileoverview PersonaCard component.
 * Displays the user’s carbon persona with an icon and stage-specific label.
 */

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useUser } from "../../../context/UserContext";
import colors from "../../../theme/colors";
import styles from "./styles";

/**
 * PersonaCard
 *
 * Displays the persona stage based on user progress (leaf, sapling, tree).
 *
 * @returns {JSX.Element}
 */
const PersonaCard = () => {
  const { user } = useUser();

  const personaLabels = {
    leaf: "Eco Seedling",
    sapling: "Eco Explorer",
    tree: "Eco Warrior",
  };

  const stage = user?.personaStage || "leaf";
  const label = personaLabels[stage];

  const iconMap = {
    leaf: "leaf",
    sapling: "leaf-outline",
    tree: "tree-outline",
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Carbon Persona</Text>
      <View style={styles.iconWrapper}>
        <Ionicons
          name={iconMap[stage] || "leaf"}
          size={42}
          color={colors.eco.green[600]}
        />
      </View>
      <Text style={styles.persona}>{label}</Text>
    </View>
  );
};

export default PersonaCard;
