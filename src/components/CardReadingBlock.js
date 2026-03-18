import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { getSuitColor } from '../utils/cardUtils';
import TarotCardImage from './TarotCardImage';

export default function CardReadingBlock({ card, isReversed, position, reading, lang, t, size = 'default' }) {
  const suitColor = getSuitColor(card);
  const imgW = size === 'compact' ? 60 : 70;
  const imgH = size === 'compact' ? 95 : 110;

  return (
    <View style={[styles.card, { borderLeftColor: suitColor }]}>
      <View style={styles.top}>
        {card && (
          <TarotCardImage
            card={card}
            isReversed={isReversed}
            width={imgW}
            height={imgH}
            style={styles.img}
          />
        )}
        <View style={styles.meta}>
          <Text style={[styles.position, { color: suitColor }]}>{position}</Text>
          {card && (
            <>
              <Text style={styles.cardName}>{card.name[lang]}</Text>
              <Text style={styles.state}>{isReversed ? t.reversed : t.upright}</Text>
            </>
          )}
        </View>
      </View>
      {reading ? <Text style={styles.reading}>{reading}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.BORDER, borderLeftWidth: 3,
  },
  top: { flexDirection: 'row', marginBottom: 10 },
  img: { marginRight: 12, borderRadius: 8 },
  meta: { flex: 1, justifyContent: 'flex-start', paddingTop: 2 },
  position: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  cardName: { fontSize: 17, fontWeight: '700', color: COLORS.TEXT_PRIMARY, marginBottom: 2 },
  state: { fontSize: 14, color: COLORS.TEXT_MUTED },
  reading: { fontSize: 16, color: COLORS.TEXT_PRIMARY, lineHeight: 26 },
});
