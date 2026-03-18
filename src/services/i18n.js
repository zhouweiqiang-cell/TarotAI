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
    redraw:       '重新抽牌',
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

    themeSection:  '视觉主题',
    themeDesc:     '切换界面的视觉风格',
    themeCosmic:      '✨ 星空',
    themeCosmicDesc:  '深紫星空，神秘浪漫',
    themeDune:        '🏜️ 沙丘',
    themeDuneDesc:    '沙漠美学，肃穆辽阔',

    animSection:   '占卜动画风格',
    animDesc:      '选择占卜时的加载动画',
    animNebula:       '🌌 星云闪烁',
    animNebulaDesc:   '星辰粒子漂浮、扩散、闪烁',
    animMatrix:       '💻 黑客帝国',
    animMatrixDesc:   '数字雨掉落，解读文字飞流',

    toneSection:  '沟通风格',
    toneDesc:     '选择占卜师的说话方式',
    toneFormal:      '📖 正式',
    toneFormalDesc:   '专业严谨，学术化表达',
    toneFriendly:    '💬 口语',
    toneFriendlyDesc: '亲切易懂，像朋友聊天',
    toneHumorous:    '😄 幽默',
    toneHumorousDesc: '轻松诙谐，用比喻和段子',
    toneBlunt:       '🗡️ 坦率',
    toneBluntDesc:    '直言不讳，不绕弯子',
    toneGentle:      '🌸 温柔',
    toneGentleDesc:   '温暖鼓励，循循善诱',

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
    connections:   '牌间关联',
    narrative:     '整体叙事',
    caution:       '注意事项',

    // UI labels
    viewDetail:     '查看详情 →',
    interpreting:   '正在解读...',
    resetReading:   '重新占卜',
    cardUnit:       '张',
    loadingSubtext: '星象正在汇聚，请稍候...',
    voiceInput:     '🎤 语音输入',
    recordStop:     '⏹ 停止录音',
    transcribing:   '⏳ 识别中...',

    // Errors
    errorNoQuestion: '请先输入你的问题',
    errorApiKey: 'API 密钥未配置',
    errorNetwork: '网络请求失败，请重试',
    errorParse: '解读数据格式错误',
    errorTranscription: '识别失败，请重试',
    errorTranscriptionFail: '识别出错: ',
    errorMicrophone: '麦克风访问失败: ',
    errorRecording: '录音失败: ',

    // AI Prompt
    buildPrompt: (question, cards, style, tone) => {
      const styleGuide = {
        mystical: '用神秘主义和占星学的语言，富有诗意和仪式感',
        psychological: '用荣格心理学和原型象征的角度，理性而深刻',
        practical: '直接、实用，给出具体可操作的建议',
      }[style] || '用神秘主义的语言';

      const toneGuide = {
        formal:   '请用专业严谨的书面语，措辞学术化',
        friendly: '请用亲切随和的口语，像朋友之间聊天一样',
        humorous: '请用轻松幽默的语气，多用生动的比喻和趣味表达',
        blunt:    '请直言不讳，不要绕弯子，有什么说什么',
        gentle:   '请用温柔鼓励的语气，温暖体贴，循循善诱',
      }[tone] || '请用亲切随和的口语';

      const cardsDesc = cards.map(({ card, isReversed, position }) => {
        const lang = 'zh';
        const lines = [`【${position}】${card.name.zh}（${isReversed ? '逆位' : '正位'}）`];
        if (card.keywords?.[lang]) lines.push(`  关键词：${card.keywords[lang].join('、')}`);
        if (card.meaning?.[lang]) {
          const m = isReversed ? card.meaning[lang].reversed : card.meaning[lang].upright;
          if (m) lines.push(`  牌义：${m}`);
        }
        if (card.element) lines.push(`  元素：${card.element}`);
        if (card.astrology) lines.push(`  星座/行星：${card.astrology}`);
        return lines.join('\n');
      }).join('\n\n');

      return `你是一位专业的塔罗占卜师。

【解读流派】${styleGuide}。
【沟通风格】${toneGuide}。

用户的问题：${question || '请给予今日的综合指引'}

抽到的牌阵（含牌义参考）：
${cardsDesc}

解读要求：
1. 每张牌的解读必须围绕用户的问题展开，不要泛泛而谈
2. 分析牌与牌之间的关联和呼应（元素、能量、叙事逻辑）
3. 综合所有牌给出一个连贯的整体叙事
4. 可以引用牌的元素属性和星座对应来丰富解读

请以 JSON 格式返回，结构如下：
{
  "cardReadings": [
    {
      "cardId": "牌的id",
      "position": "位置名称",
      "isReversed": true/false,
      "reading": "围绕用户问题的详细解读（3-5句话）"
    }
  ],
  "connections": "牌间关联分析（哪些牌形成呼应、冲突或递进，2-3句话）",
  "narrative": "整体叙事（将所有牌串成一个完整故事，围绕用户的问题，3-5句话）",
  "overallMessage": "综合建议（呼应用户问题的核心回答，2-4句话）",
  "advice": "具体的行动建议（2-3条，可操作的）",
  "caution": "需要注意的事项或潜在风险（1-2句话）",
  "energy": ["能量关键词1", "能量关键词2", "能量关键词3"]
}

只返回 JSON，不要有其他文字。`;
    },
  },

  en: {
    tabHome: 'Daily', tabSpread: 'Reading', tabCards: 'Cards', tabHistory: 'History', tabSettings: 'Settings',
    dailyTitle: "Today's Card", dailySubtitle: 'One card a day, listen to the universe',
    dailyQuestion: 'Do you have a question today? (optional)', dailyDraw: 'Draw Daily Card', redraw: 'Redraw',
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
    themeSection: 'Visual Theme', themeDesc: 'Switch the visual style',
    themeCosmic: '✨ Cosmic', themeCosmicDesc: 'Deep purple starfield, mystical and romantic',
    themeDune: '🏜️ Dune', themeDuneDesc: 'Desert aesthetic, solemn and vast',
    animSection: 'Divination Animation', animDesc: 'Choose the loading animation style',
    animNebula: '🌌 Nebula', animNebulaDesc: 'Drifting star particles and nebula clouds',
    animMatrix: '💻 Matrix', animMatrixDesc: 'Digital rain with streaming text cascade',
    toneSection: 'Tone', toneDesc: 'Choose how the reader speaks to you',
    toneFormal: '📖 Formal', toneFormalDesc: 'Professional, academic style',
    toneFriendly: '💬 Casual', toneFriendlyDesc: 'Friendly, like chatting with a friend',
    toneHumorous: '😄 Humorous', toneHumorousDesc: 'Witty, fun metaphors and jokes',
    toneBlunt: '🗡️ Blunt', toneBluntDesc: 'Straight to the point, no sugarcoating',
    toneGentle: '🌸 Gentle', toneGentleDesc: 'Warm, encouraging and nurturing',
    modelPro: 'Flagship', modelProDesc: 'Gemini 3.1 Pro — Deepest interpretations',
    modelBalanced: 'Balanced', modelBalancedDesc: 'Gemini 3 Flash — Speed and depth',
    modelAccurate: 'Accurate', modelAccurateDesc: 'Gemini 2.5 Flash — Detailed analysis',
    modelFast: 'Fast', modelFastDesc: 'Gemini 3.1 Flash Lite — Instant response',
    modelQwen: 'Qwen VL', modelQwenDesc: 'Qwen VL-Max — Alibaba Cloud model',
    modelGlm: 'GLM Vision', modelGlmDesc: 'GLM-4V Flash — Free vision model',
    cardReading: 'Card Reading', overallMessage: 'Overall Message', energyTheme: 'Energy Theme',
    saveReading: 'Save Reading', poweredBy: 'Interpreted by {model}',
    connections: 'Card Connections', narrative: 'Story', caution: 'Caution',
    viewDetail: 'View Details →', interpreting: 'Interpreting...', resetReading: 'New Reading',
    cardUnit: 'cards', loadingSubtext: 'The stars are aligning, please wait...',
    voiceInput: '🎤 Voice Input', recordStop: '⏹ Stop Recording', transcribing: '⏳ Transcribing...',
    errorNoQuestion: 'Please enter your question', errorApiKey: 'API key not configured',
    errorNetwork: 'Network error, please try again', errorParse: 'Response format error',
    errorTranscription: 'Recognition failed, please retry',
    errorTranscriptionFail: 'Recognition error: ', errorMicrophone: 'Microphone access failed: ',
    errorRecording: 'Recording failed: ',

    buildPrompt: (question, cards, style, tone) => {
      const styleGuide = { mystical: 'Use mystical, poetic language', psychological: 'Use Jungian psychology and archetypes', practical: 'Be direct and practical' }[style] || 'Use mystical language';
      const toneGuide = { formal: 'Use formal, academic language', friendly: 'Use casual, conversational language like chatting with a friend', humorous: 'Use humor, vivid metaphors and witty expressions', blunt: 'Be blunt and straightforward, no sugarcoating', gentle: 'Be warm, encouraging and nurturing' }[tone] || 'Use casual, conversational language';
      const cardsDesc = cards.map(({ card, isReversed, position }) => {
        const lines = [`[${position}] ${card.name.en} (${isReversed ? 'Reversed' : 'Upright'})`];
        if (card.keywords?.en) lines.push(`  Keywords: ${card.keywords.en.join(', ')}`);
        if (card.meaning?.en) { const m = isReversed ? card.meaning.en.reversed : card.meaning.en.upright; if (m) lines.push(`  Meaning: ${m}`); }
        if (card.element) lines.push(`  Element: ${card.element}`);
        if (card.astrology) lines.push(`  Astrology: ${card.astrology}`);
        return lines.join('\n');
      }).join('\n\n');
      return `You are a professional tarot reader.\n\n[Style] ${styleGuide}.\n[Tone] ${toneGuide}.\n\nQuestion: ${question || 'Give general daily guidance'}\n\nSpread (with card references):\n${cardsDesc}\n\nRequirements:\n1. Each card reading must relate to the user's question\n2. Analyze connections between cards (elements, energy, narrative)\n3. Weave all cards into a coherent overall narrative\n4. Reference elemental and astrological correspondences\n\nReturn JSON:\n{\n  "cardReadings": [{"cardId": "...", "position": "...", "isReversed": true/false, "reading": "3-5 sentences"}],\n  "connections": "Inter-card analysis (2-3 sentences)",\n  "narrative": "Overall story weaving all cards (3-5 sentences)",\n  "overallMessage": "Core answer to the question (2-4 sentences)",\n  "advice": "Actionable advice (2-3 items)",\n  "caution": "Potential risks or things to watch out for (1-2 sentences)",\n  "energy": ["keyword1", "keyword2", "keyword3"]\n}\n\nReturn JSON only.`;
    },
  },

  ja: {
    tabHome: '今日', tabSpread: '占い', tabCards: 'カード', tabHistory: '履歴', tabSettings: '設定',
    dailyTitle: '今日のカード', dailySubtitle: '毎日一枚、宇宙の声を聴く',
    dailyQuestion: '今日の質問は？（任意）', dailyDraw: '今日のカードを引く', redraw: '引き直す',
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
    themeSection: 'ビジュアルテーマ', themeDesc: 'ビジュアルスタイルを切り替え',
    themeCosmic: '✨ コズミック', themeCosmicDesc: '深い紫の星空、神秘的でロマンチック',
    themeDune: '🏜️ デューン', themeDuneDesc: '砂漠の美学、荘厳で広大',
    animSection: '占いアニメーション', animDesc: 'ローディングアニメーションのスタイルを選択',
    animNebula: '🌌 ネビュラ', animNebulaDesc: '星雲粒子が漂い、きらめく',
    animMatrix: '💻 マトリックス', animMatrixDesc: 'デジタルレインとテキストカスケード',
    toneSection: 'トーン', toneDesc: 'リーダーの話し方を選択',
    toneFormal: '📖 フォーマル', toneFormalDesc: '専門的で学術的な表現',
    toneFriendly: '💬 カジュアル', toneFriendlyDesc: '友達と話すような親しみやすさ',
    toneHumorous: '😄 ユーモア', toneHumorousDesc: 'ウィットに富んだ楽しい表現',
    toneBlunt: '🗡️ 率直', toneBluntDesc: '遠回しにせず、ストレートに',
    toneGentle: '🌸 優しい', toneGentleDesc: '温かく励ますような口調',
    modelPro: 'フラッグシップ', modelProDesc: 'Gemini 3.1 Pro — 最も深い解釈',
    modelBalanced: 'バランス型', modelBalancedDesc: 'Gemini 3 Flash — 速さと深さのバランス',
    modelAccurate: '精密分析', modelAccurateDesc: 'Gemini 2.5 Flash — 詳細な分析',
    modelFast: '高速解釈', modelFastDesc: 'Gemini 3.1 Flash Lite — 即座に応答',
    modelQwen: '通義千問', modelQwenDesc: 'Qwen VL-Max — アリババクラウド',
    modelGlm: 'GLMビジョン', modelGlmDesc: 'GLM-4V Flash — 無料ビジョンモデル',
    cardReading: 'カード解釈', overallMessage: '総合メッセージ', energyTheme: 'エネルギーテーマ',
    saveReading: '記録を保存', poweredBy: '{model} による解釈',
    connections: 'カード間の関連', narrative: 'ストーリー', caution: '注意事項',
    viewDetail: '詳細を見る →', interpreting: '解釈中...', resetReading: 'もう一度占う',
    cardUnit: '枚', loadingSubtext: '星が集まっています、少々お待ちください...',
    voiceInput: '🎤 音声入力', recordStop: '⏹ 録音停止', transcribing: '⏳ 認識中...',
    errorNoQuestion: '質問を入力してください', errorApiKey: 'APIキーが未設定です',
    errorNetwork: 'ネットワークエラー', errorParse: 'レスポンス形式エラー',
    errorTranscription: '認識に失敗しました、再試行してください',
    errorTranscriptionFail: '認識エラー: ', errorMicrophone: 'マイクアクセスに失敗: ',
    errorRecording: '録音に失敗: ',

    buildPrompt: (question, cards, style, tone) => {
      const styleGuide = { mystical: '神秘的で詩的な言葉で', psychological: 'ユング心理学とアーキタイプの視点で', practical: '具体的で実践的なアドバイスを' }[style] || '神秘的な言葉で';
      const toneGuide = { formal: '格式ばった学術的な表現で', friendly: '友達と話すようなカジュアルな口調で', humorous: 'ユーモアと比喩を使って楽しく', blunt: '率直に、遠回しにせず', gentle: '温かく励ますような優しい口調で' }[tone] || '友達と話すようなカジュアルな口調で';
      const cardsDesc = cards.map(({ card, isReversed, position }) => {
        const lines = [`【${position}】${card.name.ja}（${isReversed ? '逆位置' : '正位置'}）`];
        if (card.keywords?.ja) lines.push(`  キーワード：${card.keywords.ja.join('、')}`);
        if (card.meaning?.ja) { const m = isReversed ? card.meaning.ja.reversed : card.meaning.ja.upright; if (m) lines.push(`  意味：${m}`); }
        if (card.element) lines.push(`  元素：${card.element}`);
        if (card.astrology) lines.push(`  星座：${card.astrology}`);
        return lines.join('\n');
      }).join('\n\n');
      return `あなたはプロのタロットリーダーです。\n\n【スタイル】${styleGuide}解釈してください。\n【トーン】${toneGuide}話してください。\n\n質問：${question || '今日の総合的なガイダンスをください'}\n\nスプレッド（カード情報付き）：\n${cardsDesc}\n\n要件：\n1. 各カードの解釈は質問に関連させること\n2. カード間の関連性を分析すること\n3. すべてのカードを一つの物語に織り込むこと\n4. 元素や星座の対応を引用すること\n\nJSON形式で返してください：\n{\n  "cardReadings": [{"cardId": "...", "position": "...", "isReversed": true/false, "reading": "3-5文"}],\n  "connections": "カード間の関連分析（2-3文）",\n  "narrative": "全体の物語（3-5文）",\n  "overallMessage": "総合メッセージ（2-4文）",\n  "advice": "具体的なアドバイス（2-3項目）",\n  "caution": "注意事項やリスク（1-2文）",\n  "energy": ["キーワード1", "キーワード2", "キーワード3"]\n}\n\nJSONのみを返してください。`;
    },
  },
};

export function getTexts(lang = 'zh') {
  return texts[lang] || texts.zh;
}
