import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ProgressBar from "../../ProgressBar";
import styles from "./styles";

const BadgeCard = ({ title, level, icon, color, locked, progress }) => {
  return (
    <View style={[styles.card, locked && styles.locked]}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: locked ? "#E5E7EB" : color },
        ]}
      >
        <MaterialIcons
          name={locked ? "lock" : icon}
          size={28}
          color={locked ? "#9CA3AF" : "white"}
        />
      </View>
      <Text style={[styles.title, locked && styles.lockedText]}>{title}</Text>
      <Text style={[styles.level, { color: locked ? "#9CA3AF" : color }]}>
        {level}
      </Text>
      {!locked && <ProgressBar progress={progress} height={6} color={color} />}
    </View>
  );
};

export default BadgeCard;
