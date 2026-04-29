import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { books } from '../data/books';
import { useReading } from '../context/ReadingContext';
import BookCard from '../components/BookCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const HORIZONTAL_PADDING = Spacing.lg;
const COLUMN_GAP = Spacing.lg;
const COVER_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - COLUMN_GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const COVER_HEIGHT = COVER_WIDTH * 1.5;

const SEGMENTS = [
  { key: 'all', label: 'All' },
  { key: 'want', label: 'Want to Read' },
  { key: 'finished', label: 'Finished' },
];

export default function LibraryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { currentlyReading } = useReading();
  const [activeSegment, setActiveSegment] = useState('all');

  const getProgress = (bookId) => {
    const entry = currentlyReading.find((item) => item.bookId === bookId);
    return entry ? entry.progress : 0;
  };

  // Mock filtering: all shows all books, want shows books 1-3, finished shows 4-5
  const filteredBooks = React.useMemo(() => {
    if (activeSegment === 'want') return [books[1], books[2], books[3]];
    if (activeSegment === 'finished') return [books[4], books[5]];
    return books;
  }, [activeSegment]);

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const renderBookItem = useCallback(
    ({ item }) => (
      <BookCard
        book={item}
        onPress={() => handleBookPress(item)}
        size="compact"
        progressBadge={getProgress(item.id)}
        style={{ width: COVER_WIDTH, marginBottom: Spacing.lg, marginRight: 0 }}
      />
    ),
    [currentlyReading]
  );

  const renderSegmentedControl = () => (
    <View style={styles.segmentedContainer}>
      <View style={styles.segmentedControl}>
        {SEGMENTS.map((segment) => {
          const isActive = activeSegment === segment.key;
          return (
            <Pressable
              key={segment.key}
              onPress={() => setActiveSegment(segment.key)}
              style={[styles.segmentButton, isActive && styles.segmentButtonActive]}
            >
              <Text
                style={[
                  styles.segmentLabel,
                  isActive && styles.segmentLabelActive,
                ]}
              >
                {segment.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.lg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
      </View>

      {/* Segmented Control */}
      {renderSegmentedControl()}

      {/* Book Grid */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: insets.bottom + Spacing.xxxl,
          paddingTop: Spacing.md,
        }}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    ...Typography.largeTitle,
    color: Colors.primary,
  },
  segmentedContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: BorderRadius.md,
    padding: 2,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md - 2,
  },
  segmentButtonActive: {
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  segmentLabel: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: '500',
  },
  segmentLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: COLUMN_GAP,
  },
});
