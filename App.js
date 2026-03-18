import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootView = Platform.OS === 'web' ? View : GestureHandlerRootView;
import { StatusBar } from 'expo-status-bar';
import { getSettings } from './src/services/settingsStorage';
import { getTexts } from './src/services/i18n';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

import HomeScreen    from './src/screens/HomeScreen';
import SpreadScreen  from './src/screens/SpreadScreen';
import CardsScreen   from './src/screens/CardsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// ─── Tab Icon components ───────────────────────────────
const TabIcon = ({ color, children }) => <Text style={[iconStyle, { color }]}>{children}</Text>;
const iconStyle = { fontSize: 24 };
const SunIcon    = ({ color }) => <TabIcon color={color}>☼</TabIcon>;
const OrbIcon    = ({ color }) => <TabIcon color={color}>◇</TabIcon>;
const BookIcon   = ({ color }) => <TabIcon color={color}>☰</TabIcon>;
const ScrollIcon = ({ color }) => <TabIcon color={color}>⧖</TabIcon>;
const GearIcon   = ({ color }) => <TabIcon color={color}>⟐</TabIcon>;

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

  return (
    <ThemeProvider theme={theme}>
      <AppContent
        activeTab={activeTab}
        lang={lang}
        t={t}
        switchTab={switchTab}
        refreshSettings={refreshSettings}
      />
    </ThemeProvider>
  );
}

function AppContent({ activeTab, lang, t, switchTab, refreshSettings }) {
  const { colors } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.BG_DEEP },
    screenContainer: { flex: 1 },
    tabBar: {
      flexDirection: 'row', backgroundColor: colors.BG_CARD,
      borderTopWidth: 1, borderTopColor: colors.BORDER,
      paddingBottom: 24, paddingTop: 10, alignItems: 'flex-end',
    },
    tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    tabLabel: { fontSize: 12, color: colors.TEXT_MUTED, marginTop: 4, fontWeight: '500' },
    tabLabelActive: { color: colors.GOLD, fontWeight: '700' },
    spreadBtn: {
      width: 52, height: 52, borderRadius: 26, backgroundColor: colors.PRIMARY,
      alignItems: 'center', justifyContent: 'center', marginTop: -20,
      shadowColor: colors.PRIMARY, shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5, shadowRadius: 10, elevation: 8,
    },
    spreadBtnActive: { backgroundColor: colors.GOLD },
  }), [colors]);

  return (
    <RootView style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.screenContainer}>
        {activeTab === 'home' && (
          <HomeScreen lang={lang} onNavigate={switchTab} />
        )}
        {activeTab === 'spread' && (
          <SpreadScreen lang={lang} onNavigate={switchTab} />
        )}
        {activeTab === 'cards' && (
          <CardsScreen lang={lang} />
        )}
        {activeTab === 'history' && (
          <HomeScreen lang={lang} showHistoryOnly onNavigate={switchTab} />
        )}
        {activeTab === 'settings' && (
          <SettingsScreen lang={lang} onLangChange={refreshSettings} />
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
