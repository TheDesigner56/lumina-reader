import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const THEMES = {
  light: {
    bg: Colors.readerBg,
    text: Colors.readerText,
    subText: '#6E6E73',
    border: 'rgba(0,0,0,0.08)',
    navDisabled: '#C7C7CC',
    progressTrack: '#E5E5EA',
    progressFill: Colors.accent,
    icon: '#1C1C1E',
  },
  sepia: {
    bg: Colors.readerSepia,
    text: '#3E2723',
    subText: '#8D6E63',
    border: 'rgba(62,39,35,0.12)',
    navDisabled: '#D7CCC8',
    progressTrack: '#D7CCC8',
    progressFill: '#8D6E63',
    icon: '#3E2723',
  },
  dark: {
    bg: Colors.readerDark,
    text: '#E5E5EA',
    subText: '#8E8E93',
    border: 'rgba(255,255,255,0.08)',
    navDisabled: '#48484A',
    progressTrack: '#48484A',
    progressFill: '#0A84FF',
    icon: '#E5E5EA',
  },
};

function DropCapParagraph({ text, theme, isFirst }) {
  if (!isFirst || text.length < 2) {
    return (
      <Text style={[styles.paragraph, Typography.reader, { color: theme.text }]}>
        {text}
      </Text>
    );
  }

  const firstLetter = text.charAt(0);
  const rest = text.slice(1);

  return (
    <Text style={[styles.paragraph, Typography.reader, { color: theme.text }]}>
      <Text style={[styles.dropCap, { color: theme.text }]}>{firstLetter}</Text>
      {rest}
    </Text>
  );
}

export default function ReaderScreen({ navigation, route }) {
  const { book, chapterIndex: initialChapterIndex = 0 } = route.params;
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [showUI, setShowUI] = useState(true);
  const [themeKey, setThemeKey] = useState('light');
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);

  const theme = THEMES[themeKey];
  const chapter = book.chapters[chapterIndex];
  const totalChapters = book.chapters.length;
  const progress = totalChapters > 0 ? chapterIndex / (totalChapters - 1) : 0;

  const uiOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(uiOpacity, {
      toValue: showUI ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [showUI]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [chapterIndex]);

  const toggleUI = useCallback(() => {
    setShowUI((prev) => !prev);
  }, []);

  const goToChapter = useCallback((index) => {
    if (index >= 0 && index < totalChapters) {
      setChapterIndex(index);
    }
  }, [totalChapters]);

  const cycleTheme = useCallback(() => {
    setThemeKey((prev) => (prev === 'light' ? 'sepia' : prev === 'sepia' ? 'dark' : 'light'));
  }, []);

  const paragraphs = chapter.content.split('\n\n').filter(Boolean);

  const isFirstChapter = chapterIndex === 0;
  const isLastChapter = chapterIndex === totalChapters - 1;

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        style={[styles.scrollView, { backgroundColor: theme.bg }]}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{ top: insets.top + 44, bottom: insets.bottom + 80 }}
      >
        <Pressable onPress={toggleUI} style={styles.pressableArea}>
          <View
            style={[
              styles.content,
              {
                paddingTop: insets.top + 52,
                paddingBottom: insets.bottom + 100,
                paddingHorizontal: 24,
              },
            ]}
          >
            <Text
              style={[
                styles.chapterTitle,
                Typography.title2,
                { color: theme.text },
              ]}
            >
              {chapter.title}
            </Text>

            {paragraphs.map((paragraph, index) => (
              <DropCapParagraph
                key={`${chapterIndex}-${index}`}
                text={paragraph}
                theme={theme}
                isFirst={index === 0}
              />
            ))}
          </View>
        </Pressable>
      </ScrollView>

      {/* Top Bar */}
      <Animated.View
        pointerEvents={showUI ? 'auto' : 'none'}
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: theme.bg,
            borderBottomColor: theme.border,
            opacity: uiOpacity,
          },
        ]}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close-outline" size={26} color={theme.icon} />
        </Pressable>

        <View style={styles.headerTitles}>
          <Text
            style={[
              styles.headerBookTitle,
              Typography.caption2,
              { color: theme.subText },
            ]}
            numberOfLines={1}
          >
            {book.title.toUpperCase()}
          </Text>
          <Text
            style={[
              styles.headerChapterTitle,
              Typography.subheadline,
              { color: theme.text, fontWeight: '600' },
            ]}
            numberOfLines={1}
          >
            {chapter.title}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <Pressable
            onPress={cycleTheme}
            style={styles.headerButtonSmall}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={
                themeKey === 'light'
                  ? 'sunny-outline'
                  : themeKey === 'sepia'
                  ? 'partly-sunny-outline'
                  : 'moon-outline'
              }
              size={20}
              color={theme.icon}
            />
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={styles.headerButtonSmall}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.aaButton, { color: theme.icon }]}>Aa</Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* Bottom Bar */}
      <Animated.View
        pointerEvents={showUI ? 'auto' : 'none'}
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 8,
            backgroundColor: theme.bg,
            borderTopColor: theme.border,
            opacity: uiOpacity,
          },
        ]}
      >
        {/* Progress Slider */}
        <View style={styles.progressWrapper}>
          <Slider
            style={styles.slider}
            value={progress}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={theme.progressFill}
            maximumTrackTintColor={theme.progressTrack}
            thumbTintColor={theme.progressFill}
            onValueChange={(val) => {
              const idx = Math.round(val * (totalChapters - 1));
              if (idx !== chapterIndex) goToChapter(idx);
            }}
          />
          <View style={styles.progressLabels}>
            <Text style={[styles.progressLabel, { color: theme.subText }]}>
              {chapterIndex + 1} of {totalChapters}
            </Text>
            <Text style={[styles.progressLabel, { color: theme.subText }]}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>

        {/* Chapter Navigation */}
        <View style={styles.navRow}>
          <Pressable
            onPress={() => goToChapter(chapterIndex - 1)}
            disabled={isFirstChapter}
            style={({ pressed }) => [
              styles.navButton,
              pressed && !isFirstChapter && styles.navButtonPressed,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={isFirstChapter ? theme.navDisabled : theme.icon}
            />
            <Text
              style={[
                styles.navButtonText,
                Typography.subheadline,
                {
                  color: isFirstChapter ? theme.navDisabled : theme.icon,
                  fontWeight: '500',
                },
              ]}
            >
              Previous
            </Text>
          </Pressable>

          <Pressable
            onPress={() => goToChapter(chapterIndex + 1)}
            disabled={isLastChapter}
            style={({ pressed }) => [
              styles.navButton,
              pressed && !isLastChapter && styles.navButtonPressed,
            ]}
          >
            <Text
              style={[
                styles.navButtonText,
                Typography.subheadline,
                {
                  color: isLastChapter ? theme.navDisabled : theme.icon,
                  fontWeight: '500',
                },
              ]}
            >
              Next
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isLastChapter ? theme.navDisabled : theme.icon}
            />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  pressableArea: {
    flex: 1,
  },
  content: {
    minHeight: SCREEN_HEIGHT,
    paddingTop: 20,
  },
  chapterTitle: {
    marginBottom: Spacing.xxl,
    marginTop: Spacing.lg,
  },
  paragraph: {
    marginBottom: Spacing.lg,
  },
  dropCap: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 44,
    fontFamily: 'Georgia',
    marginRight: 4,
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
    paddingBottom: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonSmall: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aaButton: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  headerTitles: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  headerBookTitle: {
    marginBottom: 2,
    letterSpacing: 0.4,
  },
  headerChapterTitle: {
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
  },
  progressWrapper: {
    marginBottom: Spacing.sm,
  },
  slider: {
    width: '100%',
    height: 28,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: -4,
  },
  progressLabel: {
    ...Typography.caption2,
    fontWeight: '500',
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
    paddingHorizontal: Spacing.sm,
    minHeight: 40,
  },
  navButtonPressed: {
    opacity: 0.6,
  },
  navButtonText: {
    marginHorizontal: 4,
  },
});
