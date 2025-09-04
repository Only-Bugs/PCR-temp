/**
 * @fileoverview SignInPage.
 * Provides a UI for users to enter their ECO_ID and sign in.
 * Fetches user profile from API, stores it, then navigates to ProfilePage.
 */

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppIcon from "../../components/AppIcon";
import CTAButton from "../../components/CTAButton";
import { AuthCard } from "../../components/forms/auth";
import { getUser } from "../../services/apis/userAPI";
import colors from "../../theme/colors";

const SignInPage = () => {
  const [ecoId, setEcoId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Handles user sign in.
   * Calls API with ECO_ID, stores user in AsyncStorage, and redirects to ProfilePage.
   * @async
   */
  const handleSignIn = async () => {
    if (!ecoId.trim()) {
      setError("Please enter a valid Eco ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const user = await getUser(ecoId.trim());

      await AsyncStorage.setItem("eco_id", user.eco_id);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      console.log("[SignIn] Success, navigating with Eco ID:", user.eco_id);

      router.replace("/ProfilePage");
    } catch (err) {
      console.log("[SignIn] Error:", err.message);
      setError("Invalid Eco ID or failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* App Icon */}
      <View style={styles.iconWrapper}>
        <AppIcon size={32} />
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Enter your Eco ID to access your account
      </Text>

      {/* Eco ID Input */}
      <AuthCard
        label="Your Eco ID"
        value={ecoId}
        onChangeText={setEcoId}
        placeholder="Enter Eco ID"
        helper="Your Eco ID was generated after completing the questionnaire."
        icon="key-outline"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Sign In Button */}
      <CTAButton
        label={loading ? "Signing In..." : "Sign In"}
        onPress={handleSignIn}
        disabled={loading}
      />

      {/* Secondary Action */}
      <TouchableOpacity onPress={() => router.push("/OnboardingPage")}>
        <Text style={styles.link}>New user? Start here →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: colors.error,
    marginBottom: 12,
    textAlign: "center",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: colors.eco.green[600],
    fontWeight: "600",
  },
});

export default SignInPage;
