import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import colors from '../../theme/colors';
import layout from '../../theme/layout';
import { ArticleCard } from '../../components/learning/ArticleCard';
import RangeSwitch from '../../components/learning/RangeSwitch';
import { chunk, PAGE_SIZE } from '../../helpers/paging';
import { logAnalyticsEvent } from '../../utils/analytics';

const FEATURED_LIMIT = 3;
const SKELETON_COUNT = 3;
const PAGE_FADE_OUT = 150;
const PAGE_FADE_IN = 190;
const API_FALLBACK_ENDPOINT = 'https://ayrnx5os0c.execute-api.ap-southeast-2.amazonaws.com/dev/articles';
const ARTICLES_SUBTITLE = 'Fresh guidance to support your greener habits.';

const ARTICLE_TABS = [
  { key: 'featured', label: 'Featured', accessibilityLabel: 'Show featured articles' },
  { key: 'latest', label: 'Latest', accessibilityLabel: 'Show latest articles' },
];

let ARTICLE_ENDPOINT = API_FALLBACK_ENDPOINT;
try {
  const apiConfig = require('../../config/apiConfig').default;
  if (apiConfig?.endpoints?.articles) {
    ARTICLE_ENDPOINT = `${apiConfig.baseURL}${apiConfig.endpoints.articles}`;
  }
} catch (error) {
  if (__DEV__) {
    console.warn('[LearningPage] Using fallback articles endpoint.', error?.message || error);
  }
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const mockArticles = [
  {
    article_id: 'art-1',
    title: 'Cutting Food Waste at Home',
    summary:
      'Simple steps for planning meals, storing ingredients, and using leftovers to reduce waste.',
    reading_time_minutes: 6,
    published_date: '2024-02-12',
    author: 'Sustainability Team',
    source_url: 'https://www.energy.nsw.gov.au/',
    is_featured: true,
  },
  {
    article_id: 'art-2',
    title: 'Commute Smarter: Embrace Active Transport',
    summary:
      'See how short trips by bike or on foot can shrink your carbon footprint and boost wellbeing.',
    reading_time_minutes: 5,
    published_date: '2024-01-28',
    author: 'Verde Mobility Lab',
    source_url: 'https://transport.gov.au/',
    is_featured: false,
  },
  {
    article_id: 'art-3',
    title: 'Greener Energy Bills Explained',
    summary:
      'Understand renewable tariffs, off-peak usage, and energy monitoring to lower household impact.',
    reading_time_minutes: 8,
    published_date: '2023-12-04',
    author: 'Energy Insights',
    source_url: 'https://climatecouncil.org.au/',
    is_featured: true,
  },
  {
    article_id: 'art-4',
    title: 'Smart Home Upgrades for 2024',
    summary: 'Pick the right upgrades to lower energy costs and carbon footprint.',
    reading_time_minutes: 7,
    published_date: '2023-11-12',
    author: 'Future Living',
    source_url: 'https://energysmart.com.au/',
    is_featured: false,
  },
  {
    article_id: 'art-5',
    title: 'Water Wise Gardening Tips',
    summary: 'Reduce outdoor water waste with efficient irrigation and plant choices.',
    reading_time_minutes: 4,
    published_date: '2023-10-02',
    author: 'Green Thumbs',
    source_url: 'https://waterwise.gov.au/',
    is_featured: false,
  },
];

const mockQuizzes = [
  {
    quiz_id: 'quiz-1',
    title: 'Meal Planning Basics',
    subtitle: 'Learn how mindful meal planning cuts waste and saves money.',
    question_count: 6,
    status: 'not_started',
    percent_complete: 0,
  },
  {
    quiz_id: 'quiz-2',
    title: 'Daily Transport Choices',
    subtitle: 'From biking to buses—test your low-impact transport know-how.',
    question_count: 8,
    status: 'in_progress',
    percent_complete: 60,
  },
  {
    quiz_id: 'quiz-3',
    title: 'Home Energy Challenge',
    subtitle: 'See if you can score full marks on energy-saving tricks.',
    question_count: 5,
    status: 'completed',
    percent_complete: 100,
  },
];

const SkeletonCard = () => {
  const pulse = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.6,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => {
      animation.stop();
    };
  }, [pulse]);

  return (
    <Animated.View style={[styles.articleCardShell, { opacity: pulse }]}> 
      <View style={styles.skeletonRow}>
        <View style={styles.skeletonMedia} />
        <View style={styles.skeletonBody}>
          <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
          <View style={[styles.skeletonLine, styles.skeletonLineMedium, styles.skeletonLineMarginTop]} />
          <View style={styles.skeletonMetaRow}>
            <View style={styles.skeletonDot} />
            <View style={[styles.skeletonLine, styles.skeletonLineTextMeta]} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const EmptyBanner = ({ message }) => (
  <View style={[styles.banner, styles.bannerNeutral]}>
    <View style={styles.bannerRow}>
      <MaterialIcons name="auto-stories" size={20} color={colors.eco.blue} />
      <Text style={styles.bannerText}>{message}</Text>
    </View>
  </View>
);

const ErrorBanner = ({ retrying, onRetry }) => (
  <View style={[styles.banner, styles.bannerError]}>
    <View style={styles.bannerRow}>
      <MaterialIcons name="report-problem" size={20} color={colors.warning} />
      <Text style={styles.bannerText}>Couldn’t load. Tap retry.</Text>
    </View>
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Retry loading articles"
      hitSlop={layout.hitSlop}
      style={[styles.bannerCta, retrying && styles.bannerCtaDisabled]}
      activeOpacity={0.85}
      disabled={retrying}
      onPress={onRetry}
    >
      <MaterialIcons name="refresh" size={16} color={retrying ? colors.textSecondary : colors.neutral.white} />
      <Text style={[styles.bannerCtaLabel, retrying && styles.bannerCtaLabelDisabled]}>
        {retrying ? 'Retrying…' : 'Retry'}
      </Text>
    </TouchableOpacity>
  </View>
);

const QuizCard = ({ quiz }) => {
  const isCompleted = quiz.status === 'completed';
  const isInProgress = quiz.status === 'in_progress';
  const buttonLabel = isCompleted ? 'Completed' : isInProgress ? 'Continue' : 'Start';
  const progressIconName = isCompleted
    ? 'check-circle'
    : isInProgress
    ? 'play-circle-filled'
    : 'play-circle-outline';

  return (
    <View style={styles.quizCard}>
      <View style={styles.quizIconWrapper}>
        <MaterialIcons name="quiz" size={40} color={colors.eco.blue} />
      </View>
      <View style={styles.quizContent}>
        <View style={styles.quizHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.quizTitle} numberOfLines={1}>
              {quiz.title}
            </Text>
            <Text style={styles.quizSubtitle} numberOfLines={2}>
              {quiz.subtitle}
            </Text>
            <View style={styles.quizProgressBarTrack}>
              <View
                style={[
                  styles.quizProgressBarFill,
                  { width: `${Math.max(Math.min(quiz.percent_complete, 100), 0)}%` },
                ]}
              />
            </View>
          </View>
          <View
            style={[
              styles.quizProgressPill,
              isCompleted && styles.quizProgressPillCompleted,
            ]}
          >
            <MaterialIcons
              name={progressIconName}
              size={16}
              color={isCompleted ? colors.eco.green[600] : colors.eco.blue}
              style={styles.quizProgressIcon}
            />
            <Text
              style={[
                styles.quizProgressText,
                isCompleted && styles.quizProgressTextCompleted,
              ]}
            >
              {`${quiz.percent_complete}%`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`${buttonLabel} quiz ${quiz.title}`}
          accessibilityState={{ disabled: isCompleted }}
          style={[styles.quizPrimaryButton, isCompleted && styles.quizPrimaryButtonDisabled]}
          activeOpacity={isCompleted ? 1 : 0.85}
          hitSlop={layout.hitSlop}
          onPress={() => {}}
        >
          <View style={styles.quizPrimaryButtonContent}>
            <MaterialIcons
              name={isCompleted ? 'check' : 'play-arrow'}
              size={18}
              color={isCompleted ? colors.neutral.gray500 : colors.neutral.white}
              style={styles.quizPrimaryButtonIcon}
            />
            <Text
              style={[styles.quizPrimaryLabel, isCompleted && styles.quizPrimaryLabelDisabled]}
            >
              {buttonLabel}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LearningPage = () => {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errorArticles, setErrorArticles] = useState(false);
  const [retryingArticles, setRetryingArticles] = useState(false);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [activeTab, setActiveTab] = useState('featured');
  const [pageByTab, setPageByTab] = useState({ featured: 0, latest: 0 });
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const pageAnim = useRef(new Animated.Value(1)).current;

  const loadArticles = useCallback(
    async (isRetry = false) => {
      if (isRetry) {
        setRetryingArticles(true);
      } else {
        setLoadingArticles(true);
      }
      setErrorArticles(false);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const response = await fetch(ARTICLE_ENDPOINT, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        const list = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

        if (!list.length) {
          setArticles(mockArticles);
        } else {
          setArticles(list);
        }
      } catch (error) {
        if (__DEV__) {
          console.warn('[LearningPage] Failed to load articles, using fallback data.', error?.message || error);
        }
        setErrorArticles(true);
        setArticles(mockArticles);
      } finally {
        setLoadingArticles(false);
        setRetryingArticles(false);
        setExpandedArticleId(null);
        setHasLoadedOnce(true);
      }
    },
    []
  );

  useEffect(() => {
    loadArticles(false);
  }, [loadArticles]);

  const articleBuckets = useMemo(() => {
    const sortByDateDesc = (a, b) => (b.published_date || '').localeCompare(a.published_date || '');
    const list = articles || [];
    const featured = list.filter((item) => item?.is_featured).sort(sortByDateDesc).slice(0, FEATURED_LIMIT);
    const latest = list.filter((item) => !item?.is_featured).sort(sortByDateDesc);

    return {
      featuredArticles: featured,
      latestArticles: latest,
      featuredChunks: chunk(featured, PAGE_SIZE),
      latestChunks: chunk(latest, PAGE_SIZE),
    };
  }, [articles]);

  const { featuredArticles, latestArticles, featuredChunks, latestChunks } = articleBuckets;

  useEffect(() => {
    setPageByTab((prev) => ({
      featured: featuredChunks.length ? Math.min(prev.featured, featuredChunks.length - 1) : 0,
      latest: latestChunks.length ? Math.min(prev.latest, latestChunks.length - 1) : 0,
    }));
  }, [featuredChunks.length, latestChunks.length]);

  useEffect(() => {
    if (featuredArticles.length === 0 && latestArticles.length > 0) {
      setActiveTab('latest');
    } else if (latestArticles.length === 0 && featuredArticles.length > 0 && activeTab === 'latest') {
      setActiveTab('featured');
    }
  }, [activeTab, featuredArticles.length, latestArticles.length]);

  useEffect(() => {
    Animated.timing(pageAnim, {
      toValue: 0.95,
      duration: 120,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(pageAnim, {
        toValue: 1,
        duration: PAGE_FADE_IN,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, [activeTab, pageAnim]);

  const handleTabChange = useCallback((tabKey) => {
    setActiveTab((prev) => {
      if (prev === tabKey) {
        return prev;
      }
      setExpandedArticleId(null);
      logAnalyticsEvent('learning_tab_switch', { tab: tabKey });
      return tabKey;
    });
  }, []);

  const animatePageChange = useCallback(
    (tabKey, currentIndex, targetIndex) => {
      const chunks = tabKey === 'featured' ? featuredChunks : latestChunks;
      const total = chunks.length;
      if (!total) {
        return;
      }
      const clamped = Math.max(0, Math.min(targetIndex, total - 1));
      if (clamped === currentIndex) {
        return;
      }

      Animated.timing(pageAnim, {
        toValue: 0.85,
        duration: PAGE_FADE_OUT,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setExpandedArticleId(null);
        setPageByTab((prev) => ({ ...prev, [tabKey]: clamped }));
        Animated.timing(pageAnim, {
          toValue: 1,
          duration: PAGE_FADE_IN,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      });

      logAnalyticsEvent('articles_page_change', { tab: tabKey, page: clamped });
    },
    [featuredChunks, latestChunks, pageAnim]
  );

  const handleNextPage = useCallback(() => {
    const tabKey = activeTab;
    const chunks = tabKey === 'featured' ? featuredChunks : latestChunks;
    if (!chunks.length) {
      return;
    }
    const current = pageByTab[tabKey] ?? 0;
    animatePageChange(tabKey, current, current + 1);
  }, [activeTab, animatePageChange, featuredChunks, latestChunks, pageByTab]);

  const handlePrevPage = useCallback(() => {
    const tabKey = activeTab;
    const chunks = tabKey === 'featured' ? featuredChunks : latestChunks;
    if (!chunks.length) {
      return;
    }
    const current = pageByTab[tabKey] ?? 0;
    animatePageChange(tabKey, current, current - 1);
  }, [activeTab, animatePageChange, featuredChunks, latestChunks, pageByTab]);

  const handleArticleToggle = useCallback((articleId) => {
    setExpandedArticleId((prev) => {
      const nextId = prev === articleId ? null : articleId;
      if (nextId) {
        logAnalyticsEvent('article_expand', { article_id: articleId });
      }
      return nextId;
    });
  }, []);

  const currentChunks = activeTab === 'featured' ? featuredChunks : latestChunks;
  const currentPage = pageByTab[activeTab] ?? 0;
  const visibleArticles = currentChunks[currentPage] ?? [];
  const totalPages = currentChunks.length;
  const canGoPrev = currentPage > 0;
  const canGoNext = totalPages > 0 && currentPage < totalPages - 1;
  const emptyMessage = 'No articles yet.';
  const shouldShowErrorBanner = errorArticles && !retryingArticles;
  const showSkeleton = loadingArticles && !hasLoadedOnce;

  const renderQuizSection = useMemo(
    () => (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Quizzes</Text>
        <Text style={styles.sectionSubtitle}>Test your knowledge and learn something new.</Text>
        {mockQuizzes.map((quiz) => (
          <View key={quiz.quiz_id} style={styles.sectionItemSpacing}>
            <QuizCard quiz={quiz} />
          </View>
        ))}
      </View>
    ),
    []
  );

  return (
    <FlatList
      data={[
        <View key="learning-content" style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Articles</Text>
              <RangeSwitch options={ARTICLE_TABS} value={activeTab} onChange={handleTabChange} />
            </View>
            <Text style={styles.sectionSubtitle}>{ARTICLES_SUBTITLE}</Text>
            <View style={styles.sectionDividerInset} />

            {shouldShowErrorBanner ? (
              <View style={styles.sectionItemSpacing}>
                <ErrorBanner retrying={retryingArticles} onRetry={() => loadArticles(true)} />
              </View>
            ) : null}

            {showSkeleton ? (
              Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
                <View
                  key={`articles-skeleton-${idx}`}
                  style={[styles.sectionItemSpacing, idx === 0 && styles.sectionItemSpacingFirst]}
                >
                  <SkeletonCard />
                </View>
              ))
            ) : currentChunks.length === 0 ? (
              <View style={styles.sectionItemSpacing}>
                <EmptyBanner message={emptyMessage} />
              </View>
            ) : (
              <>
                <Animated.View
                  style={[
                    styles.latestAnimatedContainer,
                    {
                      opacity: pageAnim,
                      transform: [
                        {
                          scale: pageAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }),
                        },
                      ],
                    },
                  ]}
                >
                  {visibleArticles.map((article, index) => (
                    <View
                      key={article.article_id}
                      style={[styles.sectionItemSpacing, index === 0 && styles.sectionItemSpacingFirst]}
                    >
                      <ArticleCard
                        item={article}
                        expanded={expandedArticleId === article.article_id}
                        onToggle={() => handleArticleToggle(article.article_id)}
                        badgeLabel={activeTab === 'latest' && article.is_featured ? 'Featured' : undefined}
                        accentOpacity={activeTab === 'featured' ? 0.12 : 0.08}
                      />
                    </View>
                  ))}
                </Animated.View>

                {totalPages > 1 ? (
                  <View style={[styles.pagerControls, styles.pagerFooter]}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Previous page"
                      accessibilityState={{ disabled: !canGoPrev }}
                      onPress={handlePrevPage}
                      disabled={!canGoPrev}
                      hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
                      style={({ pressed }) => [
                        styles.pagerButton,
                        !canGoPrev && styles.pagerButtonDisabled,
                        pressed && canGoPrev && styles.pagerButtonPressed,
                      ]}
                    >
                      {({ pressed }) => (
                        <MaterialIcons
                          name="chevron-left"
                          size={24}
                          color={canGoPrev ? (pressed ? colors.eco.green[600] : colors.textPrimary) : colors.textSecondary}
                        />
                      )}
                    </Pressable>
                    <View style={styles.pagerDots}>
                      {currentChunks.map((_, index) => (
                        <View
                          key={`dot-${index}`}
                          style={[styles.pagerDot, index === currentPage ? styles.pagerDotActive : styles.pagerDotInactive]}
                        />
                      ))}
                    </View>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Next page"
                      accessibilityState={{ disabled: !canGoNext }}
                      onPress={handleNextPage}
                      disabled={!canGoNext}
                      hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
                      style={({ pressed }) => [
                        styles.pagerButton,
                        !canGoNext && styles.pagerButtonDisabled,
                        pressed && canGoNext && styles.pagerButtonPressed,
                      ]}
                    >
                      {({ pressed }) => (
                        <MaterialIcons
                          name="chevron-right"
                          size={24}
                          color={canGoNext ? (pressed ? colors.eco.green[600] : colors.textPrimary) : colors.textSecondary}
                        />
                      )}
                    </Pressable>
                  </View>
                ) : null}
              </>
            )}
          </View>

          {renderQuizSection}
        </View>,
      ]}
      keyExtractor={(_, index) => `learning-section-${index}`}
      renderItem={({ item }) => item}
      ListHeaderComponent={<PageHeader title="Learning Hub" />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: layout.screenPadding,
    paddingBottom: layout.blockSpacing,
    backgroundColor: colors.background,
  },
  content: {
    gap: layout.blockSpacing - layout.cardSpacing,
  },
  section: {
    gap: layout.cardSpacing,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: layout.cardSpacing,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    maxWidth: 320,
    lineHeight: 20,
  },
  sectionDividerInset: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginTop: 8,
    borderRadius: 1,
  },
  sectionItemSpacing: {
    marginTop: layout.cardSpacing + layout.itemSpacing,
  },
  sectionItemSpacingFirst: {
    marginTop: layout.itemSpacing * 0.5,
  },
  articleCardShell: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: layout.cardSpacing,
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skeletonMedia: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.neutral.gray200,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  skeletonBody: {
    flex: 1,
    gap: 8,
  },
  skeletonLine: {
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.neutral.gray200,
  },
  skeletonLineShort: {
    width: '70%',
  },
  skeletonLineMedium: {
    width: '85%',
  },
  skeletonLineMarginTop: {
    marginTop: 8,
  },
  skeletonLineTextMeta: {
    width: '40%',
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray200,
  },
  skeletonMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skeletonDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.neutral.gray300,
  },
  banner: {
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  bannerNeutral: {
    backgroundColor: colors.neutral.gray100,
  },
  bannerError: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.32)',
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bannerCta: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.eco.green[600],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerCtaDisabled: {
    backgroundColor: colors.neutral.gray300,
  },
  bannerCtaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral.white,
  },
  bannerCtaLabelDisabled: {
    color: colors.textSecondary,
  },
  quizCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: layout.cardSpacing,
    flexDirection: 'row',
    gap: layout.cardSpacing,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  quizIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.eco.blueSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizContent: {
    flex: 1,
    gap: 12,
  },
  quizHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  quizSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  quizProgressBarTrack: {
    height: 6,
    backgroundColor: colors.neutral.gray200,
    borderRadius: 3,
    marginTop: 10,
  },
  quizProgressBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.eco.blue,
  },
  quizProgressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
  },
  quizProgressPillCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
  },
  quizProgressIcon: {
    marginRight: 2,
  },
  quizProgressText: {
    fontSize: 12,
    color: colors.eco.blue,
    fontWeight: '600',
  },
  quizProgressTextCompleted: {
    color: colors.eco.green[600],
  },
  quizPrimaryButton: {
    borderRadius: 999,
    backgroundColor: colors.eco.blue,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  quizPrimaryButtonDisabled: {
    backgroundColor: colors.neutral.gray200,
  },
  quizPrimaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quizPrimaryButtonIcon: {
    marginTop: 1,
  },
  quizPrimaryLabel: {
    color: colors.neutral.white,
    fontWeight: '600',
  },
  quizPrimaryLabelDisabled: {
    color: colors.textSecondary,
  },
  pagerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pagerFooter: {
    marginTop: 16,
    justifyContent: 'center',
  },
  pagerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray100,
  },
  pagerButtonDisabled: {
    opacity: 0.5,
  },
  pagerButtonPressed: {
    backgroundColor: 'rgba(15, 118, 110, 0.12)',
  },
  pagerDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pagerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pagerDotActive: {
    backgroundColor: colors.eco.green[600],
  },
  pagerDotInactive: {
    backgroundColor: colors.neutral.gray300,
  },
  latestAnimatedContainer: {
    marginTop: layout.cardSpacing,
  },
});

export default LearningPage;
