import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useReading } from '../context/ReadingContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { books } from '../data/books';
import ProgressRing from '../components/ProgressRing';

/* ─── Reusable UI primitives ─── */
function SectionHeader({ title }) {
  return (
    <Text style={[styles.sectionHeader, Typography.caption2]}>{title}</Text>
  );
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function StatCardItem({ value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, Typography.title2]}>{value}</Text>
      <Text style={[styles.statLabel, Typography.caption2]}>{label}</Text>
    </View>
  );
}

function AchievementBadge({ icon, label, color }) {
  return (
    <View style={styles.achievementItem}>
      <View style={[styles.achievementCircle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="#FFFFFF" />
      </View>
      <Text style={[styles.achievementLabel, Typography.caption]}>{label}</Text>
    </View>
  );
}

function RecentBookItem({ book, progress, onContinue, isLast }) {
  return (
    <View style={[styles.recentBookRow, isLast && styles.recentBookRowLast]}>
      <LinearGradient
        colors={book.coverGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.recentBookCover}
      />
      <View style={styles.recentBookInfo}>
        <Text style={[styles.recentBookTitle, Typography.body]} numberOfLines={1}>
          {book.title}
        </Text>
        <Text style={[styles.recentBookAuthor, Typography.caption]}>
          {book.author}
        </Text>
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.round(progress * 100)}%` },
            ]}
          />
        </View>
        <Text style={[styles.progressText, Typography.caption2]}>
          {Math.round(progress * 100)}% complete
        </Text>
      </View>
      <Pressable
        onPress={onContinue}
        style={({ pressed }) => [
          styles.continueButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

function CollectionRow({ icon, title, count, isFirst, isLast, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.collectionRow,
        isFirst && styles.collectionRowFirst,
        isLast && styles.collectionRowLast,
        !isLast && styles.collectionRowBorder,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={icon} size={22} color={Colors.accent} style={styles.collectionIcon} />
      <Text style={[styles.collectionTitle, Typography.body]}>{title}</Text>
      <Text style={[styles.collectionCount, Typography.caption]}>{count}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.tertiary} />
    </Pressable>
  );
}

function SettingRowItem({ icon, iconBg, title, onPress, isFirst, isLast }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        isFirst && styles.settingRowFirst,
        isLast && styles.settingRowLast,
        !isLast && styles.settingRowBorder,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.settingIconContainer, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color="#FFFFFF" />
      </View>
      <Text style={[styles.settingTitle, Typography.body]}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.tertiary} />
    </Pressable>
  );
}

/* ─── Quote Card ─── */
function QuoteCard({ quote, book }) {
  return (
    <View style={styles.quoteCard}>
      <Text style={[styles.quoteText, Typography.body]}>“{quote}”</Text>
      <Text style={[styles.quoteBook, Typography.caption]}>{book}</Text>
    </View>
  );
}

/* ─── Main Screen ─── */
export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const {
    currentlyReading,
    readingGoal,
    readingStats,
    bookmarks,
    highlights,
    quotes,
  } = useReading();

  const goalProgress = readingGoal.todayMinutes / readingGoal.dailyMinutes;
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxWeekly = Math.max(...readingGoal.weeklyData, 1);

  const collections = [
    { icon: 'bookmark-outline', title: 'Bookmarks', count: bookmarks.length },
    { icon: 'pricetag-outline', title: 'Highlights & Quotes', count: highlights.length + quotes.length },
    { icon: 'checkmark-circle-outline', title: 'Finished', count: readingStats.booksRead },
  ];

  const settings = [
    { icon: 'book-outline', title: 'Reading Preferences', iconBg: '#007AFF' },
    { icon: 'notifications-outline', title: 'Notifications', iconBg: '#5856D6' },
    { icon: 'information-circle-outline', title: 'About', iconBg: '#8E8E93' },
  ];

  const achievements = [
    { icon: 'flame', label: '7-Day Streak', color: '#FF9500' },
    { icon: 'book', label: 'Bookworm', color: '#34C759' },
    { icon: 'moon', label: 'Night Owl', color: '#5856D6' },
    { icon: 'sunny', label: 'Early Bird', color: '#FF3B30' },
  ];

  const getBook = (bookId) => books.find((b) => b.id === bookId);

  const handleContinue = (book) => {
    navigation.navigate('Reader', { book, chapterIndex: 0 });
  };

  const avgSession = `${Math.round((readingStats.hoursRead * 60) / Math.max(readingStats.booksRead * 5, 1))} min`;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xxxl }}
    >
      {/* ── Header ── */}
      <Text style={[styles.pageTitle, Typography.largeTitle]}>Profile</Text>

      {/* ── 1. Reading Goal Ring ── */}
      <Card style={styles.goalCard}>
        <View style={styles.goalRingWrapper}>
          <ProgressRing
            size={160}
            strokeWidth={12}
            progress={goalProgress}
            color={Colors.accent}
          >
            <Text style={[Typography.title2, { color: Colors.primary }]}>
              {readingGoal.todayMinutes}
            </Text>
            <Text style={[Typography.caption, { color: Colors.secondary, marginTop: 2 }]}>
              of {readingGoal.dailyMinutes} min
            </Text>
          </ProgressRing>
        </View>

        <View style={styles.streakRow}>
          <Ionicons name="flame" size={18} color="#FF9500" />
          <Text style={[styles.streakText, Typography.body]}>
            {readingGoal.currentStreak} day streak
          </Text>
        </View>

        {/* 7-day dots */}
        <View style={styles.dotsRow}>
          {readingGoal.last7Days.map((met, i) => (
            <View key={i} style={styles.dotWrapper}>
              <View
                style={[
                  styles.dot,
                  met ? styles.dotFilled : styles.dotEmpty,
                ]}
              />
              <Text style={[styles.dotLabel, Typography.caption2]}>
                {dayLabels[i]}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* ── 2. Enhanced Stats ── */}
      <View style={styles.statsGrid}>
        <StatCardItem value={String(readingStats.booksRead)} label="Books Read" />
        <StatCardItem value={`${readingStats.hoursRead}h`} label="Hours Read" />
        <StatCardItem value={`${readingStats.pagesRead}`} label="Pages Read" />
        <StatCardItem value={`${readingStats.streak}`} label="Streak" />
        <StatCardItem value={avgSession} label="Avg Session" />
      </View>

      {/* ── 3. Weekly Reading Chart ── */}
      <View style={styles.sectionWrapper}>
        <SectionHeader title="THIS WEEK" />
        <Card style={styles.activityCard}>
          <View style={styles.barChart}>
            {readingGoal.weeklyData.map((minutes, i) => {
              const heightPercent = (minutes / maxWeekly) * 100;
              return (
                <View key={i} style={styles.barColumn}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { height: `${Math.max(heightPercent, 4)}%` },
                      ]}
                    />
                  </View>
                  <Text style={[styles.barLabel, Typography.caption2]}>
                    {dayLabels[i]}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>
      </View>

      {/* ── 4. Recent Activity ── */}
      <View style={styles.sectionWrapper}>
        <SectionHeader title="RECENT ACTIVITY" />
        <Card>
          {currentlyReading.map((item, index) => {
            const book = getBook(item.bookId);
            if (!book) return null;
            return (
              <RecentBookItem
                key={item.bookId}
                book={book}
                progress={item.progress}
                onContinue={() => handleContinue(book)}
                isLast={index === currentlyReading.length - 1}
              />
            );
          })}
        </Card>
      </View>

      {/* ── 5. Achievements ── */}
      <View style={styles.sectionWrapper}>
        <SectionHeader title="ACHIEVEMENTS" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsScroll}
        >
          {achievements.map((a) => (
            <AchievementBadge
              key={a.label}
              icon={a.icon}
              label={a.label}
              color={a.color}
            />
          ))}
        </ScrollView>
      </View>

      {/* ── 6. Collections Section ── */}
      <View style={styles.sectionWrapper}>
        <SectionHeader title="MY BOOKS" />
        <View style={styles.groupedCard}>
          {collections.map((item, index) => (
            <CollectionRow
              key={item.title}
              icon={item.icon}
              title={item.title}
              count={item.count}
              isFirst={index === 0}
              isLast={index === collections.length - 1}
              onPress={() => {}}
            />
          ))}
        </View>
      </View>

      {/* ── 7. Saved Quotes Preview ── */}
      <View style={styles.sectionWrapper}>
        <SectionHeader title="RECENT QUOTES" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quotesScroll}
        >
          {quotes.map((q) => (
            <QuoteCard key={q.id} quote={q.text} book={q.book} />
          ))}
        </ScrollView>
      </View>

      {/* ── 8. Settings Section ── */}
      <View style={styles.sectionWrapper}>
        <SectionHeader title="SETTINGS" />
        <View style={styles.groupedCard}>
          {settings.map((item, index) => (
            <SettingRowItem
              key={item.title}
              icon={item.icon}
              iconBg={item.iconBg}
              title={item.title}
              isFirst={index === 0}
              isLast={index === settings.length - 1}
              onPress={() => {}}
            />
          ))}
        </View>
      </View>

      {/* ── 9. Pro Banner ── */}
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.banner,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.bannerContent}>
          <View>
            <Text style={[styles.bannerTitle, Typography.headline]}>
              Uni Reader Pro
            </Text>
            <Text style={[styles.bannerSubtitle, Typography.subheadline]}>
              Unlimited offline reading
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.accent} />
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pageTitle: {
    color: Colors.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  pressed: {
    opacity: 0.7,
  },

  /* Cards */
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing.lg,
    ...Shadows.card,
  },
  sectionWrapper: {
    marginTop: Spacing.xxl,
    marginHorizontal: Spacing.lg,
  },
  sectionHeader: {
    color: Colors.secondary,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  groupedCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.card,
  },

  /* Goal Card */
  goalCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  goalRingWrapper: {
    marginBottom: Spacing.lg,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  streakText: {
    color: Colors.secondary,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  dotWrapper: {
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: Spacing.xs,
  },
  dotFilled: {
    backgroundColor: Colors.accent,
  },
  dotEmpty: {
    backgroundColor: '#E5E5EA',
  },
  dotLabel: {
    color: Colors.tertiary,
  },

  /* Stats Grid */
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  statCard: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.card,
  },
  statValue: {
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  /* Activity */
  activityCard: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barTrack: {
    width: 12,
    height: 100,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 6,
  },
  barLabel: {
    color: Colors.tertiary,
    marginTop: Spacing.sm,
  },

  /* Recent Activity */
  recentBookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  recentBookRowLast: {
    borderBottomWidth: 0,
  },
  recentBookCover: {
    width: 48,
    height: 72,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.md,
  },
  recentBookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recentBookTitle: {
    color: Colors.primary,
    marginBottom: 2,
  },
  recentBookAuthor: {
    color: Colors.secondary,
    marginBottom: Spacing.sm,
  },
  progressBarTrack: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 2,
    marginBottom: Spacing.xs,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  progressText: {
    color: Colors.tertiary,
  },
  continueButton: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    marginLeft: Spacing.md,
  },
  continueButtonText: {
    color: Colors.inverse,
    fontSize: 13,
    fontWeight: '600',
  },

  /* Achievements */
  achievementsScroll: {
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  achievementItem: {
    alignItems: 'center',
    width: 72,
  },
  achievementCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  achievementLabel: {
    color: Colors.secondary,
    textAlign: 'center',
  },

  /* Collections */
  collectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
  },
  collectionRowFirst: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  collectionRowLast: {
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  collectionRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  collectionIcon: {
    marginRight: Spacing.md,
  },
  collectionTitle: {
    flex: 1,
    color: Colors.primary,
  },
  collectionCount: {
    color: Colors.secondary,
    marginRight: Spacing.xs,
  },

  /* Quotes */
  quotesScroll: {
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  quoteCard: {
    width: 260,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  quoteText: {
    color: Colors.primary,
    fontStyle: 'italic',
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  quoteBook: {
    color: Colors.secondary,
  },

  /* Settings */
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
  },
  settingRowFirst: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  settingRowLast: {
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  settingRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  settingIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingTitle: {
    flex: 1,
    color: Colors.primary,
  },

  /* Banner */
  banner: {
    backgroundColor: '#E3F2FD',
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    padding: Spacing.lg,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: Colors.primary,
  },
  bannerSubtitle: {
    color: Colors.secondary,
    marginTop: 2,
  },
});
