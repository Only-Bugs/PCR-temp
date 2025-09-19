import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

import CarbonPersona from "../CarbonPersona";

/**
 * AvatarCircle
 *
 * Displays the persona animation inside a circular gradient with status text and a star badge.
 *
 * @param {object} props
 * @param {"leaf"|"sapling"|"tree"} props.stage - Persona stage.
 * @param {string} props.status - Persona status text.
 * @returns {JSX.Element}
 */
const AvatarCircle = ({ stage, status }) => {
  return (
    <View style={styles.avatarWrapper}>
      {/* <LinearGradient
        colors={["#2E7D32", "#388E3C"]}
        style={styles.avatarCircle}
      > */}
      <CarbonPersona stage={stage} status={status} />

      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      {/* </LinearGradient> */}

      <View style={styles.badge}>
        <MaterialIcons name="star" size={18} color={colors.eco.yellow} />
      </View>
    </View>
  );
};

export default AvatarCircle;
