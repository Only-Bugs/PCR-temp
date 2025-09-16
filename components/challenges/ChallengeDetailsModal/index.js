import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import styles from "./styles";

/**
 * ChallengeDetailsModal
 *
 * Modal showing details for a selected challenge.
 * - Opens on card press.
 * - Closes on outside press or back action.
 *
 * @param {object} props
 * @param {boolean} props.visible - Whether modal is visible
 * @param {function} props.onClose - Callback to close modal
 * @param {object} props.challenge - Challenge object with title, description, rewards
 */
const ChallengeDetailsModal = ({ visible, onClose, challenge }) => {
  if (!challenge) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <Pressable style={styles.modalContainer}>
            <View style={styles.header}>
              <Ionicons
                name="chevron-back"
                size={24}
                color="black"
                onPress={onClose}
              />
              <Text style={styles.headerTitle}>Challenge Details</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{challenge.title}</Text>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons
                    name="information-circle"
                    size={18}
                    color="#16A34A"
                  />
                  <Text style={styles.sectionTitle}>Description</Text>
                </View>
                <Text style={styles.sectionText}>{challenge.description}</Text>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="gift" size={18} color="#16A34A" />
                  <Text style={styles.sectionTitle}>Rewards</Text>
                </View>
                <View style={styles.rewardRow}>
                  <Ionicons name="trophy" size={18} color="#22C55E" />
                  <Text style={styles.rewardText}>
                    +{challenge.rewards.points} points
                  </Text>
                </View>
                {challenge.rewards.badge && (
                  <View style={styles.rewardRow}>
                    <Ionicons name="leaf" size={18} color="#22C55E" />
                    <Text style={styles.rewardText}>
                      {challenge.rewards.badge}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ChallengeDetailsModal;
