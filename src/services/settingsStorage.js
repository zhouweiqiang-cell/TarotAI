import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'tarotai_settings';

const DEFAULT_SETTINGS = {
  model: 'gemini-3.1-flash-lite-preview',
  language: 'zh',
  style: 'mystical', // 'mystical' | 'psychological' | 'practical'
};

export async function getSettings() {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    return json ? { ...DEFAULT_SETTINGS, ...JSON.parse(json) } : DEFAULT_SETTINGS;
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
