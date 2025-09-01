import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

import defaultAvatar from "../../../assets/images/react-logo.png";

const AvatarCircle = ({ image, status }) => {
  return (
    <View style={styles.avatarWrapper}>
      {/* Circle */}
      <LinearGradient
        colors={["#2E7D32", "#388E3C"]}
        style={styles.avatarCircle}
      >
        <Image source={image || defaultAvatar} style={styles.treeImage} />

        {/* Status pill INSIDE circle */}
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </LinearGradient>

      {/* Star badge floats top-right */}
      <View style={styles.badge}>
        <MaterialIcons name="star" size={18} color={colors.eco.yellow} />
      </View>
    </View>
  );
};

export default AvatarCircle;
