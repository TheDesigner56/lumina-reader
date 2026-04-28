import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

export default function ProgressBookCard({ book, progress, onPress }) {
  const progressPercent = Math.round(progress * 100);
  const currentPage = Math.round(book.pages * progress);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={book.coverGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cover}
      >
        <View style={styles.coverOverlay} />
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>

        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
            <Text style={styles.progressPages}>
              {currentPage} / {book.pages} pages
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.md,
    width: 300,
    ...Shadows.medium,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cover: {
    width: 90,
    height: 130,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  title: {
    ...Typography.h4,
    color: Colors.primary,
    marginBottom: 2,
  },
  author: {
    ...Typography.bodySmall,
    color: Colors.primaryMuted,
    marginBottom: Spacing.md,
  },
  progressSection: {
    marginTop: 'auto',
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.full,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressPercent: {
    ...Typography.caption,
    color: Colors.secondaryLight,
    fontWeight: '700',
  },
  progressPages: {
    ...Typography.caption,
    color: Colors.primaryMuted,
  },
});
