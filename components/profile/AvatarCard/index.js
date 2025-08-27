import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const AvatarCard = () => {
  return (
    <LinearGradient
      colors={[colors.successTint, "#D2F1DD"]}
      style={styles.card}
    >
      {/* Avatar wrapper */}
      <View style={styles.avatarWrapper}>
        <LinearGradient
          colors={["#43A047", "#66BB6A"]} // radial-style green
          style={styles.avatarCircle}
        >
          {/* Tree Image (replace with local asset later) */}
          <Image
            source={{
              uri: "https://img.icons8.com/emoji/96/deciduous-tree.png",
            }}
            style={styles.treeImage}
          />

          {/* Status pill */}
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>Growing!</Text>
          </View>

          {/* Yellow star badge */}
          <View style={styles.badge}>
            <MaterialIcons name="star" size={18} color="#FFC107" />
          </View>
        </LinearGradient>
      </View>

      {/* Title */}
      <Text style={styles.title}>Your Green Guardian</Text>

      {/* Description */}
      <Text style={styles.message}>
        Great job! Your avatar is growing greener every day. Keep up the
        sustainable choices! 🌱
      </Text>
    </LinearGradient>
  );
};

export default AvatarCard;
