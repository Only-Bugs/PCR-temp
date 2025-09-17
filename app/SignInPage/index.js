/**
 * @fileoverview SignInPage.
 * Provides a UI for users to enter their ECO_ID and sign in.
 * Fetches user profile from API, stores it via StorageService,
 * then navigates to ProfilePage.
 */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppIcon from "../../components/AppIcon";
import CTAButton from "../../components/CTAButton";
import { AuthCard } from "../../components/forms/auth";
import { getUser } from "../../services/apis/userAPI";
import StorageService from "../../services/storage";
import colors from "../../theme/colors";
import styles from "./styles";

const SignInPage = () => {
  const [ecoId, setEcoId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Handles user sign in.
   * Calls API with ECO_ID, stores user in StorageService, and redirects to ProfilePage.
   */
  const handleSignIn = async () => {
    if (!ecoId.trim()) {
      setError("Please enter a valid Eco ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      Keyboard.dismiss();

      const user = await getUser(ecoId.trim());

      await StorageService.setEcoId(user.eco_id);
      await StorageService.setUser(user);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <AppIcon size={32} />
          </View>

          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Enter your Eco ID to access your account
          </Text>

          <AuthCard
            label="Your Eco ID"
            value={ecoId}
            onChangeText={setEcoId}
            placeholder="Enter Eco ID"
            helper="Your Eco ID was generated after completing the questionnaire."
            icon="key-outline"
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <CTAButton
            label={loading ? "Signing In..." : "Sign In"}
            onPress={handleSignIn}
            disabled={loading}
          />

          <TouchableOpacity onPress={() => router.push("/OnboardingPage")}>
            <Text style={styles.link}>New user? Start here →</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInPage;
