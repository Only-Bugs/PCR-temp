/**
 * @fileoverview PersonaCard component.
 * Displays the user’s carbon persona with an icon.
 */

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const PersonaCard = ({ persona = "Eco Explorer" }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Carbon Persona</Text>
      <View style={styles.iconWrapper}>
        <Ionicons name="leaf" size={42} color={colors.eco.green[600]} />
      </View>
      <Text style={styles.persona}>{persona}</Text>
    </View>
  );
};

export default PersonaCard;
