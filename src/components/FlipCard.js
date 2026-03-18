import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import TarotCardImage from './TarotCardImage';

/**
 * FlipCard — 3D card flip animation wrapper
 * Props:
 *   card       — card object
 *   isReversed — boolean
 *   revealed   — boolean, triggers flip when true
 *   onPress    — tap handler
 *   width      — card width
 *   height     — card height
 *   disabled   — disable touch
 *   delay      — stagger delay in ms (default 0)
 */
export default function FlipCard({ card, isReversed, revealed, onPress, width = 90, height = 140, disabled, delay = 0 }) {
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (revealed) {
      const timeout = setTimeout(() => {
        Animated.spring(flipAnim, {
          toValue: 1,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }).start();
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [revealed]);

  // Back face: visible at 0, hidden at 90deg
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '90deg'],
  });
  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.49, 0.5],
    outputRange: [1, 1, 0],
  });

  // Front face: hidden until 90deg, then visible
  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-90deg', '-90deg', '0deg'],
  });
  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.51],
    outputRange: [0, 0, 1],
  });

  // Subtle scale bounce on flip
  const scale = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      <Animated.View style={[{ width, height }, { transform: [{ scale }] }]}>
        {/* Back face */}
        <Animated.View style={[
          styles.face,
          { width, height, opacity: backOpacity, transform: [{ perspective: 800 }, { rotateY: backRotate }] },
        ]}>
          <TarotCardImage showBack width={width} height={height} />
        </Animated.View>

        {/* Front face */}
        <Animated.View style={[
          styles.face,
          { width, height, opacity: frontOpacity, transform: [{ perspective: 800 }, { rotateY: frontRotate }] },
        ]}>
          <TarotCardImage card={card} isReversed={isReversed} width={width} height={height} />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  face: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
});
