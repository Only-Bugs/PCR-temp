import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import styles from "./styles";

/**
 * AppIcon component.
 * Renders the app’s leaf icon with built-in glow effect.
 *
 * @param {Object} props
 * @param {number} [props.size=32] - Size of the inner leaf icon.
 * @returns {JSX.Element}
 */
const AppIcon = ({ size = 32 }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconCircle}>
        <Ionicons name="leaf" size={size} color="white" />
      </View>
    </View>
  );
};

export default AppIcon;
