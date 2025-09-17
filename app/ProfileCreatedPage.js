/**
 * @fileoverview Confirmation screen shown after user profile creation.
 * Displays the eco_id in a styled card, allows user to copy it,
 * then proceed to ProfilePage.
 */

import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CTAButton from "../components/CTAButton";
import StorageService from "../services/storage";
import colors from "../theme/colors";

const ProfileCreatedPage = () => {
  const [ecoId, setEcoId] = useState(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEcoId = async () => {
      const storedEcoId = await StorageService.getEcoId();
      setEcoId(storedEcoId);
    };
    fetchEcoId();
  }, []);

  const copyToClipboard = async () => {
    if (ecoId) {
      await Clipboard.setStringAsync(ecoId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset message after 2s
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eco ID Generated</Text>
        <View style={{ width: 24 }} /> {/* Spacer for symmetry */}
      </View>

      {/* Success Icon */}
      <View style={styles.successIcon}>
        <Ionicons name="checkmark" size={32} color="white" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Your Unique Eco ID</Text>

      {/* Eco ID Display Box */}
      {ecoId && (
        <View style={styles.ecoIdBox}>
          <Text style={styles.ecoIdText}>{String(ecoId)}</Text>
        </View>
      )}

      {/* Helper Text */}
      <Text style={styles.helperText}>
        This is your unique Eco ID. Make sure to copy or save it — you’ll need
        it to access your profile later.
      </Text>
      <Text style={styles.helperSub}>
        Each user is assigned a one-of-a-kind ID. For privacy, we don’t store
        personal details.
      </Text>

      <CTAButton
        label={copied ? "Copied!" : "Copy My ID"}
        variant="filled"
        iconLeft={<Ionicons name="copy-outline" size={20} color="white" />}
        onPress={copyToClipboard}
      />

      <CTAButton
        label="Continue"
        variant="outline"
        iconRight={
          <Ionicons
            name="arrow-forward"
            size={20}
            color={colors.eco.green[600]}
          />
        }
        onPress={() => router.replace("/ResultsPage")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  successIcon: {
    backgroundColor: colors.eco.green[600],
    borderRadius: 9999,
    padding: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.eco.green[600],
    marginBottom: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  ecoIdBox: {
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  ecoIdText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.eco.green[700],
    fontFamily: "monospace",
    textAlign: "center",
    letterSpacing: 2,
  },
  helperText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 6,
  },
  helperSub: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
});

export default ProfileCreatedPage;
