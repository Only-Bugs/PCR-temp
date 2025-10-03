import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';

const RewardToast = ({
  title = 'Entry recorded',
  message = '',
  encouragement = '',
  primaryLabel = 'OK',
  secondaryLabel = 'View Points',
  onPrimary,
  onSecondary,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {encouragement ? (
        <Text style={styles.encouragement}>{encouragement}</Text>
      ) : null}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={onPrimary}>
          <Text style={styles.primaryLabel}>{primaryLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onSecondary}>
          <Text style={styles.secondaryLabel}>{secondaryLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.neutral.white,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  encouragement: {
    fontSize: 13,
    color: colors.eco.green[600],
    marginTop: 6,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  primaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 999,
    backgroundColor: colors.neutral.gray100,
  },
  primaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.eco.green[600],
  },
  secondaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral.white,
  },
});

export default RewardToast;
