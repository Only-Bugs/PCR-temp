import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import CTAButton from '../../CTAButton';
import { useTracking } from '../../../context/TrackingContext';
import colors from '../../../theme/colors';
import { showFeedbackToast, showRewardToast } from '../../../utils/toast';

const SHOPPING_SECTIONS = [
  {
    id: 'clothing',
    title: 'Clothing & Footwear',
    icon: 'checkroom',
    options: [
      { id: 'clothing-low', label: '$0 – $50', helper: 'Low spender', spend: 35 },
      { id: 'clothing-mid', label: '$51 – $150', helper: 'Average', spend: 100 },
      { id: 'clothing-high', label: '$151 – $300', helper: 'High', spend: 225 },
      { id: 'clothing-very-high', label: '$301+', helper: 'Very high', spend: 350 },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics',
    icon: 'devices',
    options: [
      { id: 'electronics-low', label: '< $500', helper: 'Rarely upgrade', spend: 300 },
      { id: 'electronics-mid', label: '$500 – $1,000', helper: 'Moderate', spend: 750 },
      { id: 'electronics-high', label: '$1,001 – $2,000', helper: 'Frequent upgrade', spend: 1500 },
      { id: 'electronics-very-high', label: '$2,001+', helper: 'Very high', spend: 2200 },
    ],
  },
];

const LogShoppingActivity = () => {
  const router = useRouter();
  const { logShoppingActivity } = useTracking();

  const [expandedSection, setExpandedSection] = useState(SHOPPING_SECTIONS[0]?.id ?? null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (sectionId, option) => {
    setSelectedOptions((previous) => ({
      ...previous,
      [sectionId]: option,
    }));
    setError(null);
    setExpandedSection(sectionId);
  };

  const toggleSection = (sectionId) => {
    setExpandedSection((previous) => (previous === sectionId ? null : sectionId));
  };

  const handleSave = async () => {
    if (submitting) return;
    const entries = Object.keys(selectedOptions).map((sectionId) => selectedOptions[sectionId]);

    if (!entries.length) {
      setError('Select at least one category to log your spending.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await logShoppingActivity({ entries });
      const pointsEarned = result?.points ?? 0;
      const awarded = result?.awarded ?? pointsEarned > 0;
      const awardError = result?.awardError;

      setSelectedOptions({});
      setError(null);

      if (awardError) {
        showFeedbackToast({
          variant: 'info',
          title: 'Points delayed',
          message: 'We saved your shopping log, but point awarding failed temporarily. We’ll retry shortly.',
        });
      } else if (!awarded) {
        showFeedbackToast({
          variant: 'info',
          title: 'Already rewarded',
          message: 'Points already awarded for today.',
        });
      }

      const message = awardError
        ? 'Shopping log saved. We will add your points shortly.'
        : awarded
        ? `You logged today’s Shopping. +${pointsEarned} Carbon Points awarded.`
        : 'You logged today’s Shopping. Points already awarded today.';

      showRewardToast({
        category: 'shopping',
        points: pointsEarned,
        message,
        encouragement: 'Mindful spending makes a difference!',
        onPrimary: () => router.replace('/(tabs)/TrackingPage'),
        onSecondary: () => router.replace('/(tabs)/ProfilePage'),
      });
    } catch (error) {
      console.error('[LogShoppingActivity] Failed to record shopping activity:', error);
      showFeedbackToast({
        variant: 'error',
        title: 'Unable to save',
        message: "We couldn't save your shopping activity. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/(tabs)/TrackingPage');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Activity</Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {SHOPPING_SECTIONS.map((section) => {
              const selected = selectedOptions[section.id];
              const isExpanded = expandedSection === section.id;
              return (
                <View key={section.id} style={styles.sectionCard}>
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => toggleSection(section.id)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={`${isExpanded ? 'Collapse' : 'Expand'} ${section.title}`}
                    accessibilityHint="Toggles the spending options for this category"
                  >
                    <View style={styles.sectionHeaderContent}>
                      <View style={styles.sectionIconWrapper}>
                        <MaterialIcons
                          name={section.icon}
                          size={20}
                          color={colors.textPrimary}
                        />
                      </View>
                      <View style={styles.sectionTitleGroup}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {selected ? (
                          <Text style={styles.sectionSelected}>
                            {selected.label}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                    <MaterialIcons
                      name={isExpanded ? 'expand-less' : 'expand-more'}
                      size={24}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.sectionOptions}>
                      {section.options.map((option) => {
                        const isActive = selected?.id === option.id;
                        return (
                          <TouchableOpacity
                            key={option.id}
                            style={[styles.optionCard, isActive && styles.optionCardActive]}
                            onPress={() => handleSelect(section.id, { ...option, sectionId: section.id })}
                          >
                            <View>
                              <Text style={styles.optionTitle}>{option.label}</Text>
                              <Text style={styles.optionHelper}>{option.helper}</Text>
                            </View>
                            <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
                              {isActive && <View style={styles.radioInner} />}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <CTAButton
            label="Save Activity"
            onPress={handleSave}
            loading={submitting}
            disabled={submitting}
          />
          <TouchableOpacity
            style={[styles.cancelButton, submitting && styles.cancelButtonDisabled]}
            onPress={handleCancel}
            disabled={submitting}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: colors.eco.green[50],
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  sectionCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.neutral.gray100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  sectionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.neutral.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitleGroup: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionSelected: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionOptions: {
    marginTop: 12,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral.gray100,
    marginTop: 8,
  },
  optionCardActive: {
    borderColor: colors.eco.green[500],
    backgroundColor: '#f0fdf4',
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  optionHelper: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.neutral.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: colors.eco.green[600],
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.eco.green[600],
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: 4,
  },
  actions: {
    padding: 16,
    backgroundColor: colors.background,
  },
  cancelButton: {
    backgroundColor: colors.neutral.gray200,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonDisabled: {
    opacity: 0.5,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});

export default LogShoppingActivity;
