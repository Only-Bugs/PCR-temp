import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import OnboardingProgressBar from "../OnboardingProgressBar";
import styles from "./styles";

/**
 * @component OnboardingHeader
 * @description Header used during onboarding questionnaire.
 *
 * @param {Object} props
 * @param {number} props.currentStep - Current step index (1-based).
 * @param {number} props.completedSteps - Number of steps the user has completed.
 * @param {number} props.totalSteps - Total number of steps in the onboarding flow.
 * @param {Function} props.onBack - Callback when the back button is pressed.
 * @param {Function} props.onSkip - Callback when the skip button is pressed.
 */
const OnboardingHeader = ({
  currentStep,
  completedSteps,
  totalSteps,
  onBack,
  onSkip,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <OnboardingProgressBar progress={completedSteps / totalSteps} />
        <Text style={styles.stepText}>
          {completedSteps}/{totalSteps} completed
        </Text>
      </View>
    </View>
  );
};

export default OnboardingHeader;
