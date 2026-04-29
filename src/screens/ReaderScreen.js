import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useReaderSettings } from '../context/ReaderSettingsContext';
import ReaderSettingsPanel from '../components/ReaderSettingsPanel';
import ReadingRuler from '../components/ReadingRuler';
import BookmarkButton from '../components/BookmarkButton';
import { Colors } from '../constants/theme';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

function HighlightedSnippet({ snippet, query, baseStyle }) {
  if (!query.trim() || !snippet) {
    return <Text style={baseStyle} numberOfLines={2}>{snippet}</Text>;
  }
  const lowerQuery = query.toLowerCase();
  const parts = [];
  let remaining = snippet;
  let safety = 0;
  while (remaining.length > 0 && safety < 100) {
    const idx = remaining.toLowerCase().indexOf(lowerQuery);
    if (idx === -1) {
      parts.push(<Text key={`rest-${safety}`}>{remaining}</Text>);
      break;
    }
    if (idx > 0) {
      parts.push(<Text key={`pre-${safety}`}>{remaining.slice(0, idx)}</Text>);
    }
    parts.push(
      <Text key={`match-${safety}`} style={{ backgroundColor: Colors.accentLight, color: Colors.primary, fontWeight: '600' }}>
        {remaining.slice(idx, idx + query.length)}
      </Text>
    );
    remaining = remaining.slice(idx + query.length);
    safety++;
  }
  return <Text style={baseStyle} numberOfLines={2}>{parts}</Text>;
}

function DropCapParagraph({ text, theme, isFirst, fontSize, lineHeight, fontFamily, boldText, textAlign }) {
  const paragraphStyle = {
    fontSize,
    lineHeight,
    color: theme.text,
    fontFamily,
    fontWeight: boldText ? '700' : '400',
    textAlign,
  };

  if (!isFirst || text.length < 2) {
    return (
      <Text style={[styles.paragraph, paragraphStyle]}>
        {text}
      </Text>
    );
  }

  const firstLetter = text.charAt(0);
  const rest = text.slice(1);

  return (
    <Text style={[styles.paragraph, paragraphStyle]}>
      <Text style={[styles.dropCap, { color: theme.text, fontFamily }]}>{firstLetter}</Text>
      {rest}
    </Text>
  );
}

export default function ReaderScreen({ navigation, route }) {
  const { book, chapterIndex: initialChapterIndex = 0 } = route.params;
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [showUI, setShowUI] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);

  const {
    settings,
    theme,
    fontSize,
    margin,
    fontFamily,
    boldText,
  } = useReaderSettings();

  const chapter = book.chapters[chapterIndex];
  const totalChapters = book.chapters.length;
  const progress = totalChapters > 0 ? chapterIndex / (totalChapters - 1) : 0;

  const uiOpacity = useRef(new Animated.Value(1)).current;
  const swipeX = useRef(new Animated.Value(0)).current;
  const leftIndicatorOpacity = useRef(new Animated.Value(0)).current;
  const rightIndicatorOpacity = useRef(new Animated.Value(0)).current;

  const lineHeight = Math.round(fontSize * settings.lineSpacing);

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
    if (showSettings) {
      setShowSettings(false);
      return;
    }
    if (showSearch) {
      setShowSearch(false);
      return;
    }
    setShowUI((prev) => !prev);
  }, [showSettings, showSearch]);

  const goToChapter = useCallback((index) => {
    if (index >= 0 && index < totalChapters) {
      setChapterIndex(index);
      setShowSearch(false);
    }
  }, [totalChapters]);

  const handleScroll = useCallback((event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const maxScroll = Math.max(1, contentSize.height - layoutMeasurement.height);
    const progress = contentOffset.y / maxScroll;
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  }, []);

  const paragraphs = chapter.content.split('\n\n').filter(Boolean);

  const isFirstChapter = chapterIndex === 0;
  const isLastChapter = chapterIndex === totalChapters - 1;

  // Time remaining estimate
  const minutesLeft = useMemo(() => {
    let remainingWords = 0;
    for (let i = chapterIndex; i < totalChapters; i++) {
      remainingWords += book.chapters[i].content.split(/\s+/).filter(Boolean).length;
    }
    return Math.max(1, Math.ceil(remainingWords / 200));
  }, [chapterIndex, totalChapters, book]);

  // Search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return book.chapters
      .map((ch, idx) => {
        const titleMatch = ch.title.toLowerCase().includes(q);
        const contentLower = ch.content.toLowerCase();
        const contentIdx = contentLower.indexOf(q);
        if (titleMatch || contentIdx !== -1) {
          let snippet = '';
          if (contentIdx !== -1) {
            const start = Math.max(0, contentIdx - 40);
            const end = Math.min(ch.content.length, contentIdx + q.length + 60);
            snippet = '...' + ch.content.slice(start, end).trim() + (end < ch.content.length ? '...' : '');
          }
          return { chapterIndex: idx, title: ch.title, snippet };
        }
        return null;
      })
      .filter(Boolean);
  }, [searchQuery, book]);

  // Swipe gesture
  const swipeThreshold = 80;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 8 && Math.abs(gestureState.dy) < 40;
      },
      onPanResponderMove: (_, gestureState) => {
        swipeX.setValue(gestureState.dx);
        if (gestureState.dx > 20 && !isFirstChapter) {
          leftIndicatorOpacity.setValue(Math.min(1, gestureState.dx / swipeThreshold));
        } else if (gestureState.dx < -20 && !isLastChapter) {
          rightIndicatorOpacity.setValue(Math.min(1, Math.abs(gestureState.dx) / swipeThreshold));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        Animated.parallel([
          Animated.spring(swipeX, { toValue: 0, useNativeDriver: true, friction: 8 }),
          Animated.timing(leftIndicatorOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(rightIndicatorOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();

        if (gestureState.dx < -swipeThreshold && !isLastChapter) {
          goToChapter(chapterIndex + 1);
        } else if (gestureState.dx > swipeThreshold && !isFirstChapter) {
          goToChapter(chapterIndex - 1);
        }
      },
    })
  ).current;

  const renderChapterDots = () => (
    <View style={styles.chapterDots}>
      {book.chapters.map((_, idx) => (
        <View
          key={idx}
          style={[
            styles.chapterDot,
            idx === chapterIndex && [styles.chapterDotActive, { backgroundColor: theme.progressFill }],
            idx < chapterIndex && [styles.chapterDotRead, { backgroundColor: theme.progressTrack }],
            idx > chapterIndex && { backgroundColor: theme.progressTrack },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Brightness overlay */}
      {settings.brightness < 1 && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#000',
              opacity: 1 - settings.brightness,
              zIndex: 50,
              pointerEvents: 'none',
            },
          ]}
        />
      )}

      {/* Reading Ruler */}
      <ReadingRuler visible={showRuler} opacity={0.45} />

      {/* Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        style={[styles.scrollView, { backgroundColor: theme.bg }]}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{ top: insets.top + 44, bottom: insets.bottom + 80 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Pressable onPress={toggleUI} style={styles.pressableArea}>
          <View
            style={[
              styles.content,
              {
                paddingTop: insets.top + 60,
                paddingBottom: insets.bottom + 120,
                paddingHorizontal: margin,
              },
            ]}
          >
            <Text
              style={[
                styles.chapterTitle,
                {
                  fontSize: fontSize + 4,
                  lineHeight: lineHeight + 4,
                  color: theme.text,
                  fontFamily,
                  fontWeight: boldText ? '700' : '600',
                },
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
                fontSize={fontSize}
                lineHeight={lineHeight}
                fontFamily={fontFamily}
                boldText={boldText}
                textAlign={settings.textAlign}
              />
            ))}
          </View>
        </Pressable>
      </ScrollView>

      {/* Swipe Overlay */}
      <Animated.View
        style={StyleSheet.absoluteFill}
        pointerEvents={showUI ? 'auto' : 'none'}
        {...panResponder.panHandlers}
      />

      {/* Swipe Indicators */}
      <Animated.View
        style={[
          styles.swipeIndicator,
          styles.swipeIndicatorLeft,
          { opacity: leftIndicatorOpacity },
        ]}
        pointerEvents="none"
      >
        <Ionicons name="chevron-back" size={44} color={theme.icon} />
      </Animated.View>
      <Animated.View
        style={[
          styles.swipeIndicator,
          styles.swipeIndicatorRight,
          { opacity: rightIndicatorOpacity },
        ]}
        pointerEvents="none"
      >
        <Ionicons name="chevron-forward" size={44} color={theme.icon} />
      </Animated.View>

      {/* Edge tap zones */}
      <Pressable
        onPress={() => goToChapter(chapterIndex - 1)}
        disabled={isFirstChapter}
        style={({ pressed }) => [
          styles.edgeZone,
          styles.edgeZoneLeft,
          pressed && !isFirstChapter && { backgroundColor: 'rgba(0,0,0,0.03)' },
        ]}
      />
      <Pressable
        onPress={() => goToChapter(chapterIndex + 1)}
        disabled={isLastChapter}
        style={({ pressed }) => [
          styles.edgeZone,
          styles.edgeZoneRight,
          pressed && !isLastChapter && { backgroundColor: 'rgba(0,0,0,0.03)' },
        ]}
      />

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
              { color: theme.subText },
            ]}
            numberOfLines={1}
          >
            {book.title.toUpperCase()}
          </Text>
          <Text
            style={[
              styles.headerChapterTitle,
              {
                color: theme.text,
                fontWeight: '600',
                fontSize: 15,
                lineHeight: 20,
              },
            ]}
            numberOfLines={1}
          >
            {chapter.title}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <BookmarkButton bookId={book.id} chapterIndex={chapterIndex} size={22} />
          <Pressable
            onPress={() => setShowSearch(true)}
            style={styles.headerButtonSmall}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="search-outline" size={22} color={theme.icon} />
          </Pressable>
          <Pressable
            onPress={() => setShowRuler((prev) => !prev)}
            style={styles.headerButtonSmall}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showRuler ? 'scan-outline' : 'scan'}
              size={22}
              color={showRuler ? Colors.accent : theme.icon}
            />
          </Pressable>
          <Pressable
            onPress={() => setShowSettings(true)}
            style={styles.headerButtonSmall}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.aaButton, { color: theme.icon }]}>Aa</Text>
          </Pressable>
        </View>

        {/* Scroll progress indicator */}
        <View style={[styles.progressBarTrack, { backgroundColor: theme.progressTrack }]}>
          <View style={[styles.progressBarFill, { width: `${scrollProgress * 100}%`, backgroundColor: theme.progressFill }]} />
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
            <View style={styles.progressLeft}>
              {renderChapterDots()}
              <Text style={[styles.progressLabel, { color: theme.subText, marginLeft: 8 }]}>
                {chapterIndex + 1} of {totalChapters}
              </Text>
            </View>
            <Text style={[styles.progressLabel, { color: theme.subText }]}>
              ~{minutesLeft} min left
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

      {/* Settings Panel */}
      <ReaderSettingsPanel visible={showSettings} onClose={() => setShowSettings(false)} />

      {/* Search Overlay */}
      {showSearch && (
        <BlurView intensity={80} tint="light" style={[StyleSheet.absoluteFill, { zIndex: 60 }]}>
          <View style={[styles.searchContainer, { paddingTop: insets.top + 12 }]}>
            <View style={styles.searchHeader}>
              <View style={styles.searchInputWrapper}>
                <Ionicons name="search" size={18} color={Colors.secondary} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search in this book..."
                  placeholderTextColor={Colors.secondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
              </View>
              <Pressable
                onPress={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                style={({ pressed }) => [styles.searchCloseButton, pressed && { opacity: 0.6 }]}
              >
                <Ionicons name="close" size={24} color={Colors.primary} />
              </Pressable>
            </View>

            <ScrollView
              style={styles.searchResults}
              contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
              keyboardShouldPersistTaps="handled"
            >
              {searchResults.length === 0 && searchQuery.trim().length > 0 && (
                <Text style={styles.searchEmpty}>No results found</Text>
              )}
              {searchResults.map((result, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => goToChapter(result.chapterIndex)}
                  style={({ pressed }) => [styles.searchResultItem, pressed && { opacity: 0.6 }]}
                >
                  <Text style={styles.searchResultTitle}>{result.title}</Text>
                  {result.snippet ? (
                    <HighlightedSnippet
                      snippet={result.snippet}
                      query={searchQuery}
                      baseStyle={styles.searchResultSnippet}
                    />
                  ) : null}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </BlurView>
      )}
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
  },
  chapterTitle: {
    marginBottom: 28,
    marginTop: 8,
  },
  paragraph: {
    marginBottom: 16,
  },
  dropCap: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 44,
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
    paddingHorizontal: 12,
    paddingBottom: 8,
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
    paddingHorizontal: 8,
  },
  headerBookTitle: {
    marginBottom: 2,
    letterSpacing: 0.4,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
  },
  headerChapterTitle: {
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
  },
  progressWrapper: {
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 28,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
    marginTop: -4,
  },
  progressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  chapterDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chapterDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  chapterDotActive: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  chapterDotRead: {
    opacity: 0.5,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 40,
  },
  navButtonPressed: {
    opacity: 0.6,
  },
  navButtonText: {
    marginHorizontal: 4,
    fontSize: 15,
    lineHeight: 20,
  },
  swipeIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  swipeIndicatorLeft: {
    left: 12,
  },
  swipeIndicatorRight: {
    right: 12,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.primary,
    height: 36,
  },
  searchCloseButton: {
    marginLeft: 12,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResults: {
    flex: 1,
  },
  searchResultItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  searchResultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  searchResultSnippet: {
    fontSize: 13,
    color: Colors.secondary,
    lineHeight: 18,
  },
  searchEmpty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
    color: Colors.secondary,
  },
  progressBarTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  progressBarFill: {
    height: '100%',
  },
  edgeZone: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    zIndex: 6,
  },
  edgeZoneLeft: {
    left: 0,
  },
  edgeZoneRight: {
    right: 0,
  },
});
