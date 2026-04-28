import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import {
  useReaderSettings,
  THEMES,
  FONT_OPTIONS,
} from '../context/ReaderSettingsContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ReaderSettingsPanel({ visible, onClose }) {
  const insets = useSafeAreaInsets();
  const {
    settings,
    updateSetting,
    resetSettings,
    fontSize,
    theme,
    canDecreaseFont,
    canIncreaseFont,
  } = useReaderSettings();

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visible ? 0 : SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  const handleBackdropPress = () => {
    onClose();
  };

  const themeKeys = Object.keys(THEMES);

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 100 }]} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress} />
      </Animated.View>

      {/* Panel */}
      <Animated.View
        style={[
          styles.panel,
          {
            paddingBottom: Math.max(insets.bottom, 16) + 16,
            backgroundColor: theme.bg,
            borderTopColor: theme.border,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Handle */}
        <View style={styles.handleWrapper}>
          <View style={[styles.handle, { backgroundColor: theme.subText }]} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Font Size Row */}
          <View style={styles.fontSizeRow}>
            <Pressable
              onPress={() => canDecreaseFont && updateSetting('fontSizeIndex', settings.fontSizeIndex - 1)}
              style={[
                styles.fontSizeButton,
                { borderColor: theme.border },
                !canDecreaseFont && styles.fontSizeButtonDisabled,
              ]}
              disabled={!canDecreaseFont}
            >
              <Text style={[styles.fontSizeButtonText, { color: canDecreaseFont ? theme.icon : theme.navDisabled }]}>
                A
              </Text>
            </Pressable>

            <View style={styles.fontSizeTrack}>
              {Array.from({ length: 8 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.fontSizeDot,
                    {
                      backgroundColor:
                        i <= settings.fontSizeIndex ? theme.progressFill : theme.progressTrack,
                    },
                  ]}
                />
              ))}
            </View>

            <Pressable
              onPress={() => canIncreaseFont && updateSetting('fontSizeIndex', settings.fontSizeIndex + 1)}
              style={[
                styles.fontSizeButton,
                { borderColor: theme.border },
                !canIncreaseFont && styles.fontSizeButtonDisabled,
              ]}
              disabled={!canIncreaseFont}
            >
              <Text style={[styles.fontSizeButtonTextLarge, { color: canIncreaseFont ? theme.icon : theme.navDisabled }]}>
                A
              </Text>
            </Pressable>
          </View>

          {/* Theme Swatches */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: theme.subText }]}>Theme</Text>
            <View style={styles.swatchRow}>
              {themeKeys.map((key) => {
                const t = THEMES[key];
                const isActive = settings.themeKey === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => updateSetting('themeKey', key)}
                    style={styles.swatchWrapper}
                  >
                    <View
                      style={[
                        styles.swatch,
                        {
                          backgroundColor: t.swatch,
                          borderColor: isActive ? t.progressFill : t.swatchBorder,
                          borderWidth: isActive ? 2.5 : 1,
                        },
                      ]}
                    >
                      {isActive && (
                        <Ionicons
                          name="checkmark"
                          size={14}
                          color={t.progressFill}
                          style={styles.swatchCheck}
                        />
                      )}
                    </View>
                    <Text style={[styles.swatchLabel, { color: theme.subText }]}>{t.name}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Brightness */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Ionicons name="sunny-outline" size={18} color={theme.icon} />
              <Slider
                style={styles.brightnessSlider}
                value={settings.brightness}
                minimumValue={0.3}
                maximumValue={1}
                minimumTrackTintColor={theme.progressFill}
                maximumTrackTintColor={theme.progressTrack}
                thumbTintColor={theme.progressFill}
                onValueChange={(val) => updateSetting('brightness', val)}
              />
              <Ionicons name="sunny" size={22} color={theme.icon} />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Font Family */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: theme.subText }]}>Font</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.fontRow}>
                {FONT_OPTIONS.map((font) => {
                  const isActive = settings.fontFamilyKey === font.key;
                  return (
                    <Pressable
                      key={font.key}
                      onPress={() => updateSetting('fontFamilyKey', font.key)}
                      style={[
                        styles.fontChip,
                        {
                          backgroundColor: isActive ? theme.progressFill : theme.progressTrack,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.fontChipText,
                          {
                            color: isActive ? '#FFFFFF' : theme.icon,
                            fontFamily: font.family,
                          },
                        ]}
                      >
                        {font.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Bold Toggle */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <Text style={[styles.toggleLabel, { color: theme.text }]}>Bold Text</Text>
              <Pressable
                onPress={() => updateSetting('boldText', !settings.boldText)}
                style={[
                  styles.toggleTrack,
                  {
                    backgroundColor: settings.boldText ? theme.progressFill : theme.progressTrack,
                  },
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    {
                      backgroundColor: '#FFFFFF',
                      transform: [{ translateX: settings.boldText ? 20 : 0 }],
                    },
                  ]}
                />
              </Pressable>
            </View>
          </View>

          {/* Line Spacing */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Text style={[styles.sliderLabel, { color: theme.subText }]}>Line Spacing</Text>
              <Text style={[styles.sliderValue, { color: theme.text }]}>
                {settings.lineSpacing.toFixed(1)}x
              </Text>
            </View>
            <Slider
              style={styles.fullSlider}
              value={settings.lineSpacing}
              minimumValue={1.0}
              maximumValue={2.0}
              step={0.1}
              minimumTrackTintColor={theme.progressFill}
              maximumTrackTintColor={theme.progressTrack}
              thumbTintColor={theme.progressFill}
              onValueChange={(val) => updateSetting('lineSpacing', val)}
            />
          </View>

          {/* Margins */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Text style={[styles.sliderLabel, { color: theme.subText }]}>Margins</Text>
              <Text style={[styles.sliderValue, { color: theme.text }]}>
                {settings.marginIndex === 0 ? 'Narrow' : settings.marginIndex === 2 ? 'Wide' : 'Default'}
              </Text>
            </View>
            <View style={styles.marginRow}>
              {['Narrow', 'Default', 'Wide'].map((label, index) => (
                <Pressable
                  key={label}
                  onPress={() => updateSetting('marginIndex', index)}
                  style={[
                    styles.marginButton,
                    {
                      backgroundColor:
                        settings.marginIndex === index ? theme.progressFill : theme.progressTrack,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.marginButtonText,
                      { color: settings.marginIndex === index ? '#FFFFFF' : theme.icon },
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Text Alignment */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <Text style={[styles.toggleLabel, { color: theme.text }]}>Justify Text</Text>
              <Pressable
                onPress={() =>
                  updateSetting('textAlign', settings.textAlign === 'left' ? 'justify' : 'left')
                }
                style={[
                  styles.toggleTrack,
                  {
                    backgroundColor: settings.textAlign === 'justify' ? theme.progressFill : theme.progressTrack,
                  },
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    {
                      backgroundColor: '#FFFFFF',
                      transform: [{ translateX: settings.textAlign === 'justify' ? 20 : 0 }],
                    },
                  ]}
                />
              </Pressable>
            </View>
          </View>

          {/* Reset */}
          <Pressable onPress={resetSettings} style={styles.resetButton}>
            <Text style={[styles.resetText, { color: theme.progressFill }]}>
              Reset to Defaults
            </Text>
          </Pressable>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    borderTopWidth: StyleSheet.hairlineWidth,
    maxHeight: SCREEN_HEIGHT * 0.72,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  handleWrapper: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: BorderRadius.full,
    opacity: 0.5,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  fontSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  fontSizeButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSizeButtonDisabled: {
    opacity: 0.4,
  },
  fontSizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  fontSizeButtonTextLarge: {
    fontSize: 22,
    fontWeight: '600',
  },
  fontSizeTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: Spacing.lg,
    height: 20,
  },
  fontSizeDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    ...Typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    letterSpacing: 0.5,
  },
  swatchRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  swatchWrapper: {
    alignItems: 'center',
  },
  swatch: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatchCheck: {
    marginTop: 2,
  },
  swatchLabel: {
    ...Typography.caption2,
    marginTop: 6,
    fontWeight: '500',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brightnessSlider: {
    flex: 1,
    marginHorizontal: Spacing.md,
    height: 28,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: Spacing.sm,
  },
  fontRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingRight: Spacing.xl,
  },
  fontChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  fontChipText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    ...Typography.body,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  sliderLabel: {
    ...Typography.bodySmall,
  },
  sliderValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  fullSlider: {
    width: '100%',
    height: 28,
    marginTop: 4,
  },
  marginRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  marginButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  marginButtonText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  resetText: {
    ...Typography.body,
    fontWeight: '600',
  },
});
