import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

export default function StarRating({ rating, size = 14 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let iconName;
    if (rating >= i - 0.25) {
      iconName = 'star';
    } else if (rating >= i - 0.75) {
      iconName = 'star-half';
    } else {
      iconName = 'star-outline';
    }
    stars.push(
      <Ionicons
        key={i}
        name={iconName}
        size={size}
        color={Colors.accent}
        style={i < 5 ? styles.starMargin : undefined}
      />
    );
  }
  return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starMargin: {
    marginRight: 2,
  },
});
