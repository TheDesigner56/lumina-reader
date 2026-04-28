import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors, Typography, BorderRadius } from '../constants/theme';

export default function CategoryPill({ category, isActive, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        isActive ? styles.active : styles.inactive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, isActive ? styles.activeText : styles.inactiveText]}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    marginRight: 10,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  inactive: {
    backgroundColor: Colors.surfaceLight,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  text: {
    ...Typography.button,
    fontSize: 14,
  },
  activeText: {
    color: Colors.background,
  },
  inactiveText: {
    color: Colors.primaryMuted,
  },
});
