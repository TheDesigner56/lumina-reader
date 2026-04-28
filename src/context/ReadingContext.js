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
    streak: 5,
  },
};

export function ReadingProvider({ children }) {
  const [currentlyReading, setCurrentlyReading] = useState(mockInitialState.currentlyReading);
  const [savedBooks, setSavedBooks] = useState(mockInitialState.savedBooks);
  const [readingStats, setReadingStats] = useState(mockInitialState.readingStats);

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

  const value = {
    currentlyReading,
    savedBooks,
    readingStats,
    addToSaved,
    removeFromSaved,
    updateProgress,
    markAsRead,
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
