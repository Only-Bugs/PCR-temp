/**
 * @fileoverview WelcomePage.
 * Entry point for new and returning users.
 * Displays app icon, welcome text, sign in + new user actions,
 * and an info box about UID.
 */

import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppIcon from "../../components/AppIcon";
import CTAButton from "../../components/CTAButton";
import colors from "../../theme/colors";

/**
 * WelcomePage screen for new and returning users.
 *
 * @returns {JSX.Element} Rendered welcome screen
 */
const WelcomePage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppIcon size={48} />

      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.brand}>Verde</Text>

      <CTAButton
        label="Sign In"
        onPress={() => router.push("/SignInPage")}
        variant="outline"
      />

      <CTAButton
        label="I’m New Here"
        onPress={() => router.push("/OnboardingPage")}
      />

      <CTAButton label="Bypass" onPress={() => router.push("/ChallengePage")} />

      {/* <CTAButton label="App" onPress={() => router.push("/ExportIconPage")} /> */}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          After completing your questionnaire, you’ll receive a unique UID to
          log in next time.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },

  welcome: {
    fontSize: 20,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
    marginBottom: 4,
  },
  brand: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.eco.green[600],
    textAlign: "center",
    marginBottom: 24,
  },
  infoBox: {
    marginTop: 20,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default WelcomePage;
