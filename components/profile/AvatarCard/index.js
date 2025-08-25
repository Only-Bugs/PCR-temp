import { Text, View } from "react-native";
import styles from "./styles";

const AvatarCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.avatarCircle}>
        <Text style={styles.tree}>🌳</Text>
      </View>
      <Text style={styles.status}>Growing!</Text>
      <Text style={styles.message}>
        Great job! Your avatar is growing greener every day. Keep up the
        sustainable choices!
      </Text>
    </View>
  );
};

export default AvatarCard;
