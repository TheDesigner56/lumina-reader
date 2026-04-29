import React, { createContext, useContext, useState, useCallback } from 'react';

const ReadingContext = createContext(null);

const mockInitialState = {
  currentlyReading: [
    { bookId: '1', progress: 0.34 },
    { bookId: '5', progress: 0.12 },
  ],
  savedBooks: ['1', '2', '3', '4'],
  readingStats: {
    booksRead: 12,
    hoursRead: 48,
    pagesRead: 3240,
    streak: 5,
  },
  bookmarks: {
    '1': [
      { chapterIndex: 2, timestamp: Date.now() - 86400000 * 2 },
      { chapterIndex: 5, timestamp: Date.now() - 86400000 },
    ],
    '5': [
      { chapterIndex: 0, timestamp: Date.now() },
    ],
  },
  highlights: {
    '1': [
      { id: 'h1', chapterIndex: 1, text: 'It was the best of times, it was the worst of times.', color: '#FFEB3B', timestamp: Date.now() - 86400000 * 3 },
      { id: 'h2', chapterIndex: 2, text: 'The age of wisdom, the age of foolishness.', color: '#FF9800', timestamp: Date.now() - 86400000 },
    ],
  },
  quotes: [
    { id: 'q1', bookId: '1', bookTitle: 'A Tale of Two Cities', text: 'It was the best of times, it was the worst of times.', timestamp: Date.now() - 86400000 * 2 },
    { id: 'q2', bookId: '5', bookTitle: 'Hamlet', text: 'To be, or not to be, that is the question.', timestamp: Date.now() - 86400000 },
    { id: 'q3', bookId: '2', bookTitle: 'The Fellowship of the Ring', text: 'All we have to decide is what to do with the time that is given us.', timestamp: Date.now() },
  ],
  readingGoals: {
    dailyMinutes: 20,
    weeklyBooks: 1,
    currentStreak: 5,
    longestStreak: 12,
    todayMinutes: 0,
    weekMinutes: 0,
  },
  readingHistory: [],
};

let nextHighlightId = 3;
let nextQuoteId = 3;

export function ReadingProvider({ children }) {
  const [currentlyReading, setCurrentlyReading] = useState(mockInitialState.currentlyReading);
  const [savedBooks, setSavedBooks] = useState(mockInitialState.savedBooks);
  const [readingStats, setReadingStats] = useState(mockInitialState.readingStats);
  const [bookmarks, setBookmarks] = useState(mockInitialState.bookmarks);
  const [highlights, setHighlights] = useState(mockInitialState.highlights);
  const [quotes, setQuotes] = useState(mockInitialState.quotes);
  const [readingGoals, setReadingGoals] = useState(mockInitialState.readingGoals);
  const [readingHistory, setReadingHistory] = useState(mockInitialState.readingHistory);

  const addToSaved = useCallback((bookId) => {
    setSavedBooks((prev) => {
      if (prev.includes(bookId)) return prev;
      return [...prev, bookId];
    });
  }, []);

  const removeFromSaved = useCallback((bookId) => {
    setSavedBooks((prev) => prev.filter((id) => id !== bookId));
  }, []);

  const updateProgress = useCallback((bookId, progress) => {
    setCurrentlyReading((prev) => {
      const existing = prev.find((item) => item.bookId === bookId);
      if (existing) {
        return prev.map((item) =>
          item.bookId === bookId ? { ...item, progress } : item
        );
      }
      return [...prev, { bookId, progress }];
    });
  }, []);

  const markAsRead = useCallback((bookId) => {
    setCurrentlyReading((prev) => prev.filter((item) => item.bookId !== bookId));
    setReadingStats((prev) => ({
      ...prev,
      booksRead: prev.booksRead + 1,
    }));
  }, []);

  // Bookmarks
  const addBookmark = useCallback((bookId, chapterIndex) => {
    setBookmarks((prev) => {
      const bookBookmarks = prev[bookId] || [];
      const exists = bookBookmarks.some((b) => b.chapterIndex === chapterIndex);
      if (exists) return prev;
      return {
        ...prev,
        [bookId]: [...bookBookmarks, { chapterIndex, timestamp: Date.now() }],
      };
    });
  }, []);

  const removeBookmark = useCallback((bookId, chapterIndex) => {
    setBookmarks((prev) => {
      const bookBookmarks = prev[bookId] || [];
      return {
        ...prev,
        [bookId]: bookBookmarks.filter((b) => b.chapterIndex !== chapterIndex),
      };
    });
  }, []);

  const isBookmarked = useCallback(
    (bookId, chapterIndex) =>
      (bookmarks[bookId] || []).some((b) => b.chapterIndex === chapterIndex),
    [bookmarks]
  );

  const toggleBookmark = useCallback((bookId, chapterIndex) => {
    setBookmarks((prev) => {
      const bookBookmarks = prev[bookId] || [];
      const exists = bookBookmarks.some((b) => b.chapterIndex === chapterIndex);
      if (exists) {
        return {
          ...prev,
          [bookId]: bookBookmarks.filter((b) => b.chapterIndex !== chapterIndex),
        };
      }
      return {
        ...prev,
        [bookId]: [...bookBookmarks, { chapterIndex, timestamp: Date.now() }],
      };
    });
  }, []);

  // Highlights
  const addHighlight = useCallback((bookId, chapterIndex, text, color = 'yellow') => {
    const id = `h${nextHighlightId++}`;
    setHighlights((prev) => ({
      ...prev,
      [bookId]: [...(prev[bookId] || []), { id, chapterIndex, text, color, timestamp: Date.now() }],
    }));
    return id;
  }, []);

  const removeHighlight = useCallback((bookIdOrId, highlightId) => {
    if (highlightId !== undefined) {
      // New signature: removeHighlight(bookId, highlightId)
      setHighlights((prev) => ({
        ...prev,
        [bookIdOrId]: (prev[bookIdOrId] || []).filter((h) => h.id !== highlightId),
      }));
    } else {
      // Old signature: removeHighlight(id)
      setHighlights((prev) => {
        const next = { ...prev };
        for (const bookId of Object.keys(next)) {
          next[bookId] = next[bookId].filter((h) => h.id !== bookIdOrId);
        }
        return next;
      });
    }
  }, []);

  // Quotes
  const addQuote = useCallback((bookId, arg2, text) => {
    const id = `q${nextQuoteId++}`;
    if (typeof arg2 === 'number') {
      // Old signature: addQuote(bookId, chapterIndex, text)
      setQuotes((prev) => [...prev, { id, bookId, chapterIndex: arg2, text, timestamp: Date.now() }]);
    } else {
      // New signature: addQuote(bookId, bookTitle, text)
      setQuotes((prev) => [...prev, { id, bookId, bookTitle: arg2, text, timestamp: Date.now() }]);
    }
    return id;
  }, []);

  const removeQuote = useCallback((id) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  }, []);

  // Reading time & streak
  const updateReadingTime = useCallback((minutes) => {
    setReadingGoals((prev) => {
      const newToday = prev.todayMinutes + minutes;
      let { currentStreak, longestStreak } = prev;

      if (newToday >= prev.dailyMinutes) {
        if (prev.todayMinutes < prev.dailyMinutes) {
          currentStreak += 1;
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
        }
      }

      return {
        ...prev,
        todayMinutes: newToday,
        weekMinutes: prev.weekMinutes + minutes,
        currentStreak,
        longestStreak,
      };
    });
  }, []);

  const updateReadingGoal = useCallback((updates) => {
    setReadingGoals((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateGoal = useCallback((key, value) => {
    setReadingGoals((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Reading history
  const logReadingSession = useCallback((bookId, minutes, chaptersRead) => {
    const date = new Date().toISOString().split('T')[0];
    setReadingHistory((prev) => [...prev, { bookId, date, minutesRead: minutes, chaptersRead }]);

    setReadingGoals((prev) => {
      const newToday = prev.todayMinutes + minutes;
      let { currentStreak, longestStreak } = prev;

      if (newToday >= prev.dailyMinutes && prev.todayMinutes < prev.dailyMinutes) {
        currentStreak += 1;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      }

      return {
        ...prev,
        todayMinutes: newToday,
        weekMinutes: prev.weekMinutes + minutes,
        currentStreak,
        longestStreak,
      };
    });

    setReadingStats((prev) => ({
      ...prev,
      hoursRead: prev.hoursRead + minutes / 60,
    }));
  }, []);

  const value = {
    currentlyReading,
    savedBooks,
    readingStats,
    bookmarks,
    highlights,
    quotes,
    readingGoals,
    readingHistory,
    addToSaved,
    removeFromSaved,
    updateProgress,
    markAsRead,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    addHighlight,
    removeHighlight,
    addQuote,
    removeQuote,
    updateReadingTime,
    updateReadingGoal,
    updateGoal,
    logReadingSession,
  };

  return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>;
}

export function useReading() {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return context;
}
