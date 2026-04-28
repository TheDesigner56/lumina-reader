import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';

const ReaderSettingsContext = createContext(null);

export const FONT_OPTIONS = [
  { key: 'original', name: 'Original', family: undefined },
  { key: 'georgia', name: 'Georgia', family: 'Georgia' },
  { key: 'palatino', name: 'Palatino', family: 'Palatino' },
  { key: 'baskerville', name: 'Baskerville', family: 'Baskerville' },
  { key: 'helvetica', name: 'Helvetica', family: 'Helvetica' },
];

export const THEMES = {
  light: {
    key: 'light',
    name: 'Light',
    bg: '#FAF9F6',
    text: '#1C1C1E',
    subText: '#6E6E73',
    border: 'rgba(0,0,0,0.08)',
    navDisabled: '#C7C7CC',
    progressTrack: '#E5E5EA',
    progressFill: '#007AFF',
    icon: '#1C1C1E',
    swatch: '#FAF9F6',
    swatchBorder: '#E5E5EA',
  },
  warm: {
    key: 'warm',
    name: 'Warm',
    bg: '#FFF8E7',
    text: '#2D2D2D',
    subText: '#8A8A8A',
    border: 'rgba(0,0,0,0.06)',
    navDisabled: '#D4CFC5',
    progressTrack: '#E8E0D0',
    progressFill: '#007AFF',
    icon: '#2D2D2D',
    swatch: '#FFF8E7',
    swatchBorder: '#E8E0D0',
  },
  sepia: {
    key: 'sepia',
    name: 'Sepia',
    bg: '#F4ECD8',
    text: '#3E2723',
    subText: '#8D6E63',
    border: 'rgba(62,39,35,0.12)',
    navDisabled: '#D7CCC8',
    progressTrack: '#D7CCC8',
    progressFill: '#8D6E63',
    icon: '#3E2723',
    swatch: '#F4ECD8',
    swatchBorder: '#D7CCC8',
  },
  dark: {
    key: 'dark',
    name: 'Dark',
    bg: '#1C1C1E',
    text: '#E5E5EA',
    subText: '#8E8E93',
    border: 'rgba(255,255,255,0.08)',
    navDisabled: '#48484A',
    progressTrack: '#48484A',
    progressFill: '#0A84FF',
    icon: '#E5E5EA',
    swatch: '#1C1C1E',
    swatchBorder: '#48484A',
  },
};

const FONT_SIZE_MIN = 14;
const FONT_SIZE_MAX = 28;
const FONT_SIZE_STEP = 2;

const DEFAULT_SETTINGS = {
  fontSizeIndex: 3, // 0-7 maps to 14,16,18,20,22,24,26,28
  fontFamilyKey: 'original',
  boldText: false,
  themeKey: 'light',
  lineSpacing: 1.5,
  marginIndex: 1, // 0=narrow(16), 1=default(24), 2=wide(40)
  textAlign: 'left', // 'left' | 'justify'
  brightness: 1.0,
};

function getFontSize(index) {
  return FONT_SIZE_MIN + index * FONT_SIZE_STEP;
}

function getMargin(marginIndex) {
  switch (marginIndex) {
    case 0: return 16;
    case 2: return 40;
    default: return 24;
  }
}

export function ReaderSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  // Load from AsyncStorage if available
  useEffect(() => {
    if (Platform.OS === 'web') {
      setLoaded(true);
      return;
    }
    const load = async () => {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        const stored = await AsyncStorage.getItem('readerSettings');
        if (stored) {
          setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }));
        }
      } catch (e) {
        // ignore
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  // Save when settings change
  useEffect(() => {
    if (!loaded || Platform.OS === 'web') return;
    const save = async () => {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        await AsyncStorage.setItem('readerSettings', JSON.stringify(settings));
      } catch (e) {
        // ignore
      }
    };
    save();
  }, [settings, loaded]);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const fontSize = getFontSize(settings.fontSizeIndex);
  const margin = getMargin(settings.marginIndex);
  const theme = THEMES[settings.themeKey];
  const fontFamily = FONT_OPTIONS.find((f) => f.key === settings.fontFamilyKey)?.family;

  const value = {
    settings,
    updateSetting,
    resetSettings,
    fontSize,
    margin,
    theme,
    fontFamily,
    canDecreaseFont: settings.fontSizeIndex > 0,
    canIncreaseFont: settings.fontSizeIndex < 7,
  };

  return (
    <ReaderSettingsContext.Provider value={value}>
      {children}
    </ReaderSettingsContext.Provider>
  );
}

export function useReaderSettings() {
  const context = useContext(ReaderSettingsContext);
  if (!context) {
    throw new Error('useReaderSettings must be used within ReaderSettingsProvider');
  }
  return context;
}
