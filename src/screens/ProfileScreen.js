import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useReading } from '../context/ReadingContext';
import { books } from '../data/books';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import StatCard from '../components/StatCard';
import SettingRow from '../components/SettingRow';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BOOK_COVER_WIDTH = 110;
const BOOK_COVER_HEIGHT = 160;

function BookCover({ book, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.bookCoverContainer}>
      <LinearGradient
        colors={book.coverGradient}
        style={styles.bookCover}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.bookCoverTitle} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.bookCoverAuthor} numberOfLines={1}>
          {book.author}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { readingStats, savedBooks } = useReading();

  const savedBooksData = savedBooks
    .map((id) => books.find((b) => b.id === id))
    .filter(Boolean);

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const accountSettings = [
    { icon: 'person-outline', title: 'Edit Profile' },
    { icon: 'notifications-outline', title: 'Notifications' },
    { icon: 'download-outline', title: 'Downloaded Books' },
  ];

  const preferenceSettings = [
    { icon: 'book-outline', title: 'Reading Preferences' },
    { icon: 'moon-outline', title: 'Appearance', value: 'Dark' },
  ];

  const supportSettings = [
    { icon: 'help-circle-outline', title: 'Help Center' },
    { icon: 'document-text-outline', title: 'Terms of Service' },
    { icon: 'shield-checkmark-outline', title: 'Privacy Policy' },
  ];

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.email}>jane@example.com</Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatCard
          label="Books Read"
          value={String(readingStats.booksRead)}
          style={styles.statCard}
        />
        <StatCard
          label="Hours Read"
          value={String(readingStats.hoursRead)}
          style={styles.statCard}
        />
        <StatCard
          label="Streak"
          value={`${readingStats.streak} days`}
          style={styles.statCard}
        />
      </View>

      {/* My Library */}
      <View style={styles.librarySection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>My Library</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.libraryScroll}
        >
          {savedBooksData.map((book) => (
            <BookCover
              key={book.id}
              book={book}
              onPress={() => handleBookPress(book)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionHeader}>Account</Text>
      {accountSettings.map((item, index) => (
        <SettingRow
          key={item.title}
          icon={item.icon}
          title={item.title}
          isFirst={index === 0}
          isLast={index === accountSettings.length - 1}
          onPress={() => {}}
        />
      ))}

      {/* Preferences Section */}
      <Text style={styles.sectionHeader}>Preferences</Text>
      {preferenceSettings.map((item, index) => (
        <SettingRow
          key={item.title}
          icon={item.icon}
          title={item.title}
          value={item.value}
          isFirst={index === 0}
          isLast={index === preferenceSettings.length - 1}
          onPress={() => {}}
        />
      ))}

      {/* Support Section */}
      <Text style={styles.sectionHeader}>Support</Text>
      {supportSettings.map((item, index) => (
        <SettingRow
          key={item.title}
          icon={item.icon}
          title={item.title}
          isFirst={index === 0}
          isLast={index === supportSettings.length - 1}
          onPress={() => {}}
        />
      ))}

      {/* Upgrade Banner */}
      <Pressable onPress={() => {}} style={styles.bannerContainer}>
        <LinearGradient
          colors={['#8B5CF6', '#A78BFA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerContent}>
            <View>
              <Text style={styles.bannerTitle}>Upgrade to Pro</Text>
              <Text style={styles.bannerSubtitle}>
                Unlock unlimited access
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#fff"
              style={styles.bannerChevron}
            />
          </View>
        </LinearGradient>
      </Pressable>

      <View style={{ height: insets.bottom + Spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    ...Typography.h2,
    color: Colors.primary,
  },
  name: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.bodySmall,
    color: Colors.primaryMuted,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
  },
  librarySection: {
    marginBottom: Spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.primary,
  },
  seeAll: {
    ...Typography.bodySmall,
    color: Colors.secondary,
    fontWeight: '600',
  },
  libraryScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  bookCoverContainer: {
    marginRight: Spacing.md,
  },
  bookCover: {
    width: BOOK_COVER_WIDTH,
    height: BOOK_COVER_HEIGHT,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    justifyContent: 'flex-end',
    ...Shadows.small,
  },
  bookCoverTitle: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 2,
  },
  bookCoverAuthor: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(245,245,247,0.7)',
  },
  sectionHeader: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  bannerContainer: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.xl,
  },
  banner: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    ...Typography.h4,
    color: '#fff',
    marginBottom: 2,
  },
  bannerSubtitle: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.85)',
  },
  bannerChevron: {
    marginLeft: Spacing.sm,
  },
});
