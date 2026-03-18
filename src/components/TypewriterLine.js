import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { extractStreamingReadable } from '../utils/streamingParser';
import { useTheme } from '../contexts/ThemeContext';

const LINE_WIDTH = 24;
const MAX_LINES = 5;
const CHARS_PER_TICK = 3;
const TICK = 45;

export default function TypewriterLine({ streamingText }) {
  const { colors } = useTheme();
  const [lines, setLines] = useState([]);
  const pointerRef = useRef(0);
  const sourceRef = useRef('');
  const linesRef = useRef([]);
  const currentLineRef = useRef('');

  useEffect(() => {
    const readable = extractStreamingReadable(streamingText, '');
    if (readable && readable.length > sourceRef.current.length) {
      sourceRef.current = readable;
    }
  }, [streamingText]);

  useEffect(() => {
    const interval = setInterval(() => {
      const src = sourceRef.current;
      if (!src) return;

      if (pointerRef.current >= src.length) {
        pointerRef.current = 0;
        linesRef.current = [];
        currentLineRef.current = '';
      }

      const end = Math.min(pointerRef.current + CHARS_PER_TICK, src.length);
      for (let i = pointerRef.current; i < end; i++) {
        const ch = src[i];
        if (ch === '\n') {
          linesRef.current.push(currentLineRef.current);
          currentLineRef.current = '';
        } else {
          currentLineRef.current += ch;
          if (currentLineRef.current.length >= LINE_WIDTH) {
            linesRef.current.push(currentLineRef.current);
            currentLineRef.current = '';
          }
        }
      }
      pointerRef.current = end;

      const all = currentLineRef.current
        ? [...linesRef.current, currentLineRef.current]
        : [...linesRef.current];
      const visible = all.slice(-MAX_LINES);
      setLines(visible);
    }, TICK);

    return () => clearInterval(interval);
  }, []);

  if (!lines.length) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.GOLD }]}>
        {lines.join('\n')}
        <Text style={styles.cursor}>▎</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, paddingHorizontal: 16, alignItems: 'center', height: 130 },
  text: { fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 24, textAlign: 'center' },
  cursor: { opacity: 0.4 },
});
