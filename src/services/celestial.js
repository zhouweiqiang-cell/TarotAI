import SunCalc from 'suncalc';

// ─── Moon Phase ────────────────────────────────────────
const MOON_PHASES = [
  { key: 'newMoon',        threshold: 0.0,   emoji: '🌑', priority: 2 },
  { key: 'waxingCrescent', threshold: 0.065, emoji: '🌒', priority: 0 },
  { key: 'firstQuarter',   threshold: 0.19,  emoji: '🌓', priority: 1 },
  { key: 'waxingGibbous',  threshold: 0.31,  emoji: '🌔', priority: 0 },
  { key: 'fullMoon',       threshold: 0.44,  emoji: '🌕', priority: 2 },
  { key: 'waningGibbous',  threshold: 0.56,  emoji: '🌖', priority: 0 },
  { key: 'lastQuarter',    threshold: 0.69,  emoji: '🌗', priority: 1 },
  { key: 'waningCrescent', threshold: 0.81,  emoji: '🌘', priority: 0 },
  { key: 'newMoon',        threshold: 0.935, emoji: '🌑', priority: 2 },
];

const MOON_NAMES = {
  newMoon:        { zh: '新月', en: 'New Moon', ja: '新月' },
  waxingCrescent: { zh: '蛾眉月', en: 'Waxing Crescent', ja: '三日月' },
  firstQuarter:   { zh: '上弦月', en: 'First Quarter', ja: '上弦の月' },
  waxingGibbous:  { zh: '盈凸月', en: 'Waxing Gibbous', ja: '十三夜月' },
  fullMoon:       { zh: '满月', en: 'Full Moon', ja: '満月' },
  waningGibbous:  { zh: '亏凸月', en: 'Waning Gibbous', ja: '十八夜月' },
  lastQuarter:    { zh: '下弦月', en: 'Last Quarter', ja: '下弦の月' },
  waningCrescent: { zh: '残月', en: 'Waning Crescent', ja: '有明月' },
};

const MOON_MESSAGES = {
  newMoon: {
    zh: '新月是播种意愿的最佳时机，适合许愿和设定新目标',
    en: 'New Moon — ideal for setting intentions and planting seeds of new goals',
    ja: '新月は願いを込め、新しい目標を立てるのに最適な時です',
  },
  waxingCrescent: {
    zh: '月芽初现，能量在萌动中积蓄，适合酝酿计划',
    en: 'A sliver of moonlight appears — energy stirs, time to nurture your plans',
    ja: '月の芽が現れ、エネルギーが芽生えています。計画を育てる時です',
  },
  firstQuarter: {
    zh: '上弦月带来行动力，面对挑战果断出击',
    en: 'First Quarter Moon calls for decisive action when facing challenges',
    ja: '上弦の月は行動力をもたらします。挑戦に果敢に立ち向かいましょう',
  },
  waxingGibbous: {
    zh: '能量接近巅峰，调整细节，为成果做最后准备',
    en: 'Energy nears its peak — refine the details, prepare for results',
    ja: 'エネルギーが頂点に近づいています。細部を整え、成果に備えましょう',
  },
  fullMoon: {
    zh: '满月之夜，情感能量达到顶峰，隐藏的真相容易浮现',
    en: 'Full Moon night — emotions peak, hidden truths come to light',
    ja: '満月の夜、感情のエネルギーが頂点に達し、隠された真実が浮かび上がります',
  },
  waningGibbous: {
    zh: '满月过后，是感恩与分享智慧的时刻',
    en: 'After the Full Moon — a time for gratitude and sharing wisdom',
    ja: '満月を過ぎ、感謝と知恵の共有の時です',
  },
  lastQuarter: {
    zh: '下弦月提醒你放下执念，释放不再需要的事物',
    en: 'Last Quarter Moon — release attachments and let go of what no longer serves you',
    ja: '下弦の月は執着を手放し、不要なものを解放するよう促しています',
  },
  waningCrescent: {
    zh: '残月时分，静心休养，为新的循环做准备',
    en: 'Waning Crescent — rest and reflect, preparing for a new cycle',
    ja: '有明月の時、静かに休息し、新たなサイクルに備えましょう',
  },
};

const SYNODIC_MONTH = 29.53059;

function getMoonPhase(date) {
  const { phase, fraction } = SunCalc.getMoonIllumination(date);
  let matched = MOON_PHASES[0];
  for (const p of MOON_PHASES) {
    if (phase >= p.threshold) matched = p;
  }
  const age = Math.round(phase * SYNODIC_MONTH);
  return {
    key: matched.key,
    emoji: matched.emoji,
    priority: matched.priority,
    names: MOON_NAMES[matched.key],
    illumination: Math.round(fraction * 100),
    age, // days since new moon
    raw: phase,
  };
}

// ─── Zodiac Season (Sun Sign) ──────────────────────────
const ZODIAC_SIGNS = [
  { key: 'capricorn',   m: 1,  d: 1,  element: 'earth' },
  { key: 'aquarius',    m: 1,  d: 20, element: 'air' },
  { key: 'pisces',      m: 2,  d: 19, element: 'water' },
  { key: 'aries',       m: 3,  d: 21, element: 'fire' },
  { key: 'taurus',      m: 4,  d: 20, element: 'earth' },
  { key: 'gemini',      m: 5,  d: 21, element: 'air' },
  { key: 'cancer',      m: 6,  d: 21, element: 'water' },
  { key: 'leo',         m: 7,  d: 23, element: 'fire' },
  { key: 'virgo',       m: 8,  d: 23, element: 'earth' },
  { key: 'libra',       m: 9,  d: 23, element: 'air' },
  { key: 'scorpio',     m: 10, d: 23, element: 'water' },
  { key: 'sagittarius', m: 11, d: 22, element: 'fire' },
  { key: 'capricorn',   m: 12, d: 22, element: 'earth' },
];

const ZODIAC_NAMES = {
  aries:       { zh: '白羊座', en: 'Aries', ja: '牡羊座', icon: '♈' },
  taurus:      { zh: '金牛座', en: 'Taurus', ja: '牡牛座', icon: '♉' },
  gemini:      { zh: '双子座', en: 'Gemini', ja: '双子座', icon: '♊' },
  cancer:      { zh: '巨蟹座', en: 'Cancer', ja: '蟹座', icon: '♋' },
  leo:         { zh: '狮子座', en: 'Leo', ja: '獅子座', icon: '♌' },
  virgo:       { zh: '处女座', en: 'Virgo', ja: '乙女座', icon: '♍' },
  libra:       { zh: '天秤座', en: 'Libra', ja: '天秤座', icon: '♎' },
  scorpio:     { zh: '天蝎座', en: 'Scorpio', ja: '蠍座', icon: '♏' },
  sagittarius: { zh: '射手座', en: 'Sagittarius', ja: '射手座', icon: '♐' },
  capricorn:   { zh: '摩羯座', en: 'Capricorn', ja: '山羊座', icon: '♑' },
  aquarius:    { zh: '水瓶座', en: 'Aquarius', ja: '水瓶座', icon: '♒' },
  pisces:      { zh: '双鱼座', en: 'Pisces', ja: '魚座', icon: '♓' },
};

const ZODIAC_MESSAGES = {
  aries:       { zh: '白羊座季 · 行动力与开创精神觉醒', en: 'Aries season — initiative and pioneering energy awaken', ja: '牡羊座の季節 · 行動力と開拓精神が目覚めます' },
  taurus:      { zh: '金牛座季 · 稳定与物质能量充盈', en: 'Taurus season — grounding stability and abundance', ja: '牡牛座の季節 · 安定と物質的エネルギーが満ちます' },
  gemini:      { zh: '双子座季 · 思维活跃，沟通与学习的好时机', en: 'Gemini season — sharp minds, great for communication and learning', ja: '双子座の季節 · 思考が活発になり、学びに最適です' },
  cancer:      { zh: '巨蟹座季 · 家庭与情感连接被强化', en: 'Cancer season — family and emotional bonds strengthen', ja: '蟹座の季節 · 家庭と感情の絆が深まります' },
  leo:         { zh: '狮子座季 · 自信与创造力的高光时刻', en: 'Leo season — confidence and creativity shine brightly', ja: '獅子座の季節 · 自信と創造力が輝く時です' },
  virgo:       { zh: '处女座季 · 适合整理、优化与自我提升', en: 'Virgo season — time to organize, refine, and improve', ja: '乙女座の季節 · 整理と自己改善に適しています' },
  libra:       { zh: '天秤座季 · 人际关系与平衡成为焦点', en: 'Libra season — relationships and balance take center stage', ja: '天秤座の季節 · 人間関係とバランスが焦点になります' },
  scorpio:     { zh: '天蝎座季 · 深层转变与直觉力增强', en: 'Scorpio season — deep transformation and heightened intuition', ja: '蠍座の季節 · 深い変容と直感力が高まります' },
  sagittarius: { zh: '射手座季 · 探索与冒险的能量高涨', en: 'Sagittarius season — energy for exploration and adventure rises', ja: '射手座の季節 · 探求と冒険のエネルギーが高まります' },
  capricorn:   { zh: '摩羯座季 · 目标与纪律感加强', en: 'Capricorn season — discipline and goal-setting intensify', ja: '山羊座の季節 · 目標と規律の意識が強まります' },
  aquarius:    { zh: '水瓶座季 · 独立思考与创新意识活跃', en: 'Aquarius season — independent thinking and innovation thrive', ja: '水瓶座の季節 · 独立した思考と革新性が活発になります' },
  pisces:      { zh: '双鱼座季 · 直觉与感受力增强，适合情感类问题', en: 'Pisces season — intuition deepens, ideal for emotional questions', ja: '魚座の季節 · 直感と感受性が高まり、感情的な問いに最適です' },
};

const ELEMENT_NAMES = {
  fire:  { zh: '火象', en: 'Fire', ja: '火' },
  earth: { zh: '土象', en: 'Earth', ja: '地' },
  air:   { zh: '风象', en: 'Air', ja: '風' },
  water: { zh: '水象', en: 'Water', ja: '水' },
};

function getZodiacSeason(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  let matched = ZODIAC_SIGNS[0];
  for (const z of ZODIAC_SIGNS) {
    if (m > z.m || (m === z.m && d >= z.d)) matched = z;
  }
  return {
    key: matched.key,
    element: matched.element,
    names: ZODIAC_NAMES[matched.key],
    elementNames: ELEMENT_NAMES[matched.element],
    message: ZODIAC_MESSAGES[matched.key],
  };
}

// ─── Planet Retrogrades ────────────────────────────────
const RETROGRADES = {
  mercury: [
    { start: '2025-03-15', end: '2025-04-07' },
    { start: '2025-07-18', end: '2025-08-11' },
    { start: '2025-11-09', end: '2025-11-29' },
    { start: '2026-02-26', end: '2026-03-20' },
    { start: '2026-06-29', end: '2026-07-23' },
    { start: '2026-10-24', end: '2026-11-13' },
    { start: '2027-02-09', end: '2027-03-03' },
    { start: '2027-06-10', end: '2027-07-04' },
    { start: '2027-10-07', end: '2027-10-28' },
  ],
  venus: [
    { start: '2025-03-02', end: '2025-04-13' },
    { start: '2026-12-16', end: '2027-01-29' },
  ],
  mars: [
    { start: '2024-12-06', end: '2025-02-24' },
    { start: '2027-01-10', end: '2027-04-01' },
  ],
  jupiter: [
    { start: '2025-11-11', end: '2026-03-11' },
    { start: '2026-12-10', end: '2027-04-10' },
  ],
  saturn: [
    { start: '2025-07-13', end: '2025-11-28' },
    { start: '2026-07-27', end: '2026-12-11' },
    { start: '2027-08-10', end: '2027-12-25' },
  ],
};

const RETROGRADE_INFO = {
  mercury: {
    icon: '☿',
    names:  { zh: '水星', en: 'Mercury', ja: '水星' },
    hint: {
      zh: '沟通易生误会，不宜签约或做重大决策，适合回顾与反思',
      en: 'Communication may falter — avoid signing contracts or major decisions, review and reflect instead',
      ja: 'コミュニケーションに誤解が生じやすく、重要な決断は避け、振り返りに集中しましょう',
    },
  },
  venus: {
    icon: '♀',
    names:  { zh: '金星', en: 'Venus', ja: '金星' },
    hint: {
      zh: '感情与财务能量内收，不宜开始新恋情，适合反思关系与价值观',
      en: 'Love and finances turn inward — not ideal for new romance, reflect on relationships and values',
      ja: '恋愛と金銭のエネルギーが内に向かいます。新しい恋は避け、関係を見直す時です',
    },
  },
  mars: {
    icon: '♂',
    names:  { zh: '火星', en: 'Mars', ja: '火星' },
    hint: {
      zh: '行动力受阻，能量内收，避免冲动行事，适合重新规划策略',
      en: 'Drive and ambition turn inward — avoid impulsive action, rethink your strategy',
      ja: '行動力が内に向かいます。衝動を避け、戦略を練り直す時です',
    },
  },
  jupiter: {
    icon: '♃',
    names:  { zh: '木星', en: 'Jupiter', ja: '木星' },
    hint: {
      zh: '外在扩张暂停，向内探索信念与人生方向，积累内功',
      en: 'Outer expansion pauses — explore your beliefs and life direction inwardly',
      ja: '外への拡大が一時停止します。信念と人生の方向性を内なる探求で深めましょう',
    },
  },
  saturn: {
    icon: '♄',
    names:  { zh: '土星', en: 'Saturn', ja: '土星' },
    hint: {
      zh: '面对过去未完成的功课，重新审视责任与边界',
      en: 'Face unfinished lessons from the past — reassess responsibilities and boundaries',
      ja: '過去のやり残した課題に向き合い、責任と境界線を見直しましょう',
    },
  },
};

function getActiveRetrogrades(date) {
  const ds = date.toISOString().split('T')[0];
  const active = [];
  for (const [planet, periods] of Object.entries(RETROGRADES)) {
    if (periods.some(r => ds >= r.start && ds <= r.end)) {
      active.push({ planet, ...RETROGRADE_INFO[planet] });
    }
  }
  return active;
}

// ─── Solar Terms (节气) ────────────────────────────────
// Major solar terms for 2025-2027 (±1 day accuracy is acceptable)
const SOLAR_TERMS = [
  // 2025
  { date: '2025-01-05', key: 'xiaohan' }, { date: '2025-01-20', key: 'dahan' },
  { date: '2025-02-03', key: 'lichun' }, { date: '2025-02-18', key: 'yushui' },
  { date: '2025-03-05', key: 'jingzhe' }, { date: '2025-03-20', key: 'chunfen' },
  { date: '2025-04-04', key: 'qingming' }, { date: '2025-04-20', key: 'guyu' },
  { date: '2025-05-05', key: 'lixia' }, { date: '2025-05-21', key: 'xiaoman' },
  { date: '2025-06-05', key: 'mangzhong' }, { date: '2025-06-21', key: 'xiazhi' },
  { date: '2025-07-07', key: 'xiaoshu' }, { date: '2025-07-22', key: 'dashu' },
  { date: '2025-08-07', key: 'liqiu' }, { date: '2025-08-23', key: 'chushu' },
  { date: '2025-09-07', key: 'bailu' }, { date: '2025-09-22', key: 'qiufen' },
  { date: '2025-10-08', key: 'hanlu' }, { date: '2025-10-23', key: 'shuangjing' },
  { date: '2025-11-07', key: 'lidong' }, { date: '2025-11-22', key: 'xiaoxue' },
  { date: '2025-12-07', key: 'daxue' }, { date: '2025-12-21', key: 'dongzhi' },
  // 2026
  { date: '2026-01-05', key: 'xiaohan' }, { date: '2026-01-20', key: 'dahan' },
  { date: '2026-02-04', key: 'lichun' }, { date: '2026-02-18', key: 'yushui' },
  { date: '2026-03-05', key: 'jingzhe' }, { date: '2026-03-20', key: 'chunfen' },
  { date: '2026-04-05', key: 'qingming' }, { date: '2026-04-20', key: 'guyu' },
  { date: '2026-05-05', key: 'lixia' }, { date: '2026-05-21', key: 'xiaoman' },
  { date: '2026-06-05', key: 'mangzhong' }, { date: '2026-06-21', key: 'xiazhi' },
  { date: '2026-07-07', key: 'xiaoshu' }, { date: '2026-07-23', key: 'dashu' },
  { date: '2026-08-07', key: 'liqiu' }, { date: '2026-08-23', key: 'chushu' },
  { date: '2026-09-07', key: 'bailu' }, { date: '2026-09-23', key: 'qiufen' },
  { date: '2026-10-08', key: 'hanlu' }, { date: '2026-10-23', key: 'shuangjing' },
  { date: '2026-11-07', key: 'lidong' }, { date: '2026-11-22', key: 'xiaoxue' },
  { date: '2026-12-07', key: 'daxue' }, { date: '2026-12-22', key: 'dongzhi' },
  // 2027
  { date: '2027-01-05', key: 'xiaohan' }, { date: '2027-01-20', key: 'dahan' },
  { date: '2027-02-04', key: 'lichun' }, { date: '2027-02-19', key: 'yushui' },
  { date: '2027-03-06', key: 'jingzhe' }, { date: '2027-03-21', key: 'chunfen' },
  { date: '2027-04-05', key: 'qingming' }, { date: '2027-04-20', key: 'guyu' },
  { date: '2027-05-06', key: 'lixia' }, { date: '2027-05-21', key: 'xiaoman' },
  { date: '2027-06-06', key: 'mangzhong' }, { date: '2027-06-21', key: 'xiazhi' },
  { date: '2027-07-07', key: 'xiaoshu' }, { date: '2027-07-23', key: 'dashu' },
  { date: '2027-08-07', key: 'liqiu' }, { date: '2027-08-23', key: 'chushu' },
  { date: '2027-09-08', key: 'bailu' }, { date: '2027-09-23', key: 'qiufen' },
  { date: '2027-10-08', key: 'hanlu' }, { date: '2027-10-24', key: 'shuangjing' },
  { date: '2027-11-07', key: 'lidong' }, { date: '2027-11-22', key: 'xiaoxue' },
  { date: '2027-12-07', key: 'daxue' }, { date: '2027-12-22', key: 'dongzhi' },
];

const SOLAR_TERM_NAMES = {
  lichun:      { zh: '立春', en: 'Start of Spring', ja: '立春', major: true },
  yushui:      { zh: '雨水', en: 'Rain Water', ja: '雨水', major: false },
  jingzhe:     { zh: '惊蛰', en: 'Awakening of Insects', ja: '啓蟄', major: false },
  chunfen:     { zh: '春分', en: 'Spring Equinox', ja: '春分', major: true },
  qingming:    { zh: '清明', en: 'Clear and Bright', ja: '清明', major: false },
  guyu:        { zh: '谷雨', en: 'Grain Rain', ja: '穀雨', major: false },
  lixia:       { zh: '立夏', en: 'Start of Summer', ja: '立夏', major: true },
  xiaoman:     { zh: '小满', en: 'Grain Buds', ja: '小満', major: false },
  mangzhong:   { zh: '芒种', en: 'Grain in Ear', ja: '芒種', major: false },
  xiazhi:      { zh: '夏至', en: 'Summer Solstice', ja: '夏至', major: true },
  xiaoshu:     { zh: '小暑', en: 'Minor Heat', ja: '小暑', major: false },
  dashu:       { zh: '大暑', en: 'Major Heat', ja: '大暑', major: false },
  liqiu:       { zh: '立秋', en: 'Start of Autumn', ja: '立秋', major: true },
  chushu:      { zh: '处暑', en: 'End of Heat', ja: '処暑', major: false },
  bailu:       { zh: '白露', en: 'White Dew', ja: '白露', major: false },
  qiufen:      { zh: '秋分', en: 'Autumnal Equinox', ja: '秋分', major: true },
  hanlu:       { zh: '寒露', en: 'Cold Dew', ja: '寒露', major: false },
  shuangjing:  { zh: '霜降', en: 'Frost\'s Descent', ja: '霜降', major: false },
  lidong:      { zh: '立冬', en: 'Start of Winter', ja: '立冬', major: true },
  xiaoxue:     { zh: '小雪', en: 'Minor Snow', ja: '小雪', major: false },
  daxue:       { zh: '大雪', en: 'Major Snow', ja: '大雪', major: false },
  dongzhi:     { zh: '冬至', en: 'Winter Solstice', ja: '冬至', major: true },
  xiaohan:     { zh: '小寒', en: 'Minor Cold', ja: '小寒', major: false },
  dahan:       { zh: '大寒', en: 'Major Cold', ja: '大寒', major: false },
};

const SOLAR_TERM_MESSAGES = {
  chunfen: { zh: '春分 · 昼夜平分，万物平衡，适合问关于平衡与抉择的问题', en: 'Spring Equinox — day and night in balance, ideal for questions about equilibrium and choices', ja: '春分 · 昼夜が等しく、バランスと選択の問いに最適です' },
  xiazhi:  { zh: '夏至 · 阳气最盛，能量与光明的巅峰', en: 'Summer Solstice — yang energy peaks, the zenith of light and power', ja: '夏至 · 陽のエネルギーが最も高まり、光と力の頂点です' },
  qiufen:  { zh: '秋分 · 收获与反思的天平点', en: 'Autumnal Equinox — a tipping point of harvest and reflection', ja: '秋分 · 収穫と省察のバランスポイントです' },
  dongzhi: { zh: '冬至 · 阴极生阳，最深的黑暗中孕育新光', en: 'Winter Solstice — yin reaches its peak, new light is born from deepest darkness', ja: '冬至 · 陰が極まり陽が生まれる、最も深い闇から新たな光が芽生えます' },
  lichun:  { zh: '立春 · 万物复苏，新的开始', en: 'Start of Spring — all things awaken, a fresh beginning', ja: '立春 · 万物が目覚め、新たな始まりの時です' },
  lixia:   { zh: '立夏 · 生长的能量加速', en: 'Start of Summer — the energy of growth accelerates', ja: '立夏 · 成長のエネルギーが加速します' },
  liqiu:   { zh: '立秋 · 收敛与沉淀的时节', en: 'Start of Autumn — a season for gathering and settling', ja: '立秋 · 収斂と沈着の季節です' },
  lidong:  { zh: '立冬 · 向内收藏，蓄积力量', en: 'Start of Winter — turn inward, store your energy', ja: '立冬 · 内に向かい、力を蓄える時です' },
};

// Check if today matches a solar term (same day or ±1 day for visibility)
function getSolarTerm(date) {
  const ds = date.toISOString().split('T')[0];
  const yesterday = new Date(date); yesterday.setDate(date.getDate() - 1);
  const tomorrow = new Date(date); tomorrow.setDate(date.getDate() + 1);
  const dates = [yesterday.toISOString().split('T')[0], ds, tomorrow.toISOString().split('T')[0]];

  for (const entry of SOLAR_TERMS) {
    if (dates.includes(entry.date)) {
      const info = SOLAR_TERM_NAMES[entry.key];
      const message = SOLAR_TERM_MESSAGES[entry.key] || null;
      return { key: entry.key, ...info, message, isToday: entry.date === ds };
    }
  }
  return null;
}

// ─── Composite Display Builder ─────────────────────────
function buildHeadline(moon, zodiac, retrogrades, solarTerm, lang) {
  // Always: moon emoji + moon name + zodiac
  let parts = [`${moon.emoji} ${moon.names[lang]} · ${zodiac.names.icon} ${zodiac.names[lang]}`];
  return parts.join('');
}

function buildMessages(moon, zodiac, retrogrades, solarTerm, lang) {
  const lines = [];

  // Priority 1: Retrogrades (highest priority)
  for (const r of retrogrades) {
    lines.push(`${r.icon} ${r.names[lang]}${lang === 'en' ? ' Retrograde — ' : '逆行中 — '}${r.hint[lang]}`);
  }

  // Priority 2: New moon / Full moon special message
  if (moon.priority >= 2) {
    lines.push(MOON_MESSAGES[moon.key]?.[lang] || '');
  }

  // Priority 3: Solar term
  if (solarTerm?.message) {
    lines.push(solarTerm.message[lang]);
  } else if (solarTerm) {
    // Minor solar term, just mention it
    const prefix = { zh: '今日节气：', en: 'Solar term: ', ja: '節気：' }[lang];
    lines.push(`${prefix}${solarTerm[lang]}`);
  }

  // Priority 4: Zodiac season (show if no higher-priority content filled it)
  if (lines.length <= retrogrades.length) {
    // Only retrograde lines so far, add zodiac message
    lines.push(`☀️ ${zodiac.message[lang]}`);
  }

  // Priority 5: Normal moon phase (always show if we only have zodiac + retrograde)
  if (moon.priority < 2 && !solarTerm) {
    const dayLabel = { zh: `月相第${moon.age}天`, en: `Lunar day ${moon.age}`, ja: `月齢${moon.age}日` }[lang];
    const illLabel = { zh: `月光${moon.illumination}%`, en: `${moon.illumination}% illuminated`, ja: `月光${moon.illumination}%` }[lang];
    lines.push(`🌙 ${dayLabel} · ${illLabel}`);
    lines.push(MOON_MESSAGES[moon.key]?.[lang] || '');
  }

  return lines.filter(Boolean);
}

function buildPromptContext(moon, zodiac, retrogrades, solarTerm, lang) {
  const lines = [];

  if (lang === 'zh') {
    lines.push(`当前天象：${moon.names.zh}（月相第${moon.age}天），${zodiac.names.zh}季（${zodiac.elementNames.zh}能量）`);
    for (const r of retrogrades) lines.push(`${r.names.zh}逆行中`);
    if (solarTerm) lines.push(`节气：${solarTerm.zh}`);
    lines.push('若牌面与当前天象产生共鸣（如满月之夜抽到月亮牌、水星逆行时抽到逆位的魔术师），请在解读中自然融入，营造"宇宙在呼应"的感觉，但不要生硬罗列天文信息。');
  } else if (lang === 'en') {
    lines.push(`Current celestial context: ${moon.names.en} (lunar day ${moon.age}), ${zodiac.names.en} season (${zodiac.elementNames.en} energy)`);
    for (const r of retrogrades) lines.push(`${r.names.en} is in retrograde`);
    if (solarTerm) lines.push(`Solar term: ${solarTerm.en}`);
    lines.push('If a card resonates with the current celestial context (e.g., drawing The Moon on a Full Moon, or a reversed Magician during Mercury retrograde), weave it naturally into the reading to create a sense of cosmic resonance. Do not list astronomy facts mechanically.');
  } else {
    lines.push(`現在の天象：${moon.names.ja}（月齢${moon.age}日）、${zodiac.names.ja}の季節（${zodiac.elementNames.ja}のエネルギー）`);
    for (const r of retrogrades) lines.push(`${r.names.ja}逆行中`);
    if (solarTerm) lines.push(`節気：${solarTerm.ja}`);
    lines.push('カードが現在の天象と共鳴する場合（例：満月の夜に月のカードを引いた場合、水星逆行中に逆位の魔術師を引いた場合）、「宇宙が呼応している」感覚を自然に解釈に織り込んでください。天文情報を機械的に列挙しないでください。');
  }

  return lines.join('\n');
}

// ─── Main Export ───────────────────────────────────────
export function getCelestialContext(date = new Date(), lang = 'zh') {
  const moon = getMoonPhase(date);
  const zodiac = getZodiacSeason(date);
  const retrogrades = getActiveRetrogrades(date);
  const solarTerm = getSolarTerm(date);

  const headline = buildHeadline(moon, zodiac, retrogrades, solarTerm, lang);
  const messages = buildMessages(moon, zodiac, retrogrades, solarTerm, lang);
  const promptContext = buildPromptContext(moon, zodiac, retrogrades, solarTerm, lang);

  return {
    moon,
    zodiac,
    retrogrades,
    solarTerm,
    headline,
    messages, // array of display lines
    promptContext, // for AI prompt injection
  };
}
