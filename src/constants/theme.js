export const Colors = {
  background: '#0D0D0F',
  surface: '#1A1A1E',
  surfaceLight: '#25252B',
  surfaceLighter: '#32323A',
  primary: '#F5F5F7',
  primaryMuted: '#A1A1AA',
  secondary: '#8B5CF6',
  secondaryLight: '#A78BFA',
  accent: '#F59E0B',
  accentLight: '#FCD34D',
  success: '#10B981',
  danger: '#EF4444',
  overlay: 'rgba(0,0,0,0.7)',
  blur: 'rgba(26,26,30,0.85)',
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '800', letterSpacing: -0.8, lineHeight: 38 },
  h2: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5, lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', letterSpacing: -0.3, lineHeight: 26 },
  h4: { fontSize: 18, fontWeight: '600', letterSpacing: -0.2, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', letterSpacing: 0, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', letterSpacing: 0, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500', letterSpacing: 0.4, lineHeight: 16 },
  button: { fontSize: 15, fontWeight: '600', letterSpacing: -0.2, lineHeight: 20 },
  reader: { fontSize: 18, fontWeight: '400', letterSpacing: 0.1, lineHeight: 30 },
  readerLarge: { fontSize: 20, fontWeight: '400', letterSpacing: 0.1, lineHeight: 34 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 20,
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
};
