import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function EnergyTagRow({ energies, style }) {
  if (!energies?.length) return null;
  return (
    <View style={[styles.row, style]}>
      {energies.map((e, i) => (
        <View key={i} style={styles.pill}>
          <Text style={styles.text}>{e}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  pill: { backgroundColor: COLORS.BG_CARD, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: COLORS.BORDER_GOLD },
  text: { color: COLORS.GOLD, fontSize: 14, fontWeight: '600' },
});
