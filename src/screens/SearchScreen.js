import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { categories, books, getBooksByCategory } from '../data/books';

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
  const [query, setQuery] = useState('');

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const handleBackToSearch = () => {
    setActiveCategory(null);
  };

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return books
      .map((book) => {
        let matchCount = 0;

        // Title match
        if (book.title.toLowerCase().includes(trimmed)) {
          matchCount += 1;
        }

        // Author match
        if (book.author.toLowerCase().includes(trimmed)) {
          matchCount += 1;
        }

        // Chapter content matches
        const chapterMatches = book.chapters.filter((ch) => {
          const inTitle = ch.title.toLowerCase().includes(trimmed);
          const inContent = ch.content.toLowerCase().includes(trimmed);
          return inTitle || inContent;
        }).length;

        matchCount += chapterMatches;

        if (matchCount === 0) return null;

        return { book, matchCount };
      })
      .filter(Boolean)
      .sort((a, b) => b.matchCount - a.matchCount);
  }, [query]);

  const isSearching = query.trim().length > 0;

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
      keyboardShouldPersistTaps="handled"
    >
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Books, Authors, Genres"
            placeholderTextColor={Colors.tertiary}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={Colors.tertiary} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Search Results */}
      {isSearching && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Results</Text>
          {searchResults.length === 0 ? (
            <Text style={styles.emptyText}>No books found</Text>
          ) : (
            <View style={{ paddingHorizontal: Spacing.lg }}>
              {searchResults.map(({ book, matchCount }) => (
                <Pressable
                  key={book.id}
                  onPress={() => handleBookPress(book)}
                  style={({ pressed }) => [
                    styles.searchResultRow,
                    pressed && styles.pressedOpacity,
                  ]}
                >
                  <LinearGradient
                    colors={book.coverGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.searchResultCover}
                  />
                  <View style={styles.searchResultInfo}>
                    <Text style={styles.searchResultTitle} numberOfLines={2}>
                      {book.title}
                    </Text>
                    <Text style={styles.searchResultAuthor} numberOfLines={1}>
                      {book.author}
                    </Text>
                    <Text style={styles.searchResultMatches}>
                      {matchCount} {matchCount === 1 ? 'match' : 'matches'}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.tertiary} />
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Browse Categories */}
      {!isSearching && (
        <>
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
                  onPress={() => setQuery(term)}
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
        </>
      )}
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
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.primary,
    fontSize: 16,
    padding: 0,
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
  emptyText: {
    ...Typography.body,
    color: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  searchResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  searchResultCover: {
    width: 56,
    height: 80,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  searchResultInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  searchResultTitle: {
    ...Typography.headline,
    color: Colors.primary,
    marginBottom: 2,
  },
  searchResultAuthor: {
    ...Typography.caption,
    color: Colors.secondary,
    marginBottom: 4,
  },
  searchResultMatches: {
    ...Typography.caption2,
    color: Colors.accent,
    fontWeight: '700',
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
