import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getColors } from '../constants/theme';

export default function EnergyTagRow({ energies, style, theme }) {
  if (!energies?.length) return null;
  const colors = useMemo(() => getColors(theme), [theme]);
  return (
    <View style={[styles.row, style]}>
      {energies.map((e, i) => (
        <View key={i} style={[styles.pill, { backgroundColor: colors.BG_CARD, borderColor: colors.BORDER_GOLD }]}>
          <Text style={[styles.text, { color: colors.GOLD }]}>{e}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  pill: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1 },
  text: { fontSize: 14, fontWeight: '600' },
});
