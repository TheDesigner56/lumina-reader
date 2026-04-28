import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { books } from '../data/books';
import BookCard from '../components/BookCard';

function GoldStars({ rating, size = 16 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let iconName;
    if (rating >= i - 0.25) {
      iconName = 'star';
    } else if (rating >= i - 0.75) {
      iconName = 'star-half';
    } else {
      iconName = 'star-outline';
    }
    stars.push(
      <Ionicons
        key={i}
        name={iconName}
        size={size}
        color="#FF9500"
        style={i < 5 ? styles.starMargin : undefined}
      />
    );
  }
  return <View style={styles.starsContainer}>{stars}</View>;
}

export default function BookDetailScreen({ navigation, route }) {
  const { book } = route.params;
  const insets = useSafeAreaInsets();

  const handleStartReading = (chapterIndex = 0) => {
    navigation.navigate('Reader', { book, chapterIndex });
  };

  const relatedBooks = books.filter((b) => b.id !== book.id).slice(0, 4);

  const handleBookPress = (relatedBook) => {
    navigation.navigate('BookDetail', { book: relatedBook });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + Spacing.xxxl,
        }}
      >
        {/* Back Chevron */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backChevron,
            pressed && styles.pressedOpacity,
          ]}
        >
          <Ionicons name="chevron-back" size={32} color={Colors.primary} />
        </Pressable>

        {/* Hero Cover */}
        <View style={styles.heroSection}>
          <View style={styles.coverWrapper}>
            <LinearGradient
              colors={book.coverGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cover}
            >
              <View style={styles.coverOverlay} />
            </LinearGradient>
          </View>

          {/* Title & Author */}
          <Text style={[styles.title, Typography.title1]}>{book.title}</Text>
          <Text style={[styles.author, Typography.subheadline]}>{book.author}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <GoldStars rating={book.rating} />
            <Text style={styles.ratingValue}>{book.rating.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>(128 Ratings)</Text>
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <Pressable
              onPress={() => handleStartReading(0)}
              style={({ pressed }) => [
                styles.readButton,
                pressed && styles.pressedOpacity,
              ]}
            >
              <Text style={styles.readButtonText}>Read</Text>
            </Pressable>
            <Pressable
              onPress={() => handleStartReading(0)}
              style={({ pressed }) => [
                styles.sampleButton,
                pressed && styles.pressedOpacity,
              ]}
            >
              <Text style={styles.sampleButtonText}>Sample</Text>
            </Pressable>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, Typography.headline]}>Description</Text>
          <Text style={[styles.synopsis, Typography.body]}>{book.synopsis}</Text>
        </View>

        {/* Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{book.pages}</Text>
            <Text style={styles.infoLabel}>Pages</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{book.readTime}</Text>
            <Text style={styles.infoLabel}>Read Time</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>
              {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
            </Text>
            <Text style={styles.infoLabel}>Category</Text>
          </View>
        </View>

        {/* Chapters */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, Typography.headline]}>Table of Contents</Text>
          <View style={styles.chaptersList}>
            {book.chapters.map((chapter, index) => (
              <Pressable
                key={index}
                onPress={() => handleStartReading(index)}
                style={({ pressed }) => [
                  styles.chapterRow,
                  pressed && styles.pressedOpacity,
                ]}
              >
                <Text style={[styles.chapterTitle, Typography.body]}>{chapter.title}</Text>
                <Ionicons name="chevron-forward" size={18} color={Colors.tertiary} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Related Books */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, Typography.headline]}>Related Books</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedContent}
          >
            {relatedBooks.map((relatedBook) => (
              <BookCard
                key={relatedBook.id}
                book={relatedBook}
                onPress={() => handleBookPress(relatedBook)}
                size="small"
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
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
  backChevron: {
    marginTop: Spacing.lg,
    marginLeft: Spacing.lg,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  coverWrapper: {
    ...Shadows.cover,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xxl,
  },
  cover: {
    width: 200,
    height: 300,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  author: {
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starMargin: {
    marginRight: 2,
  },
  ratingValue: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: '600',
    marginLeft: 6,
  },
  ratingCount: {
    ...Typography.caption,
    color: Colors.tertiary,
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  readButton: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.lg,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readButtonText: {
    ...Typography.button,
    color: Colors.inverse,
  },
  sampleButton: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: BorderRadius.lg,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sampleButtonText: {
    ...Typography.button,
    color: Colors.primary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xxxl,
    marginBottom: Spacing.xxxl,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxxl,
  },
  sectionTitle: {
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  synopsis: {
    color: Colors.secondary,
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxxl,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoValue: {
    ...Typography.headline,
    color: Colors.primary,
    marginBottom: 2,
  },
  infoLabel: {
    ...Typography.caption,
    color: Colors.tertiary,
  },
  infoDivider: {
    width: StyleSheet.hairlineWidth,
    height: 32,
    backgroundColor: Colors.separator,
    marginHorizontal: Spacing.lg,
  },
  chaptersList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  chapterTitle: {
    color: Colors.primary,
    flex: 1,
  },
  relatedContent: {
    paddingRight: Spacing.lg,
  },
});
