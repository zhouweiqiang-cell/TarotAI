import { COLORS, SUIT_COLORS } from '../constants/theme';

export function getSuitColor(card) {
  return SUIT_COLORS[card?.arcana] || COLORS.GOLD;
}
