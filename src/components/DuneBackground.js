import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, useWindowDimensions, StyleSheet, Easing } from 'react-native';
import Svg, { Rect, Ellipse, Path } from 'react-native-svg';

function rand(a, b) { return a + Math.random() * (b - a); }

const SAND_COLORS = ['#D4A04A', '#C49332', '#B8860B', '#DAA520', '#E8C860', '#A0845A', '#C8A86E', '#8B7355'];

// ─── Sand particles drifting horizontally (wind) ───
const PARTICLE_COUNT = 45;

function SandParticle({ delay, W, H }) {
  const x = useRef(new Animated.Value(rand(-40, W))).current;
  const y = useRef(new Animated.Value(rand(0, H))).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const size = useRef(rand(1.5, 4)).current;
  const color = useRef(SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)]).current;

  useEffect(() => {
    let active = true;
    const drift = () => {
      if (!active) return;
      const startX = rand(-60, -10);
      const startY = rand(0, H);
      const dur = rand(3000, 7000);
      x.setValue(startX);
      y.setValue(startY);
      opacity.setValue(0);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(opacity, { toValue: rand(0.3, 0.7), duration: dur * 0.2, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: rand(0.1, 0.3), duration: dur * 0.6, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: dur * 0.2, useNativeDriver: true }),
        ]),
        Animated.timing(x, { toValue: W + rand(20, 80), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(y, { toValue: startY + rand(-30, 30), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ]).start(() => drift());
    };
    const t = setTimeout(drift, delay);
    return () => { active = false; clearTimeout(t); };
  }, [W, H]);

  return (
    <Animated.View style={{
      position: 'absolute', width: size, height: size, borderRadius: size,
      backgroundColor: color, opacity,
      transform: [{ translateX: x }, { translateY: y }],
    }} />
  );
}

// ─── Amber glow spots (distant suns / spice glow) ───
const GLOW_COUNT = 4;

function AmberGlow({ W, H }) {
  const x = useRef(new Animated.Value(rand(W * 0.1, W * 0.9))).current;
  const y = useRef(new Animated.Value(rand(H * 0.05, H * 0.4))).current;
  const opacity = useRef(new Animated.Value(rand(0.03, 0.08))).current;
  const scale = useRef(new Animated.Value(1)).current;
  const size = useRef(rand(200, 380)).current;

  useEffect(() => {
    let active = true;
    const drift = () => {
      if (!active) return;
      const dur = rand(10000, 18000);
      Animated.parallel([
        Animated.timing(x, { toValue: rand(W * 0.05, W * 0.95), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(y, { toValue: rand(H * 0.02, H * 0.5), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: rand(0.06, 0.14), duration: dur * 0.4, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: rand(0.02, 0.06), duration: dur * 0.6, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(scale, { toValue: rand(1.1, 1.4), duration: dur * 0.5, useNativeDriver: true }),
          Animated.timing(scale, { toValue: rand(0.85, 1), duration: dur * 0.5, useNativeDriver: true }),
        ]),
      ]).start(() => drift());
    };
    drift();
    return () => { active = false; };
  }, [W, H]);

  return (
    <Animated.View style={{
      position: 'absolute', width: size, height: size, borderRadius: size / 2,
      backgroundColor: 'rgba(218, 165, 32, 0.4)', opacity,
      transform: [{ translateX: x }, { translateY: y }, { scale }],
      shadowColor: '#DAA520', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: size * 0.4,
    }} />
  );
}

// ─── SVG sand dune silhouettes at the bottom ───
function DuneSilhouettes({ W, H }) {
  const duneH = H * 0.22;

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: duneH }} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${duneH}`} preserveAspectRatio="none">
        <Path
          d={`M0 ${duneH * 0.6} Q${W * 0.15} ${duneH * 0.15} ${W * 0.35} ${duneH * 0.4} Q${W * 0.5} ${duneH * 0.6} ${W * 0.65} ${duneH * 0.25} Q${W * 0.8} 0 ${W} ${duneH * 0.35} L${W} ${duneH} L0 ${duneH} Z`}
          fill="rgba(160, 132, 90, 0.08)"
        />
        <Path
          d={`M0 ${duneH * 0.75} Q${W * 0.2} ${duneH * 0.35} ${W * 0.4} ${duneH * 0.55} Q${W * 0.55} ${duneH * 0.7} ${W * 0.72} ${duneH * 0.4} Q${W * 0.88} ${duneH * 0.15} ${W} ${duneH * 0.5} L${W} ${duneH} L0 ${duneH} Z`}
          fill="rgba(140, 115, 70, 0.1)"
        />
        <Path
          d={`M0 ${duneH * 0.85} Q${W * 0.12} ${duneH * 0.6} ${W * 0.3} ${duneH * 0.7} Q${W * 0.48} ${duneH * 0.82} ${W * 0.6} ${duneH * 0.55} Q${W * 0.75} ${duneH * 0.3} ${W * 0.9} ${duneH * 0.6} Q${W * 0.95} ${duneH * 0.7} ${W} ${duneH * 0.65} L${W} ${duneH} L0 ${duneH} Z`}
          fill="rgba(120, 100, 55, 0.12)"
        />
      </Svg>
    </View>
  );
}

// ─── SVG sand grain texture overlay ───
function GrainOverlay({ W, H }) {
  const dots = useMemo(() => {
    return Array.from({ length: 200 }, () => ({
      cx: rand(0, W),
      cy: rand(0, H),
      r: rand(0.5, 1.5),
      opacity: rand(0.03, 0.1),
    }));
  }, [W, H]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {dots.map((d, i) => (
          <Ellipse key={i} cx={d.cx} cy={d.cy} rx={d.r} ry={d.r} fill="#C8A86E" opacity={d.opacity} />
        ))}
      </Svg>
    </View>
  );
}

// ─── Geometric Arrakeen border accent (top) ───
function ArrakisAccent({ W }) {
  const lineY = 2;
  return (
    <View style={styles.accentContainer} pointerEvents="none">
      <Svg width="100%" height={6} viewBox={`0 0 ${W} 6`} preserveAspectRatio="none">
        <Rect x={W * 0.15} y={lineY} width={W * 0.7} height={1} fill="rgba(218, 165, 32, 0.15)" rx={0.5} />
        <Rect x={W * 0.3} y={lineY} width={W * 0.4} height={1} fill="rgba(218, 165, 32, 0.25)" rx={0.5} />
        <Ellipse cx={W * 0.5} cy={lineY + 0.5} rx={3} ry={3} fill="rgba(218, 165, 32, 0.3)" />
      </Svg>
    </View>
  );
}

export default function DuneBackground() {
  const { width: W, height: H } = useWindowDimensions();

  const glows = useMemo(() => Array.from({ length: GLOW_COUNT }, (_, i) => <AmberGlow key={`g${i}`} W={W} H={H} />), [W, H]);
  const particles = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => <SandParticle key={`p${i}`} delay={i * 80} W={W} H={H} />), [W, H]);

  return (
    <View style={styles.container} pointerEvents="none">
      {glows}
      <GrainOverlay W={W} H={H} />
      <DuneSilhouettes W={W} H={H} />
      {particles}
      <ArrakisAccent W={W} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    zIndex: 0,
  },
  accentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
