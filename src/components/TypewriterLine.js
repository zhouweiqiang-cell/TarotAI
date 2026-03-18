import React, { useState, useRef, useEffect } from 'react';
import { Text, Animated, StyleSheet, Platform } from 'react-native';
import { extractStreamingReadable } from '../utils/streamingParser';
import { useTheme } from '../contexts/ThemeContext';

export default function TypewriterLine({ streamingText }) {
  const { colors } = useTheme();
  const [line, setLine] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const pointerRef = useRef(0);
  const sourceRef = useRef('');
  const fadingRef = useRef(false);

  // Keep source up to date from streaming
  useEffect(() => {
    const readable = extractStreamingReadable(streamingText, '');
    if (readable && readable.length > sourceRef.current.length) {
      sourceRef.current = readable;
    }
  }, [streamingText]);

  // Track whether we're waiting for more text after catching up
  const waitingRef = useRef(false);

  // Typing loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (fadingRef.current) return;
      const src = sourceRef.current;

      // Nothing to show yet
      if (!src) return;

      // Pointer caught up to source — fade out current line and wait
      if (pointerRef.current >= src.length) {
        if (line && !waitingRef.current) {
          waitingRef.current = true;
          fadingRef.current = true;
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setLine('');
            fadeAnim.setValue(1);
            fadingRef.current = false;
          });
        }
        return;
      }

      // New text available after waiting
      waitingRef.current = false;

      pointerRef.current++;
      const idx = pointerRef.current;
      const windowStart = Math.max(0, idx - 35);
      const text = src.slice(windowStart, idx);
      setLine(text);

      const lastChar = src[idx - 1];
      const isPunct = '，。！？、；：…\n'.includes(lastChar);
      if ((isPunct && text.length >= 18) || text.length >= 35) {
        fadingRef.current = true;
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setLine('');
          fadeAnim.setValue(1);
          fadingRef.current = false;
        });
      }
    }, 35);

    return () => clearInterval(interval);
  }, [line]);

  if (!line) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={[styles.text, { color: colors.GOLD }]}>
        {line}
        <Text style={[styles.cursor, { color: colors.GOLD }]}>▎</Text>
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, paddingHorizontal: 16, alignItems: 'center' },
  text: { fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 24, textAlign: 'center' },
  cursor: { opacity: 0.5 },
});
