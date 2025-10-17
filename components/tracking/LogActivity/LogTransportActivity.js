import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import CTAButton from '../../CTAButton';
import PageHeader from '../../PageHeader';
import { useTracking } from '../../../context/TrackingContext';
import colors from '../../../theme/colors';
import layout from '../../../theme/layout';
import { showFeedbackToast, showRewardToast } from '../../../utils/toast';

const KEYBOARD_BEHAVIOR = Platform.select({
    ios: 'padding',
    android: 'height',
});

const KEYBOARD_VERTICAL_OFFSET = Platform.select({
    ios: 80,
    android: 32,
});

const LogTransportActivity = () => {
    const router = useRouter();
    const { logTransportActivity } = useTracking();

    // Ordered transport categories to match design (removed standalone Electric car)
    const transportCategories = [
        {
            id: 'road-transport',
            title: 'Road Transport',
            icon: 'directions-car',
            type: 'expandable',
            subcategories: [
                { id: 'diesel-car', title: 'Diesel car', icon: 'directions-car' },
                { id: 'petrol-car', title: 'Petrol car', icon: 'directions-car' },
                { id: 'electric-car', title: 'Electric car', icon: 'bolt' },
                { id: 'plug-in-hybrid', title: 'Plug-in hybrid', icon: 'power' },
                { id: 'motorbike', title: 'Motorbike', icon: 'two-wheeler' }
            ]
        },
        {
            id: 'air-transport',
            title: 'Air Transport',
            icon: 'flight',
            type: 'expandable',
            subcategories: [
                { id: 'short-haul-flight', title: 'Short-haul flight', icon: 'flight' },
                { id: 'long-haul-flight', title: 'Long-haul flight', icon: 'flight' }
            ]
        },
        {
            id: 'public-transport',
            title: 'Public Transport',
            icon: 'train',
            type: 'expandable',
            subcategories: [
                { id: 'train', title: 'Train', icon: 'train' },
                { id: 'bus', title: 'Bus', icon: 'directions-bus' }
            ]
        },
        {
            id: 'active-transport',
            title: 'Active Transport',
            icon: 'directions-bike',
            type: 'expandable',
            subcategories: [
                {
                    id: 'bike',
                    title: 'Bike',
                    icon: 'directions-bike',
                    description: 'Zero emissions',
                    zeroEmission: true
                },
                {
                    id: 'on-foot',
                    title: 'On Foot',
                    icon: 'directions-walk',
                    description: 'Zero emissions',
                    zeroEmission: true
                }
            ]
        }
    ];

    const [expandedSection, setExpandedSection] = useState(transportCategories[0]?.id ?? null);
    const [selectedTransports, setSelectedTransports] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const toggleSection = (sectionId) => {
        setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
    };

    const updateTransportDistance = (transportId, distance) => {
        setSelectedTransports(prev => ({
            ...prev,
            [transportId]: distance
        }));

        // Clear validation error when user starts typing
        if (validationErrors[transportId]) {
            setValidationErrors(prev => ({
                ...prev,
                [transportId]: null
            }));
        }
    };

    const validateInputs = () => {
        const errors = {};
        let hasErrors = false;

        Object.entries(selectedTransports).forEach(([transportId, distance]) => {
            if (!distance || distance.trim() === '') {
                errors[transportId] = 'Distance is required';
                hasErrors = true;
            } else if (isNaN(parseFloat(distance)) || parseFloat(distance) <= 0) {
                errors[transportId] = 'Please enter a valid distance';
                hasErrors = true;
            }
        });

        if (Object.keys(selectedTransports).length === 0) {
            // No transports selected
            return { hasErrors: true, message: 'Please select at least one transport mode' };
        }

        setValidationErrors(errors);
        return { hasErrors, errors };
    };

    const saveActivity = async () => {
        if (submitting) return;
        const validation = validateInputs();

        if (validation.hasErrors) {
            if (validation.message) {
                showFeedbackToast({
                    variant: 'warning',
                    title: 'Check your entry',
                    message: validation.message,
                });
            }
            return;
        }

        setSubmitting(true);
        try {
            const result = await logTransportActivity(selectedTransports);
            setSelectedTransports({});
            setValidationErrors({});

            const pointsEarned = result?.points ?? 0;
            const awarded = result?.awarded ?? pointsEarned > 0;
            const awardError = result?.awardError;

            if (awardError) {
                showFeedbackToast({
                    variant: 'info',
                    title: 'Points delayed',
                    message: 'We saved your transport log, but point awarding failed temporarily. We’ll retry shortly.',
                });
            } else if (!awarded) {
                showFeedbackToast({
                    variant: 'info',
                    title: 'Already rewarded',
                    message: 'Points already awarded for today.',
                });
            }

            const message = awardError
                ? 'Transport log saved. We will add your points shortly.'
                : awarded
                ? `You logged today’s Transport. +${pointsEarned} Carbon Points awarded.`
                : 'You logged today’s Transport. Points already awarded today.';

            showRewardToast({
                category: 'transport',
                points: pointsEarned,
                message,
                encouragement: 'Keep choosing low-impact transport!',
                onPrimary: () => router.replace('/(tabs)/TrackingPage'),
                onSecondary: () => router.replace('/(tabs)/ProfilePage'),
            });
        } catch (error) {
            console.error('[LogTransportActivity] Failed to record transport activity:', error);
            showFeedbackToast({
                variant: 'error',
                title: 'Unable to save',
                message: "We couldn't save your transport activity. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const renderTransportOption = (category, isSubcategory = false) => {
        const isExpanded = !isSubcategory && expandedSection === category.id;
        const hasSubcategories = Array.isArray(category.subcategories) && category.subcategories.length > 0;
        const hasError = isSubcategory ? validationErrors[category.id] : null;

        return (
            <View key={category.id}>
                <TouchableOpacity
                    accessibilityRole='button'
                    accessibilityLabel={`${category.title} option`}
                    accessibilityHint={hasSubcategories ? 'Expands to show transport modes' : 'Enter a distance for this transport'}
                    hitSlop={layout.hitSlop}
                    activeOpacity={0.8}
                    style={[
                        styles.transportOption,
                        isSubcategory && styles.subcategoryOption
                    ]}
                    onPress={() => {
                        if (hasSubcategories) {
                            toggleSection(category.id);
                        }
                    }}
                >
                    <View style={styles.transportContent}>
                        <MaterialIcons
                            name={category.icon}
                            size={20}
                            color={colors.textPrimary}
                            style={styles.transportIcon}
                        />
                        <View style={styles.transportText}>
                            <Text style={styles.transportTitle}>{category.title}</Text>
                            {category.description ? (
                                <Text style={styles.transportSubtitle}>{category.description}</Text>
                            ) : null}
                        </View>
                    </View>

                    {/* Distance input for subcategories (actual transport modes) */}
                    {isSubcategory ? (
                        <View style={styles.distanceInputSection}>
                            <View
                                style={[
                                    styles.distanceInputContainer,
                                    hasError && styles.distanceInputError
                                ]}
                            >
                                <TextInput
                                    style={styles.distanceInputField}
                                    placeholder="0"
                                    placeholderTextColor={colors.textSecondary}
                                    value={selectedTransports[category.id] || ''}
                                    onChangeText={(text) => updateTransportDistance(category.id, text)}
                                    keyboardType="numeric"
                                />
                                <Text style={styles.distanceUnit}>km</Text>
                            </View>
                        </View>
                    ) : (
                        hasSubcategories && (
                            <MaterialIcons
                                name={isExpanded ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
                                size={24}
                                color={colors.textSecondary}
                            />
                        )
                    )}
                </TouchableOpacity>

                {/* Show validation error */}
                {isSubcategory && hasError && (
                    <Text style={styles.errorText}>{hasError}</Text>
                )}

                {hasSubcategories && isExpanded && (
                    <View style={styles.sectionHintRow}>
                        <MaterialIcons
                            name="info-outline"
                            size={16}
                            color={colors.textSecondary}
                            style={styles.sectionHintIcon}
                        />
                        <Text style={styles.sectionHintText}>
                            Enter distance in kilometres (numbers only).
                        </Text>
                    </View>
                )}

                {hasSubcategories && isExpanded && (
                    <View style={styles.subcategoriesContainer}>
                        {category.subcategories.map(subcategory =>
                            renderTransportOption(subcategory, true)
                        )}
                    </View>
                )}
            </View>
        );
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={KEYBOARD_BEHAVIOR}
            keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        >
            <View style={styles.container}>
                <View style={styles.headerSpacing}>
                    <PageHeader
                        title="Log Transport Activity"
                        showBack
                        onBackPress={() => router.replace('/(tabs)/TrackingPage')}
                    />
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.sectionTitle}>Transport Trip</Text>

                        <View style={styles.selectContainer}>
                            <Text style={styles.selectLabel}>
                                Select Transport Mode <Text style={styles.required}>*</Text>
                            </Text>

                            {/* Transport Options - Always Visible */}
                            <View style={styles.transportList}>
                                {transportCategories.map(category =>
                                    renderTransportOption(category)
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <CTAButton
                        label="Save Activity"
                        onPress={saveActivity}
                        style={styles.saveButton}
                        loading={submitting}
                        disabled={submitting}
                    />
                    <TouchableOpacity
                        style={[styles.cancelButton, submitting && styles.cancelButtonDisabled]}
                        accessibilityRole='button'
                        accessibilityLabel='Cancel logging transport activity'
                        accessibilityHint='Closes the transport log without saving'
                        hitSlop={layout.hitSlop}
                        onPress={() => {
                            if (submitting) return;
                            router.back();
                        }}
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
    content: {
        flex: 1,
        paddingHorizontal: layout.screenPadding,
    },
    contentContainer: {
        paddingBottom: layout.blockSpacing + 120,
    },
    formContainer: {
        backgroundColor: colors.eco.green[50],
        borderRadius: 16,
        padding: layout.cardSpacing,
        marginBottom: layout.sectionSpacing,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: layout.cardSpacing,
    },
    selectContainer: {
        marginBottom: layout.cardSpacing,
    },
    selectLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: layout.cardSpacing / 2,
    },
    required: {
        color: colors.error,
    },

    transportList: {
        backgroundColor: colors.neutral.white,
        borderRadius: 12,
        overflow: 'hidden',
    },
    transportOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: layout.cardSpacing,
        paddingVertical: layout.cardSpacing,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral.gray200,
    },
    subcategoryOption: {
        paddingLeft: layout.cardSpacing * 2,
        backgroundColor: colors.neutral.white,
    },
    selectedOption: {
        backgroundColor: colors.eco.green[50],
    },
    transportContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    transportIcon: {
        marginRight: 12,
    },
    transportTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    transportText: {
        flex: 1,
    },
    transportSubtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    distanceInputSection: {
        marginLeft: 12,
        alignItems: 'flex-end',
    },
    distanceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 96,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    distanceInputField: {
        flex: 1,
        fontSize: 14,
        color: colors.textPrimary,
        textAlign: 'center',
        paddingVertical: 0,
    },
    distanceUnit: {
        fontSize: 13,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    distanceInputError: {
        borderColor: colors.error,
    },
    errorText: {
        fontSize: 12,
        color: colors.error,
        marginLeft: layout.cardSpacing * 2,
        marginTop: 4,
        marginBottom: 8,
    },
    sectionHintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral.gray50,
        marginHorizontal: layout.cardSpacing,
        marginTop: 12,
        paddingHorizontal: layout.cardSpacing,
        paddingVertical: 8,
        borderRadius: 10,
    },
    sectionHintIcon: {
        marginRight: 8,
    },
    sectionHintText: {
        flex: 1,
        fontSize: 12,
        color: colors.textSecondary,
    },
    subcategoriesContainer: {
        backgroundColor: colors.neutral.white,
    },

    actionButtons: {
        paddingHorizontal: layout.screenPadding,
        paddingVertical: layout.cardSpacing,
        backgroundColor: colors.background,
    },
    saveButton: {
        marginBottom: layout.cardSpacing,
    },
    cancelButton: {
        backgroundColor: colors.neutral.gray200,
        borderRadius: 12,
        paddingVertical: layout.cardSpacing,
        alignItems: 'center',
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

export default LogTransportActivity;
