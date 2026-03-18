import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getSuitColorFromTheme } from '../utils/cardUtils';
import TarotCardImage from './TarotCardImage';

export default function CardReadingBlock({ card, isReversed, position, reading, lang, t, size = 'default' }) {
  const { colors, suitColors } = useTheme();
  const suitColor = getSuitColorFromTheme(card, colors, suitColors);
  const imgW = size === 'compact' ? 60 : 70;
  const imgH = size === 'compact' ? 95 : 110;

  return (
    <View style={[styles.card, { backgroundColor: colors.BG_CARD, borderColor: colors.BORDER, borderLeftColor: suitColor }]}>
      <View style={styles.top}>
        {card && (
          <TarotCardImage card={card} isReversed={isReversed} width={imgW} height={imgH} style={styles.img} />
        )}
        <View style={styles.meta}>
          <Text style={[styles.position, { color: suitColor }]}>{position}</Text>
          {card && (
            <>
              <Text style={[styles.cardName, { color: colors.TEXT_PRIMARY }]}>{card.name[lang]}</Text>
              <Text style={[styles.state, { color: colors.TEXT_MUTED }]}>{isReversed ? t.reversed : t.upright}</Text>
            </>
          )}
        </View>
      </View>
      {reading ? <Text style={[styles.reading, { color: colors.TEXT_PRIMARY }]}>{reading}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderLeftWidth: 3 },
  top: { flexDirection: 'row', marginBottom: 10 },
  img: { marginRight: 12, borderRadius: 8 },
  meta: { flex: 1, justifyContent: 'flex-start', paddingTop: 2 },
  position: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  cardName: { fontSize: 17, fontWeight: '700', marginBottom: 2 },
  state: { fontSize: 14 },
  reading: { fontSize: 16, lineHeight: 26 },
});
