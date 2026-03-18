import React, { useEffect, useRef, useMemo } from 'react';
import { View, Image, Animated, useWindowDimensions, StyleSheet, Easing } from 'react-native';
import Svg, { Rect, Ellipse, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

function rand(a, b) { return a + Math.random() * (b - a); }

const SAND_COLORS = ['#D4A04A', '#C49332', '#B8860B', '#DAA520', '#E8C860', '#A0845A', '#C8A86E', '#8B7355'];

// ─── Image assets ───
const IMG_HULL  = require('../../assets/dune/hull.jpg');
const IMG_HAZE  = require('../../assets/dune/haze.jpg');
const IMG_DUNES = require('../../assets/dune/dunes.jpg');

// ─── Massive overhead structure (image + slow hover) ───
function MassiveStructure({ W, H }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const drift = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: 5, duration: 24000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(translateY, { toValue: -5, duration: 24000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])
    );
    drift.start();
    return () => drift.stop();
  }, []);

  return (
    <Animated.View style={{
      position: 'absolute', top: -10, left: 0, right: 0,
      height: H * 0.38,
      transform: [{ translateY }],
    }} pointerEvents="none">
      <Image
        source={IMG_HULL}
        style={{ width: '100%', height: '100%', opacity: 0.7 }}
        resizeMode="cover"
      />
      {/* Bottom fade: blend hull into background */}
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="hullFade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#1C1810" stopOpacity="0" />
              <Stop offset="0.7" stopColor="#1C1810" stopOpacity="0" />
              <Stop offset="1" stopColor="#1C1810" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#hullFade)" />
        </Svg>
      </View>
    </Animated.View>
  );
}

// ─── Atmospheric haze at horizon (image layer) ───
function HorizonHaze({ W, H }) {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 8000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(opacity, { toValue: 0.4, duration: 8000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <Animated.View style={{
      position: 'absolute', top: H * 0.28, left: 0, right: 0,
      height: H * 0.30,
      opacity,
    }} pointerEvents="none">
      <Image
        source={IMG_HAZE}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
      {/* Top and bottom fade */}
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="hazeFade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#1C1810" stopOpacity="1" />
              <Stop offset="0.2" stopColor="#1C1810" stopOpacity="0" />
              <Stop offset="0.8" stopColor="#1C1810" stopOpacity="0" />
              <Stop offset="1" stopColor="#1C1810" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#hazeFade)" />
        </Svg>
      </View>
    </Animated.View>
  );
}

// ─── Sand dunes ground (image layer at bottom) ───
function DuneGround({ W, H }) {
  return (
    <View style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: H * 0.35,
    }} pointerEvents="none">
      <Image
        source={IMG_DUNES}
        style={{ width: '100%', height: '100%', opacity: 0.55 }}
        resizeMode="cover"
      />
      {/* Top fade: blend into background */}
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="duneFade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#1C1810" stopOpacity="1" />
              <Stop offset="0.35" stopColor="#1C1810" stopOpacity="0" />
              <Stop offset="1" stopColor="#1C1810" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#duneFade)" />
        </Svg>
      </View>
    </View>
  );
}

// ─── Vertical falling dust particles (from structure) ───
const DUST_COUNT = 25;

function DustParticle({ delay, W, H }) {
  const x = useRef(new Animated.Value(rand(W * 0.1, W * 0.9))).current;
  const y = useRef(new Animated.Value(rand(H * 0.25, H * 0.4))).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const size = useRef(rand(1.5, 3.5)).current;
  const color = useRef(SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)]).current;

  useEffect(() => {
    let active = true;
    const fall = () => {
      if (!active) return;
      const startX = rand(W * 0.1, W * 0.9);
      const startY = rand(H * 0.28, H * 0.42);
      const dur = rand(4000, 9000);
      x.setValue(startX);
      y.setValue(startY);
      opacity.setValue(0);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(opacity, { toValue: rand(0.2, 0.5), duration: dur * 0.15, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: rand(0.1, 0.3), duration: dur * 0.6, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: dur * 0.25, useNativeDriver: true }),
        ]),
        Animated.timing(y, { toValue: rand(H * 0.7, H * 0.9), duration: dur, useNativeDriver: true, easing: Easing.in(Easing.quad) }),
        Animated.timing(x, { toValue: startX + rand(-20, 20), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ]).start(() => fall());
    };
    const t = setTimeout(fall, delay);
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

// ─── Horizontal sand particles (wind, lower half) ───
const PARTICLE_COUNT = 30;

function SandParticle({ delay, W, H }) {
  const x = useRef(new Animated.Value(rand(-40, W))).current;
  const y = useRef(new Animated.Value(rand(H * 0.5, H * 0.9))).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const size = useRef(rand(1.5, 4)).current;
  const color = useRef(SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)]).current;

  useEffect(() => {
    let active = true;
    const drift = () => {
      if (!active) return;
      const startX = rand(-60, -10);
      const startY = rand(H * 0.5, H * 0.9);
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

// ─── Amber glow spots (horizon zone) ───
const GLOW_COUNT = 3;

function AmberGlow({ W, H }) {
  const x = useRef(new Animated.Value(rand(W * 0.1, W * 0.9))).current;
  const y = useRef(new Animated.Value(rand(H * 0.3, H * 0.5))).current;
  const opacity = useRef(new Animated.Value(rand(0.03, 0.08))).current;
  const scale = useRef(new Animated.Value(1)).current;
  const size = useRef(rand(200, 350)).current;

  useEffect(() => {
    let active = true;
    const drift = () => {
      if (!active) return;
      const dur = rand(10000, 18000);
      Animated.parallel([
        Animated.timing(x, { toValue: rand(W * 0.05, W * 0.95), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(y, { toValue: rand(H * 0.28, H * 0.52), duration: dur, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: rand(0.05, 0.12), duration: dur * 0.4, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: rand(0.02, 0.06), duration: dur * 0.6, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(scale, { toValue: rand(1.1, 1.3), duration: dur * 0.5, useNativeDriver: true }),
          Animated.timing(scale, { toValue: rand(0.9, 1), duration: dur * 0.5, useNativeDriver: true }),
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

// ─── SVG grain texture overlay ───
function GrainOverlay({ W, H }) {
  const dots = useMemo(() => {
    return Array.from({ length: 150 }, () => ({
      cx: rand(0, W),
      cy: rand(0, H),
      r: rand(0.5, 1.5),
      opacity: rand(0.03, 0.08),
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
  const particles = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => <SandParticle key={`p${i}`} delay={i * 100} W={W} H={H} />), [W, H]);
  const dustMotes = useMemo(() => Array.from({ length: DUST_COUNT }, (_, i) => <DustParticle key={`d${i}`} delay={i * 150} W={W} H={H} />), [W, H]);

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Layer 1: Image backgrounds */}
      <MassiveStructure W={W} H={H} />
      <HorizonHaze W={W} H={H} />
      <DuneGround W={W} H={H} />
      {/* Layer 2: Ambient light */}
      {glows}
      {/* Layer 3: Texture */}
      <GrainOverlay W={W} H={H} />
      {/* Layer 4: Particles */}
      {dustMotes}
      {particles}
      {/* Layer 5: UI accent */}
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
