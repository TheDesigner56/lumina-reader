import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { categories, getBooksByCategory } from '../data/books';
// BookCard imported if needed for future use

const { width } = Dimensions.get('window');
const COLUMN_GAP = Spacing.md;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - Spacing.lg * 2 - COLUMN_GAP) / NUM_COLUMNS;

const trendingSearches = [
  'Sci-Fi Bestsellers',
  'Mystery Thrillers',
  'Romance 2024',
  'Self-Help',
  'Fantasy Series',
  'Classic Fiction',
];

const categoryGradientMap = {
  all: ['#8E8E93', '#AEAEB2'],
  fiction: Colors.gradients.fiction,
  mystery: Colors.gradients.mystery,
  romance: Colors.gradients.romance,
  scifi: Colors.gradients.scifi,
  thriller: Colors.gradients.thriller,
  fantasy: Colors.gradients.fantasy,
  selfhelp: Colors.gradients.selfhelp,
};

export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const handleBackToSearch = () => {
    setActiveCategory(null);
  };

  if (activeCategory) {
    const results = getBooksByCategory(activeCategory.id);
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.resultsHeader}>
          <Pressable
            onPress={handleBackToSearch}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedOpacity]}
          >
            <Ionicons name="chevron-back" size={28} color={Colors.accent} />
          </Pressable>
          <Text style={styles.resultsTitle}>{activeCategory.name}</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Spacing.lg,
            paddingBottom: insets.bottom + Spacing.xxxl,
          }}
        >
          <Text style={styles.resultsCount}>
            {results.length} {results.length === 1 ? 'Book' : 'Books'}
          </Text>
          <View style={styles.resultsGrid}>
            {results.map((book, index) => {
              const isLeft = index % 2 === 0;
              return (
                <View
                  key={book.id}
                  style={{
                    width: CARD_WIDTH,
                    marginRight: isLeft ? COLUMN_GAP / 2 : 0,
                    marginLeft: isLeft ? 0 : COLUMN_GAP / 2,
                    marginBottom: Spacing.lg,
                  }}
                >
                  <Pressable
                    onPress={() => handleBookPress(book)}
                    style={({ pressed }) => [pressed && styles.pressedOpacity]}
                  >
                    <LinearGradient
                      colors={book.coverGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[styles.resultCover, { height: CARD_WIDTH * 1.45 }]}
                    />
                    <Text style={styles.resultBookTitle} numberOfLines={2}>
                      {book.title}
                    </Text>
                    <Text style={styles.resultBookAuthor} numberOfLines={1}>
                      {book.author}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top + Spacing.lg,
        paddingBottom: insets.bottom + Spacing.xxxl,
      }}
    >
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.tertiary} />
          <Text style={styles.searchPlaceholder}>Search Books, Authors, Genres</Text>
          <Ionicons name="mic" size={18} color={Colors.tertiary} />
        </View>
      </View>

      {/* Browse Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => {
            const gradient = categoryGradientMap[category.id] || categoryGradientMap.all;
            return (
              <Pressable
                key={category.id}
                onPress={() => handleCategoryPress(category)}
                style={({ pressed }) => [
                  styles.categoryCard,
                  pressed && styles.pressedOpacity,
                ]}
              >
                <LinearGradient
                  colors={gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.categoryIndicator}
                />
                <View style={styles.categoryCardContent}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Trending Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Searches</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingContent}
        >
          {trendingSearches.map((term, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.trendingPill,
                pressed && styles.pressedOpacity,
              ]}
            >
              <Text style={styles.trendingPillText}>{term}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pressedOpacity: {
    opacity: 0.7,
  },
  searchWrapper: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxxl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  searchPlaceholder: {
    flex: 1,
    ...Typography.body,
    color: Colors.tertiary,
    fontSize: 16,
  },
  section: {
    marginBottom: Spacing.xxxl,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.primary,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: COLUMN_GAP,
  },
  categoryCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    flexDirection: 'row',
    ...Shadows.card,
  },
  categoryIndicator: {
    width: 4,
  },
  categoryCardContent: {
    flex: 1,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  categoryName: {
    ...Typography.headline,
    color: Colors.primary,
  },
  trendingContent: {
    paddingHorizontal: Spacing.lg,
  },
  trendingPill: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginRight: Spacing.sm,
  },
  trendingPillText: {
    ...Typography.subheadline,
    color: Colors.primary,
    fontWeight: '500',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPlaceholder: {
    width: 32,
  },
  resultsTitle: {
    ...Typography.title2,
    color: Colors.primary,
  },
  resultsCount: {
    ...Typography.caption,
    color: Colors.secondary,
    marginBottom: Spacing.lg,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultCover: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.cover,
    marginBottom: Spacing.sm,
  },
  resultBookTitle: {
    ...Typography.headline,
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 2,
  },
  resultBookAuthor: {
    ...Typography.caption,
    color: Colors.secondary,
  },
});
