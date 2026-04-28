import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

export default function SettingRow({
  icon,
  title,
  value,
  onPress,
  isFirst,
  isLast,
  showChevron = true,
  children,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isFirst && styles.first,
        isLast && styles.last,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={Colors.secondary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
      {children}
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={Colors.primaryMuted}
          style={styles.chevron}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  first: {
    borderTopLeftRadius: BorderRadius.md,
    borderTopRightRadius: BorderRadius.md,
  },
  last: {
    borderBottomLeftRadius: BorderRadius.md,
    borderBottomRightRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 28,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  title: {
    ...Typography.body,
    color: Colors.primary,
    flex: 1,
  },
  value: {
    ...Typography.bodySmall,
    color: Colors.primaryMuted,
    marginRight: Spacing.xs,
  },
  chevron: {
    marginLeft: Spacing.xs,
  },
});
