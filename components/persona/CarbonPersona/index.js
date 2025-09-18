/**
 * @file CarbonPersona.js
 * @description Persona visuals using Lottie animations for leaf, sapling, and tree stages.
 */

import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

/**
 * CarbonPersona
 *
 * Displays Lottie animation for the current persona stage.
 *
 * @param {object} props
 * @param {"leaf"|"sapling"|"tree"} props.stage - Persona stage.
 * @returns {JSX.Element}
 */
const CarbonPersona = ({ stage }) => {
  const animationMap = {
    leaf: require("../../../assets/animations/leaf.json"), // Growing Plant Animation.json
    sapling: require("../../../assets/animations/sapling.json"), // Tomato Plant Animation.json
    tree: require("../../../assets/animations/tree.json"), // Tree in the Wind Animation.json
  };

  const animationSource = animationMap[stage] || animationMap.leaf;

  return (
    <View style={styles.wrapper}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 140,
    height: 140,
  },
});

export default CarbonPersona;
