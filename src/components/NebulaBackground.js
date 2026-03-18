import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Dimensions, StyleSheet, Easing } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');
const CX = W / 2;
const CY = H / 2;

const PARTICLE_COUNT = 60;
const NEBULA_COUNT = 8;
const BURST_COUNT = 20;

function rand(a, b) { return a + Math.random() * (b - a); }

const STAR_COLORS = ['#F0C040', '#A78BFA', '#7C3AED', '#F5F0FF', '#3B82F6', '#FDE68A', '#10B981', '#EF4444'];
const NEBULA_COLORS = [
  'rgba(124,58,237,', 'rgba(240,192,64,', 'rgba(59,130,246,',
  'rgba(167,139,250,', 'rgba(16,185,129,', 'rgba(239,68,68,',
  'rgba(253,230,138,', 'rgba(96,165,250,',
];

// Drifting star particle — covers full screen
function Star({ delay }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const x = useRef(new Animated.Value(rand(0, W))).current;
  const y = useRef(new Animated.Value(rand(0, H))).current;
  const scale = useRef(new Animated.Value(1)).current;
  const size = useRef(rand(2, 5)).current;
  const color = useRef(STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]).current;

  useEffect(() => {
    const drift = () => {
      const dur = rand(2500, 5000);
      Animated.parallel([
        Animated.sequence([
          Animated.timing(opacity, { toValue: rand(0.4, 1), duration: dur * 0.3, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: rand(0.05, 0.3), duration: dur * 0.7, useNativeDriver: true }),
        ]),
        Animated.timing(x, { toValue: rand(0, W), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(y, { toValue: rand(0, H), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.sequence([
          Animated.timing(scale, { toValue: rand(1.2, 2.5), duration: dur * 0.5, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: dur * 0.5, useNativeDriver: true }),
        ]),
      ]).start(drift);
    };
    const t = setTimeout(drift, delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View style={{
      position: 'absolute', width: size, height: size, borderRadius: size,
      backgroundColor: color, opacity,
      transform: [{ translateX: x }, { translateY: y }, { scale }],
      shadowColor: color, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6,
    }} />
  );
}

// Burst particle — explodes outward from center then fades
function BurstParticle({ delay }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const x = useRef(new Animated.Value(CX)).current;
  const y = useRef(new Animated.Value(CY)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const size = useRef(rand(3, 8)).current;
  const color = useRef(STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]).current;
  const angle = useRef(rand(0, Math.PI * 2)).current;
  const radius = useRef(rand(W * 0.3, W * 0.8)).current;

  useEffect(() => {
    const burst = () => {
      const a = rand(0, Math.PI * 2);
      const r = rand(W * 0.3, W * 0.8);
      const dur = rand(3000, 5000);
      x.setValue(CX);
      y.setValue(CY);
      opacity.setValue(0);
      scale.setValue(0);

      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: dur * 0.2, useNativeDriver: true }),
        Animated.timing(x, { toValue: CX + Math.cos(a) * r, duration: dur, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
        Animated.timing(y, { toValue: CY + Math.sin(a) * r, duration: dur, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
        Animated.timing(scale, { toValue: rand(1, 3), duration: dur * 0.6, useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(dur * 0.5),
          Animated.timing(opacity, { toValue: 0, duration: dur * 0.5, useNativeDriver: true }),
        ]),
      ]).start(() => setTimeout(burst, rand(500, 2000)));
    };
    const t = setTimeout(burst, delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View style={{
      position: 'absolute', width: size, height: size, borderRadius: size,
      backgroundColor: color, opacity,
      transform: [{ translateX: x }, { translateY: y }, { scale }],
      shadowColor: color, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10,
    }} />
  );
}

// Large glowing nebula cloud
function Nebula({ index }) {
  const x = useRef(new Animated.Value(rand(-100, W))).current;
  const y = useRef(new Animated.Value(rand(-100, H))).current;
  const opacity = useRef(new Animated.Value(rand(0.06, 0.15))).current;
  const scale = useRef(new Animated.Value(1)).current;
  const size = useRef(rand(180, 400)).current;
  const color = useRef(NEBULA_COLORS[index % NEBULA_COLORS.length]).current;

  useEffect(() => {
    const drift = () => {
      const dur = rand(8000, 15000);
      Animated.parallel([
        Animated.timing(x, { toValue: rand(-100, W), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(y, { toValue: rand(-100, H), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: rand(0.12, 0.35), duration: dur * 0.4, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: rand(0.04, 0.12), duration: dur * 0.6, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(scale, { toValue: rand(1.1, 1.5), duration: dur * 0.5, useNativeDriver: true }),
          Animated.timing(scale, { toValue: rand(0.8, 1), duration: dur * 0.5, useNativeDriver: true }),
        ]),
      ]).start(drift);
    };
    drift();
  }, []);

  return (
    <Animated.View style={{
      position: 'absolute', width: size, height: size, borderRadius: size / 2,
      backgroundColor: color + '0.4)', opacity,
      transform: [{ translateX: x }, { translateY: y }, { scale }],
      shadowColor: color + '1)', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: size * 0.3,
    }} />
  );
}

export default function NebulaBackground() {
  const nebulae = useMemo(() => Array.from({ length: NEBULA_COUNT }, (_, i) => <Nebula key={`n${i}`} index={i} />), []);
  const stars = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => <Star key={`s${i}`} delay={i * 50} />), []);
  const bursts = useMemo(() => Array.from({ length: BURST_COUNT }, (_, i) => <BurstParticle key={`b${i}`} delay={i * 150} />), []);

  return (
    <View style={styles.container} pointerEvents="none">
      {nebulae}
      {stars}
      {bursts}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
