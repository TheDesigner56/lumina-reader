import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useReading } from '../context/ReadingContext';

export default function BookCard({ book, onPress, size = 'medium', style, progressBadge }) {
  const isSmall = size === 'small';
  const isCompact = size === 'compact';
  const coverWidth = isCompact ? 100 : isSmall ? 130 : 160;
  const coverHeight = isCompact ? 150 : isSmall ? 190 : 240;

  const { currentlyReading, savedBooks } = useReading();

  const readingEntry = currentlyReading.find((item) => item.bookId === book.id);
  const activeProgress = progressBadge !== undefined ? progressBadge : readingEntry ? readingEntry.progress : 0;
  const isSaved = savedBooks.includes(book.id);
  const showProgress = activeProgress > 0 && activeProgress < 1;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={12} color={Colors.accent} style={styles.star} />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Ionicons key={i} name="star-half" size={12} color={Colors.accent} style={styles.star} />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={12} color={Colors.accent} style={styles.star} />);
      }
    }
    return stars;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { width: coverWidth },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={{ position: 'relative' }}>
        <LinearGradient
          colors={book.coverGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cover, { width: coverWidth, height: coverHeight }]}
        >
          <View style={styles.coverOverlay} />
        </LinearGradient>

        {isSaved && (
          <View style={styles.bookmarkBadge}>
            <Ionicons name="bookmark" size={isCompact ? 14 : 16} color={Colors.accent} />
          </View>
        )}

        {showProgress && (
          <View style={styles.progressPill}>
            <Text style={styles.progressPillText}>{Math.round(activeProgress * 100)}%</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.ratingRow}>
          {renderStars(book.rating)}
          <Text style={styles.ratingText}>{book.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: Spacing.md,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
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
  bookmarkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: BorderRadius.full,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressPill: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 7,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  progressPillText: {
    ...Typography.caption2,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 10,
  },
  info: {
    marginTop: Spacing.sm,
    paddingHorizontal: 2,
  },
  title: {
    ...Typography.headline,
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 2,
  },
  author: {
    ...Typography.bodySmall,
    color: Colors.secondary,
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
