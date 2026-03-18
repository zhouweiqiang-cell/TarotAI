import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'tarotai_settings';

const DEFAULT_SETTINGS = {
  model: 'gemini-3.1-flash-lite-preview',
  language: 'zh',
  style: 'mystical', // 'mystical' | 'psychological' | 'practical'
  tone: 'friendly',  // 'formal' | 'friendly' | 'humorous' | 'blunt' | 'gentle'
  visualTheme: 'dune', // 'cosmic' | 'dune'
};

const VALID_MODELS = new Set([
  'gemini-3.1-pro-preview', 'gemini-3-flash-preview', 'gemini-2.5-flash', 'gemini-3.1-flash-lite-preview',
  'gemini-2.5-pro', 'gemini-2.0-flash', 'gemini-2.0-flash-lite',
  'qwen-vl-max', 'glm-4v-flash',
]);

export async function getSettings() {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!json) return DEFAULT_SETTINGS;
    const stored = JSON.parse(json);
    // migrate stale/invalid model IDs
    if (stored.model && !VALID_MODELS.has(stored.model)) {
      stored.model = DEFAULT_SETTINGS.model;
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(stored));
    }
    return { ...DEFAULT_SETTINGS, ...stored };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings) {
  try {
    const current = await getSettings();
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
  } catch (e) {
    console.error('Save settings error:', e);
  }
}
