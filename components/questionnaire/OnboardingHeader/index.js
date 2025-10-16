import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
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
  const safeTotalSteps = Math.max(Number(totalSteps) || 0, 1);
  const clampedCurrentStep = Math.min(
    Math.max(Number(currentStep) || 1, 1),
    safeTotalSteps
  );
  const effectiveCompletedSteps = Math.max(
    Math.min(Number(completedSteps) || 0, safeTotalSteps),
    0
  );
  const displayStep = clampedCurrentStep || effectiveCompletedSteps || 1;

  return (
    <View style={styles.container}>
      <View style={styles.sideSlot}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name="arrow-back"
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <OnboardingProgressBar progress={displayStep / safeTotalSteps} />
        <Text style={styles.stepText}>
          {displayStep}/{totalSteps} completed
        </Text>
      </View>

      <View style={[styles.sideSlot, styles.rightSlot]}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={onSkip}
          activeOpacity={0.85}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.skipText}>Skip</Text>
          <MaterialIcons
            name="chevron-right"
            size={18}
            color={colors.eco.green[600]}
            style={styles.skipIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingHeader;
