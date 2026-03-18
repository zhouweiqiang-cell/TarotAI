// 78 张塔罗牌完整数据
// 22 大阿卡纳 + 56 小阿卡纳（权杖/圣杯/宝剑/星币各14张）

// ─── 大阿卡纳 Major Arcana ───────────────────────────────
const MAJOR_ARCANA = [
  {
    id: 'the_fool', number: 0, arcana: 'major', element: '风', astrology: '天王星',
    name: { zh: '愚者', en: 'The Fool', ja: '愚者' },
    keywords: { upright: ['新开始', '自由', '冒险', '天真'], reversed: ['鲁莽', '冒失', '逃避现实'] },
    meaning: {
      upright: { zh: '新的旅程即将开始。愚者代表纯粹的可能性，不受过去束缚，勇于迈出第一步。', en: 'A new journey begins. Pure potential, freedom from the past.' },
      reversed: { zh: '冲动行事，缺乏计划。提醒你在行动前三思，避免不必要的风险。', en: 'Recklessness, lack of planning. Think before acting.' },
    },
  },
  {
    id: 'the_magician', number: 1, arcana: 'major', element: '风/火', astrology: '水星',
    name: { zh: '魔术师', en: 'The Magician', ja: '魔術師' },
    keywords: { upright: ['意志力', '技巧', '创造', '行动'], reversed: ['欺骗', '操纵', '才能未发挥'] },
    meaning: {
      upright: { zh: '你拥有实现目标所需的一切工具和资源，是时候付诸行动了。', en: 'You have all the tools you need. Time to take action.' },
      reversed: { zh: '才能被压抑或用于不良目的，警惕欺骗和操控。', en: 'Talents suppressed or misused. Beware of manipulation.' },
    },
  },
  {
    id: 'the_high_priestess', number: 2, arcana: 'major', element: '水', astrology: '月亮',
    name: { zh: '女祭司', en: 'The High Priestess', ja: '女教皇' },
    keywords: { upright: ['直觉', '潜意识', '神秘', '内在智慧'], reversed: ['压抑直觉', '秘密', '忽视内心'] },
    meaning: {
      upright: { zh: '聆听内心的声音，相信你的直觉。答案已经在你内心深处。', en: 'Listen to your inner voice. Trust your intuition.' },
      reversed: { zh: '你在压制自己的直觉，或有重要的秘密被隐藏。', en: 'Suppressing intuition or hidden secrets.' },
    },
  },
  {
    id: 'the_empress', number: 3, arcana: 'major', element: '土', astrology: '金星',
    name: { zh: '女皇', en: 'The Empress', ja: '女帝' },
    keywords: { upright: ['丰盛', '母性', '自然', '创造力', '感官享受'], reversed: ['依赖', '过度保护', '创意受阻'] },
    meaning: {
      upright: { zh: '丰收与滋养的能量。创造力旺盛，是孕育新事物的绝佳时机。', en: 'Abundance and nurturing energy. Creative power at its peak.' },
      reversed: { zh: '过度依赖或压迫，需要建立个人边界，让自己的创造力自由流动。', en: 'Overdependence or smothering. Establish boundaries.' },
    },
  },
  {
    id: 'the_emperor', number: 4, arcana: 'major', element: '火', astrology: '牡羊座',
    name: { zh: '皇帝', en: 'The Emperor', ja: '皇帝' },
    keywords: { upright: ['权威', '结构', '稳定', '领导力'], reversed: ['专横', '控制', '缺乏灵活性'] },
    meaning: {
      upright: { zh: '建立稳固的结构和秩序。用理性和纪律来掌控局面。', en: 'Establish structure and order. Lead with authority and discipline.' },
      reversed: { zh: '过于控制或权威，需要学会放手，给予他人更多空间。', en: 'Over-controlling. Learn to let go and give others space.' },
    },
  },
  {
    id: 'the_hierophant', number: 5, arcana: 'major', element: '土', astrology: '金牛座',
    name: { zh: '教皇', en: 'The Hierophant', ja: '法王' },
    keywords: { upright: ['传统', '信仰', '指引', '机构'], reversed: ['叛逆', '突破传统', '质疑权威'] },
    meaning: {
      upright: { zh: '遵循传统和既定的道路。寻求导师或精神指引。', en: 'Follow tradition and established paths. Seek mentorship.' },
      reversed: { zh: '打破常规，质疑既有体制，寻求个人信仰。', en: 'Break the rules. Question established systems.' },
    },
  },
  {
    id: 'the_lovers', number: 6, arcana: 'major', element: '风', astrology: '双子座',
    name: { zh: '恋人', en: 'The Lovers', ja: '恋人' },
    keywords: { upright: ['爱', '和谐', '关系', '价值选择'], reversed: ['不和谐', '分离', '价值观冲突'] },
    meaning: {
      upright: { zh: '面临重要的选择，需要遵从内心的价值观。关系中充满和谐与爱。', en: 'Significant choice ahead. Harmony in relationships.' },
      reversed: { zh: '关系中的摩擦或价值观的分歧，需要重新审视承诺。', en: 'Disharmony in relationships. Misaligned values.' },
    },
  },
  {
    id: 'the_chariot', number: 7, arcana: 'major', element: '水', astrology: '巨蟹座',
    name: { zh: '战车', en: 'The Chariot', ja: '戦車' },
    keywords: { upright: ['意志', '胜利', '自控', '前进'], reversed: ['失控', '方向迷失', '攻击性'] },
    meaning: {
      upright: { zh: '用意志力和自律克服障碍，胜利即将到来。', en: 'Overcome obstacles through willpower. Victory is near.' },
      reversed: { zh: '方向感丧失，需要重新掌控自己的情绪和行动。', en: 'Loss of direction. Regain control of emotions.' },
    },
  },
  {
    id: 'strength', number: 8, arcana: 'major', element: '火', astrology: '狮子座',
    name: { zh: '力量', en: 'Strength', ja: '力' },
    keywords: { upright: ['内在力量', '勇气', '耐心', '温柔征服'], reversed: ['自我怀疑', '软弱', '能量耗尽'] },
    meaning: {
      upright: { zh: '真正的力量来自内心，用温柔和耐心而非蛮力来面对挑战。', en: 'Inner strength and gentle courage. Patience over force.' },
      reversed: { zh: '内心脆弱，自我怀疑侵蚀你的力量，需要重新找回自信。', en: 'Self-doubt and weakness. Rebuild your confidence.' },
    },
  },
  {
    id: 'the_hermit', number: 9, arcana: 'major', element: '土', astrology: '处女座',
    name: { zh: '隐者', en: 'The Hermit', ja: '隠者' },
    keywords: { upright: ['内省', '智慧', '孤独', '指引'], reversed: ['孤立', '封闭', '拒绝帮助'] },
    meaning: {
      upright: { zh: '需要独处和内省的时刻，向内寻求智慧和答案。', en: 'Time for solitude and introspection. Seek inner wisdom.' },
      reversed: { zh: '过度孤立，拒绝外部帮助，需要重新与他人连接。', en: 'Isolation and withdrawal. Open yourself to others.' },
    },
  },
  {
    id: 'wheel_of_fortune', number: 10, arcana: 'major', element: '火', astrology: '木星',
    name: { zh: '命运之轮', en: 'Wheel of Fortune', ja: '運命の輪' },
    keywords: { upright: ['转变', '命运', '机遇', '循环'], reversed: ['坏运气', '抗拒变化', '命运的挑战'] },
    meaning: {
      upright: { zh: '命运的齿轮正在转动，好运和机遇随之而来。', en: 'The wheel of fate turns in your favor. Good fortune ahead.' },
      reversed: { zh: '逆境和不顺，但这也是循环的一部分，风水轮流转。', en: 'Setbacks and bad luck. This too shall pass.' },
    },
  },
  {
    id: 'justice', number: 11, arcana: 'major', element: '风', astrology: '天秤座',
    name: { zh: '正义', en: 'Justice', ja: '正義' },
    keywords: { upright: ['公正', '真相', '因果', '法律'], reversed: ['不公正', '逃避责任', '失衡'] },
    meaning: {
      upright: { zh: '因果法则发挥作用，公正的结果即将到来。', en: 'Cause and effect. A just outcome is coming.' },
      reversed: { zh: '感到不公正，或自己在逃避应有的责任。', en: 'Unfairness or avoiding accountability.' },
    },
  },
  {
    id: 'the_hanged_man', number: 12, arcana: 'major', element: '水', astrology: '海王星',
    name: { zh: '倒吊人', en: 'The Hanged Man', ja: '吊られた男' },
    keywords: { upright: ['暂停', '等待', '新视角', '自愿牺牲'], reversed: ['拖延', '停滞', '无谓牺牲'] },
    meaning: {
      upright: { zh: '暂时放下，从不同角度看待问题，这段等待期将带来启示。', en: 'Pause and surrender. A new perspective brings enlightenment.' },
      reversed: { zh: '无益的拖延，需要做出决定并采取行动。', en: 'Needless delays. Time to make a decision.' },
    },
  },
  {
    id: 'death', number: 13, arcana: 'major', element: '水', astrology: '天蝎座',
    name: { zh: '死神', en: 'Death', ja: '死神' },
    keywords: { upright: ['转变', '结束', '蜕变', '新生'], reversed: ['抗拒改变', '停滞', '腐朽'] },
    meaning: {
      upright: { zh: '一个阶段的结束是另一个阶段的开始，转变正在发生，接受它。', en: 'An ending makes way for new beginnings. Embrace transformation.' },
      reversed: { zh: '抗拒必要的改变，导致内心停滞和腐朽。', en: 'Resisting necessary change. Stagnation.' },
    },
  },
  {
    id: 'temperance', number: 14, arcana: 'major', element: '火', astrology: '射手座',
    name: { zh: '节制', en: 'Temperance', ja: '節制' },
    keywords: { upright: ['平衡', '节制', '耐心', '调和'], reversed: ['过度', '不平衡', '极端'] },
    meaning: {
      upright: { zh: '寻求平衡与和谐，耐心地将不同元素融合为美好的整体。', en: 'Balance and patience. Blend opposing forces harmoniously.' },
      reversed: { zh: '生活失衡，过度放纵或极端的行为需要得到纠正。', en: 'Imbalance and excess. Restore moderation.' },
    },
  },
  {
    id: 'the_devil', number: 15, arcana: 'major', element: '土', astrology: '摩羯座',
    name: { zh: '恶魔', en: 'The Devil', ja: '悪魔' },
    keywords: { upright: ['束缚', '执念', '物质主义', '阴暗面'], reversed: ['解脱', '打破枷锁', '觉醒'] },
    meaning: {
      upright: { zh: '你被某种执念或不健康的关系所束缚，认清真相才能获得自由。', en: 'Bondage to unhealthy patterns. Recognize what chains you.' },
      reversed: { zh: '从枷锁中解放，觉醒并打破有害的循环。', en: 'Breaking free from chains. Awakening and liberation.' },
    },
  },
  {
    id: 'the_tower', number: 16, arcana: 'major', element: '火', astrology: '火星',
    name: { zh: '高塔', en: 'The Tower', ja: '塔' },
    keywords: { upright: ['突然变化', '破坏', '启示', '混乱'], reversed: ['避免灾难', '延迟崩塌', '恐惧改变'] },
    meaning: {
      upright: { zh: '突如其来的颠覆，建立在错误基础上的事物将会崩塌，迎接重建。', en: 'Sudden upheaval destroys false foundations. Rebuild stronger.' },
      reversed: { zh: '灾难被暂时避免，但根本问题仍需面对。', en: 'Disaster narrowly avoided, but root issues persist.' },
    },
  },
  {
    id: 'the_star', number: 17, arcana: 'major', element: '风', astrology: '水瓶座',
    name: { zh: '星星', en: 'The Star', ja: '星' },
    keywords: { upright: ['希望', '信念', '灵感', '宁静'], reversed: ['绝望', '失去信心', '悲观'] },
    meaning: {
      upright: { zh: '风雨过后，希望之星指引你前行，相信美好的未来。', en: 'Hope and inspiration after hardship. Trust in the future.' },
      reversed: { zh: '失去希望和信心，需要重新点燃内心的光芒。', en: 'Loss of hope. Reignite your inner light.' },
    },
  },
  {
    id: 'the_moon', number: 18, arcana: 'major', element: '水', astrology: '双鱼座',
    name: { zh: '月亮', en: 'The Moon', ja: '月' },
    keywords: { upright: ['幻觉', '恐惧', '潜意识', '不确定'], reversed: ['释放恐惧', '真相浮现', '清醒'] },
    meaning: {
      upright: { zh: '事情并非表面看起来那样，潜意识的恐惧和幻觉正在影响你的判断。', en: 'Things are not what they seem. Fear and illusion cloud your judgment.' },
      reversed: { zh: '迷雾散去，真相逐渐浮现，内心的恐惧得到释放。', en: 'Illusions fade. Truth emerges and fears are released.' },
    },
  },
  {
    id: 'the_sun', number: 19, arcana: 'major', element: '火', astrology: '太阳',
    name: { zh: '太阳', en: 'The Sun', ja: '太陽' },
    keywords: { upright: ['成功', '喜悦', '活力', '光明'], reversed: ['悲观', '延迟成功', '内心阴暗'] },
    meaning: {
      upright: { zh: '最积极的牌之一。成功、喜悦和光明照耀着你，一切顺遂。', en: 'Joy, success, and radiant positivity. Everything is going well.' },
      reversed: { zh: '成功被暂时遮蔽，需要寻找内心的光明，重拾乐观。', en: 'Temporary setbacks cloud your success. Reconnect with inner joy.' },
    },
  },
  {
    id: 'judgement', number: 20, arcana: 'major', element: '火', astrology: '冥王星',
    name: { zh: '审判', en: 'Judgement', ja: '審判' },
    keywords: { upright: ['觉醒', '更新', '召唤', '赦免'], reversed: ['自我怀疑', '无法放手', '错失良机'] },
    meaning: {
      upright: { zh: '人生的重大转折点，一次觉醒的召唤，响应内心的呼唤去蜕变。', en: 'A major turning point. Answer the call to awaken and transform.' },
      reversed: { zh: '迟迟无法做出重要决定，或未能从过去中吸取教训。', en: 'Unable to make important decisions or learn from the past.' },
    },
  },
  {
    id: 'the_world', number: 21, arcana: 'major', element: '土', astrology: '土星',
    name: { zh: '世界', en: 'The World', ja: '世界' },
    keywords: { upright: ['完成', '整合', '成就', '旅程终点'], reversed: ['未完成', '延迟', '缺乏结局'] },
    meaning: {
      upright: { zh: '一个重要阶段圆满结束，你已经实现了目标，感受完整的喜悦。', en: 'Completion and wholeness. A cycle ends in triumph.' },
      reversed: { zh: '事情悬而未决，需要认真反思还缺少什么来完成整个循环。', en: 'Incomplete goals. Reflect on what is still needed.' },
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

// 小阿卡纳关键词数据（按花色 + 点数）
const MINOR_DATA = {
  wands: [
    { up: ['新开始','热情','灵感','机遇'], rev: ['延迟','犹豫','浪费潜力'] },
    { up: ['进展','规划','决心','前进'], rev: ['未知的恐惧','犹豫不决'] },
    { up: ['合作','创意','团队','技能'], rev: ['竞争','嫉妒','阻碍'] },
    { up: ['稳定','庆祝','和谐','建立'], rev: ['冲突','不稳定','拖延'] },
    { up: ['竞争','冲突','张力','斗争'], rev: ['内心冲突','失去优势'] },
    { up: ['成功','认可','荣誉','进步'], rev: ['骄傲','自负','成就感不足'] },
    { up: ['勇气','坚持','决心','挑战'], rev: ['动摇','放弃','自疑'] },
    { up: ['紧迫','分散精力','超载','赶时间'], rev: ['不知所措','草率行事'] },
    { up: ['智慧','知识','远见','快完成了'], rev: ['虎头蛇尾','缺乏洞见'] },
    { up: ['重担','责任','压力','奋斗'], rev: ['精疲力竭','不知变通'] },
    { up: ['探索','新机遇','消息','冒险'], rev: ['犹豫','进展缓慢'] },
    { up: ['热情','活力','冒险','行动'], rev: ['冒失','不成熟','鲁莽'] },
    { up: ['独立','直觉','自信','领导'], rev: ['情绪化','冲动','任性'] },
    { up: ['远见','领导力','荣誉','创新'], rev: ['专横','冲动的决策'] },
  ],
  cups: [
    { up: ['情感开始','直觉','爱的机遇','喜悦'], rev: ['情感阻塞','封闭内心'] },
    { up: ['关系','联系','和谐','庆祝'], rev: ['误解','关系破裂'] },
    { up: ['庆祝','友谊','喜悦','共同体'], rev: ['孤立','失望','娱乐过度'] },
    { up: ['冥想','孤独','回顾','内省'], rev: ['退缩','无聊','停滞'] },
    { up: ['遗憾','失去','重新评估','不满'], rev: ['走出困境','宽恕','新机遇'] },
    { up: ['怀旧','童真','记忆','重聚'], rev: ['停留过去','不切实际'] },
    { up: ['幻想','选择','白日梦','迷惑'], rev: ['清醒','做出选择','务实'] },
    { up: ['放弃','移行','更高召唤','宁静'], rev: ['不知足','逃避现实'] },
    { up: ['满足','感恩','愿望达成','自足'], rev: ['自满','物质主义','无聊'] },
    { up: ['情感圆满','家庭幸福','和谐','喜悦'], rev: ['家庭冲突','情感不满'] },
    { up: ['好消息','创意','敏感','机遇'], rev: ['坏消息','嫉妒','不成熟'] },
    { up: ['浪漫','魅力','跟随心'],  rev: ['不切实际','欺骗','情绪化'] },
    { up: ['温柔','直觉','治愈','同情'], rev: ['忽视直觉','情感操控'] },
    { up: ['爱','同理心','情感成熟','创意'], rev: ['情感操控','不稳定'] },
  ],
  swords: [
    { up: ['突破','清晰','真相','决断'], rev: ['混乱','破坏性想法','滥用力量'] },
    { up: ['僵局','需要做决定','平衡','暂停'], rev: ['优柔寡断','紧张','信息过载'] },
    { up: ['悲痛','孤独','心碎','分离'], rev: ['走出痛苦','接受','心理复原'] },
    { up: ['失败','耻辱','后退','认输'], rev: ['恢复','尝试再来','不服输'] },
    { up: ['胜利','野心','冲突','策略'], rev: ['残酷的胜利','不道德的行为'] },
    { up: ['过渡','告别','迁移','离开'], rev: ['困境','不肯放手','无法前进'] },
    { up: ['偷窃','欺骗','诡计','孤立'], rev: ['揭露欺骗','策略失败'] },
    { up: ['受困','限制','无力感','自我设限'], rev: ['解脱','重获自由'] },
    { up: ['焦虑','噩梦','羞耻','绝望'], rev: ['走出噩梦','直面恐惧'] },
    { up: ['背叛','苦难','挫败','失去'], rev: ['从失败中恢复','创伤后成长'] },
    { up: ['好奇','观察','学习','侦察'], rev: ['八卦','间谍','不成熟'] },
    { up: ['机智','行动迅速','勇敢','果断'], rev: ['鲁莽','攻击性','不耐烦'] },
    { up: ['独立','智慧','判断力','果断'], rev: ['过于批判','操控性','刻薄'] },
    { up: ['权威','分析','清晰思维','公正'], rev: ['独裁','不公正','滥权'] },
  ],
  pentacles: [
    { up: ['新的财富','繁荣','机遇','潜力'], rev: ['失去机遇','错误的开始'] },
    { up: ['努力的回报','成就','自尊','进步'], rev: ['缺乏认可','苦劳白费'] },
    { up: ['团队合作','技巧','协作','建设'], rev: ['不和谐','孤立工作','懒惰'] },
    { up: ['保守','积累','安全感','控制'], rev: ['贪婪','悭吝','囤积'] },
    { up: ['贫困','忧虑','物质损失','排斥'], rev: ['克服逆境','精神富足'] },
    { up: ['慷慨','给予','施恩','滋养'], rev: ['施惠带有条件','权力不均'] },
    { up: ['评估','耐心','长期投资','守护'], rev: ['停滞不前','错失良机'] },
    { up: ['技艺','专注','细节','勤劳'], rev: ['完美主义','工作与生活失衡'] },
    { up: ['丰盛','繁荣','豪华','安康'], rev: ['物质主义','虚荣','损失'] },
    { up: ['遗产','传统','家族','老成'], rev: ['家庭冲突','遗产纠纷'] },
    { up: ['机遇','潜力','认真学习','勤奋'], rev: ['懒散','丧失机遇','浪费'] },
    { up: ['勤奋','可靠','耐力','进展缓慢'], rev: ['懒惰','无耐心','失去重心'] },
    { up: ['丰盛','务实','滋养','成功'], rev: ['财务困境','自我放弃'] },
    { up: ['企业家','成就','领导力','安全'], rev: ['腐败','贪婪','独断'] },
  ],
};

function buildMinorArcana() {
  const cards = [];
  const suits = ['wands', 'cups', 'swords', 'pentacles'];
  suits.forEach(suit => {
    for (let rank = 1; rank <= 14; rank++) {
      const data = MINOR_DATA[suit][rank - 1];
      const sn = SUIT_NAMES[suit];
      cards.push({
        id: `${suit}_${rank}`,
        number: rank,
        arcana: suit,
        element: { wands: '火', cups: '水', swords: '风', pentacles: '土' }[suit],
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
          upright: { zh: data.up.join('、'), en: data.up.join(', ') },
          reversed: { zh: data.rev.join('、'), en: data.rev.join(', ') },
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
      { zh: '当前指引', en: 'Guidance' },
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
};
