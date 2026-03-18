import { getColors, getSuitColors } from '../constants/theme';

export function getSuitColor(card, themeId) {
  const sc = getSuitColors(themeId);
  const c = getColors(themeId);
  return sc[card?.arcana] || c.GOLD;
}
