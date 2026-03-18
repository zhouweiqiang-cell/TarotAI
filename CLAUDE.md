# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start
npx expo start --ios
npx expo start --android
npm install
```

No linter or test suite configured.

## Architecture

TarotAI is a React Native/Expo (SDK 54) tarot divination app. Architecture is identical to FoodSnap — same patterns, same service layer approach.

### Navigation

No React Navigation. `App.js` manages `activeTab` state and conditionally renders screens. The "history" tab renders `<HomeScreen showHistoryOnly>`. The central tab button (🔮 占卜) is elevated with a floating style.

### AI Integration (`src/services/tarotAnalyzer.js`)

Mirrors FoodSnap's `foodAnalyzer.js` exactly:
- Same three providers: `gemini-*` → Google, `qwen-*` → DashScope, `glm-*` → Zhipu
- API keys in `API_KEYS` object at the top of the file (all placeholders — must be filled)
- Streaming (`analyzeSpreadStream`) + non-streaming (`analyzeSpread`) fallback
- Text-only requests (no image) — tarot reads from card names + positions

**Input to AI:** The prompt is built by `t.buildPrompt(question, cards, style)` in `i18n.js`. `cards` is an array of `{ card, isReversed, position }`. The style parameter (`mystical` / `psychological` / `practical`) changes the tone of the prompt.

**Expected JSON schema:**
```json
{
  "cardReadings": [{ "cardId": "...", "position": "...", "isReversed": true, "reading": "..." }],
  "overallMessage": "...",
  "advice": "...",
  "energy": ["keyword1", "keyword2", "keyword3"]
}
```

### Card Data (`src/data/cards.js`)

- 78 cards: 22 Major Arcana (hardcoded) + 56 Minor Arcana (generated via `buildMinorArcana()`)
- `drawRandom(count)` — draws random cards with random upright/reversed
- `SPREADS` object defines available spreads (single, three_card, five_card) with position labels in zh/en/ja
- Cards have `arcana` field: `'major' | 'wands' | 'cups' | 'swords' | 'pentacles'`

### i18n (`src/services/i18n.js`)

Same pattern as FoodSnap. All UI strings + AI prompt templates live here. `buildPrompt` is a function (not a string) — it takes `(question, cards, style)` and returns the full prompt string. Changing AI output schema requires updating `buildPrompt` in all three language objects.

### Settings

Three user preferences (all in AsyncStorage via `settingsStorage.js`):
- `model` — AI model ID (default: `gemini-3.1-flash-lite-preview`)
- `language` — `zh` / `en` / `ja` (default: `zh`)
- `style` — `mystical` / `psychological` / `practical` (default: `mystical`)

### Design Tokens (`src/constants/theme.js`)

Dark purple theme. Key colors:
- `COLORS.BG_DEEP` `#0D0820` — app background
- `COLORS.GOLD` `#F0C040` — primary accent (selected state, titles)
- `COLORS.PRIMARY` `#7C3AED` — purple (floating tab button)
- `SUIT_COLORS` — per-suit colors for card display (wands=red, cups=blue, swords=gray, pentacles=green, major=gold)

Do not hardcode suit colors inline — use `SUIT_COLORS[card.arcana]` from theme.
