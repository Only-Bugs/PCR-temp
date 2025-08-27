import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import colors from "../../theme/colors";
import styles from "./styles";

/**
 * ProgressCircle component
 * @param {number} progress - value between 0 and 1 (0.74 = 74%)
 * @param {number} size - diameter of the circle
 * @param {number} strokeWidth - thickness of the ring
 * @param {string} color - progress color (default: colors.success)
 * @param {string} bgColor - background ring color (default: colors.surfaceLight)
 */
const ProgressCircle = ({
  progress = 0,
  size = 80,
  strokeWidth = 8,
  color = colors.success,
  bgColor = "#E5E5E5",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background ring */}
        <Circle
          stroke={bgColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Centered text */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{Math.round(progress * 100)}%</Text>
      </View>
    </View>
  );
};

export default ProgressCircle;
