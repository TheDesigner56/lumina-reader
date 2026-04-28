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
import StarRating from '../components/StarRating';
import { Colors, Typography, Spacing, Shadows, BorderRadius } from '../constants/theme';

export default function BookDetailScreen({ navigation, route }) {
  const { book } = route.params;
  const insets = useSafeAreaInsets();

  const handleStartReading = (chapterIndex = 0) => {
    navigation.navigate('Reader', { book, chapterIndex });
  };

  const previewChapters = book.chapters.slice(0, 3);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Spacing.xxxl + insets.bottom + 80,
        }}
      >
        {/* Hero Cover */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={book.coverGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.heroGradient, { height: 280 }]}
          >
            <View style={[styles.coverContent, { paddingTop: insets.top + Spacing.lg }]}>
              <Ionicons name="book" size={80} color="rgba(255,255,255,0.15)" />
            </View>
          </LinearGradient>

          {/* Back Button */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { top: insets.top + Spacing.md }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.title, Typography.h1]}>{book.title}</Text>
          <Text style={[styles.author, Typography.body]}>{book.author}</Text>

          <View style={styles.ratingRow}>
            <StarRating rating={book.rating} size={16} />
            <Text style={styles.ratingText}>{book.rating.toFixed(1)}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{book.pages}</Text>
              <Text style={styles.statLabel}>Pages</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{book.readTime}</Text>
              <Text style={styles.statLabel}>Read time</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={[styles.categoryPill, { backgroundColor: book.coverGradient[0] }]}>
              <Text style={styles.categoryText}>
                {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, Typography.h3]}>Synopsis</Text>
            <Text style={[styles.synopsis, Typography.body]}>{book.synopsis}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, Typography.h3]}>Table of Contents</Text>
            {previewChapters.map((chapter, index) => (
              <Pressable
                key={index}
                onPress={() => handleStartReading(index)}
                style={({ pressed }) => [
                  styles.chapterRow,
                  pressed && styles.chapterRowPressed,
                ]}
              >
                <View style={styles.chapterInfo}>
                  <Text style={styles.chapterNumber}>Chapter {index + 1}</Text>
                  <Text style={[styles.chapterTitle, Typography.h4]}>{chapter.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.primaryMuted} />
              </Pressable>
            ))}
            {book.chapters.length > 3 && (
              <Text style={styles.moreChapters}>
                +{book.chapters.length - 3} more chapters
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Start Reading Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        <Pressable
          onPress={() => handleStartReading(0)}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
        >
          <LinearGradient
            colors={[Colors.secondary, Colors.secondaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButtonGradient}
          >
            <Text style={[styles.startButtonText, Typography.button]}>Start Reading</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.primary} style={styles.startButtonIcon} />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroContainer: {
    position: 'relative',
  },
  heroGradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  title: {
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  author: {
    color: Colors.primaryMuted,
    marginBottom: Spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  ratingText: {
    ...Typography.bodySmall,
    color: Colors.primaryMuted,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  statItem: {
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  statValue: {
    ...Typography.h4,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.surfaceLighter,
    marginRight: Spacing.lg,
  },
  categoryPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  categoryText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  synopsis: {
    color: Colors.primaryMuted,
    lineHeight: 26,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  chapterRowPressed: {
    backgroundColor: Colors.surface,
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterNumber: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  chapterTitle: {
    color: Colors.primary,
  },
  moreChapters: {
    ...Typography.bodySmall,
    color: Colors.primaryMuted,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
  },
  startButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  startButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
  startButtonText: {
    color: Colors.primary,
  },
  startButtonIcon: {
    marginLeft: 8,
  },
});
