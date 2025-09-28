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

export const hideToast = () => Toast.hide();
