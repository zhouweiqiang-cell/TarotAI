import React, { useState, useRef, useEffect } from 'react';
import { Text, Animated, StyleSheet, Platform } from 'react-native';
import { extractStreamingReadable } from '../utils/streamingParser';

export default function TypewriterLine({ streamingText, colors }) {
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

  // Typing loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (fadingRef.current) return;
      const src = sourceRef.current;
      if (!src || pointerRef.current >= src.length) return;

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
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setLine('');
          fadeAnim.setValue(1);
          fadingRef.current = false;
        });
      }
    }, 55);

    return () => clearInterval(interval);
  }, []);

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
