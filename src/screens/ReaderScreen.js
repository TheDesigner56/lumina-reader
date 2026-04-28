import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ReaderScreen({ navigation, route }) {
  const { book, chapterIndex: initialChapterIndex = 0 } = route.params;
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [showUI, setShowUI] = useState(true);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);

  const chapter = book.chapters[chapterIndex];
  const totalChapters = book.chapters.length;
  const progress = totalChapters > 0 ? (chapterIndex + 1) / totalChapters : 0;

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [chapterIndex]);

  const toggleUI = useCallback(() => {
    setShowUI((prev) => !prev);
  }, []);

  const goToChapter = useCallback((index) => {
    if (index >= 0 && index < totalChapters) {
      setChapterIndex(index);
      setShowUI(true);
    }
  }, [totalChapters]);

  const paragraphs = chapter.content.split('\n\n').filter(Boolean);

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={toggleUI} style={styles.pressableArea}>
          <View
            style={[
              styles.content,
              {
                paddingTop: insets.top + (showUI ? 60 : Spacing.lg),
                paddingBottom: insets.bottom + Spacing.xl,
              },
            ]}
          >
            <Text style={[styles.chapterTitle, Typography.h2]}>{chapter.title}</Text>
            {paragraphs.map((paragraph, index) => (
              <Text key={index} style={[styles.paragraph, Typography.reader]}>
                {paragraph}
              </Text>
            ))}
          </View>
        </Pressable>
      </ScrollView>

      {/* Custom Header */}
      {showUI && (
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.primary} />
          </Pressable>
          <View style={styles.headerTitles}>
            <Text style={styles.headerBookTitle} numberOfLines={1}>
              {book.title}
            </Text>
            <Text style={styles.headerChapterTitle} numberOfLines={1}>
              {chapter.title}
            </Text>
          </View>
          <View style={styles.headerButton} />
        </View>
      )}

      {/* Footer with Progress and Navigation */}
      {showUI && (
        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, Spacing.md) },
          ]}
        >
          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Chapter {chapterIndex + 1} of {totalChapters}
            </Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navRow}>
            <Pressable
              onPress={() => goToChapter(chapterIndex - 1)}
              disabled={chapterIndex === 0}
              style={({ pressed }) => [
                styles.navButton,
                chapterIndex === 0 && styles.navButtonDisabled,
                pressed && styles.navButtonPressed,
              ]}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color={chapterIndex === 0 ? Colors.primaryMuted : Colors.primary}
              />
              <Text
                style={[
                  styles.navButtonText,
                  chapterIndex === 0 && styles.navButtonTextDisabled,
                ]}
              >
                Previous
              </Text>
            </Pressable>

            <Pressable
              onPress={() => goToChapter(chapterIndex + 1)}
              disabled={chapterIndex === totalChapters - 1}
              style={({ pressed }) => [
                styles.navButton,
                chapterIndex === totalChapters - 1 && styles.navButtonDisabled,
                pressed && styles.navButtonPressed,
              ]}
            >
              <Text
                style={[
                  styles.navButtonText,
                  chapterIndex === totalChapters - 1 &&
                    styles.navButtonTextDisabled,
                ]}
              >
                Next
              </Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={
                  chapterIndex === totalChapters - 1
                    ? Colors.primaryMuted
                    : Colors.primary
                }
              />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  pressableArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    minHeight: SCREEN_HEIGHT,
  },
  chapterTitle: {
    color: Colors.primary,
    marginBottom: Spacing.xl,
  },
  paragraph: {
    color: '#F5F5F7',
    marginBottom: Spacing.lg,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: 'rgba(13, 13, 15, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitles: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  headerBookTitle: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  headerChapterTitle: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: 'rgba(13, 13, 15, 0.92)',
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
    zIndex: 10,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.primaryMuted,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  progressBarBackground: {
    height: 2,
    backgroundColor: Colors.surfaceLighter,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonPressed: {
    opacity: 0.7,
  },
  navButtonText: {
    ...Typography.button,
    color: Colors.primary,
    marginHorizontal: 6,
  },
  navButtonTextDisabled: {
    color: Colors.primaryMuted,
  },
});
