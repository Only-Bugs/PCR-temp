import { View } from "react-native";
import styles from "./styles";

const ProgressBar = ({
  progress = 0,
  height = 8,
  color = "#22c55e",
  backgroundColor,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: backgroundColor || `${color}33` }, // faint track
      ]}
    >
      <View
        style={[
          styles.fill,
          { width: `${clampedProgress * 100}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
