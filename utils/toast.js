import Toast from 'react-native-toast-message';

export const showRewardToast = ({
  category,
  points,
  message,
  encouragement,
  onPrimary,
  onSecondary,
}) => {
  Toast.show({
    type: 'reward',
    position: 'top',
    autoHide: true,
    visibilityTime: 5000,
    props: {
      title: 'Entry recorded',
      message,
      encouragement,
      onPrimary: () => {
        Toast.hide();
        onPrimary?.();
      },
      onSecondary: () => {
        Toast.hide();
        onSecondary?.();
      },
    },
  });
};

export const showFeedbackToast = ({
  variant = 'info',
  title,
  message,
  autoHide = true,
  visibilityTime = 4000,
  onDismiss,
}) => {
  Toast.show({
    type: 'feedback',
    position: 'top',
    autoHide,
    visibilityTime,
    props: {
      variant,
      title,
      message,
      onDismiss: () => {
        Toast.hide();
        onDismiss?.();
      },
    },
  });
};

export const hideToast = () => Toast.hide();
