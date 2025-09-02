/**
 * @fileoverview Settings page.
 * Allows user to view/copy Eco ID, toggle haptic feedback,
 * access privacy settings, and log out.
 */

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";
import CTAButton from "../components/CTAButton";
import SettingsCard from "../components/settings/SettingsCard";
import UserInfoCard from "../components/settings/UserInfoCard";

import { useHaptics } from "../context/HapticsContext";
import colors from "../theme/colors";

const SettingsPage = () => {
  const [ecoId, setEcoId] = useState(null);
  const router = useRouter();
  const { enabled, toggleHaptics } = useHaptics();

  useEffect(() => {
    const fetchEcoId = async () => {
      const storedEcoId = await AsyncStorage.getItem("eco_id");
      setEcoId(storedEcoId);
    };
    fetchEcoId();
  }, []);

  const copyEcoId = async () => {
    if (ecoId) {
      await Clipboard.setStringAsync(ecoId);
      Alert.alert("Copied", "Your Eco ID has been copied to clipboard.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("eco_id");
      await AsyncStorage.removeItem("baseline");
      await AsyncStorage.removeItem("user");
      console.log("[SettingsPage] User logged out, cleared AsyncStorage");
      router.replace("/WelcomePage");
    } catch (err) {
      console.log("[SettingsPage] Logout error:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>
      </View>

      {/* User Information Card */}
      <UserInfoCard ecoId={ecoId} onCopy={copyEcoId} />

      {/* Haptics Toggle (to be refactored into SettingsCard next sprint) */}
      <SettingsCard
        // icon={<Text style={{ fontSize: 18 }}>📳</Text>} // TODO: replace with Ionicons
        title="Haptic Feedback"
        subtitle="Enable vibration for app interactions"
        rightContent={<Switch value={enabled} onValueChange={toggleHaptics} />}
      />

      <SettingsCard
        // icon={<Text style={{ fontSize: 18 }}>🛡️</Text>} // TODO: replace with Ionicons later
        title="Privacy & Security"
        subtitle="Control your data and security settings"
        rightContent={<Text style={styles.arrow}>›</Text>}
      />

      {/* Logout Button */}
      <CTAButton
        label="Log Out"
        variant="filled"
        onPress={handleLogout}
        iconLeft={<Ionicons name="log-out-outline" size={20} color="white" />}
        style={styles.logoutBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  gradientIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ecoIdWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  ecoIdText: {
    fontSize: 13,
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  copyButton: {
    backgroundColor: colors.eco.green[600],
    borderRadius: 6,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  ecoIdBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  ecoIdValue: {
    fontSize: 14,
    color: colors.textPrimary,
    marginRight: 8,
  },
  copyBtn: {
    fontSize: 16,
    color: colors.eco.green[600],
  },
  noEcoId: {
    fontSize: 14,
    color: colors.error,
    marginBottom: 32,
    textAlign: "center",
  },
  arrow: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  logoutBtn: {
    backgroundColor: "#DC2626",
    marginTop: 16,
  },
});

export default SettingsPage;
