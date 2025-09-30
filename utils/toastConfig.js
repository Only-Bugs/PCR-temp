import FeedbackToast from '../components/toast/FeedbackToast';
import RewardToast from '../components/toast/RewardToast';

export const toastConfig = {
  reward: ({ props }) => <RewardToast {...props} />,
  feedback: ({ props }) => <FeedbackToast {...props} />,
};
