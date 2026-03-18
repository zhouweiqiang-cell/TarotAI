export const LANGUAGE_OPTIONS = [
  { id: 'zh', name: '中文', icon: '🇨🇳' },
  { id: 'en', name: 'English', icon: '🇺🇸' },
  { id: 'ja', name: '日本語', icon: '🇯🇵' },
];

const texts = {
  zh: {
    // Tabs
    tabHome:     '每日',
    tabSpread:   '占卜',
    tabCards:    '牌库',
    tabHistory:  '记录',
    tabSettings: '设置',

    // Home
    dailyTitle:   '今日之牌',
    dailySubtitle: '每天一张牌，聆听宇宙的声音',
    dailyQuestion: '你今天有什么想问的？（可选）',
    dailyDraw:    '抽取今日之牌',
    alreadyDrawn: '你今天已经抽过牌了',
    viewReading:  '查看解读',

    // Spread
    spreadTitle:   '选择牌阵',
    spreadQuestion: '你的问题是什么？',
    spreadQuestionHint: '例如：关于感情/工作/未来的某个决策...',
    startReading:  '开始占卜',
    drawCard:      '点击翻牌',
    readingLoading: '正在解读星象...',

    // Cards
    cardsTitle:   '牌义查询',
    searchPlaceholder: '搜索牌名...',
    allCards:     '全部',
    upright:      '正位',
    reversed:     '逆位',
    keywords:     '关键词',
    element:      '元素',
    astrology:    '星座',

    // History
    historyTitle:  '历史记录',
    historyEmpty:  '还没有占卜记录',
    historySpread: '牌阵',
    delete:        '删除',

    // Settings
    settingsTitle: '设置',
    langSection:   '语言',
    langDesc:      '选择 AI 解读的语言',
    modelSection:  'AI 模型',
    modelDesc:     '不同模型有不同的解读风格',
    styleSection:  '解读风格',
    styleDesc:     '选择塔罗解读的叙述风格',

    styleMystical:    '神秘主义',
    styleMysticalDesc: '神秘、诗意，充满仪式感',
    stylePsychological: '心理学',
    stylePsychologicalDesc: '用荣格心理学视角解读象征',
    stylePractical:   '实用建议',
    stylePracticalDesc: '直接给出具体可操作的建议',

    // Models
    modelPro:       '旗舰模型',
    modelProDesc:   'Gemini 3.1 Pro — 最深度的解读',
    modelBalanced:  '均衡之选',
    modelBalancedDesc: 'Gemini 3 Flash — 速度与深度兼顾',
    modelAccurate:  '精准分析',
    modelAccurateDesc: 'Gemini 2.5 Flash — 细致入微',
    modelFast:      '快速解读',
    modelFastDesc:  'Gemini 3.1 Flash Lite — 即时响应',
    modelQwen:      '通义千问',
    modelQwenDesc:  'Qwen VL-Max — 阿里云大模型',
    modelGlm:       '智谱清言',
    modelGlmDesc:   'GLM-4V Flash — 免费视觉模型',

    // Reading result
    cardReading:   '牌义解读',
    overallMessage: '综合建议',
    energyTheme:   '能量主题',
    saveReading:   '保存记录',
    poweredBy:     '由 {model} 解读',

    // Errors
    errorNoQuestion: '请先输入你的问题',
    errorApiKey: 'API 密钥未配置',
    errorNetwork: '网络请求失败，请重试',
    errorParse: '解读数据格式错误',

    // AI Prompt
    buildPrompt: (question, cards, style) => {
      const styleGuide = {
        mystical: '用神秘主义和占星学的语言，富有诗意和仪式感',
        psychological: '用荣格心理学和原型象征的角度，理性而深刻',
        practical: '直接、实用，给出具体可操作的建议',
      }[style] || '用神秘主义的语言';

      const cardsDesc = cards.map(({ card, isReversed, position }) =>
        `【${position}】${card.name.zh}（${isReversed ? '逆位' : '正位'}）`
      ).join('\n');

      return `你是一位专业的塔罗占卜师。${styleGuide}地解读以下塔罗牌阵。

用户的问题：${question || '请给予今日的综合指引'}

抽到的牌阵：
${cardsDesc}

请以 JSON 格式返回解读，结构如下：
{
  "cardReadings": [
    {
      "cardId": "牌的id",
      "position": "位置名称",
      "isReversed": true/false,
      "reading": "针对该位置的详细解读（2-4句话）"
    }
  ],
  "overallMessage": "综合整体解读（3-5句话，呼应用户的问题）",
  "advice": "具体的行动建议（1-3条）",
  "energy": ["能量关键词1", "能量关键词2", "能量关键词3"]
}

只返回 JSON，不要有其他文字。`;
    },
  },

  en: {
    tabHome: 'Daily', tabSpread: 'Reading', tabCards: 'Cards', tabHistory: 'History', tabSettings: 'Settings',
    dailyTitle: "Today's Card", dailySubtitle: 'One card a day, listen to the universe',
    dailyQuestion: 'Do you have a question today? (optional)', dailyDraw: 'Draw Daily Card',
    alreadyDrawn: "You've already drawn today", viewReading: 'View Reading',
    spreadTitle: 'Choose a Spread', spreadQuestion: 'What is your question?',
    spreadQuestionHint: 'e.g. About love, work, or a decision...',
    startReading: 'Begin Reading', drawCard: 'Tap to Reveal', readingLoading: 'Reading the stars...',
    cardsTitle: 'Card Library', searchPlaceholder: 'Search cards...', allCards: 'All',
    upright: 'Upright', reversed: 'Reversed', keywords: 'Keywords', element: 'Element', astrology: 'Astrology',
    historyTitle: 'History', historyEmpty: 'No readings yet', historySpread: 'Spread', delete: 'Delete',
    settingsTitle: 'Settings', langSection: 'Language', langDesc: 'Language for AI interpretations',
    modelSection: 'AI Model', modelDesc: 'Each model has a different reading style',
    styleSection: 'Reading Style', styleDesc: 'Choose the narrative style of interpretations',
    styleMystical: 'Mystical', styleMysticalDesc: 'Poetic, mysterious, ceremonial',
    stylePsychological: 'Psychological', stylePsychologicalDesc: 'Jungian archetypes and symbolism',
    stylePractical: 'Practical', stylePracticalDesc: 'Direct, actionable guidance',
    modelPro: 'Flagship', modelProDesc: 'Gemini 3.1 Pro — Deepest interpretations',
    modelBalanced: 'Balanced', modelBalancedDesc: 'Gemini 3 Flash — Speed and depth',
    modelAccurate: 'Accurate', modelAccurateDesc: 'Gemini 2.5 Flash — Detailed analysis',
    modelFast: 'Fast', modelFastDesc: 'Gemini 3.1 Flash Lite — Instant response',
    modelQwen: 'Qwen VL', modelQwenDesc: 'Qwen VL-Max — Alibaba Cloud model',
    modelGlm: 'GLM Vision', modelGlmDesc: 'GLM-4V Flash — Free vision model',
    cardReading: 'Card Reading', overallMessage: 'Overall Message', energyTheme: 'Energy Theme',
    saveReading: 'Save Reading', poweredBy: 'Interpreted by {model}',
    errorNoQuestion: 'Please enter your question', errorApiKey: 'API key not configured',
    errorNetwork: 'Network error, please try again', errorParse: 'Response format error',

    buildPrompt: (question, cards, style) => {
      const styleGuide = { mystical: 'Use mystical, poetic language', psychological: 'Use Jungian psychology and archetypes', practical: 'Be direct and practical' }[style] || 'Use mystical language';
      const cardsDesc = cards.map(({ card, isReversed, position }) => `[${position}] ${card.name.en} (${isReversed ? 'Reversed' : 'Upright'})`).join('\n');
      return `You are a professional tarot reader. ${styleGuide}.\n\nQuestion: ${question || 'Give general daily guidance'}\n\nSpread:\n${cardsDesc}\n\nReturn JSON:\n{\n  "cardReadings": [{"cardId": "...", "position": "...", "isReversed": true/false, "reading": "..."}],\n  "overallMessage": "...",\n  "advice": "...",\n  "energy": ["keyword1", "keyword2", "keyword3"]\n}\n\nReturn JSON only.`;
    },
  },

  ja: {
    tabHome: '今日', tabSpread: '占い', tabCards: 'カード', tabHistory: '履歴', tabSettings: '設定',
    dailyTitle: '今日のカード', dailySubtitle: '毎日一枚、宇宙の声を聴く',
    dailyQuestion: '今日の質問は？（任意）', dailyDraw: '今日のカードを引く',
    alreadyDrawn: '今日はすでに引きました', viewReading: '解釈を見る',
    spreadTitle: 'スプレッドを選ぶ', spreadQuestion: 'あなたの質問は何ですか？',
    spreadQuestionHint: '例：恋愛、仕事、決断について...',
    startReading: '占いを始める', drawCard: 'タップしてめくる', readingLoading: '星を読んでいます...',
    cardsTitle: 'カード一覧', searchPlaceholder: 'カードを検索...', allCards: 'すべて',
    upright: '正位置', reversed: '逆位置', keywords: 'キーワード', element: '元素', astrology: '星座',
    historyTitle: '履歴', historyEmpty: '占い記録はまだありません', historySpread: 'スプレッド', delete: '削除',
    settingsTitle: '設定', langSection: '言語', langDesc: 'AI解釈の言語を選択',
    modelSection: 'AIモデル', modelDesc: 'モデルごとに解釈スタイルが異なります',
    styleSection: '解釈スタイル', styleDesc: 'タロット解釈のスタイルを選択',
    styleMystical: '神秘主義', styleMysticalDesc: '詩的で神秘的、儀式的',
    stylePsychological: '心理学的', stylePsychologicalDesc: 'ユング心理学とアーキタイプ',
    stylePractical: '実践的', stylePracticalDesc: '具体的で実用的なアドバイス',
    modelPro: 'フラッグシップ', modelProDesc: 'Gemini 3.1 Pro — 最も深い解釈',
    modelBalanced: 'バランス型', modelBalancedDesc: 'Gemini 3 Flash — 速さと深さのバランス',
    modelAccurate: '精密分析', modelAccurateDesc: 'Gemini 2.5 Flash — 詳細な分析',
    modelFast: '高速解釈', modelFastDesc: 'Gemini 3.1 Flash Lite — 即座に応答',
    modelQwen: '通義千問', modelQwenDesc: 'Qwen VL-Max — アリババクラウド',
    modelGlm: 'GLMビジョン', modelGlmDesc: 'GLM-4V Flash — 無料ビジョンモデル',
    cardReading: 'カード解釈', overallMessage: '総合メッセージ', energyTheme: 'エネルギーテーマ',
    saveReading: '記録を保存', poweredBy: '{model} による解釈',
    errorNoQuestion: '質問を入力してください', errorApiKey: 'APIキーが未設定です',
    errorNetwork: 'ネットワークエラー', errorParse: 'レスポンス形式エラー',

    buildPrompt: (question, cards, style) => {
      const cardsDesc = cards.map(({ card, isReversed, position }) => `【${position}】${card.name.ja}（${isReversed ? '逆位置' : '正位置'}）`).join('\n');
      return `あなたはプロのタロットリーダーです。日本語で解釈してください。\n\n質問：${question || '今日の総合的なガイダンスをください'}\n\nスプレッド：\n${cardsDesc}\n\nJSON形式で返してください：\n{\n  "cardReadings": [{"cardId": "...", "position": "...", "isReversed": true/false, "reading": "..."}],\n  "overallMessage": "...",\n  "advice": "...",\n  "energy": ["キーワード1", "キーワード2", "キーワード3"]\n}\n\nJSONのみを返してください。`;
    },
  },
};

export function getTexts(lang = 'zh') {
  return texts[lang] || texts.zh;
}
