import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CTAButton from "../../CTAButton";
import colors from "../../../theme/colors";
import styles from "./styles";

const DevSettingsModal = ({
  visible,
  onClose,
  onShowUserContext,
  carbonPointsValue,
  onChangeCarbonPoints,
  onSaveCarbonPoints,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Developer Settings</Text>
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close developer settings"
            >
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Developer Utilities</Text>
              <CTAButton
                label="Show User Context"
                variant="outline"
                onPress={onShowUserContext}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Carbon Points Management</Text>
              <Text style={styles.sectionDescription}>
                Adjust the carbon points stored in context for quick testing.
              </Text>
              <TextInput
                value={carbonPointsValue}
                onChangeText={onChangeCarbonPoints}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Enter carbon points"
                placeholderTextColor={colors.textSecondary}
              />
              <CTAButton
                label="Save Carbon Points"
                variant="filled"
                onPress={onSaveCarbonPoints}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DevSettingsModal;
