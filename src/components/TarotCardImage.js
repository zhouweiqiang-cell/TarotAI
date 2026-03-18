import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Circle, Line } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';
import { getLocalCardImage } from '../data/cardImages';

function CardBack({ width, height, colors, isDune }) {
  const accent = isDune ? colors.GOLD : colors.PRIMARY;
  const accentLight = isDune ? colors.GOLD_LIGHT : colors.PRIMARY_LIGHT;
  const bg = colors.BG_CARD;
  const border = isDune ? 'rgba(218, 165, 32, 0.5)' : 'rgba(124, 58, 237, 0.5)';
  const patternOp = isDune ? 0.3 : 0.25;

  const cx = width / 2;
  const cy = height / 2;
  const inset = 10;

  return (
    <View style={[styles.backFace, { backgroundColor: bg }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Outer border */}
        <Rect x={3} y={3} width={width - 6} height={height - 6} rx={7} fill="none" stroke={border} strokeWidth={1.5} />
        {/* Inner border */}
        <Rect x={inset} y={inset} width={width - inset * 2} height={height - inset * 2} rx={4} fill="none" stroke={accent} strokeWidth={0.8} opacity={patternOp} />

        {/* Central diamond */}
        <Path
          d={`M ${cx} ${cy - 28} L ${cx + 20} ${cy} L ${cx} ${cy + 28} L ${cx - 20} ${cy} Z`}
          fill="none" stroke={accent} strokeWidth={1.2} opacity={0.5}
        />
        {/* Inner diamond */}
        <Path
          d={`M ${cx} ${cy - 14} L ${cx + 10} ${cy} L ${cx} ${cy + 14} L ${cx - 10} ${cy} Z`}
          fill={accent} opacity={0.15}
        />
        <Path
          d={`M ${cx} ${cy - 14} L ${cx + 10} ${cy} L ${cx} ${cy + 14} L ${cx - 10} ${cy} Z`}
          fill="none" stroke={accent} strokeWidth={0.8} opacity={0.4}
        />

        {/* Center dot */}
        <Circle cx={cx} cy={cy} r={2.5} fill={accent} opacity={0.6} />

        {/* Corner ornaments */}
        {[[inset + 6, inset + 6], [width - inset - 6, inset + 6], [inset + 6, height - inset - 6], [width - inset - 6, height - inset - 6]].map(([x, y], i) => (
          <Circle key={i} cx={x} cy={y} r={2} fill={accent} opacity={0.35} />
        ))}

        {/* Cross lines through center */}
        <Line x1={cx} y1={inset + 8} x2={cx} y2={cy - 30} stroke={accentLight} strokeWidth={0.5} opacity={patternOp} />
        <Line x1={cx} y1={cy + 30} x2={cx} y2={height - inset - 8} stroke={accentLight} strokeWidth={0.5} opacity={patternOp} />
        <Line x1={inset + 8} y1={cy} x2={cx - 22} y2={cy} stroke={accentLight} strokeWidth={0.5} opacity={patternOp} />
        <Line x1={cx + 22} y1={cy} x2={width - inset - 8} y2={cy} stroke={accentLight} strokeWidth={0.5} opacity={patternOp} />

        {/* Diagonal lines to corners */}
        <Line x1={inset + 8} y1={inset + 8} x2={cx - 20} y2={cy - 26} stroke={accent} strokeWidth={0.4} opacity={patternOp * 0.7} />
        <Line x1={width - inset - 8} y1={inset + 8} x2={cx + 20} y2={cy - 26} stroke={accent} strokeWidth={0.4} opacity={patternOp * 0.7} />
        <Line x1={inset + 8} y1={height - inset - 8} x2={cx - 20} y2={cy + 26} stroke={accent} strokeWidth={0.4} opacity={patternOp * 0.7} />
        <Line x1={width - inset - 8} y1={height - inset - 8} x2={cx + 20} y2={cy + 26} stroke={accent} strokeWidth={0.4} opacity={patternOp * 0.7} />

        {isDune && (
          <>
            {/* Dune-specific: small sand-like dots scattered */}
            {Array.from({ length: 12 }, (_, i) => {
              const dx = inset + 14 + Math.sin(i * 2.3) * (width / 2 - inset - 18);
              const dy = inset + 14 + Math.cos(i * 1.7) * (height / 2 - inset - 18);
              return <Circle key={`dot${i}`} cx={dx} cy={dy} r={1} fill={accent} opacity={0.2} />;
            })}
          </>
        )}
      </Svg>
    </View>
  );
}

export default function TarotCardImage({ card, isReversed = false, width = 100, height = 170, style, showBack = false }) {
  const { colors, suitColors, isDune } = useTheme();
  const suitColor = card ? (suitColors[card.arcana] || colors.GOLD) : colors.PRIMARY;
  const imageSource = card ? getLocalCardImage(card) : null;

  return (
    <View style={[styles.container, { width, height, backgroundColor: colors.BG_CARD }, style]}>
      <View style={[styles.border, { borderColor: suitColor, width, height }]} />
      {showBack || !imageSource ? (
        <CardBack width={width} height={height} colors={colors} isDune={isDune} />
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
  backFace: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
