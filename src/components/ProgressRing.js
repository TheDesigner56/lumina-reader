import React from 'react';
import { View } from 'react-native';

export default function ProgressRing({
  progress = 0,
  size = 120,
  strokeWidth = 10,
  color = '#007AFF',
  trackColor = '#E5E5EA',
  children,
}) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const halfSize = size / 2;

  const rightRotation =
    clamped <= 0.5 ? `${180 - clamped * 360}deg` : '0deg';
  const leftRotation =
    clamped <= 0.5 ? '180deg' : `${360 * (1 - clamped)}deg`;

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Track */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: halfSize,
          borderWidth: strokeWidth,
          borderColor: trackColor,
        }}
      />

      {/* Left half progress */}
      <View
        style={{
          position: 'absolute',
          width: halfSize,
          height: size,
          left: 0,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: size,
            height: size,
            borderRadius: halfSize,
            borderWidth: strokeWidth,
            borderColor: color,
            transformOrigin: '0% 50%',
            transform: [{ rotate: leftRotation }],
          }}
        />
      </View>

      {/* Right half progress */}
      <View
        style={{
          position: 'absolute',
          width: halfSize,
          height: size,
          left: halfSize,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: size,
            height: size,
            left: -halfSize,
            borderRadius: halfSize,
            borderWidth: strokeWidth,
            borderColor: color,
            transformOrigin: '100% 50%',
            transform: [{ rotate: rightRotation }],
          }}
        />
      </View>

      {/* Center hole */}
      <View
        style={{
          position: 'absolute',
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: (size - strokeWidth * 2) / 2,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </View>
  );
}
