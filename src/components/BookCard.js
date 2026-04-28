import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

export default function BookCard({ book, onPress, size = 'medium', style }) {
  const isSmall = size === 'small';
  const coverWidth = isSmall ? 130 : 160;
  const coverHeight = isSmall ? 190 : 240;

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
      <LinearGradient
        colors={book.coverGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cover, { width: coverWidth, height: coverHeight }]}
      >
        <View style={styles.coverOverlay} />
      </LinearGradient>

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
  info: {
    marginTop: Spacing.sm,
    paddingHorizontal: 2,
  },
  title: {
    ...Typography.h4,
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 2,
  },
  author: {
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
