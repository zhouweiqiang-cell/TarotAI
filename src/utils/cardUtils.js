export function getSuitColorFromTheme(card, colors, suitColors) {
  return suitColors[card?.arcana] || colors.GOLD;
}
