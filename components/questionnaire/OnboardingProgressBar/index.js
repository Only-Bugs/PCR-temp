/**
 * @fileoverview OnboardingProgressBar component.
 * Wrapper around the shared ProgressBar with fixed onboarding styles.
 */

import ProgressBar from "../../../components/ProgressBar";
import colors from "../../../theme/colors";

/**
 * @component OnboardingProgressBar
 * @description Preconfigured ProgressBar for onboarding flow.
 *
 * @param {Object} props
 * @param {number} props.progress - Progress ratio (0 to 1).
 */
const OnboardingProgressBar = ({ progress }) => {
  return (
    <ProgressBar
      progress={progress}
      height={6}
      color={colors.eco.green[500]}
      backgroundColor={colors.eco.green[100]}
    />
  );
};

export default OnboardingProgressBar;
