import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'tarotai_history';
const MAX_RECORDS = 100;

export async function getHistory() {
  try {
    const json = await AsyncStorage.getItem(HISTORY_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export async function addReading(reading) {
  try {
    const history = await getHistory();
    const updated = [reading, ...history].slice(0, MAX_RECORDS);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Add reading error:', e);
  }
}

export async function removeReading(id) {
  try {
    const history = await getHistory();
    const updated = history.filter(r => r.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Remove reading error:', e);
  }
}

export async function getTodayReading() {
  const history = await getHistory();
  const today = new Date().toISOString().split('T')[0];
  return history.find(r => r.date === today && r.spread === 'single') || null;
}
