import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import colors from "../theme/colors";

/**
 * AppIconExport component.
 * Flat, export-ready app icon for generating PNGs.
 *
 * @param {Object} props
 * @param {number} [props.size=1024] - Size of the canvas (must be square).
 * @returns {JSX.Element}
 */
const AppIconExport = ({ size = 1024 }) => {
  const iconSize = size * 0.6; // scale inner leaf to ~60%

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: colors.eco.green[500], // flat green bg
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="leaf" size={iconSize} color={colors.neutral.white} />
    </View>
  );
};

export default AppIconExport;
