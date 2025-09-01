import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

import AvatarCircle from "../AvatarCircle/index";

const AvatarCard = ({ avatar = {} }) => {
  const {
    image,
    status = "Growing!",
    title = "Your Green Guardian",
    message = "Great job! Your avatar is growing greener every day. Keep up the sustainable choices!",
  } = avatar;
  return (
    <LinearGradient
      colors={[colors.eco.green[50], colors.eco.green[100]]}
      style={styles.card}
    >
      <AvatarCircle image={image} status={status} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </LinearGradient>
  );
};

export default AvatarCard;
