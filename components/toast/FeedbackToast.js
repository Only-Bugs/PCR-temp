import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../theme/colors';
import layout from '../../theme/layout';

const VARIANT_MAP = {
  success: {
    icon: 'check-circle',
    background: colors.eco.green[50],
    border: colors.eco.green[200],
    iconColor: colors.eco.green[600],
    textColor: colors.textPrimary,
  },
  error: {
    icon: 'error-outline',
    background: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
    iconColor: colors.error,
    textColor: colors.textPrimary,
  },
  info: {
    icon: 'info-outline',
    background: colors.neutral.gray100,
    border: colors.neutral.gray200,
    iconColor: colors.info,
    textColor: colors.textPrimary,
  },
  warning: {
    icon: 'warning-amber',
    background: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.32)',
    iconColor: colors.warning,
    textColor: colors.textPrimary,
  },
};

const FeedbackToast = ({ title, message, variant = 'info', onDismiss }) => {
  const style = VARIANT_MAP[variant] ?? VARIANT_MAP.info;

  return (
    <View
      accessible
      accessibilityRole="alert"
      accessibilityLabel={`${title}. ${message}`}
      style={[styles.container, { backgroundColor: style.background, borderColor: style.border }]}
    >
      <View style={styles.content}>
        <MaterialIcons
          name={style.icon}
          size={20}
          color={style.iconColor}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <View style={styles.textWrapper}>
          {title ? <Text style={[styles.title, { color: style.textColor }]}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Dismiss notification"
        hitSlop={layout.hitSlop}
        onPress={onDismiss}
        style={styles.dismissButton}
        activeOpacity={0.8}
      >
        <MaterialIcons name="close" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  dismissButton: {
    padding: 6,
  },
});

export default FeedbackToast;
