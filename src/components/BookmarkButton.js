import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useReading } from '../context/ReadingContext';
import { useReaderSettings } from '../context/ReaderSettingsContext';
import { Colors } from '../constants/theme';

export default function BookmarkButton({ bookId, chapterIndex, size = 24 }) {
  const { isBookmarked, addBookmark, removeBookmark } = useReading();
  const { theme } = useReaderSettings();
  const bookmarked = isBookmarked(bookId, chapterIndex);

  const toggle = () => {
    if (bookmarked) {
      removeBookmark(bookId, chapterIndex);
    } else {
      addBookmark(bookId, chapterIndex);
    }
  };

  return (
    <Pressable
      onPress={toggle}
      style={styles.button}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons
        name={bookmarked ? 'bookmark' : 'bookmark-outline'}
        size={size}
        color={bookmarked ? Colors.accent : theme.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
