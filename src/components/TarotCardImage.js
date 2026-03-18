import React, { useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { getColors, getSuitColors } from '../constants/theme';
import { getLocalCardImage } from '../data/cardImages';

export default function TarotCardImage({ card, isReversed = false, width = 100, height = 170, style, showBack = false, theme }) {
  const colors = useMemo(() => getColors(theme), [theme]);
  const sc = useMemo(() => getSuitColors(theme), [theme]);
  const suitColor = card ? (sc[card.arcana] || colors.GOLD) : colors.PRIMARY;
  const imageSource = card ? getLocalCardImage(card) : null;

  return (
    <View style={[styles.container, { width, height, backgroundColor: colors.BG_CARD }, style]}>
      <View style={[styles.border, { borderColor: suitColor, width, height }]} />
      {showBack || !imageSource ? (
        <View style={[styles.backFace, { backgroundColor: colors.BG_CARD, borderColor: suitColor }]}>
          <View style={styles.backPattern}>
            <View style={[styles.backInner, { borderColor: suitColor }]}>
              <View style={[styles.backDiamond, { borderColor: suitColor }]} />
            </View>
          </View>
        </View>
      ) : (
        <Image source={imageSource} style={[styles.image, isReversed && styles.reversed]} resizeMode="cover" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 10, overflow: 'hidden', position: 'relative' },
  border: { position: 'absolute', top: 0, left: 0, borderRadius: 10, borderWidth: 1.5, zIndex: 2 },
  image: { width: '100%', height: '100%' },
  reversed: { transform: [{ rotate: '180deg' }] },
  backFace: { flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 8 },
  backPattern: { width: '75%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  backInner: { width: '100%', aspectRatio: 1, borderWidth: 1, borderRadius: 4, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '45deg' }] },
  backDiamond: { width: '55%', aspectRatio: 1, borderWidth: 1, borderRadius: 2, transform: [{ rotate: '45deg' }] },
});
