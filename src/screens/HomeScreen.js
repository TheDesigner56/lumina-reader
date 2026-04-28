import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { books, getTrendingBooks, getRecommendedBooks } from '../data/books';
import BookCard from '../components/BookCard';
import ProgressBookCard from '../components/ProgressBookCard';

const continueReadingData = [
  { book: books[0], progress: 0.34 },
  { book: books[1], progress: 0.72 },
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const trending = getTrendingBooks();
  const recommended = getRecommendedBooks();

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + Spacing.md,
        paddingBottom: insets.bottom + Spacing.xxl,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandSub}>Good evening</Text>
          <Text style={styles.brandName}>Uni Reader</Text>
        </View>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}
        >
          <Ionicons name="settings-outline" size={22} color={Colors.primaryMuted} />
        </Pressable>
      </View>

      {/* Continue Reading */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
        >
          {continueReadingData.map(({ book, progress }) => (
            <ProgressBookCard
              key={book.id}
              book={book}
              progress={progress}
              onPress={() => handleBookPress(book)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Trending Now */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
        >
          {trending.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPress={() => handleBookPress(book)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Recommended For You */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
        </View>
        <View style={styles.verticalList}>
          {recommended.map((book) => (
            <Pressable
              key={book.id}
              onPress={() => handleBookPress(book)}
              style={({ pressed }) => [
                styles.recommendedCard,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.recommendedCover,
                  { backgroundColor: book.coverGradient[0] },
                ]}
              />
              <View style={styles.recommendedInfo}>
                <Text style={styles.recommendedTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.recommendedAuthor} numberOfLines={1}>
                  {book.author}
                </Text>
                <View style={styles.recommendedMeta}>
                  <Ionicons name="star" size={12} color={Colors.accent} />
                  <Text style={styles.recommendedRating}>{book.rating}</Text>
                  <Text style={styles.recommendedDot}>·</Text>
                  <Text style={styles.recommendedPages}>{book.pages} pages</Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.primaryMuted}
                style={styles.chevron}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  brandSub: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  brandName: {
    ...Typography.h1,
    color: Colors.primary,
    fontSize: 34,
    letterSpacing: -1,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.primary,
  },
  seeAll: {
    ...Typography.button,
    color: Colors.secondaryLight,
    fontSize: 14,
  },
  horizontalContent: {
    paddingHorizontal: Spacing.lg,
  },
  verticalList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  recommendedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  recommendedCover: {
    width: 64,
    height: 90,
    borderRadius: BorderRadius.md,
  },
  recommendedInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  recommendedTitle: {
    ...Typography.h4,
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 2,
  },
  recommendedAuthor: {
    ...Typography.bodySmall,
    color: Colors.primaryMuted,
    marginBottom: 6,
  },
  recommendedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedRating: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '700',
    marginLeft: 4,
  },
  recommendedDot: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    marginHorizontal: 6,
  },
  recommendedPages: {
    ...Typography.caption,
    color: Colors.primaryMuted,
  },
  chevron: {
    marginLeft: 'auto',
  },
});
