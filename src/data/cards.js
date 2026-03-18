// 78 张塔罗牌完整数据
// 22 大阿卡纳 + 56 小阿卡纳（权杖/圣杯/宝剑/星币各14张）

// ─── Element & Astrology i18n ────────────────────────────
export const ELEMENT_I18N = {
  '火':    { zh: '火', en: 'Fire', ja: '火' },
  '水':    { zh: '水', en: 'Water', ja: '水' },
  '风':    { zh: '风', en: 'Air', ja: '風' },
  '土':    { zh: '土', en: 'Earth', ja: '地' },
  '风/火': { zh: '风/火', en: 'Air/Fire', ja: '風/火' },
};

export const ASTRO_I18N = {
  '天王星': { zh: '天王星', en: 'Uranus', ja: '天王星' },
  '水星':   { zh: '水星', en: 'Mercury', ja: '水星' },
  '月亮':   { zh: '月亮', en: 'Moon', ja: '月' },
  '金星':   { zh: '金星', en: 'Venus', ja: '金星' },
  '牡羊座': { zh: '牡羊座', en: 'Aries', ja: '牡羊座' },
  '金牛座': { zh: '金牛座', en: 'Taurus', ja: '牡牛座' },
  '双子座': { zh: '双子座', en: 'Gemini', ja: '双子座' },
  '巨蟹座': { zh: '巨蟹座', en: 'Cancer', ja: '蟹座' },
  '狮子座': { zh: '狮子座', en: 'Leo', ja: '獅子座' },
  '处女座': { zh: '处女座', en: 'Virgo', ja: '乙女座' },
  '天秤座': { zh: '天秤座', en: 'Libra', ja: '天秤座' },
  '天蝎座': { zh: '天蝎座', en: 'Scorpio', ja: '蠍座' },
  '射手座': { zh: '射手座', en: 'Sagittarius', ja: '射手座' },
  '摩羯座': { zh: '摩羯座', en: 'Capricorn', ja: '山羊座' },
  '水瓶座': { zh: '水瓶座', en: 'Aquarius', ja: '水瓶座' },
  '双鱼座': { zh: '双鱼座', en: 'Pisces', ja: '魚座' },
  '太阳':   { zh: '太阳', en: 'Sun', ja: '太陽' },
  '火星':   { zh: '火星', en: 'Mars', ja: '火星' },
  '木星':   { zh: '木星', en: 'Jupiter', ja: '木星' },
  '土星':   { zh: '土星', en: 'Saturn', ja: '土星' },
  '海王星': { zh: '海王星', en: 'Neptune', ja: '海王星' },
  '冥王星': { zh: '冥王星', en: 'Pluto', ja: '冥王星' },
};

// ─── 大阿卡纳 Major Arcana ───────────────────────────────
const MAJOR_ARCANA = [
  {
    id: 'the_fool', number: 0, arcana: 'major', element: '风', astrology: '天王星',
    name: { zh: '愚者', en: 'The Fool', ja: '愚者' },
    keywords: {
      upright: { zh: ['新开始', '自由', '冒险', '天真'], en: ['New beginnings', 'Freedom', 'Adventure', 'Innocence'], ja: ['新しい始まり', '自由', '冒険', '無邪気'] },
      reversed: { zh: ['鲁莽', '冒失', '逃避现实'], en: ['Recklessness', 'Carelessness', 'Escapism'], ja: ['無謀', '軽率', '現実逃避'] },
    },
    meaning: {
      upright: { zh: '新的旅程即将开始。愚者代表纯粹的可能性，不受过去束缚，勇于迈出第一步。', en: 'A new journey begins. Pure potential, freedom from the past.', ja: '新しい旅が始まろうとしています。愚者は純粋な可能性を表し、過去に縛られず、最初の一歩を踏み出す勇気を持っています。' },
      reversed: { zh: '冲动行事，缺乏计划。提醒你在行动前三思，避免不必要的风险。', en: 'Recklessness, lack of planning. Think before acting.', ja: '衝動的な行動や計画の欠如に注意してください。行動する前によく考え、不必要なリスクを避けましょう。' },
    },
  },
  {
    id: 'the_magician', number: 1, arcana: 'major', element: '风/火', astrology: '水星',
    name: { zh: '魔术师', en: 'The Magician', ja: '魔術師' },
    keywords: {
      upright: { zh: ['意志力', '技巧', '创造', '行动'], en: ['Willpower', 'Skill', 'Creation', 'Action'], ja: ['意志力', '技術', '創造', '行動'] },
      reversed: { zh: ['欺骗', '操纵', '才能未发挥'], en: ['Deception', 'Manipulation', 'Untapped potential'], ja: ['欺瞞', '操作', '才能の未発揮'] },
    },
    meaning: {
      upright: { zh: '你拥有实现目标所需的一切工具和资源，是时候付诸行动了。', en: 'You have all the tools you need. Time to take action.', ja: 'あなたは目標を達成するためのすべてのツールと能力を持っています。今こそ自分の才能を活かして現実を創り出す時です。' },
      reversed: { zh: '才能被压抑或用于不良目的，警惕欺骗和操控。', en: 'Talents suppressed or misused. Beware of manipulation.', ja: '才能が十分に発揮されていないか、自分や他人を欺いている可能性があります。本来の力を正しい方向に使いましょう。' },
    },
  },
  {
    id: 'the_high_priestess', number: 2, arcana: 'major', element: '水', astrology: '月亮',
    name: { zh: '女祭司', en: 'The High Priestess', ja: '女教皇' },
    keywords: {
      upright: { zh: ['直觉', '潜意识', '神秘', '内在智慧'], en: ['Intuition', 'Subconscious', 'Mystery', 'Inner wisdom'], ja: ['直感', '潜在意識', '神秘', '内なる知恵'] },
      reversed: { zh: ['压抑直觉', '秘密', '忽视内心'], en: ['Suppressed intuition', 'Secrets', 'Ignoring inner voice'], ja: ['直感の抑圧', '秘密', '内なる声の無視'] },
    },
    meaning: {
      upright: { zh: '聆听内心的声音，相信你的直觉。答案已经在你内心深处。', en: 'Listen to your inner voice. Trust your intuition.', ja: '内なる声に耳を傾けてください。答えはすでにあなたの中にあります。静けさの中で真実が明らかになるでしょう。' },
      reversed: { zh: '你在压制自己的直觉，或有重要的秘密被隐藏。', en: 'Suppressing intuition or hidden secrets.', ja: '直感を無視したり、内面の声を押し殺していませんか。隠された真実や秘密が存在する可能性があります。' },
    },
  },
  {
    id: 'the_empress', number: 3, arcana: 'major', element: '土', astrology: '金星',
    name: { zh: '女皇', en: 'The Empress', ja: '女帝' },
    keywords: {
      upright: { zh: ['丰盛', '母性', '自然', '创造力', '感官享受'], en: ['Abundance', 'Motherhood', 'Nature', 'Creativity', 'Sensual pleasure'], ja: ['豊かさ', '母性', '自然', '創造力', '感覚的喜び'] },
      reversed: { zh: ['依赖', '过度保护', '创意受阻'], en: ['Dependence', 'Overprotection', 'Creative block'], ja: ['依存', '過保護', '創造性の停滞'] },
    },
    meaning: {
      upright: { zh: '丰收与滋养的能量。创造力旺盛，是孕育新事物的绝佳时机。', en: 'Abundance and nurturing energy. Creative power at its peak.', ja: '豊かさと創造のエネルギーに満ちた時期です。女帝は母なる大地のように、育み、生み出す力を象徴しています。' },
      reversed: { zh: '过度依赖或压迫，需要建立个人边界，让自己的创造力自由流动。', en: 'Overdependence or smothering. Establish boundaries.', ja: '他者への過度な依存や過保護に注意してください。創造的なエネルギーが滞っている可能性があります。' },
    },
  },
  {
    id: 'the_emperor', number: 4, arcana: 'major', element: '火', astrology: '牡羊座',
    name: { zh: '皇帝', en: 'The Emperor', ja: '皇帝' },
    keywords: {
      upright: { zh: ['权威', '结构', '稳定', '领导力'], en: ['Authority', 'Structure', 'Stability', 'Leadership'], ja: ['権威', '構造', '安定', 'リーダーシップ'] },
      reversed: { zh: ['专横', '控制', '缺乏灵活性'], en: ['Tyranny', 'Control', 'Inflexibility'], ja: ['横暴', '支配', '柔軟性の欠如'] },
    },
    meaning: {
      upright: { zh: '建立稳固的结构和秩序。用理性和纪律来掌控局面。', en: 'Establish structure and order. Lead with authority and discipline.', ja: '秩序と安定をもたらすリーダーシップの時です。確固たる基盤と明確なビジョンを持ち、計画的に物事を進めましょう。' },
      reversed: { zh: '过于控制或权威，需要学会放手，给予他人更多空间。', en: 'Over-controlling. Learn to let go and give others space.', ja: '支配的になりすぎたり、柔軟性を失っていませんか。他者の意見にも耳を傾けるバランスが必要です。' },
    },
  },
  {
    id: 'the_hierophant', number: 5, arcana: 'major', element: '土', astrology: '金牛座',
    name: { zh: '教皇', en: 'The Hierophant', ja: '法王' },
    keywords: {
      upright: { zh: ['传统', '信仰', '指引', '机构'], en: ['Tradition', 'Faith', 'Guidance', 'Institution'], ja: ['伝統', '信仰', '導き', '制度'] },
      reversed: { zh: ['叛逆', '突破传统', '质疑权威'], en: ['Rebellion', 'Breaking tradition', 'Questioning authority'], ja: ['反逆', '伝統の打破', '権威への疑問'] },
    },
    meaning: {
      upright: { zh: '遵循传统和既定的道路。寻求导师或精神指引。', en: 'Follow tradition and established paths. Seek mentorship.', ja: '伝統的な知恵や教えの中に答えがあります。信頼できる師や制度から学ぶ時期です。' },
      reversed: { zh: '打破常规，质疑既有体制，寻求个人信仰。', en: 'Break the rules. Question established systems.', ja: '既存の枠組みや伝統に疑問を感じている時期です。独自の道を模索する必要があるかもしれません。' },
    },
  },
  {
    id: 'the_lovers', number: 6, arcana: 'major', element: '风', astrology: '双子座',
    name: { zh: '恋人', en: 'The Lovers', ja: '恋人' },
    keywords: {
      upright: { zh: ['爱', '和谐', '关系', '价值选择'], en: ['Love', 'Harmony', 'Relationships', 'Value-based choices'], ja: ['愛', '調和', '関係', '価値観に基づく選択'] },
      reversed: { zh: ['不和谐', '分离', '价值观冲突'], en: ['Disharmony', 'Separation', 'Conflicting values'], ja: ['不調和', '別離', '価値観の対立'] },
    },
    meaning: {
      upright: { zh: '面临重要的选择，需要遵从内心的价值观。关系中充满和谐与爱。', en: 'Significant choice ahead. Harmony in relationships.', ja: '深い愛と調和の時期です。心に従った重要な選択を象徴しています。自分の価値観に正直に生きましょう。' },
      reversed: { zh: '关系中的摩擦或价值观的分歧，需要重新审视承诺。', en: 'Disharmony in relationships. Misaligned values.', ja: '関係における不調和や価値観の衝突が生じています。心の声に耳を傾け、正直に向き合いましょう。' },
    },
  },
  {
    id: 'the_chariot', number: 7, arcana: 'major', element: '水', astrology: '巨蟹座',
    name: { zh: '战车', en: 'The Chariot', ja: '戦車' },
    keywords: {
      upright: { zh: ['意志', '胜利', '自控', '前进'], en: ['Willpower', 'Victory', 'Self-control', 'Advancement'], ja: ['意志', '勝利', '自制心', '前進'] },
      reversed: { zh: ['失控', '方向迷失', '攻击性'], en: ['Loss of control', 'Lack of direction', 'Aggression'], ja: ['制御不能', '方向喪失', '攻撃性'] },
    },
    meaning: {
      upright: { zh: '用意志力和自律克服障碍，胜利即将到来。', en: 'Overcome obstacles through willpower. Victory is near.', ja: '強い意志と決意で勝利を掴む時です。困難を乗り越え、目標に向かって力強く前進しましょう。' },
      reversed: { zh: '方向感丧失，需要重新掌控自己的情绪和行动。', en: 'Loss of direction. Regain control of emotions.', ja: '方向性を見失い、コントロールが利かなくなっています。本当に進むべき方向を見定めましょう。' },
    },
  },
  {
    id: 'strength', number: 8, arcana: 'major', element: '火', astrology: '狮子座',
    name: { zh: '力量', en: 'Strength', ja: '力' },
    keywords: {
      upright: { zh: ['内在力量', '勇气', '耐心', '温柔征服'], en: ['Inner strength', 'Courage', 'Patience', 'Gentle persuasion'], ja: ['内なる力', '勇気', '忍耐', '柔らかな克服'] },
      reversed: { zh: ['自我怀疑', '软弱', '能量耗尽'], en: ['Self-doubt', 'Weakness', 'Burnout'], ja: ['自己不信', '弱さ', 'エネルギーの枯渇'] },
    },
    meaning: {
      upright: { zh: '真正的力量来自内心，用温柔和耐心而非蛮力来面对挑战。', en: 'Inner strength and gentle courage. Patience over force.', ja: '真の強さは内面から来ます。暴力ではなく愛と忍耐によって困難を克服しましょう。' },
      reversed: { zh: '内心脆弱，自我怀疑侵蚀你的力量，需要重新找回自信。', en: 'Self-doubt and weakness. Rebuild your confidence.', ja: '自信を失い、内なる力が弱まっています。本来持っている強さを思い出してください。' },
    },
  },
  {
    id: 'the_hermit', number: 9, arcana: 'major', element: '土', astrology: '处女座',
    name: { zh: '隐者', en: 'The Hermit', ja: '隠者' },
    keywords: {
      upright: { zh: ['内省', '智慧', '孤独', '指引'], en: ['Introspection', 'Wisdom', 'Solitude', 'Guidance'], ja: ['内省', '知恵', '孤独', '導き'] },
      reversed: { zh: ['孤立', '封闭', '拒绝帮助'], en: ['Isolation', 'Withdrawal', 'Refusing help'], ja: ['孤立', '引きこもり', '助けの拒否'] },
    },
    meaning: {
      upright: { zh: '需要独处和内省的时刻，向内寻求智慧和答案。', en: 'Time for solitude and introspection. Seek inner wisdom.', ja: '静かな内省の時間が必要です。自分自身の内なる光に導かれて真実を探求しましょう。' },
      reversed: { zh: '过度孤立，拒绝外部帮助，需要重新与他人连接。', en: 'Isolation and withdrawal. Open yourself to others.', ja: '孤独が孤立に変わっていませんか。周囲との繋がりを断ち切らず、助けを受け入れましょう。' },
    },
  },
  {
    id: 'wheel_of_fortune', number: 10, arcana: 'major', element: '火', astrology: '木星',
    name: { zh: '命运之轮', en: 'Wheel of Fortune', ja: '運命の輪' },
    keywords: {
      upright: { zh: ['转变', '命运', '机遇', '循环'], en: ['Change', 'Destiny', 'Opportunity', 'Cycles'], ja: ['転換', '運命', '好機', '循環'] },
      reversed: { zh: ['坏运气', '抗拒变化', '命运的挑战'], en: ['Bad luck', 'Resisting change', 'Challenges of fate'], ja: ['不運', '変化への抵抗', '運命の試練'] },
    },
    meaning: {
      upright: { zh: '命运的齿轮正在转动，好运和机遇随之而来。', en: 'The wheel of fate turns in your favor. Good fortune ahead.', ja: '運命の輪が回り、大きな転換期が訪れています。新たなチャンスと変化の波に乗りましょう。' },
      reversed: { zh: '逆境和不顺，但这也是循环的一部分，风水轮流转。', en: 'Setbacks and bad luck. This too shall pass.', ja: '不運な流れや予期せぬ障害に直面しています。変化に抵抗せず、流れを受け入れましょう。' },
    },
  },
  {
    id: 'justice', number: 11, arcana: 'major', element: '风', astrology: '天秤座',
    name: { zh: '正义', en: 'Justice', ja: '正義' },
    keywords: {
      upright: { zh: ['公正', '真相', '因果', '法律'], en: ['Justice', 'Truth', 'Cause and effect', 'Law'], ja: ['公正', '真実', '因果応報', '法'] },
      reversed: { zh: ['不公正', '逃避责任', '失衡'], en: ['Injustice', 'Avoiding accountability', 'Imbalance'], ja: ['不公正', '責任回避', '不均衡'] },
    },
    meaning: {
      upright: { zh: '因果法则发挥作用，公正的结果即将到来。', en: 'Cause and effect. A just outcome is coming.', ja: '公正さと真実が求められています。正しい行いには正しい結果が伴います。誠実に行動しましょう。' },
      reversed: { zh: '感到不公正，或自己在逃避应有的责任。', en: 'Unfairness or avoiding accountability.', ja: '不公正な状況や責任の回避が起きています。真実から目を逸らさず、誠実に向き合いましょう。' },
    },
  },
  {
    id: 'the_hanged_man', number: 12, arcana: 'major', element: '水', astrology: '海王星',
    name: { zh: '倒吊人', en: 'The Hanged Man', ja: '吊られた男' },
    keywords: {
      upright: { zh: ['暂停', '等待', '新视角', '自愿牺牲'], en: ['Pause', 'Waiting', 'New perspective', 'Voluntary sacrifice'], ja: ['一時停止', '待機', '新たな視点', '自発的犠牲'] },
      reversed: { zh: ['拖延', '停滞', '无谓牺牲'], en: ['Procrastination', 'Stagnation', 'Pointless sacrifice'], ja: ['先延ばし', '停滞', '無意味な犠牲'] },
    },
    meaning: {
      upright: { zh: '暂时放下，从不同角度看待问题，这段等待期将带来启示。', en: 'Pause and surrender. A new perspective brings enlightenment.', ja: '立ち止まり、物事を別の角度から見つめ直す時です。新たな視点を得ることで真の理解に至るでしょう。' },
      reversed: { zh: '无益的拖延，需要做出决定并采取行动。', en: 'Needless delays. Time to make a decision.', ja: '無意味に立ち止まったまま、前に進めなくなっています。行動を起こす決意が必要です。' },
    },
  },
  {
    id: 'death', number: 13, arcana: 'major', element: '水', astrology: '天蝎座',
    name: { zh: '死神', en: 'Death', ja: '死神' },
    keywords: {
      upright: { zh: ['转变', '结束', '蜕变', '新生'], en: ['Transformation', 'Ending', 'Metamorphosis', 'Rebirth'], ja: ['変容', '終焉', '脱皮', '再生'] },
      reversed: { zh: ['抗拒改变', '停滞', '腐朽'], en: ['Resisting change', 'Stagnation', 'Decay'], ja: ['変化への抵抗', '停滞', '衰退'] },
    },
    meaning: {
      upright: { zh: '一个阶段的结束是另一个阶段的开始，转变正在发生，接受它。', en: 'An ending makes way for new beginnings. Embrace transformation.', ja: '大きな変容の時が来ています。古いものが終わり新しいものが生まれる必然的な変化です。手放すことで再生が始まります。' },
      reversed: { zh: '抗拒必要的改变，导致内心停滞和腐朽。', en: 'Resisting necessary change. Stagnation.', ja: '必要な変化に抵抗し、過去にしがみついています。終わるべきものを手放しましょう。' },
    },
  },
  {
    id: 'temperance', number: 14, arcana: 'major', element: '火', astrology: '射手座',
    name: { zh: '节制', en: 'Temperance', ja: '節制' },
    keywords: {
      upright: { zh: ['平衡', '节制', '耐心', '调和'], en: ['Balance', 'Temperance', 'Patience', 'Harmony'], ja: ['均衡', '節制', '忍耐', '調和'] },
      reversed: { zh: ['过度', '不平衡', '极端'], en: ['Excess', 'Imbalance', 'Extremes'], ja: ['過剰', '不均衡', '極端'] },
    },
    meaning: {
      upright: { zh: '寻求平衡与和谐，耐心地将不同元素融合为美好的整体。', en: 'Balance and patience. Blend opposing forces harmoniously.', ja: 'バランスと調和を大切にする時期です。異なる要素を上手く融合させ、中庸の道を歩みましょう。' },
      reversed: { zh: '生活失衡，过度放纵或极端的行为需要得到纠正。', en: 'Imbalance and excess. Restore moderation.', ja: '生活のバランスが崩れ、何かが過剰になっています。中庸を取り戻す努力が必要です。' },
    },
  },
  {
    id: 'the_devil', number: 15, arcana: 'major', element: '土', astrology: '摩羯座',
    name: { zh: '恶魔', en: 'The Devil', ja: '悪魔' },
    keywords: {
      upright: { zh: ['束缚', '执念', '物质主义', '阴暗面'], en: ['Bondage', 'Obsession', 'Materialism', 'Shadow self'], ja: ['束縛', '執着', '物質主義', '影の自己'] },
      reversed: { zh: ['解脱', '打破枷锁', '觉醒'], en: ['Liberation', 'Breaking chains', 'Awakening'], ja: ['解放', '束縛からの脱却', '目覚め'] },
    },
    meaning: {
      upright: { zh: '你被某种执念或不健康的关系所束缚，认清真相才能获得自由。', en: 'Bondage to unhealthy patterns. Recognize what chains you.', ja: '何かに縛られ、自由を失っています。その鎖は自ら外すことができるものです。' },
      reversed: { zh: '从枷锁中解放，觉醒并打破有害的循环。', en: 'Breaking free from chains. Awakening and liberation.', ja: '束縛から解放される時が来ました。悪習慣から目覚め、真の自由を取り戻しましょう。' },
    },
  },
  {
    id: 'the_tower', number: 16, arcana: 'major', element: '火', astrology: '火星',
    name: { zh: '高塔', en: 'The Tower', ja: '塔' },
    keywords: {
      upright: { zh: ['突然变化', '破坏', '启示', '混乱'], en: ['Sudden change', 'Destruction', 'Revelation', 'Chaos'], ja: ['突然の変化', '崩壊', '啓示', '混乱'] },
      reversed: { zh: ['避免灾难', '延迟崩塌', '恐惧改变'], en: ['Averting disaster', 'Delayed collapse', 'Fear of change'], ja: ['災難の回避', '崩壊の遅延', '変化への恐れ'] },
    },
    meaning: {
      upright: { zh: '突如其来的颠覆，建立在错误基础上的事物将会崩塌，迎接重建。', en: 'Sudden upheaval destroys false foundations. Rebuild stronger.', ja: '突然の崩壊と変革が訪れます。偽りの基盤の上に築かれたものが崩れ去り、真実と新たな始まりが生まれます。' },
      reversed: { zh: '灾难被暂时避免，但根本问题仍需面对。', en: 'Disaster narrowly avoided, but root issues persist.', ja: '避けられない変化を恐れ、崩壊を先延ばしにしています。根本的な問題に向き合いましょう。' },
    },
  },
  {
    id: 'the_star', number: 17, arcana: 'major', element: '风', astrology: '水瓶座',
    name: { zh: '星星', en: 'The Star', ja: '星' },
    keywords: {
      upright: { zh: ['希望', '信念', '灵感', '宁静'], en: ['Hope', 'Faith', 'Inspiration', 'Serenity'], ja: ['希望', '信念', 'インスピレーション', '静寂'] },
      reversed: { zh: ['绝望', '失去信心', '悲观'], en: ['Despair', 'Loss of faith', 'Pessimism'], ja: ['絶望', '信念の喪失', '悲観'] },
    },
    meaning: {
      upright: { zh: '风雨过后，希望之星指引你前行，相信美好的未来。', en: 'Hope and inspiration after hardship. Trust in the future.', ja: '嵐の後に星が輝いています。希望と癒しの時期が訪れており、未来への信念を持ち続けてください。' },
      reversed: { zh: '失去希望和信心，需要重新点燃内心的光芒。', en: 'Loss of hope. Reignite your inner light.', ja: '希望を見失い、悲観的になっています。暗闇の中でも星は輝いていることを忘れないでください。' },
    },
  },
  {
    id: 'the_moon', number: 18, arcana: 'major', element: '水', astrology: '双鱼座',
    name: { zh: '月亮', en: 'The Moon', ja: '月' },
    keywords: {
      upright: { zh: ['幻觉', '恐惧', '潜意识', '不确定'], en: ['Illusion', 'Fear', 'Subconscious', 'Uncertainty'], ja: ['幻想', '恐れ', '潜在意識', '不確実性'] },
      reversed: { zh: ['释放恐惧', '真相浮现', '清醒'], en: ['Releasing fear', 'Truth emerging', 'Clarity'], ja: ['恐れの解放', '真実の浮上', '明晰'] },
    },
    meaning: {
      upright: { zh: '事情并非表面看起来那样，潜意识的恐惧和幻觉正在影响你的判断。', en: 'Things are not what they seem. Fear and illusion cloud your judgment.', ja: '物事が曖昧で不確実な時期です。真実が見えにくくなっています。幻惑に惑わされないよう注意しましょう。' },
      reversed: { zh: '迷雾散去，真相逐渐浮现，内心的恐惧得到释放。', en: 'Illusions fade. Truth emerges and fears are released.', ja: '霧が晴れ、真実が明らかになり始めています。恐れや不安から解放されるでしょう。' },
    },
  },
  {
    id: 'the_sun', number: 19, arcana: 'major', element: '火', astrology: '太阳',
    name: { zh: '太阳', en: 'The Sun', ja: '太陽' },
    keywords: {
      upright: { zh: ['成功', '喜悦', '活力', '光明'], en: ['Success', 'Joy', 'Vitality', 'Radiance'], ja: ['成功', '喜び', '活力', '輝き'] },
      reversed: { zh: ['悲观', '延迟成功', '内心阴暗'], en: ['Pessimism', 'Delayed success', 'Inner darkness'], ja: ['悲観', '成功の遅れ', '内なる暗さ'] },
    },
    meaning: {
      upright: { zh: '最积极的牌之一。成功、喜悦和光明照耀着你，一切顺遂。', en: 'Joy, success, and radiant positivity. Everything is going well.', ja: '太陽が明るく照らし、成功と喜びに満ちた時期です。自信を持って輝きましょう。' },
      reversed: { zh: '成功被暂时遮蔽，需要寻找内心的光明，重拾乐观。', en: 'Temporary setbacks cloud your success. Reconnect with inner joy.', ja: '成功が遅れたり、内面に暗さを感じています。楽観的な姿勢を取り戻しましょう。' },
    },
  },
  {
    id: 'judgement', number: 20, arcana: 'major', element: '火', astrology: '冥王星',
    name: { zh: '审判', en: 'Judgement', ja: '審判' },
    keywords: {
      upright: { zh: ['觉醒', '更新', '召唤', '赦免'], en: ['Awakening', 'Renewal', 'Calling', 'Absolution'], ja: ['覚醒', '再生', '召命', '赦し'] },
      reversed: { zh: ['自我怀疑', '无法放手', '错失良机'], en: ['Self-doubt', 'Inability to let go', 'Missed opportunity'], ja: ['自己不信', '手放せない', '好機の逸失'] },
    },
    meaning: {
      upright: { zh: '人生的重大转折点，一次觉醒的召唤，响应内心的呼唤去蜕变。', en: 'A major turning point. Answer the call to awaken and transform.', ja: '魂の覚醒と再生の時です。自分の本当の使命に目覚め、より高い自分へと生まれ変わりましょう。' },
      reversed: { zh: '迟迟无法做出重要决定，或未能从过去中吸取教训。', en: 'Unable to make important decisions or learn from the past.', ja: '過去に囚われ、自己変革の機会を逃しています。古い重荷を手放し、新たなステージへ進みましょう。' },
    },
  },
  {
    id: 'the_world', number: 21, arcana: 'major', element: '土', astrology: '土星',
    name: { zh: '世界', en: 'The World', ja: '世界' },
    keywords: {
      upright: { zh: ['完成', '整合', '成就', '旅程终点'], en: ['Completion', 'Integration', 'Achievement', "Journey's end"], ja: ['完成', '統合', '達成', '旅の終わり'] },
      reversed: { zh: ['未完成', '延迟', '缺乏结局'], en: ['Incompletion', 'Delay', 'Lack of closure'], ja: ['未完成', '遅延', '結末の欠如'] },
    },
    meaning: {
      upright: { zh: '一个重要阶段圆满结束，你已经实现了目标，感受完整的喜悦。', en: 'Completion and wholeness. A cycle ends in triumph.', ja: '一つの大きな旅が完結し、すべてが統合される時です。これまでの努力が実を結び、新たなサイクルが始まります。' },
      reversed: { zh: '事情悬而未决，需要认真反思还缺少什么来完成整个循环。', en: 'Incomplete goals. Reflect on what is still needed.', ja: '完成まであと一歩のところで停滞しています。最後の仕上げに集中し、サイクルを閉じましょう。' },
    },
  },
];

// ─── 小阿卡纳生成工具 ─────────────────────────────────
const RANK_NAMES = {
  zh: { 1:'王牌', 2:'二', 3:'三', 4:'四', 5:'五', 6:'六', 7:'七', 8:'八', 9:'九', 10:'十', 11:'侍从', 12:'骑士', 13:'王后', 14:'国王' },
  en: { 1:'Ace', 2:'Two', 3:'Three', 4:'Four', 5:'Five', 6:'Six', 7:'Seven', 8:'Eight', 9:'Nine', 10:'Ten', 11:'Page', 12:'Knight', 13:'Queen', 14:'King' },
  ja: { 1:'エース', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8', 9:'9', 10:'10', 11:'ペイジ', 12:'ナイト', 13:'クイーン', 14:'キング' },
};

const SUIT_NAMES = {
  wands:     { zh: '权杖', en: 'Wands', ja: 'ワンド' },
  cups:      { zh: '圣杯', en: 'Cups', ja: 'カップ' },
  swords:    { zh: '宝剑', en: 'Swords', ja: 'ソード' },
  pentacles: { zh: '星币', en: 'Pentacles', ja: 'ペンタクル' },
};

// 小阿卡纳关键词数据（按花色 + 点数）— zh/en/ja
const MINOR_DATA = {
  wands: [
    { up: { zh: ['新开始','热情','灵感','机遇'], en: ['New beginning','Passion','Inspiration','Opportunity'], ja: ['新しい始まり','情熱','インスピレーション','機会'] }, rev: { zh: ['延迟','犹豫','浪费潜力'], en: ['Delay','Hesitation','Wasted potential'], ja: ['遅延','躊躇','才能の浪費'] } },
    { up: { zh: ['进展','规划','决心','前进'], en: ['Progress','Planning','Determination','Moving forward'], ja: ['進展','計画','決意','前進'] }, rev: { zh: ['未知的恐惧','犹豫不决'], en: ['Fear of the unknown','Indecisiveness'], ja: ['未知への恐れ','優柔不断'] } },
    { up: { zh: ['合作','创意','团队','技能'], en: ['Collaboration','Creativity','Teamwork','Skill'], ja: ['協力','創造性','チームワーク','技能'] }, rev: { zh: ['竞争','嫉妒','阻碍'], en: ['Competition','Jealousy','Obstruction'], ja: ['競争','嫉妬','妨害'] } },
    { up: { zh: ['稳定','庆祝','和谐','建立'], en: ['Stability','Celebration','Harmony','Establishment'], ja: ['安定','祝福','調和','確立'] }, rev: { zh: ['冲突','不稳定','拖延'], en: ['Conflict','Instability','Procrastination'], ja: ['衝突','不安定','先延ばし'] } },
    { up: { zh: ['竞争','冲突','张力','斗争'], en: ['Competition','Conflict','Tension','Struggle'], ja: ['競争','衝突','緊張','闘争'] }, rev: { zh: ['内心冲突','失去优势'], en: ['Inner conflict','Losing advantage'], ja: ['内面の葛藤','優位性の喪失'] } },
    { up: { zh: ['成功','认可','荣誉','进步'], en: ['Success','Recognition','Honor','Progress'], ja: ['成功','認知','名誉','進歩'] }, rev: { zh: ['骄傲','自负','成就感不足'], en: ['Pride','Arrogance','Lack of fulfillment'], ja: ['驕り','自惚れ','達成感の欠如'] } },
    { up: { zh: ['勇气','坚持','决心','挑战'], en: ['Courage','Perseverance','Determination','Challenge'], ja: ['勇気','忍耐','決意','挑戦'] }, rev: { zh: ['动摇','放弃','自疑'], en: ['Wavering','Giving up','Self-doubt'], ja: ['動揺','諦め','自己疑念'] } },
    { up: { zh: ['紧迫','分散精力','超载','赶时间'], en: ['Urgency','Scattered energy','Overload','Rushing'], ja: ['緊迫','力の分散','過負荷','急ぎ'] }, rev: { zh: ['不知所措','草率行事'], en: ['Overwhelmed','Acting rashly'], ja: ['圧倒される','軽率な行動'] } },
    { up: { zh: ['智慧','知识','远见','快完成了'], en: ['Wisdom','Knowledge','Foresight','Near completion'], ja: ['知恵','知識','先見の明','完成間近'] }, rev: { zh: ['虎头蛇尾','缺乏洞见'], en: ['Failing to finish','Lack of insight'], ja: ['竜頭蛇尾','洞察力の欠如'] } },
    { up: { zh: ['重担','责任','压力','奋斗'], en: ['Heavy burden','Responsibility','Pressure','Struggle'], ja: ['重荷','責任','プレッシャー','奮闘'] }, rev: { zh: ['精疲力竭','不知变通'], en: ['Exhaustion','Inflexibility'], ja: ['疲労困憊','融通が利かない'] } },
    { up: { zh: ['探索','新机遇','消息','冒险'], en: ['Exploration','New opportunity','News','Adventure'], ja: ['探求','新たな機会','知らせ','冒険'] }, rev: { zh: ['犹豫','进展缓慢'], en: ['Hesitation','Slow progress'], ja: ['躊躇','進展の遅れ'] } },
    { up: { zh: ['热情','活力','冒险','行动'], en: ['Enthusiasm','Vitality','Adventure','Action'], ja: ['熱意','活力','冒険','行動'] }, rev: { zh: ['冒失','不成熟','鲁莽'], en: ['Recklessness','Immaturity','Impulsiveness'], ja: ['無鉄砲','未熟','衝動的'] } },
    { up: { zh: ['独立','直觉','自信','领导'], en: ['Independence','Intuition','Confidence','Leadership'], ja: ['独立','直感','自信','リーダーシップ'] }, rev: { zh: ['情绪化','冲动','任性'], en: ['Emotional','Impulsive','Willful'], ja: ['感情的','衝動的','気まま'] } },
    { up: { zh: ['远见','领导力','荣誉','创新'], en: ['Vision','Leadership','Honor','Innovation'], ja: ['先見性','リーダーシップ','名誉','革新'] }, rev: { zh: ['专横','冲动的决策'], en: ['Tyrannical','Impulsive decisions'], ja: ['横暴','衝動的な決断'] } },
  ],
  cups: [
    { up: { zh: ['情感开始','直觉','爱的机遇','喜悦'], en: ['Emotional beginning','Intuition','Love opportunity','Joy'], ja: ['感情の始まり','直感','愛の機会','喜び'] }, rev: { zh: ['情感阻塞','封闭内心'], en: ['Emotional blockage','Closed heart'], ja: ['感情の停滞','心を閉ざす'] } },
    { up: { zh: ['关系','联系','和谐','庆祝'], en: ['Relationship','Connection','Harmony','Celebration'], ja: ['関係','繋がり','調和','祝福'] }, rev: { zh: ['误解','关系破裂'], en: ['Misunderstanding','Relationship breakdown'], ja: ['誤解','関係の破綻'] } },
    { up: { zh: ['庆祝','友谊','喜悦','共同体'], en: ['Celebration','Friendship','Joy','Community'], ja: ['祝福','友情','喜び','共同体'] }, rev: { zh: ['孤立','失望','娱乐过度'], en: ['Isolation','Disappointment','Overindulgence'], ja: ['孤立','失望','遊び過ぎ'] } },
    { up: { zh: ['冥想','孤独','回顾','内省'], en: ['Meditation','Solitude','Reflection','Introspection'], ja: ['瞑想','孤独','振り返り','内省'] }, rev: { zh: ['退缩','无聊','停滞'], en: ['Withdrawal','Boredom','Stagnation'], ja: ['引きこもり','退屈','停滞'] } },
    { up: { zh: ['遗憾','失去','重新评估','不满'], en: ['Regret','Loss','Reassessment','Discontent'], ja: ['後悔','喪失','再評価','不満'] }, rev: { zh: ['走出困境','宽恕','新机遇'], en: ['Moving on','Forgiveness','New opportunity'], ja: ['困難からの脱出','許し','新たな機会'] } },
    { up: { zh: ['怀旧','童真','记忆','重聚'], en: ['Nostalgia','Innocence','Memories','Reunion'], ja: ['郷愁','純真','思い出','再会'] }, rev: { zh: ['停留过去','不切实际'], en: ['Living in the past','Unrealistic'], ja: ['過去に囚われる','非現実的'] } },
    { up: { zh: ['幻想','选择','白日梦','迷惑'], en: ['Fantasy','Choices','Daydream','Illusion'], ja: ['幻想','選択','白昼夢','惑わし'] }, rev: { zh: ['清醒','做出选择','务实'], en: ['Clarity','Making a choice','Pragmatism'], ja: ['覚醒','選択する','現実的'] } },
    { up: { zh: ['放弃','移行','更高召唤','宁静'], en: ['Abandonment','Transition','Higher calling','Serenity'], ja: ['放棄','移行','高い召命','静寂'] }, rev: { zh: ['不知足','逃避现实'], en: ['Discontentment','Escapism'], ja: ['不満足','現実逃避'] } },
    { up: { zh: ['满足','感恩','愿望达成','自足'], en: ['Contentment','Gratitude','Wish fulfilled','Self-sufficiency'], ja: ['満足','感謝','願望成就','自立'] }, rev: { zh: ['自满','物质主义','无聊'], en: ['Complacency','Materialism','Boredom'], ja: ['自己満足','物質主義','退屈'] } },
    { up: { zh: ['情感圆满','家庭幸福','和谐','喜悦'], en: ['Emotional fulfillment','Family happiness','Harmony','Joy'], ja: ['感情の充足','家庭の幸福','調和','喜び'] }, rev: { zh: ['家庭冲突','情感不满'], en: ['Family conflict','Emotional dissatisfaction'], ja: ['家庭の衝突','感情の不満'] } },
    { up: { zh: ['好消息','创意','敏感','机遇'], en: ['Good news','Creativity','Sensitivity','Opportunity'], ja: ['良い知らせ','創造性','感受性','機会'] }, rev: { zh: ['坏消息','嫉妒','不成熟'], en: ['Bad news','Jealousy','Immaturity'], ja: ['悪い知らせ','嫉妬','未熟'] } },
    { up: { zh: ['浪漫','魅力','跟随心'], en: ['Romance','Charm','Following the heart'], ja: ['ロマンス','魅力','心に従う'] }, rev: { zh: ['不切实际','欺骗','情绪化'], en: ['Unrealistic','Deception','Emotional'], ja: ['非現実的','欺瞞','感情的'] } },
    { up: { zh: ['温柔','直觉','治愈','同情'], en: ['Gentleness','Intuition','Healing','Compassion'], ja: ['優しさ','直感','癒し','慈悲'] }, rev: { zh: ['忽视直觉','情感操控'], en: ['Ignoring intuition','Emotional manipulation'], ja: ['直感の無視','感情的操作'] } },
    { up: { zh: ['爱','同理心','情感成熟','创意'], en: ['Love','Empathy','Emotional maturity','Creativity'], ja: ['愛','共感','感情の成熟','創造性'] }, rev: { zh: ['情感操控','不稳定'], en: ['Emotional manipulation','Instability'], ja: ['感情的操作','不安定'] } },
  ],
  swords: [
    { up: { zh: ['突破','清晰','真相','决断'], en: ['Breakthrough','Clarity','Truth','Decisiveness'], ja: ['突破','明晰','真実','決断'] }, rev: { zh: ['混乱','破坏性想法','滥用力量'], en: ['Chaos','Destructive thoughts','Abuse of power'], ja: ['混乱','破壊的な思考','力の乱用'] } },
    { up: { zh: ['僵局','需要做决定','平衡','暂停'], en: ['Stalemate','Decision needed','Balance','Pause'], ja: ['膠着','決断の必要','均衡','休止'] }, rev: { zh: ['优柔寡断','紧张','信息过载'], en: ['Indecisiveness','Tension','Information overload'], ja: ['優柔不断','緊張','情報過多'] } },
    { up: { zh: ['悲痛','孤独','心碎','分离'], en: ['Grief','Loneliness','Heartbreak','Separation'], ja: ['悲嘆','孤独','失恋','別離'] }, rev: { zh: ['走出痛苦','接受','心理复原'], en: ['Moving past pain','Acceptance','Emotional recovery'], ja: ['痛みからの回復','受容','心の復元'] } },
    { up: { zh: ['失败','耻辱','后退','认输'], en: ['Defeat','Shame','Retreat','Surrender'], ja: ['敗北','恥辱','後退','降伏'] }, rev: { zh: ['恢复','尝试再来','不服输'], en: ['Recovery','Trying again','Refusing to give up'], ja: ['回復','再挑戦','負けず嫌い'] } },
    { up: { zh: ['胜利','野心','冲突','策略'], en: ['Victory','Ambition','Conflict','Strategy'], ja: ['勝利','野心','衝突','戦略'] }, rev: { zh: ['残酷的胜利','不道德的行为'], en: ['Hollow victory','Unethical behavior'], ja: ['残酷な勝利','不道徳な行為'] } },
    { up: { zh: ['过渡','告别','迁移','离开'], en: ['Transition','Farewell','Migration','Departure'], ja: ['過渡','別れ','移動','出発'] }, rev: { zh: ['困境','不肯放手','无法前进'], en: ['Predicament','Refusing to let go','Unable to move on'], ja: ['困難','手放せない','前に進めない'] } },
    { up: { zh: ['偷窃','欺骗','诡计','孤立'], en: ['Theft','Deception','Trickery','Isolation'], ja: ['盗み','欺瞞','策略','孤立'] }, rev: { zh: ['揭露欺骗','策略失败'], en: ['Exposing deception','Failed strategy'], ja: ['欺瞞の露呈','策略の失敗'] } },
    { up: { zh: ['受困','限制','无力感','自我设限'], en: ['Trapped','Restriction','Powerlessness','Self-limitation'], ja: ['囚われ','制限','無力感','自己制限'] }, rev: { zh: ['解脱','重获自由'], en: ['Liberation','Regaining freedom'], ja: ['解放','自由の回復'] } },
    { up: { zh: ['焦虑','噩梦','羞耻','绝望'], en: ['Anxiety','Nightmares','Shame','Despair'], ja: ['不安','悪夢','羞恥','絶望'] }, rev: { zh: ['走出噩梦','直面恐惧'], en: ['Overcoming nightmares','Facing fears'], ja: ['悪夢からの脱出','恐怖に立ち向かう'] } },
    { up: { zh: ['背叛','苦难','挫败','失去'], en: ['Betrayal','Suffering','Defeat','Loss'], ja: ['裏切り','苦難','挫折','喪失'] }, rev: { zh: ['从失败中恢复','创伤后成长'], en: ['Recovery from failure','Post-traumatic growth'], ja: ['失敗からの回復','トラウマ後の成長'] } },
    { up: { zh: ['好奇','观察','学习','侦察'], en: ['Curiosity','Observation','Learning','Reconnaissance'], ja: ['好奇心','観察','学習','偵察'] }, rev: { zh: ['八卦','间谍','不成熟'], en: ['Gossip','Spying','Immaturity'], ja: ['噂話','スパイ行為','未熟'] } },
    { up: { zh: ['机智','行动迅速','勇敢','果断'], en: ['Wit','Swift action','Bravery','Decisiveness'], ja: ['機知','迅速な行動','勇敢','果断'] }, rev: { zh: ['鲁莽','攻击性','不耐烦'], en: ['Recklessness','Aggression','Impatience'], ja: ['無謀','攻撃性','短気'] } },
    { up: { zh: ['独立','智慧','判断力','果断'], en: ['Independence','Wisdom','Judgment','Decisiveness'], ja: ['独立','知恵','判断力','果断'] }, rev: { zh: ['过于批判','操控性','刻薄'], en: ['Overly critical','Manipulative','Harsh'], ja: ['批判的すぎる','操作的','辛辣'] } },
    { up: { zh: ['权威','分析','清晰思维','公正'], en: ['Authority','Analysis','Clear thinking','Justice'], ja: ['権威','分析','明晰な思考','公正'] }, rev: { zh: ['独裁','不公正','滥权'], en: ['Tyranny','Injustice','Abuse of power'], ja: ['独裁','不公正','権力の乱用'] } },
  ],
  pentacles: [
    { up: { zh: ['新的财富','繁荣','机遇','潜力'], en: ['New wealth','Prosperity','Opportunity','Potential'], ja: ['新たな富','繁栄','機会','潜在力'] }, rev: { zh: ['失去机遇','错误的开始'], en: ['Lost opportunity','False start'], ja: ['機会の喪失','誤ったスタート'] } },
    { up: { zh: ['努力的回报','成就','自尊','进步'], en: ['Reward of effort','Achievement','Self-esteem','Progress'], ja: ['努力の報酬','達成','自尊心','進歩'] }, rev: { zh: ['缺乏认可','苦劳白费'], en: ['Lack of recognition','Wasted effort'], ja: ['認知の欠如','徒労'] } },
    { up: { zh: ['团队合作','技巧','协作','建设'], en: ['Teamwork','Skill','Collaboration','Construction'], ja: ['チームワーク','技巧','協力','建設'] }, rev: { zh: ['不和谐','孤立工作','懒惰'], en: ['Disharmony','Working alone','Laziness'], ja: ['不調和','孤立した作業','怠惰'] } },
    { up: { zh: ['保守','积累','安全感','控制'], en: ['Conservation','Accumulation','Security','Control'], ja: ['保守','蓄積','安心感','支配'] }, rev: { zh: ['贪婪','悭吝','囤积'], en: ['Greed','Miserliness','Hoarding'], ja: ['貪欲','吝嗇','買い溜め'] } },
    { up: { zh: ['贫困','忧虑','物质损失','排斥'], en: ['Poverty','Worry','Material loss','Exclusion'], ja: ['貧困','憂慮','物質的損失','排除'] }, rev: { zh: ['克服逆境','精神富足'], en: ['Overcoming adversity','Spiritual richness'], ja: ['逆境の克服','精神的豊かさ'] } },
    { up: { zh: ['慷慨','给予','施恩','滋养'], en: ['Generosity','Giving','Benevolence','Nourishment'], ja: ['寛大','施し','恩恵','養育'] }, rev: { zh: ['施惠带有条件','权力不均'], en: ['Conditional generosity','Power imbalance'], ja: ['条件付きの施し','力の不均衡'] } },
    { up: { zh: ['评估','耐心','长期投资','守护'], en: ['Assessment','Patience','Long-term investment','Protection'], ja: ['評価','忍耐','長期投資','守護'] }, rev: { zh: ['停滞不前','错失良机'], en: ['Stagnation','Missed opportunity'], ja: ['停滞','好機の逸失'] } },
    { up: { zh: ['技艺','专注','细节','勤劳'], en: ['Craftsmanship','Focus','Detail','Diligence'], ja: ['職人技','集中','細部','勤勉'] }, rev: { zh: ['完美主义','工作与生活失衡'], en: ['Perfectionism','Work-life imbalance'], ja: ['完璧主義','仕事と生活の不均衡'] } },
    { up: { zh: ['丰盛','繁荣','豪华','安康'], en: ['Abundance','Prosperity','Luxury','Well-being'], ja: ['豊穣','繁栄','贅沢','安寧'] }, rev: { zh: ['物质主义','虚荣','损失'], en: ['Materialism','Vanity','Loss'], ja: ['物質主義','虚栄','損失'] } },
    { up: { zh: ['遗产','传统','家族','老成'], en: ['Legacy','Tradition','Family','Maturity'], ja: ['遺産','伝統','家族','老練'] }, rev: { zh: ['家庭冲突','遗产纠纷'], en: ['Family conflict','Inheritance dispute'], ja: ['家庭の衝突','遺産紛争'] } },
    { up: { zh: ['机遇','潜力','认真学习','勤奋'], en: ['Opportunity','Potential','Dedicated study','Diligence'], ja: ['機会','潜在力','真剣な学び','勤勉'] }, rev: { zh: ['懒散','丧失机遇','浪费'], en: ['Laziness','Lost opportunity','Waste'], ja: ['怠惰','機会の喪失','浪費'] } },
    { up: { zh: ['勤奋','可靠','耐力','进展缓慢'], en: ['Diligence','Reliability','Endurance','Slow progress'], ja: ['勤勉','信頼性','忍耐力','緩やかな進展'] }, rev: { zh: ['懒惰','无耐心','失去重心'], en: ['Laziness','Impatience','Losing focus'], ja: ['怠惰','短気','焦点の喪失'] } },
    { up: { zh: ['丰盛','务实','滋养','成功'], en: ['Abundance','Pragmatism','Nourishment','Success'], ja: ['豊穣','実用主義','養育','成功'] }, rev: { zh: ['财务困境','自我放弃'], en: ['Financial difficulty','Self-neglect'], ja: ['財政難','自己放棄'] } },
    { up: { zh: ['企业家','成就','领导力','安全'], en: ['Entrepreneur','Achievement','Leadership','Security'], ja: ['起業家','達成','リーダーシップ','安全'] }, rev: { zh: ['腐败','贪婪','独断'], en: ['Corruption','Greed','Authoritarianism'], ja: ['腐敗','貪欲','独断'] } },
  ],
};

function buildMinorArcana() {
  const cards = [];
  const suits = ['wands', 'cups', 'swords', 'pentacles'];
  const SUIT_ELEMENT = { wands: '火', cups: '水', swords: '风', pentacles: '土' };
  suits.forEach(suit => {
    for (let rank = 1; rank <= 14; rank++) {
      const data = MINOR_DATA[suit][rank - 1];
      const sn = SUIT_NAMES[suit];
      cards.push({
        id: `${suit}_${rank}`,
        number: rank,
        arcana: suit,
        element: SUIT_ELEMENT[suit],
        astrology: '',
        name: {
          zh: `${sn.zh}${RANK_NAMES.zh[rank]}`,
          en: `${RANK_NAMES.en[rank]} of ${sn.en}`,
          ja: `${sn.ja}の${RANK_NAMES.ja[rank]}`,
        },
        keywords: {
          upright: data.up,
          reversed: data.rev,
        },
        meaning: {
          upright: { zh: data.up.zh.join('、'), en: data.up.en.join(', '), ja: data.up.ja.join('、') },
          reversed: { zh: data.rev.zh.join('、'), en: data.rev.en.join(', '), ja: data.rev.ja.join('、') },
        },
      });
    }
  });
  return cards;
}

// ─── 图片 URL ─────────────────────────────────────────
const MAJOR_IMAGE_NAMES = {
  0:  'RWS_Tarot_00_Fool',
  1:  'RWS_Tarot_01_Magician',
  2:  'RWS_Tarot_02_High_Priestess',
  3:  'RWS_Tarot_03_Empress',
  4:  'RWS_Tarot_04_Emperor',
  5:  'RWS_Tarot_05_Hierophant',
  6:  'RWS_Tarot_06_Lovers',
  7:  'RWS_Tarot_07_Chariot',
  8:  'RWS_Tarot_08_Strength',
  9:  'RWS_Tarot_09_Hermit',
  10: 'RWS_Tarot_10_Wheel_of_Fortune',
  11: 'RWS_Tarot_11_Justice',
  12: 'RWS_Tarot_12_Hanged_Man',
  13: 'RWS_Tarot_13_Death',
  14: 'RWS_Tarot_14_Temperance',
  15: 'RWS_Tarot_15_Devil',
  16: 'RWS_Tarot_16_Tower',
  17: 'RWS_Tarot_17_Star',
  18: 'RWS_Tarot_18_Moon',
  19: 'RWS_Tarot_19_Sun',
  20: 'RWS_Tarot_20_Judgement',
  21: 'RWS_Tarot_21_World',
};

const SUIT_IMG_PREFIX = { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pents' };

export function getCardImage(card) {
  const base = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
  if (card.arcana === 'major') {
    const name = MAJOR_IMAGE_NAMES[card.number];
    if (!name) return null;
    return `${base}${name}.jpg`;
  }
  const prefix = SUIT_IMG_PREFIX[card.arcana];
  if (!prefix) return null;
  const n = String(card.number).padStart(2, '0');
  return `${base}${prefix}${n}.jpg`;
}

// ─── 导出 ──────────────────────────────────────────────
export const ALL_CARDS = [...MAJOR_ARCANA, ...buildMinorArcana()];

export function getCard(id) {
  return ALL_CARDS.find(c => c.id === id);
}

export function getCardsByArcana(arcana) {
  return ALL_CARDS.filter(c => c.arcana === arcana);
}

export function drawRandom(count = 1) {
  const deck = [...ALL_CARDS];
  const drawn = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * deck.length);
    drawn.push({
      card: deck.splice(idx, 1)[0],
      isReversed: Math.random() < 0.5,
    });
  }
  return drawn;
}

// 牌阵定义
export const SPREADS = {
  single: {
    id: 'single',
    name: { zh: '单张指引', en: 'Single Card', ja: '一枚引き' },
    count: 1,
    positions: [
      { zh: '当前指引', en: 'Guidance', ja: 'ガイダンス' },
    ],
  },
  three_card: {
    id: 'three_card',
    name: { zh: '时间之流', en: 'Past · Present · Future', ja: '時の流れ' },
    count: 3,
    positions: [
      { zh: '过去', en: 'Past', ja: '過去' },
      { zh: '现在', en: 'Present', ja: '現在' },
      { zh: '未来', en: 'Future', ja: '未来' },
    ],
  },
  five_card: {
    id: 'five_card',
    name: { zh: '是非牌阵', en: 'Decision Spread', ja: '決断の陣' },
    count: 5,
    positions: [
      { zh: '核心问题', en: 'Core Issue', ja: '核心' },
      { zh: '有利因素', en: 'Pros', ja: '利点' },
      { zh: '不利因素', en: 'Cons', ja: '欠点' },
      { zh: '建议', en: 'Advice', ja: 'アドバイス' },
      { zh: '最终结果', en: 'Outcome', ja: '結果' },
    ],
  },
  celtic_cross: {
    id: 'celtic_cross',
    name: { zh: '凯尔特十字', en: 'Celtic Cross', ja: 'ケルト十字' },
    count: 10,
    positions: [
      { zh: '现状', en: 'Present', ja: '現状' },
      { zh: '挑战', en: 'Challenge', ja: '障害' },
      { zh: '潜意识', en: 'Subconscious', ja: '潜在意識' },
      { zh: '过去', en: 'Past', ja: '過去' },
      { zh: '目标', en: 'Goal', ja: '目標' },
      { zh: '近未来', en: 'Near Future', ja: '近い未来' },
      { zh: '自我认知', en: 'Self', ja: '自己認識' },
      { zh: '外部环境', en: 'Environment', ja: '環境' },
      { zh: '希望与恐惧', en: 'Hopes & Fears', ja: '希望と恐れ' },
      { zh: '最终结果', en: 'Outcome', ja: '最終結果' },
    ],
  },
};
