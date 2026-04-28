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
import { useReaderSettings } from '../context/ReaderSettingsContext';
import ReaderSettingsPanel from '../components/ReaderSettingsPanel';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
    setShowUI((prev) => !prev);
  }, [showSettings]);

  const goToChapter = useCallback((index) => {
    if (index >= 0 && index < totalChapters) {
      setChapterIndex(index);
    }
  }, [totalChapters]);

  const paragraphs = chapter.content.split('\n\n').filter(Boolean);

  const isFirstChapter = chapterIndex === 0;
  const isLastChapter = chapterIndex === totalChapters - 1;

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
          <Pressable
            onPress={() => setShowSettings(true)}
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
    paddingHorizontal: 2,
    marginTop: -4,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    letterSpacing: 0.2,
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
});
