import React from "react";
import { View } from "react-native";
import styles from "./styles";
import colors from "../../theme/colors";

/**
 * ProgressBar component
 * @param {number} progress - value between 0 and 1
 * @param {string} color - bar fill color (default: colors.primary)
 * @param {number} height - bar height (default: 8)
 */
const ProgressBar = ({ progress = 0, color = colors.primary, height = 8 }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View style={[styles.fill, { flex: progress, backgroundColor: color }]} />
      <View style={{ flex: 1 - progress }} />
    </View>
  );
};

export default ProgressBar;
