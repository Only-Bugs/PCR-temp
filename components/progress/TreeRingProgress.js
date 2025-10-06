/**
 * TreeRingProgress - Drop-in replacement for ProgressCircle with tree-ring visualization
 * Shows concentric rings representing point milestones (default: 500 points per ring)
 * Maintains same API as ProgressCircle for seamless integration
 */

import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop, Filter, FeDropShadow } from "react-native-svg";
import { getTreeRingData } from "../../utils/levelTiers";
import colors from "../../theme/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * TreeRingProgress Component - Drop-in replacement for ProgressCircle
 * @param {object} props
 * @param {number} props.points - User's carbon points
 * @param {number} [props.size=200] - Diameter of the component
 * @param {number} [props.strokeWidth=8] - Width of each ring
 * @param {number} [props.maxPerRing=1000] - Points per ring
 * @param {string} [props.color] - Ignored (uses gradient)
 * @param {node} [props.children] - Content to render in center (e.g., percentage text)
 */
const TreeRingProgress = ({
  points = 0,
  size = 200,
  strokeWidth = 8,
  maxPerRing = 1000,
  color, // Ignored, kept for API compatibility
  children,
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const ringData = getTreeRingData(points, maxPerRing);

  // Animate progress when points change
  useEffect(() => {
    Animated.spring(animatedProgress, {
      toValue: ringData.progress,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [points, ringData.progress]);

  const center = size / 2;
  const ringWidth = strokeWidth;
  const ringGap = 3; // Tight gap between rings
  const maxVisibleRings = 5; // Max rings before they get too small
  const baseRadius = Math.max(size / 6, 25); // Scale base radius with size

  // Calculate rings to display
  const completedRings = Math.min(ringData.completedRings, maxVisibleRings - 1);

  // Render completed rings (fully filled)
  const renderCompletedRings = () => {
    const rings = [];
    for (let i = 0; i < completedRings; i++) {
      const radius = baseRadius + i * (ringWidth + ringGap);
      const circumference = 2 * Math.PI * radius;

      rings.push(
        <Circle
          key={`completed-${i}`}
          cx={center}
          cy={center}
          r={radius}
          stroke={i % 2 === 0 ? "#86efac" : "#a7f3d0"} // Soft desaturated greens
          strokeWidth={ringWidth}
          fill="none"
          opacity={0.7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
      );
    }
    return rings;
  };

  // Render active ring (current progress)
  const renderActiveRing = () => {
    const ringIndex = completedRings;
    const radius = baseRadius + ringIndex * (ringWidth + ringGap);
    const circumference = 2 * Math.PI * radius;

    // Animated stroke dash offset
    const strokeDashoffset = animatedProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0],
    });

    return (
      <>
        {/* Background ring (gray) - thinner than active ring */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.neutral.gray200}
          strokeWidth={ringWidth * 0.7}
          fill="none"
          strokeLinecap="round"
        />
        {/* Active progress ring with gradient and shadow - thicker */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#treeRingGradient)"
          strokeWidth={ringWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${center}, ${center}`}
          filter="url(#dropShadow)"
        />
      </>
    );
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Gradient definition - vivid dark → bright green */}
        <Defs>
          <SvgLinearGradient id="treeRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#15803d" stopOpacity="1" />
            <Stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
            <Stop offset="100%" stopColor="#4ade80" stopOpacity="1" />
          </SvgLinearGradient>
          <Filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <FeDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </Filter>
        </Defs>

        {/* Completed rings */}
        {renderCompletedRings()}

        {/* Active ring */}
        {renderActiveRing()}
      </Svg>

      {/* Center content - render children if provided */}
      {children && (
        <View style={styles.centerContent}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  stageIndicator: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    textShadowColor: "rgba(255, 255, 255, 0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});

export default TreeRingProgress;
