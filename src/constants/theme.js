export const Colors = {
  // Backgrounds
  background: '#F5F5F7',
  surface: '#FFFFFF',
  surfaceSecondary: '#F2F2F7',
  card: '#FFFFFF',
  
  // Text
  primary: '#1D1D1F',
  secondary: '#6E6E73',
  tertiary: '#A1A1A6',
  inverse: '#FFFFFF',
  
  // Accents (Apple-style blue)
  accent: '#007AFF',
  accentLight: '#5AC8FA',
  accentPressed: '#0051D5',
  
  // Semantic
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  
  // Reader
  readerBg: '#FAF9F6',
  readerText: '#1C1C1E',
  readerSepia: '#F4ECD8',
  readerDark: '#1C1C1E',
  
  // Overlays
  overlay: 'rgba(0,0,0,0.4)',
  blurLight: 'rgba(255,255,255,0.8)',
  separator: 'rgba(0,0,0,0.08)',
  
  // Book cover gradients (more muted, editorial)
  gradients: {
    fiction: ['#E8D5C4', '#D4B896'],
    mystery: ['#2C3E50', '#4A6572'],
    romance: ['#FADADD', '#F8C8DC'],
    scifi: ['#1A1A2E', '#16213E'],
    thriller: ['#0F2027', '#203A43'],
    fantasy: ['#3E2723', '#5D4037'],
    selfhelp: ['#E8F5E9', '#C8E6C9'],
  },
};

export const Typography = {
  // Large titles
  largeTitle: { fontSize: 34, fontWeight: '700', letterSpacing: -1, lineHeight: 40 },
  title1: { fontSize: 28, fontWeight: '700', letterSpacing: -0.8, lineHeight: 34 },
  title2: { fontSize: 22, fontWeight: '700', letterSpacing: -0.5, lineHeight: 28 },
  title3: { fontSize: 20, fontWeight: '600', letterSpacing: -0.3, lineHeight: 26 },
  
  // Body
  body: { fontSize: 17, fontWeight: '400', letterSpacing: -0.2, lineHeight: 24 },
  bodyLarge: { fontSize: 19, fontWeight: '400', letterSpacing: -0.2, lineHeight: 28 },
  bodySmall: { fontSize: 15, fontWeight: '400', letterSpacing: -0.1, lineHeight: 20 },
  
  // Labels
  headline: { fontSize: 17, fontWeight: '600', letterSpacing: -0.2, lineHeight: 22 },
  subheadline: { fontSize: 15, fontWeight: '400', letterSpacing: -0.1, lineHeight: 20 },
  caption: { fontSize: 13, fontWeight: '400', letterSpacing: 0, lineHeight: 18 },
  caption2: { fontSize: 11, fontWeight: '500', letterSpacing: 0.2, lineHeight: 14 },
  
  // Special
  button: { fontSize: 17, fontWeight: '600', letterSpacing: -0.2, lineHeight: 22 },
  reader: { fontSize: 19, fontWeight: '400', letterSpacing: 0, lineHeight: 32 },
  readerLarge: { fontSize: 21, fontWeight: '400', letterSpacing: 0, lineHeight: 36 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
};

export const Shadows = {
  cover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  floating: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};
