import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useReading } from '../context/ReadingContext';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

function GroupedSection({ title, children }) {
  return (
    <View style={styles.sectionWrapper}>
      {title && (
        <Text style={[styles.sectionTitle, Typography.caption2]}>{title}</Text>
      )}
      <View style={styles.groupedCard}>{children}</View>
    </View>
  );
}

function SettingRowItem({ icon, iconBg, title, onPress, isFirst, isLast, showChevron = true }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        isFirst && styles.rowFirst,
        isLast && styles.rowLast,
        !isLast && styles.rowBorder,
        pressed && styles.rowPressed,
      ]}
    >
      <View style={[styles.rowIconContainer, { backgroundColor: iconBg || '#E5E5EA' }]}>
        <Ionicons name={icon} size={18} color="#FFFFFF" />
      </View>
      <Text style={[styles.rowTitle, Typography.body]}>{title}</Text>
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={Colors.tertiary}
          style={styles.rowChevron}
        />
      )}
    </Pressable>
  );
}

function StatCardItem({ value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, Typography.title2]}>{value}</Text>
      <Text style={[styles.statLabel, Typography.caption2]}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { readingStats } = useReading();

  const collections = [
    { icon: 'bookmark-outline', title: 'Want to Read', iconBg: '#FF9500' },
    { icon: 'checkmark-circle-outline', title: 'Finished', iconBg: '#34C759' },
    { icon: 'heart-outline', title: 'Favorites', iconBg: '#FF3B30' },
  ];

  const settings = [
    { icon: 'book-outline', title: 'Reading Preferences', iconBg: '#007AFF' },
    { icon: 'notifications-outline', title: 'Notifications', iconBg: '#5856D6' },
    { icon: 'download-outline', title: 'Downloaded Books', iconBg: '#32ADE6' },
    { icon: 'help-circle-outline', title: 'Help', iconBg: '#34C759' },
    { icon: 'information-circle-outline', title: 'About', iconBg: '#8E8E93' },
  ];

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
    >
      {/* Header */}
      <Text style={[styles.pageTitle, Typography.largeTitle]}>Profile</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={[styles.avatarText, Typography.title2]}>JD</Text>
        </View>
        <Text style={[styles.name, Typography.headline]}>Jane Doe</Text>
        <Text style={[styles.email, Typography.subheadline]}>jane@example.com</Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatCardItem value={String(readingStats.booksRead)} label="Books Read" />
        <StatCardItem value={`${readingStats.hoursRead}h`} label="Hours Read" />
        <StatCardItem value={`${readingStats.streak} days`} label="Streak" />
      </View>

      {/* My Collections */}
      <GroupedSection title="MY COLLECTIONS">
        {collections.map((item, index) => (
          <SettingRowItem
            key={item.title}
            icon={item.icon}
            iconBg={item.iconBg}
            title={item.title}
            isFirst={index === 0}
            isLast={index === collections.length - 1}
            onPress={() => {}}
          />
        ))}
      </GroupedSection>

      {/* Settings */}
      <GroupedSection title="SETTINGS">
        {settings.map((item, index) => (
          <SettingRowItem
            key={item.title}
            icon={item.icon}
            iconBg={item.iconBg}
            title={item.title}
            isFirst={index === 0}
            isLast={index === settings.length - 1}
            onPress={() => {}}
          />
        ))}
      </GroupedSection>

      {/* Upgrade Banner */}
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.banner,
          pressed && styles.bannerPressed,
        ]}
      >
        <View style={styles.bannerContent}>
          <View>
            <Text style={[styles.bannerTitle, Typography.headline]}>Lumina Pro</Text>
            <Text style={[styles.bannerSubtitle, Typography.subheadline]}>
              Unlimited offline reading
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.accent} />
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pageTitle: {
    color: Colors.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing.lg,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    color: Colors.secondary,
  },
  name: {
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  email: {
    color: Colors.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionWrapper: {
    marginTop: Spacing.xxl,
    marginHorizontal: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.secondary,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  groupedCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
  },
  rowFirst: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  rowLast: {
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  rowTitle: {
    flex: 1,
    color: Colors.primary,
  },
  rowChevron: {
    marginLeft: Spacing.xs,
  },
  banner: {
    backgroundColor: '#E3F2FD',
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    padding: Spacing.lg,
  },
  bannerPressed: {
    opacity: 0.7,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: Colors.primary,
  },
  bannerSubtitle: {
    color: Colors.secondary,
    marginTop: 2,
  },
});
