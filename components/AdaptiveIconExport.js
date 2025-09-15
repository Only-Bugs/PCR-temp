import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import colors from "../theme/colors";

/**
 * AdaptiveIconExport component.
 * Foreground layer for Android adaptive icons (transparent background).
 *
 * @param {Object} props
 * @param {number} [props.size=1024] - Size of the canvas.
 * @returns {JSX.Element}
 */
const AdaptiveIconExport = ({ size = 1024 }) => {
  const iconSize = size * 0.6;

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "transparent", // transparent for adaptive
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="leaf" size={iconSize} color={colors.neutral.white} />
    </View>
  );
};

export default AdaptiveIconExport;
