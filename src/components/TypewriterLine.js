import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { extractStreamingReadable } from '../utils/streamingParser';
import { useTheme } from '../contexts/ThemeContext';

const WINDOW = 30;
const TICK = 30;

export default function TypewriterLine({ streamingText }) {
  const { colors } = useTheme();
  const [line, setLine] = useState('');
  const pointerRef = useRef(0);
  const sourceRef = useRef('');

  // Keep source up to date from streaming
  useEffect(() => {
    const readable = extractStreamingReadable(streamingText, '');
    if (readable && readable.length > sourceRef.current.length) {
      sourceRef.current = readable;
    }
  }, [streamingText]);

  // Continuous typing loop — no animations, pure sliding window
  useEffect(() => {
    const interval = setInterval(() => {
      const src = sourceRef.current;
      if (!src || pointerRef.current >= src.length) return;

      pointerRef.current++;
      const idx = pointerRef.current;
      const windowStart = Math.max(0, idx - WINDOW);
      setLine(src.slice(windowStart, idx));
    }, TICK);

    return () => clearInterval(interval);
  }, []);

  if (!line) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.GOLD }]} numberOfLines={1}>
        {line}
        <Text style={styles.cursor}>▎</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, paddingHorizontal: 16, alignItems: 'center' },
  text: { fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 24, textAlign: 'center' },
  cursor: { opacity: 0.4 },
});
