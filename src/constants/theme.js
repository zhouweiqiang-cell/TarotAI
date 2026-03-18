// TarotAI Design System — dual theme support

// ═══════════════════════════════════════════
// Theme: Cosmic (星空) — original purple + gold
// ═══════════════════════════════════════════
const COSMIC = {
  BG_DEEP:    '#0D0820',
  BG_PAGE:    '#1A1035',
  BG_CARD:    '#241848',
  BG_GLASS:   'rgba(45, 27, 105, 0.6)',

  PRIMARY:       '#7C3AED',
  PRIMARY_LIGHT: '#A78BFA',
  GOLD:          '#F0C040',
  GOLD_LIGHT:    '#FDE68A',

  WANDS:      '#EF4444',
  CUPS:       '#3B82F6',
  SWORDS:     '#A1A1AA',
  PENTACLES:  '#10B981',
  MAJOR:      '#F0C040',

  TEXT_PRIMARY:   '#F5F0FF',
  TEXT_SECONDARY: '#A78BFA',
  TEXT_MUTED:     '#6B5B9A',

  BORDER:      'rgba(167, 139, 250, 0.2)',
  BORDER_GOLD: 'rgba(240, 192, 64, 0.4)',
};

// ═══════════════════════════════════════════
// Theme: Dune (沙丘) — Villeneuve desert aesthetic
// ═══════════════════════════════════════════
const DUNE = {
  BG_DEEP:    '#0F0D08',
  BG_PAGE:    '#1C1810',
  BG_CARD:    '#2A2418',
  BG_GLASS:   'rgba(55, 45, 28, 0.6)',

  PRIMARY:       '#B8860B',
  PRIMARY_LIGHT: '#D4A04A',
  GOLD:          '#DAA520',
  GOLD_LIGHT:    '#E8C860',

  WANDS:      '#C4603A',   // 赤陶 — 沙漠烈火
  CUPS:       '#5A8A96',   // 远水青 — 绿洲之水
  SWORDS:     '#9A8E80',   // 砂岩灰 — 沙虫之牙
  PENTACLES:  '#7A8A50',   // 橄榄绿 — 荒漠植被
  MAJOR:      '#DAA520',   // 香料金

  TEXT_PRIMARY:   '#EDE4D3',   // 羊皮纸
  TEXT_SECONDARY: '#B8A080',   // 暖棕
  TEXT_MUTED:     '#7A6A52',   // 沙尘

  BORDER:      'rgba(184, 134, 11, 0.2)',
  BORDER_GOLD: 'rgba(218, 165, 32, 0.4)',
};

// ═══════════════════════════════════════════
// Theme API
// ═══════════════════════════════════════════
const THEMES = { cosmic: COSMIC, dune: DUNE };

export function getColors(themeId) {
  return THEMES[themeId] || COSMIC;
}

export function getSuitColors(themeId) {
  const c = getColors(themeId);
  return {
    major:     c.MAJOR,
    wands:     c.WANDS,
    cups:      c.CUPS,
    swords:    c.SWORDS,
    pentacles: c.PENTACLES,
  };
}

// Caution colors (shared across themes)
export const CAUTION = {
  BG:     'rgba(234,179,8,0.08)',
  BORDER: 'rgba(234,179,8,0.3)',
  TEXT:   '#EAB308',
};

// Backward-compatible default exports (cosmic)
export const COLORS = COSMIC;
export const SUIT_COLORS = getSuitColors('cosmic');

export const SUIT_LABELS = {
  zh: { major: '大阿卡纳', wands: '权杖', cups: '圣杯', swords: '宝剑', pentacles: '星币' },
  en: { major: 'Major Arcana', wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' },
  ja: { major: '大アルカナ', wands: 'ワンド', cups: 'カップ', swords: 'ソード', pentacles: 'ペンタクル' },
};
