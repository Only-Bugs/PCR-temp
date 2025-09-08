import { Ionicons } from "@expo/vector-icons";
import {
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../../../theme/colors";
import { truncateEcoId } from "../../../utils/formatters";
import CTAButton from "../../CTAButton";
import styles from "./styles";

/**
 * LogoutModal component.
 * Confirmation modal with Eco ID guard before logout.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility.
 * @param {function} props.onClose - Called when modal is dismissed.
 * @param {string|null} props.ecoId - Current Eco ID (if any).
 * @param {function} props.onCopyEcoId - Handler to copy Eco ID.
 * @param {function} props.onSendEmail - Handler to send Eco ID via email.
 * @param {boolean} props.showEmailInput - Whether to show email input.
 * @param {function} props.setShowEmailInput - Setter for toggling email input.
 * @param {string} props.email - Current email input value.
 * @param {function} props.setEmail - Setter for email input value.
 * @param {function} props.onLogout - Confirm logout handler.
 * @returns {JSX.Element} The rendered LogoutModal component.
 */
const LogoutModal = ({
  visible,
  onClose,
  ecoId,
  onCopyEcoId,
  onSendEmail,
  showEmailInput,
  setShowEmailInput,
  email,
  setEmail,
  onLogout,
}) => {
  const handleClose = () => {
    setShowEmailInput(false);
    setEmail("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          handleClose();
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

              {ecoId ? (
                <View style={styles.ecoIdBox}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={onCopyEcoId}
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
                  <CTAButton label="Send to Email" onPress={onSendEmail} />
                </>
              )}

              <View style={styles.modalActions}>
                <CTAButton
                  label="Confirm Logout"
                  variant="filled"
                  onPress={onLogout}
                  style={styles.confirmBtn}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LogoutModal;
