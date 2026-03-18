# TarotAI — 产品需求文档

## 一、产品定位

**名称**: TarotAI（塔罗 AI）
**定位**: 面向中文用户的 AI 驱动塔罗牌占卜 App
**核心价值**: 用 AI 提供个性化、有深度的塔罗解读，而不是模板化的固定文本
**目标用户**: 18–35 岁，对占卜/心理学/自我探索感兴趣的中文用户

---

## 二、核心功能

### 1. 每日一牌（Daily Draw）
- 每天自动随机抽取一张牌
- 用户可输入当天的心情 / 问题（可选）
- AI 根据牌义 + 用户问题生成个性化解读
- 流式输出，实时显示解读过程
- 解读结果自动保存到历史

### 2. 牌阵占卜（Spread Reading）
用户先输入问题，再选择牌阵：

| 牌阵 | 张数 | 适用场景 |
|------|------|----------|
| 单张指引 | 1 | 快速决策 |
| 时间之流 | 3 | 过去·现在·未来 |
| 是非牌阵 | 5 | 选择/决策类问题 |
| 凯尔特十字 | 10 | 深度综合分析 |

- 抽牌过程动画化（从牌堆中翻出）
- 每张牌支持正位/逆位（随机50%概率）
- AI 综合所有牌位做整体解读

### 3. 牌库（Card Library）
- 完整 78 张牌（22 大阿卡纳 + 56 小阿卡纳）
- 每张牌展示：牌名、关键词、正位义、逆位义、元素/星座
- 搜索 + 分类筛选（大阿卡纳 / 权杖 / 圣杯 / 宝剑 / 星币）
- 点击进入详情页，可以查看完整牌义

### 4. 历史记录（History）
- 保存所有占卜记录（最多 100 条）
- 显示日期、问题、使用的牌阵、抽到的牌
- 点击可重新查看完整解读
- 支持删除

### 5. 设置（Settings）
- AI 模型选择（Gemini / 通义千问 / GLM）
- 语言切换（中文 / English / 日本語）
- 解读风格（理性心理学风格 / 神秘主义风格 / 实用建议风格）

---

## 三、UI 风格

- **色调**: 深紫色主题（#2D1B69 深空紫），金色点缀（#F0C040），高贵神秘感
- **字体**: 中文衬线字体，有仪式感
- **动画**: 翻牌动画、星光粒子效果、流式文字渐入
- **卡片风格**: 暗色玻璃拟态（glassmorphism），带光晕效果

---

## 四、AI 解读系统

**Prompt 策略**: 向 AI 传入：
1. 用户的问题/背景
2. 抽到的牌（名称 + 正/逆位 + 在该牌阵中的位置含义）
3. 要求输出格式（JSON，包含每张牌的解读 + 整体综合建议）

**AI 返回的 JSON Schema**:
```json
{
  "cardReadings": [
    {
      "cardId": "the_fool",
      "position": "过去",
      "isReversed": false,
      "reading": "string — 针对该位置的解读"
    }
  ],
  "overallMessage": "string — 综合建议（3-5句话）",
  "advice": "string — 具体的行动建议",
  "energy": "string — 当前能量主题（1-3个关键词）"
}
```

**多 Provider 支持**: 与 FoodSnap 相同，Gemini / Qwen / GLM 三路由，流式优先。

---

## 五、技术架构

### 技术栈
- Expo SDK 54 / React Native 0.81 / React 19
- 手写 Tab 导航（同 FoodSnap，不引入 React Navigation）
- AsyncStorage 持久化
- XMLHttpRequest SSE 流式 AI 调用

### 目录结构
```
TarotAI/
├── App.js                    # 入口，Tab 导航
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # 每日一牌
│   │   ├── SpreadScreen.js   # 牌阵选择 + 抽牌
│   │   ├── ReadingScreen.js  # 解读结果展示（流式）
│   │   ├── CardsScreen.js    # 78 张牌库
│   │   ├── CardDetail.js     # 单张牌详情
│   │   └── SettingsScreen.js
│   ├── components/
│   │   ├── TarotCard.js      # 单张牌组件（翻转动画）
│   │   ├── CardDeck.js       # 牌堆抽牌组件
│   │   ├── SpreadLayout.js   # 牌阵排列组件
│   │   ├── StreamingReading.js # 流式解读文字组件
│   │   ├── TabIcon.js
│   │   └── SkeletonCard.js
│   ├── services/
│   │   ├── tarotAnalyzer.js  # AI 解读（同 foodAnalyzer.js 架构）
│   │   ├── historyStorage.js
│   │   ├── settingsStorage.js
│   │   └── i18n.js           # 中/英/日 + AI prompt 模板
│   ├── data/
│   │   └── cards.js          # 78 张牌完整数据
│   └── constants/
│       └── theme.js          # 颜色、字体常量
```

### Tab 结构（5 tabs）
| Tab | 图标 | 对应 Screen |
|-----|------|-------------|
| 每日 | ☀️ | HomeScreen |
| 占卜 | 🔮 | SpreadScreen |
| 牌库 | 📚 | CardsScreen |
| 记录 | 📜 | HistoryScreen (HomeScreen showHistoryOnly) |
| 设置 | ⚙️ | SettingsScreen |

---

## 六、数据模型

### Card（牌）
```javascript
{
  id: 'the_fool',
  number: 0,
  name: { zh: '愚者', en: 'The Fool', ja: '愚者' },
  arcana: 'major',              // 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'
  element: '风',
  astrology: '天王星',
  keywords: {
    upright: ['新开始', '冒险', '天真'],
    reversed: ['鲁莽', '冒失', '逃避']
  },
  meaning: {
    upright: { zh: '...', en: '...' },
    reversed: { zh: '...', en: '...' }
  },
  image: null                   // 预留图片资源字段
}
```

### Reading（占卜记录）
```javascript
{
  id: 'timestamp',
  date: '2026-03-18',
  question: '用户的问题',
  spread: 'three_card',         // 牌阵类型
  cards: [{ cardId, isReversed, position }],
  result: { cardReadings, overallMessage, advice, energy },
  model: 'gemini-3.1-flash-lite-preview'
}
```

---

## 七、MVP 范围（第一版）

**包含:**
- [x] 每日一牌（含 AI 解读）
- [x] 三牌阵（时间之流）
- [x] 完整 78 张牌库
- [x] 历史记录
- [x] 中文 + 英文双语
- [x] Gemini + 通义千问 + GLM 三模型

**暂不包含:**
- [ ] 牌面图片（使用文字卡片代替，图片资源另行添加）
- [ ] 凯尔特十字（10 张牌阵，复杂度高）
- [ ] 用户账户 / 云同步
- [ ] 解读分享功能
