import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { books } from '../data/books';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HERO_COVER_WIDTH = 180;
const HERO_COVER_HEIGHT = 260;
const SMALL_COVER_WIDTH = 100;
const SMALL_COVER_HEIGHT = 150;

export default function ReadingNowScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const heroBook = books[0];
  const wantToRead = [books[1], books[2], books[3]];
  const finished = [books[4], books[5]];

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Pressable
        onPress={() => handleBookPress(heroBook)}
        style={({ pressed }) => [styles.heroCoverWrapper, pressed && styles.pressed]}
      >
        <LinearGradient
          colors={heroBook.coverGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCover}
        />
      </Pressable>

      <Text style={styles.heroTitle} numberOfLines={2}>
        {heroBook.title}
      </Text>
      <Text style={styles.heroAuthor}>{heroBook.author}</Text>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '34%' }]} />
        </View>
        <Text style={styles.progressCaption}>34%</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => navigation.navigate('Reader', { book: heroBook })}
          style={({ pressed }) => [styles.readButton, pressed && styles.pressed]}
        >
          <Text style={styles.readButtonText}>Read</Text>
        </Pressable>
        <Pressable
          onPress={() => handleBookPress(heroBook)}
          style={({ pressed }) => [styles.infoButton, pressed && styles.pressed]}
        >
          <Text style={styles.infoButtonText}>Info</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderHorizontalBook = (book, size = 'small', showCheckmark = false) => (
    <Pressable
      key={book.id}
      onPress={() => handleBookPress(book)}
      style={({ pressed }) => [
        styles.horizontalBook,
        pressed && styles.pressed,
      ]}
    >
      <View style={size === 'small' ? styles.smallCoverWrapper : styles.finishedCoverWrapper}>
        <LinearGradient
          colors={book.coverGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={size === 'small' ? styles.smallCover : styles.finishedCover}
        />
        {showCheckmark && (
          <View style={styles.checkmarkBadge}>
            <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
          </View>
        )}
      </View>
      <Text style={styles.horizontalTitle} numberOfLines={2}>
        {book.title}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + Spacing.lg,
        paddingBottom: insets.bottom + Spacing.xxxl,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reading Now</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
      </View>

      {/* Hero */}
      {renderHeroSection()}

      {/* Want to Read */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Want to Read</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
        >
          {wantToRead.map((book) => renderHorizontalBook(book, 'small'))}
        </ScrollView>
      </View>

      {/* Finished */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Finished</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
        >
          {finished.map((book) => renderHorizontalBook(book, 'small', true))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    ...Typography.largeTitle,
    color: Colors.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.inverse,
    letterSpacing: -0.2,
  },
  pressed: {
    opacity: 0.7,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxxl,
  },
  heroCoverWrapper: {
    ...Shadows.cover,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xl,
  },
  heroCover: {
    width: HERO_COVER_WIDTH,
    height: HERO_COVER_HEIGHT,
    borderRadius: BorderRadius.md,
  },
  heroTitle: {
    ...Typography.title2,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    maxWidth: SCREEN_WIDTH - Spacing.lg * 2,
  },
  heroAuthor: {
    ...Typography.subheadline,
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  progressContainer: {
    width: HERO_COVER_WIDTH,
    marginBottom: Spacing.lg,
  },
  progressTrack: {
    height: 2,
    backgroundColor: Colors.separator,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
  },
  progressCaption: {
    ...Typography.caption,
    color: Colors.secondary,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  readButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: BorderRadius.lg,
    minWidth: 120,
    alignItems: 'center',
  },
  readButtonText: {
    ...Typography.headline,
    color: Colors.inverse,
    fontSize: 16,
  },
  infoButton: {
    backgroundColor: Colors.surfaceSecondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: BorderRadius.lg,
    minWidth: 120,
    alignItems: 'center',
  },
  infoButtonText: {
    ...Typography.headline,
    color: Colors.primary,
    fontSize: 16,
  },
  section: {
    marginBottom: Spacing.xxxl,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.primary,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  horizontalContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  horizontalBook: {
    width: SMALL_COVER_WIDTH,
    alignItems: 'flex-start',
  },
  smallCoverWrapper: {
    ...Shadows.cover,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  smallCover: {
    width: SMALL_COVER_WIDTH,
    height: SMALL_COVER_HEIGHT,
    borderRadius: BorderRadius.sm,
  },
  finishedCoverWrapper: {
    ...Shadows.cover,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  finishedCover: {
    width: SMALL_COVER_WIDTH,
    height: SMALL_COVER_HEIGHT,
    borderRadius: BorderRadius.sm,
  },
  checkmarkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalTitle: {
    ...Typography.caption,
    color: Colors.primary,
    lineHeight: 18,
  },
});
