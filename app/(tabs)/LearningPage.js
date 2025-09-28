import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import colors from '../../theme/colors';

const USE_MOCK = true;

const mockArticles = [
  {
    article_id: 'art-1',
    title: 'Cutting Food Waste at Home',
    summary:
      'Simple steps for planning meals, storing ingredients, and using leftovers to reduce waste.',
    reading_time_minutes: 6,
    published_date: '2024-02-12',
  },
  {
    article_id: 'art-2',
    title: 'Commute Smarter: Embrace Active Transport',
    summary:
      'See how short trips by bike or on foot can shrink your carbon footprint and boost wellbeing.',
    reading_time_minutes: 5,
    published_date: '2024-01-28',
  },
  {
    article_id: 'art-3',
    title: 'Greener Energy Bills Explained',
    summary:
      'Understand renewable tariffs, off-peak usage, and energy monitoring to lower household impact.',
    reading_time_minutes: 8,
    published_date: '2023-12-04',
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const ArticleCard = ({ article }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.articleCard}
      accessibilityRole="button"
      accessibilityLabel={`Open article ${article.title}`}
      accessibilityState={{ disabled: false }}
      onPress={() => {}}
    >
      <View style={styles.articleThumbnail} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.articleSummary} numberOfLines={2}>
          {article.summary}
        </Text>
        <View style={styles.articleMetaRow}>
          <Text style={styles.articleMeta}>{`${article.reading_time_minutes} min`}</Text>
          <View style={styles.metaSeparator} />
          <Text style={styles.articleMeta}>{formatDate(article.published_date)}</Text>
        </View>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={colors.neutral.gray600}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const QuizCard = ({ quiz }) => {
  const isCompleted = quiz.status === 'completed';
  const isInProgress = quiz.status === 'in_progress';
  const buttonLabel = isCompleted ? 'Completed' : isInProgress ? 'Continue' : 'Start';

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
          </View>
          <View
            style={[
              styles.quizProgressPill,
              isCompleted && styles.quizProgressPillCompleted,
            ]}
          >
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
          onPress={() => {}}
        >
          <Text
            style={[styles.quizPrimaryLabel, isCompleted && styles.quizPrimaryLabelDisabled]}
          >
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SkeletonCard = ({ style }) => (
  <View style={[styles.skeletonCard, style]} />
);

const EmptyBanner = ({ message }) => (
  <View style={styles.emptyBanner}>
    <Text style={styles.emptyBannerText}>{message}</Text>
  </View>
);

const LearningSection = ({
  title,
  subtitle,
  loading,
  error,
  data,
  renderItem,
  skeletonCount = 3,
  emptyMessage,
}) => {
  if (loading) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <SkeletonCard key={`skeleton-${title}-${idx}`} />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        <EmptyBanner message="Couldn’t load. Pull to retry." />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        <EmptyBanner message={emptyMessage} />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      {data.map((item) => (
        <View key={item.article_id || item.quiz_id} style={styles.sectionItemSpacing}>
          {renderItem({ item })}
        </View>
      ))}
    </View>
  );
};

const LearningPage = () => {
  const [articles, setArticles] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [errorArticles, setErrorArticles] = useState(false);
  const [errorQuizzes, setErrorQuizzes] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadArticles = useCallback(async () => {
    setLoadingArticles(true);
    setErrorArticles(false);

    try {
      if (USE_MOCK) {
        setArticles(mockArticles.slice(0, 3));
      } else {
        setArticles([]);
      }
    } catch (error) {
      setErrorArticles(true);
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  const loadQuizzes = useCallback(async () => {
    setLoadingQuizzes(true);
    setErrorQuizzes(false);

    try {
      if (USE_MOCK) {
        setQuizzes(mockQuizzes.slice(0, 3));
      } else {
        setQuizzes([]);
      }
    } catch (error) {
      setErrorQuizzes(true);
    } finally {
      setLoadingQuizzes(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
    loadQuizzes();
  }, [loadArticles, loadQuizzes]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadArticles(), loadQuizzes()]);
    setRefreshing(false);
  }, [loadArticles, loadQuizzes]);

  const renderArticle = useCallback(({ item }) => <ArticleCard article={item} />, []);
  const renderQuiz = useCallback(({ item }) => <QuizCard quiz={item} />, []);

  const content = useMemo(
    () => (
      <View style={styles.content}>
        <LearningSection
          title="Learning Articles"
          subtitle="Discover tips and insights for sustainable living"
          loading={loadingArticles}
          error={errorArticles}
          data={articles}
          renderItem={renderArticle}
          emptyMessage="No articles yet."
        />

        <LearningSection
          title="Interactive Quizzes"
          subtitle="Test your knowledge and learn something new"
          loading={loadingQuizzes}
          error={errorQuizzes}
          data={quizzes}
          renderItem={renderQuiz}
          emptyMessage="No quizzes yet."
        />
      </View>
    ),
    [articles, errorArticles, errorQuizzes, loadingArticles, loadingQuizzes, renderArticle, renderQuiz]
  );

  return (
    <FlatList
      data={[content]}
      keyExtractor={(_, index) => `learning-section-${index}`}
      renderItem={({ item }) => item}
      ListHeaderComponent={<PageHeader title="Learning Hub" />}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.eco.green[600]} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: colors.background,
  },
  content: {
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sectionItemSpacing: {
    marginTop: 8,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  articleThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.neutral.gray100,
    marginRight: 16,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  articleSummary: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
  },
  articleMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  articleMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  metaSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.neutral.gray300,
    marginHorizontal: 8,
  },
  chevron: {
    marginLeft: 12,
  },
  quizCard: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  quizIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quizContent: {
    flex: 1,
    gap: 12,
  },
  quizHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  quizSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quizProgressPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.neutral.gray100,
  },
  quizProgressPillCompleted: {
    backgroundColor: colors.eco.green[50],
  },
  quizProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  quizProgressTextCompleted: {
    color: colors.eco.green[600],
  },
  quizPrimaryButton: {
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.eco.green[600],
    minHeight: 44,
  },
  quizPrimaryButtonDisabled: {
    backgroundColor: colors.neutral.gray200,
  },
  quizPrimaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral.white,
  },
  quizPrimaryLabelDisabled: {
    color: colors.textSecondary,
  },
  skeletonCard: {
    height: 96,
    borderRadius: 20,
    backgroundColor: colors.neutral.gray100,
    opacity: 0.6,
  },
  emptyBanner: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.neutral.gray100,
  },
  emptyBannerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default LearningPage;
