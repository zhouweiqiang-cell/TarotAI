import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet, Platform } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');
const SYMBOLS = '01✦⚝☆◇△▽◆⟐⌬';
const COL_W = 18;
const COL_COUNT = Math.floor((W - 8) / COL_W);
const LINE_H = 20;
const CHARS_PER_COL = Math.ceil(H / LINE_H) + 4;

function pickChars(pool, n) {
  return Array.from({ length: n }, () => pool[Math.floor(Math.random() * pool.length)]);
}

const MatrixColumn = React.memo(function MatrixColumn({ x, speed, startDelay, getPool, headColor, trailColor, fontSize }) {
  const anim = useRef(new Animated.Value(0)).current;
  const [chars, setChars] = useState(() => pickChars(getPool(), CHARS_PER_COL));
  const flickerTimer = useRef(null);

  useEffect(() => {
    let active = true;
    const colH = CHARS_PER_COL * LINE_H;

    const cycle = () => {
      if (!active) return;
      setChars(pickChars(getPool(), CHARS_PER_COL));
      anim.setValue(-colH);
      Animated.timing(anim, {
        toValue: H + 60,
        duration: speed,
        useNativeDriver: true,
      }).start(({ finished }) => { if (finished && active) cycle(); });
    };

    // Flicker: randomly swap chars frequently for that "alive" feel
    flickerTimer.current = setInterval(() => {
      if (!active) return;
      setChars(prev => {
        const next = [...prev];
        const pool = getPool();
        const count = 3 + Math.floor(Math.random() * 4);
        for (let k = 0; k < count; k++) {
          const idx = Math.floor(Math.random() * next.length);
          next[idx] = pool[Math.floor(Math.random() * pool.length)];
        }
        return next;
      });
    }, 80 + Math.random() * 120);

    const t = setTimeout(cycle, startDelay);
    return () => {
      active = false;
      clearTimeout(t);
      clearInterval(flickerTimer.current);
    };
  }, []);

  return (
    <Animated.View style={{ position: 'absolute', left: x, transform: [{ translateY: anim }] }}>
      {chars.map((c, i) => (
        <Text
          key={i}
          style={[
            styles.char,
            {
              color: i === 0 ? headColor : i < 3 ? headColor : trailColor,
              opacity: i === 0 ? 1 : i === 1 ? 0.85 : i === 2 ? 0.65 : Math.max(0.08, 0.5 - i * 0.02),
              fontSize,
              textShadowColor: i < 3 ? headColor : 'transparent',
              textShadowRadius: i === 0 ? 12 : i === 1 ? 6 : i === 2 ? 3 : 0,
            },
          ]}
        >
          {c}
        </Text>
      ))}
    </Animated.View>
  );
});

export default function MatrixRain({ streamingText = '', colors }) {
  const poolRef = useRef(SYMBOLS.split(''));

  // Heavily weight actual streaming text chars — they should dominate
  useEffect(() => {
    const textChars = streamingText.replace(/[\s\n\r{}",:\[\]]/g, '');
    if (textChars.length > 0) {
      // 70% streaming text, 20% binary, 10% symbols
      const binary = '00110010101101001011';
      const mixed = textChars.repeat(4) + binary + SYMBOLS;
      poolRef.current = mixed.split('');
    } else {
      const binary = '0011001010110100101110010100110101';
      poolRef.current = (binary.repeat(2) + SYMBOLS.repeat(3)).split('');
    }
  }, [streamingText]);

  const getPool = useCallback(() => poolRef.current, []);

  const columns = useMemo(() => {
    return Array.from({ length: COL_COUNT }, (_, i) => ({
      x: 4 + i * COL_W + Math.random() * 6,
      speed: 1500 + Math.random() * 2500,   // much faster: 1.5s–4s
      startDelay: Math.random() * 800,        // start almost immediately
      fontSize: 14 + Math.floor(Math.random() * 3),
    }));
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {columns.map((col, i) => (
        <MatrixColumn
          key={i}
          x={col.x}
          speed={col.speed}
          startDelay={col.startDelay}
          getPool={getPool}
          headColor={colors.GOLD}
          trailColor={colors.TEXT_MUTED}
          fontSize={col.fontSize}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 1,
  },
  char: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: LINE_H,
    textAlign: 'center',
  },
});
