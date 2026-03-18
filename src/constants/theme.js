// TarotAI Design System — deep space purple + gold

export const COLORS = {
  // Backgrounds
  BG_DEEP:    '#0D0820',   // 最深背景
  BG_PAGE:    '#1A1035',   // 页面背景
  BG_CARD:    '#241848',   // 卡片背景
  BG_GLASS:   'rgba(45, 27, 105, 0.6)',  // 玻璃拟态

  // Primary
  PRIMARY:    '#7C3AED',   // 紫色主色
  PRIMARY_LIGHT: '#A78BFA',
  GOLD:       '#F0C040',   // 金色点缀
  GOLD_LIGHT: '#FDE68A',

  // Suits (四个花色)
  WANDS:      '#EF4444',   // 权杖 — 火红
  CUPS:       '#3B82F6',   // 圣杯 — 水蓝
  SWORDS:     '#A1A1AA',   // 宝剑 — 风灰
  PENTACLES:  '#10B981',   // 星币 — 土绿
  MAJOR:      '#F0C040',   // 大阿卡纳 — 金

  // Text
  TEXT_PRIMARY:   '#F5F0FF',
  TEXT_SECONDARY: '#A78BFA',
  TEXT_MUTED:     '#6B5B9A',

  // Border
  BORDER:         'rgba(167, 139, 250, 0.2)',
  BORDER_GOLD:    'rgba(240, 192, 64, 0.4)',
};

export const SUIT_COLORS = {
  major:     COLORS.MAJOR,
  wands:     COLORS.WANDS,
  cups:      COLORS.CUPS,
  swords:    COLORS.SWORDS,
  pentacles: COLORS.PENTACLES,
};

// Caution / warning colors
export const CAUTION = {
  BG:     'rgba(234,179,8,0.08)',
  BORDER: 'rgba(234,179,8,0.3)',
  TEXT:   '#EAB308',
};

// Shared base styles reused across screens
export const BASE_STYLES = {
  safe:      { flex: 1, backgroundColor: COLORS.BG_PAGE },
  container: { flex: 1 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: COLORS.GOLD, marginBottom: 8 },
};

export const SUIT_LABELS = {
  zh: { major: '大阿卡纳', wands: '权杖', cups: '圣杯', swords: '宝剑', pentacles: '星币' },
  en: { major: 'Major Arcana', wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' },
  ja: { major: '大アルカナ', wands: 'ワンド', cups: 'カップ', swords: 'ソード', pentacles: 'ペンタクル' },
};
