import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const PARTICLE_COUNT = 35;
const NEBULA_COUNT = 5;

function randomBetween(a, b) { return a + Math.random() * (b - a); }

// Single floating particle (star / sparkle)
function Particle({ delay }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(randomBetween(0, SCREEN_W))).current;
  const translateY = useRef(new Animated.Value(randomBetween(0, SCREEN_H))).current;
  const size = useRef(randomBetween(1.5, 4)).current;
  const color = useRef(
    ['#F0C040', '#A78BFA', '#7C3AED', '#F5F0FF', '#3B82F6'][Math.floor(Math.random() * 5)]
  ).current;

  useEffect(() => {
    const duration = randomBetween(3000, 6000);
    const drift = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(opacity, { toValue: randomBetween(0.3, 1), duration: duration * 0.4, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: duration * 0.6, useNativeDriver: true }),
        ]),
        Animated.timing(translateX, { toValue: randomBetween(0, SCREEN_W), duration, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: randomBetween(0, SCREEN_H), duration, useNativeDriver: true }),
      ]).start(() => {
        translateX.setValue(randomBetween(0, SCREEN_W));
        translateY.setValue(randomBetween(0, SCREEN_H));
        drift();
      });
    };
    const timer = setTimeout(drift, delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateX }, { translateY }],
      }}
    />
  );
}

// Soft glowing nebula blob
function NebulaBlob({ index }) {
  const translateX = useRef(new Animated.Value(randomBetween(-50, SCREEN_W - 50))).current;
  const translateY = useRef(new Animated.Value(randomBetween(-50, SCREEN_H - 50))).current;
  const opacity = useRef(new Animated.Value(randomBetween(0.08, 0.2))).current;
  const size = useRef(randomBetween(120, 250)).current;
  const color = useRef(
    ['rgba(124,58,237,', 'rgba(240,192,64,', 'rgba(59,130,246,', 'rgba(167,139,250,', 'rgba(16,185,129,'][index % 5]
  ).current;

  useEffect(() => {
    const drift = () => {
      const duration = randomBetween(6000, 12000);
      Animated.parallel([
        Animated.timing(translateX, { toValue: randomBetween(-50, SCREEN_W - 50), duration, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: randomBetween(-50, SCREEN_H - 50), duration, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: randomBetween(0.1, 0.25), duration: duration * 0.5, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: randomBetween(0.05, 0.12), duration: duration * 0.5, useNativeDriver: true }),
        ]),
      ]).start(drift);
    };
    drift();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + '0.3)',
        opacity,
        transform: [{ translateX }, { translateY }],
      }}
    />
  );
}

export default function NebulaBackground() {
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: NEBULA_COUNT }, (_, i) => (
        <NebulaBlob key={`n${i}`} index={i} />
      ))}
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <Particle key={`p${i}`} delay={i * 80} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});
