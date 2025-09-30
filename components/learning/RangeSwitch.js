import { Pressable, StyleSheet, Text, View } from 'react-native';

import colors from '../../theme/colors';
import layout from '../../theme/layout';

const RangeSwitch = ({ options, value, onChange }) => {
  const handlePress = (key) => {
    if (key !== value && typeof onChange === 'function') {
      onChange(key);
    }
  };

  return (
    <View style={styles.container} accessibilityRole="tablist">
      {options.map((option) => {
        const selected = option.key === value;
        return (
          <Pressable
            key={option.key}
            style={({ pressed }) => [
              styles.button,
              selected && styles.buttonActive,
              !selected && pressed && styles.buttonPressed,
            ]}
            onPress={() => handlePress(option.key)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={option.accessibilityLabel || option.label}
            hitSlop={layout.hitSlop}
          >
            <Text style={[styles.label, selected && styles.labelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  button: {
    minWidth: 64,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: colors.eco.green[600],
    shadowColor: colors.eco.green[600],
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: 'rgba(15, 118, 110, 0.15)',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.neutral.white,
    fontWeight: '700',
  },
});

export default RangeSwitch;
