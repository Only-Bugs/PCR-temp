import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CTAButton from "../components/CTAButton";
import LogoutModal from "../components/settings/LogoutModal";
import SettingsCard from "../components/settings/SettingsCard";
import SettingsIcon from "../components/settings/SettingsIcon";
import UserInfoCard from "../components/settings/UserInfoCard";
import { useHaptics } from "../context/HapticsContext";
import colors from "../theme/colors";

const SettingsPage = () => {
  const [ecoId, setEcoId] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
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

  const handleCloseLogoutModal = () => {
    setLogoutModalVisible(false);
    setShowEmailInput(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Manage your account and preferences
          </Text>
        </View>
      </View>

      {/* User Information Card */}
      <UserInfoCard ecoId={ecoId} onCopy={copyEcoId} />

      {/* Haptics Toggle */}
      <SettingsCard
        title="Haptic Feedback"
        subtitle="Enable vibration for app interactions"
        icon={
          <LinearGradient
            colors={["#A855F7", "#9333EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="vibrate" size={22} color="white" />
          </LinearGradient>
        }
        rightContent={<Switch value={enabled} onValueChange={toggleHaptics} />}
      />

      {/* Privacy & Security */}
      <SettingsCard
        title="Privacy & Security"
        subtitle="Control your data and security settings"
        icon={<SettingsIcon name="shield-checkmark" bgColor={colors.info} />}
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
      <LogoutModal
        visible={logoutModalVisible}
        onClose={handleCloseLogoutModal}
        ecoId={ecoId}
        onCopyEcoId={copyEcoId}
        onSendEmail={sendEcoIdByEmail}
        showEmailInput={showEmailInput}
        setShowEmailInput={setShowEmailInput}
        email={email}
        setEmail={setEmail}
        onLogout={handleLogout}
      />
      <Text>Version: Iteration 2 - beta 1</Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
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
