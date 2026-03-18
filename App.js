import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootView = Platform.OS === 'web' ? View : GestureHandlerRootView;
import { StatusBar } from 'expo-status-bar';
import { getSettings } from './src/services/settingsStorage';
import { getTexts } from './src/services/i18n';
import { getColors } from './src/constants/theme';

import HomeScreen    from './src/screens/HomeScreen';
import SpreadScreen  from './src/screens/SpreadScreen';
import CardsScreen   from './src/screens/CardsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DuneBackground from './src/components/DuneBackground';

// ─── Tab Icon components ───────────────────────────────
const SunIcon    = ({ color }) => <Text style={{ fontSize: 22, color }}>☀️</Text>;
const OrbIcon    = ({ color }) => <Text style={{ fontSize: 22, color }}>🔮</Text>;
const BookIcon   = ({ color }) => <Text style={{ fontSize: 22, color }}>📚</Text>;
const ScrollIcon = ({ color }) => <Text style={{ fontSize: 22, color }}>📜</Text>;
const GearIcon   = ({ color }) => <Text style={{ fontSize: 22, color }}>⚙️</Text>;

const TABS = [
  { id: 'home',     textKey: 'tabHome',     Icon: SunIcon },
  { id: 'cards',    textKey: 'tabCards',    Icon: BookIcon },
  { id: 'spread',   textKey: 'tabSpread',   Icon: OrbIcon },
  { id: 'history',  textKey: 'tabHistory',  Icon: ScrollIcon },
  { id: 'settings', textKey: 'tabSettings', Icon: GearIcon },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('zh');
  const [theme, setTheme] = useState('dune');
  const [t, setT] = useState(getTexts('zh'));

  // Reading flow state — passed from SpreadScreen → HomeScreen-like reading view
  const [pendingReading, setPendingReading] = useState(null);

  const refreshSettings = useCallback(async () => {
    const settings = await getSettings();
    setLang(settings.language);
    setTheme(settings.visualTheme || 'dune');
    setT(getTexts(settings.language));
  }, []);

  useEffect(() => { refreshSettings(); }, []);

  const switchTab = useCallback((id) => {
    setActiveTab(id);
    refreshSettings();
  }, [refreshSettings]);

  const colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(() => StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.BG_DEEP, position: 'relative' },
    screenContainer: { flex: 1, backgroundColor: 'transparent' },
    tabBar: {
      flexDirection: 'row', backgroundColor: colors.BG_CARD,
      borderTopWidth: 1, borderTopColor: colors.BORDER,
      paddingBottom: 24, paddingTop: 10, alignItems: 'flex-end',
    },
    tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    tabLabel: { fontSize: 10, color: colors.TEXT_MUTED, marginTop: 4, fontWeight: '500' },
    tabLabelActive: { color: colors.GOLD, fontWeight: '700' },
    spreadBtn: {
      width: 52, height: 52, borderRadius: 26, backgroundColor: colors.PRIMARY,
      alignItems: 'center', justifyContent: 'center', marginTop: -20,
      shadowColor: colors.PRIMARY, shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5, shadowRadius: 10, elevation: 8,
    },
    spreadBtnActive: { backgroundColor: colors.GOLD },
  }), [theme]);

  return (
    <RootView style={styles.root}>
      <StatusBar style="light" />
      {theme === 'dune' && <DuneBackground />}

      <View style={styles.screenContainer}>
        {activeTab === 'home' && (
          <HomeScreen lang={lang} theme={theme} onNavigate={switchTab} />
        )}
        {activeTab === 'spread' && (
          <SpreadScreen lang={lang} theme={theme} onNavigate={switchTab} />
        )}
        {activeTab === 'cards' && (
          <CardsScreen lang={lang} theme={theme} />
        )}
        {activeTab === 'history' && (
          <HomeScreen lang={lang} theme={theme} showHistoryOnly onNavigate={switchTab} />
        )}
        {activeTab === 'settings' && (
          <SettingsScreen lang={lang} theme={theme} onLangChange={refreshSettings} />
        )}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const color = isActive ? colors.GOLD : colors.TEXT_MUTED;
          const isSpread = tab.id === 'spread';

          if (isSpread) {
            return (
              <TouchableOpacity key={tab.id} style={styles.tab} onPress={() => switchTab(tab.id)} activeOpacity={0.8}>
                <View style={[styles.spreadBtn, isActive && styles.spreadBtnActive]}>
                  <tab.Icon color={isActive ? colors.BG_DEEP : '#fff'} />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity key={tab.id} style={styles.tab} onPress={() => switchTab(tab.id)} activeOpacity={0.7}>
              <tab.Icon color={color} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {t[tab.textKey]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </RootView>
  );
}
