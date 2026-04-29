import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants/theme';

export default function BookProgressBadge({ progress, size = 'small' }) {
  const isComplete = progress >= 1;
  const isMedium = size === 'medium';
  const containerSize = isMedium ? 36 : 28;
  const percent = Math.round(progress * 100);

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        },
      ]}
    >
      {isComplete ? (
        <Ionicons
          name="checkmark-circle"
          size={containerSize}
          color={Colors.success}
        />
      ) : (
        <>
          <Text style={[styles.percentText, isMedium && styles.percentTextMedium]}>
            {percent}
          </Text>
          <View
            style={[
              styles.stroke,
              {
                width: containerSize,
                height: containerSize,
                borderRadius: containerSize / 2,
                borderWidth: isMedium ? 2.5 : 2,
              },
            ]}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  percentText: {
    ...Typography.caption2,
    color: Colors.accent,
    fontWeight: '700',
    fontSize: 9,
  },
  percentTextMedium: {
    fontSize: 11,
  },
  stroke: {
    position: 'absolute',
    borderColor: Colors.accent,
  },
});
