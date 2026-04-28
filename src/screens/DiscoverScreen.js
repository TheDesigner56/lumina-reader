import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { categories, books } from '../data/books';
import CategoryPill from '../components/CategoryPill';

const { width } = Dimensions.get('window');
const COLUMN_GAP = Spacing.md;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - Spacing.lg * 2 - COLUMN_GAP) / NUM_COLUMNS;
const COVER_HEIGHT = CARD_WIDTH * 1.45;

export default function DiscoverScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBooks =
    selectedCategory === 'all'
      ? books
      : books.filter((b) => b.category === selectedCategory);

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={11} color={Colors.accent} style={styles.star} />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Ionicons key={i} name="star-half" size={11} color={Colors.accent} style={styles.star} />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={11} color={Colors.accent} style={styles.star} />);
      }
    }
    return stars;
  };

  const renderBookItem = useCallback(
    ({ item, index }) => {
      const isLeft = index % 2 === 0;
      return (
        <Pressable
          onPress={() => handleBookPress(item)}
          style={({ pressed }) => [
            styles.bookCard,
            { marginRight: isLeft ? COLUMN_GAP / 2 : 0, marginLeft: isLeft ? 0 : COLUMN_GAP / 2 },
            pressed && styles.pressed,
          ]}
        >
          <LinearGradient
            colors={item.coverGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.cover, { width: CARD_WIDTH - (isLeft ? COLUMN_GAP / 2 : COLUMN_GAP / 2), height: COVER_HEIGHT }]}
          >
            <View style={styles.coverOverlay} />
          </LinearGradient>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>
              {item.author}
            </Text>
            <View style={styles.ratingRow}>
              {renderStars(item.rating)}
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [selectedCategory]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.primaryMuted} />
          <Text style={styles.searchPlaceholder}>Search titles, authors, genres...</Text>
        </View>
      </View>

      {/* Category Pills */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryPill
              category={item}
              isActive={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
            />
          )}
          contentContainerStyle={styles.categoriesContent}
        />
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
        </Text>
      </View>

      {/* Book Grid */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: insets.bottom + Spacing.xxl,
        }}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchWrapper: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    gap: 10,
  },
  searchPlaceholder: {
    ...Typography.body,
    color: Colors.primaryMuted,
    fontSize: 15,
  },
  categoriesWrapper: {
    marginBottom: Spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.lg,
  },
  resultsHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  resultsText: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    textTransform: 'uppercase',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  bookCard: {
    width: CARD_WIDTH - COLUMN_GAP / 2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  cover: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  bookInfo: {
    marginTop: Spacing.sm,
  },
  bookTitle: {
    ...Typography.h4,
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 2,
  },
  bookAuthor: {
    ...Typography.bodySmall,
    color: Colors.primaryMuted,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.accent,
    marginLeft: 4,
    fontWeight: '700',
  },
});
