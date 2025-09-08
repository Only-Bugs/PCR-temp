import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CTAButton from "../components/CTAButton";
import SettingsCard from "../components/settings/SettingsCard";
import UserInfoCard from "../components/settings/UserInfoCard";
import { useHaptics } from "../context/HapticsContext";
import colors from "../theme/colors";
import { truncateEcoId } from "../utils/formatters";

const SettingsPage = () => {
  const [ecoId, setEcoId] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { enabled, toggleHaptics } = useHaptics();

  /**
   * Fetches Eco ID from AsyncStorage on mount.
   * @async
   */
  useEffect(() => {
    const fetchEcoId = async () => {
      const storedEcoId = await AsyncStorage.getItem("eco_id");
      setEcoId(storedEcoId);
    };
    fetchEcoId();
  }, []);

  /**
   * Copies Eco ID to clipboard.
   * @async
   */
  const copyEcoId = async () => {
    if (ecoId) {
      await Clipboard.setStringAsync(ecoId);
      Alert.alert("Copied", "Your Eco ID has been copied to clipboard.");
    }
  };

  /**
   * Sends Eco ID to the provided email.
   * Stub implementation for now.
   * @async
   */
  const sendEcoIdByEmail = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    try {
      console.log(`[SettingsPage] Sending Eco ID ${ecoId} to ${email}`);
      Alert.alert("Success", `Eco ID sent to ${email}`);
      setEmail("");
      setShowEmailInput(false);
    } catch (err) {
      Alert.alert("Error", "Failed to send Eco ID. Please try again.");
    }
  };

  /**
   * Handles logout by clearing AsyncStorage and navigating to WelcomePage.
   * @async
   */
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

      {/* Haptics Toggle */}
      <SettingsCard
        title="Haptic Feedback"
        subtitle="Enable vibration for app interactions"
        rightContent={<Switch value={enabled} onValueChange={toggleHaptics} />}
      />

      <SettingsCard
        title="Privacy & Security"
        subtitle="Control your data and security settings"
        rightContent={<Text style={styles.arrow}>›</Text>}
      />

      {/* Logout Button */}
      <CTAButton
        label="Log Out"
        variant="filled"
        onPress={() => setLogoutModalVisible(true)}
        iconLeft={<Ionicons name="log-out-outline" size={20} color="white" />}
        style={styles.logoutBtn}
      />

      {/* Logout Guard Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setLogoutModalVisible(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Don’t lose access to your account!
                </Text>
                <Text style={styles.modalSubtitle}>
                  {"\n"}Tap your Eco ID to copy it, or hit the email icon and
                  we’ll send it straight to your inbox.
                </Text>

                {/* Eco ID box */}
                {ecoId ? (
                  <View style={styles.ecoIdBox}>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={copyEcoId}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.ecoIdValue}>
                        {truncateEcoId(ecoId)}
                      </Text>
                      <Text style={styles.copyHint}>Click to copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.emailIconWrapper}
                      onPress={() => setShowEmailInput(true)}
                    >
                      <Ionicons
                        name="mail-outline"
                        size={28}
                        color={colors.eco.green[600]}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.noEcoId}>No Eco ID found</Text>
                )}

                {/* Email input */}
                {showEmailInput && (
                  <>
                    <TextInput
                      style={styles.emailInput}
                      placeholder="Enter your email to receive Eco ID"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <CTAButton
                      label="Send to Email"
                      onPress={sendEcoIdByEmail}
                    />
                  </>
                )}

                <View style={styles.modalActions}>
                  <CTAButton
                    label="Confirm Logout"
                    variant="filled"
                    onPress={handleLogout}
                    style={styles.confirmBtn}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  arrow: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  logoutBtn: {
    backgroundColor: "#DC2626",
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: colors.textPrimary,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  ecoIdBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  ecoIdValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  copyHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emailIconWrapper: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.eco.green[50],
    justifyContent: "center",
    alignItems: "center",
  },
  noEcoId: {
    fontSize: 14,
    color: colors.error,
    marginBottom: 16,
    textAlign: "center",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: colors.textPrimary,
  },
  modalActions: {
    marginTop: 20,
  },
  confirmBtn: {
    backgroundColor: "#DC2626",
  },
});

export default SettingsPage;
