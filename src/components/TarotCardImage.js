import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS, SUIT_COLORS } from '../constants/theme';
import { getLocalCardImage } from '../data/cardImages';

/**
 * TarotCardImage
 * Props:
 *   card       — card object from cards.js
 *   isReversed — boolean, rotates image 180deg
 *   width      — number (default 100)
 *   height     — number (default 170)
 *   style      — extra View style
 *   showBack   — show card back instead of front
 */
export default function TarotCardImage({ card, isReversed = false, width = 100, height = 170, style, showBack = false }) {
  const suitColor = card ? (SUIT_COLORS[card.arcana] || COLORS.GOLD) : COLORS.PRIMARY;
  const imageSource = card ? getLocalCardImage(card) : null;

  return (
    <View style={[styles.container, { width, height }, style]}>
      {/* Border glow */}
      <View style={[styles.border, { borderColor: suitColor, width, height }]} />

      {showBack || !imageSource ? (
        <BackFace suitColor={suitColor} />
      ) : (
        <Image
          source={imageSource}
          style={[
            styles.image,
            isReversed && styles.reversed,
          ]}
          resizeMode="cover"
        />
      )}
    </View>
  );
}

function BackFace({ suitColor }) {
  return (
    <View style={[styles.backFace, { borderColor: suitColor }]}>
      <View style={styles.backPattern}>
        <View style={[styles.backInner, { borderColor: suitColor }]}>
          <View style={[styles.backDiamond, { borderColor: suitColor }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.BG_CARD,
    position: 'relative',
  },
  border: {
    position: 'absolute',
    top: 0, left: 0,
    borderRadius: 10,
    borderWidth: 1.5,
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  reversed: {
    transform: [{ rotate: '180deg' }],
  },
  backFace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BG_CARD,
    borderWidth: 1,
    borderRadius: 8,
  },
  backPattern: {
    width: '75%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backInner: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  backDiamond: {
    width: '55%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
});
