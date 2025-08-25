import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://placekitten.com/100/100" }} // placeholder avatar
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hi Alex!</Text>
        <Text style={styles.subText}>Here’s your footprint update</Text>
      </View>
      <TouchableOpacity style={styles.notification}>
        <Text style={styles.bell}>🔔</Text>
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
