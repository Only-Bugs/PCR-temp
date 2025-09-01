import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import leafIcon from "../../assets/images/react-logo.png";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* App Icon */}
      <View style={styles.iconWrapper}>
        <Image source={leafIcon} style={styles.icon} />
      </View>

      {/* Title */}
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.brand}>Verde</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={[styles.button, styles.signInButton]}
        onPress={() => router.push("/ProfilePage")}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.newUserButton]}
        onPress={() => router.push("/OnboardingPage")}
      >
        <Text style={styles.newUserText}>I’m New Here</Text>
      </TouchableOpacity>

      {/* Info box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          After completing your questionnaire, you’ll receive a unique UID to
          log in next time.
        </Text>
      </View>
    </View>
  );
};

export default WelcomePage;
