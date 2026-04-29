import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BAND_HEIGHT = 56;

export default function ReadingRuler({
  visible = false,
  lineColor = 'rgba(0,0,0,0.35)',
  opacity = 0.55,
}) {
  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Top dim overlay */}
      <View
        style={[
          styles.overlay,
          {
            top: 0,
            height: (SCREEN_HEIGHT - BAND_HEIGHT) / 2,
            backgroundColor: `rgba(0,0,0,${opacity})`,
          },
        ]}
      />

      {/* Transparent reading band */}
      <View
        style={[
          styles.band,
          {
            top: (SCREEN_HEIGHT - BAND_HEIGHT) / 2,
            height: BAND_HEIGHT,
            borderTopColor: lineColor,
            borderBottomColor: lineColor,
          },
        ]}
      />

      {/* Bottom dim overlay */}
      <View
        style={[
          styles.overlay,
          {
            top: (SCREEN_HEIGHT + BAND_HEIGHT) / 2,
            bottom: 0,
            backgroundColor: `rgba(0,0,0,${opacity})`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  band: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
