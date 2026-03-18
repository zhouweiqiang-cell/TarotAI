import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { getSettings, saveSettings } from '../services/settingsStorage';
import { getTexts, LANGUAGE_OPTIONS } from '../services/i18n';
import { getColors } from '../constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MODEL_OPTIONS = [
  { id: 'gemini-3.1-flash-lite-preview', icon: '⚡' },
  { id: 'gemini-3.1-pro-preview',       icon: '🧠' },
  { id: 'gemini-3-flash-preview',        icon: '✨' },
];

const STYLE_OPTIONS = [
  { id: 'mystical',       textKey: 'styleMystical',       descKey: 'styleMysticalDesc' },
  { id: 'psychological',  textKey: 'stylePsychological',  descKey: 'stylePsychologicalDesc' },
  { id: 'practical',      textKey: 'stylePractical',      descKey: 'stylePracticalDesc' },
];

const TONE_OPTIONS = [
  { id: 'formal',    textKey: 'toneFormal',    descKey: 'toneFormalDesc' },
  { id: 'friendly',  textKey: 'toneFriendly',  descKey: 'toneFriendlyDesc' },
  { id: 'humorous',  textKey: 'toneHumorous',  descKey: 'toneHumorousDesc' },
  { id: 'blunt',     textKey: 'toneBlunt',     descKey: 'toneBluntDesc' },
  { id: 'gentle',    textKey: 'toneGentle',    descKey: 'toneGentleDesc' },
];

const THEME_OPTIONS = [
  { id: 'cosmic', textKey: 'themeCosmic', descKey: 'themeCosmicDesc' },
  { id: 'dune',   textKey: 'themeDune',   descKey: 'themeDuneDesc' },
];

export default function SettingsScreen({ lang: propLang = 'zh', theme = 'cosmic', onLangChange }) {
  const [selectedModel, setSelectedModel] = useState('gemini-3.1-flash-lite-preview');
  const [selectedLang, setSelectedLang] = useState(propLang);
  const [selectedStyle, setSelectedStyle] = useState('mystical');
  const [selectedTone, setSelectedTone] = useState('friendly');
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [openSection, setOpenSection] = useState(null);
  const t = getTexts(selectedLang);
  const colors = useMemo(() => getColors(selectedTheme), [selectedTheme]);

  useEffect(() => {
    (async () => {
      const s = await getSettings();
      setSelectedModel(s.model);
      setSelectedLang(s.language);
      setSelectedStyle(s.style || 'mystical');
      setSelectedTone(s.tone || 'friendly');
      setSelectedTheme(s.visualTheme || 'dune');
    })();
  }, [propLang]);

  const modelTexts = {
    'gemini-3.1-pro-preview':       { name: t.modelPro,      desc: t.modelProDesc },
    'gemini-3-flash-preview':        { name: t.modelBalanced, desc: t.modelBalancedDesc },
    'gemini-2.5-flash':             { name: t.modelAccurate, desc: t.modelAccurateDesc },
    'gemini-3.1-flash-lite-preview': { name: t.modelFast,    desc: t.modelFastDesc },
    'qwen-vl-max':                 { name: t.modelQwen,      desc: t.modelQwenDesc },
    'glm-4v-flash':                { name: t.modelGlm,       desc: t.modelGlmDesc },
  };

  const selectModel = async (id) => { setSelectedModel(id); await saveSettings({ model: id }); };
  const selectLang  = async (id) => { setSelectedLang(id);  await saveSettings({ language: id }); onLangChange?.(); };
  const selectStyle = async (id) => { setSelectedStyle(id); await saveSettings({ style: id }); };
  const selectTone  = async (id) => { setSelectedTone(id);  await saveSettings({ tone: id }); };
  const selectTheme = async (id) => { setSelectedTheme(id); await saveSettings({ visualTheme: id }); onLangChange?.(); };

  const toggleSection = useCallback((section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(prev => prev === section ? null : section);
  }, []);

  const styles = useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.BG_PAGE },
    container: { flex: 1, padding: 20 },
    title: { fontSize: 26, fontWeight: '800', color: colors.GOLD, marginBottom: 28, textAlign: 'center' },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.TEXT_PRIMARY, marginBottom: 4 },
    sectionDesc: { fontSize: 14, color: colors.TEXT_MUTED, marginBottom: 12 },
    // Dropdown trigger
    dropdown: {
      backgroundColor: colors.BG_CARD, borderRadius: 14, padding: 14,
      borderWidth: 1.5, borderColor: colors.BORDER, flexDirection: 'row', alignItems: 'center',
    },
    dropdownOpen: { borderColor: colors.GOLD, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
    dropdownIcon: { fontSize: 20, marginRight: 10 },
    dropdownText: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.GOLD },
    dropdownArrow: { fontSize: 14, color: colors.TEXT_MUTED, marginLeft: 8 },
    // Expanded options list
    optionsList: {
      backgroundColor: colors.BG_CARD, borderBottomLeftRadius: 14, borderBottomRightRadius: 14,
      borderWidth: 1.5, borderTopWidth: 0, borderColor: colors.GOLD, overflow: 'hidden',
    },
    option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, borderTopWidth: 1, borderTopColor: colors.BORDER },
    optionFirst: { borderTopWidth: 0 },
    optIcon: { fontSize: 20, marginRight: 10 },
    optInfo: { flex: 1 },
    optName: { fontSize: 16, color: colors.TEXT_PRIMARY },
    optNameSel: { color: colors.GOLD, fontWeight: '700' },
    optDesc: { fontSize: 13, color: colors.TEXT_MUTED, marginTop: 2, lineHeight: 18 },
    check: { fontSize: 18, color: colors.GOLD, marginLeft: 8 },
  }), [selectedTheme]);

  function Dropdown({ sectionId, icon, selectedLabel, children }) {
    const isOpen = openSection === sectionId;
    return (
      <>
        <TouchableOpacity
          style={[styles.dropdown, isOpen && styles.dropdownOpen]}
          onPress={() => toggleSection(sectionId)}
          activeOpacity={0.7}
        >
          {icon ? <Text style={styles.dropdownIcon}>{icon}</Text> : null}
          <Text style={styles.dropdownText}>{selectedLabel}</Text>
          <Text style={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {isOpen && <View style={styles.optionsList}>{children}</View>}
      </>
    );
  }

  function OptionRow({ icon, name, desc, selected, onPress, isFirst }) {
    return (
      <TouchableOpacity style={[styles.option, isFirst && styles.optionFirst]} onPress={onPress} activeOpacity={0.7}>
        {icon ? <Text style={styles.optIcon}>{icon}</Text> : null}
        <View style={styles.optInfo}>
          <Text style={[styles.optName, selected && styles.optNameSel]}>{name}</Text>
          {desc ? <Text style={styles.optDesc}>{desc}</Text> : null}
        </View>
        {selected && <Text style={styles.check}>✓</Text>}
      </TouchableOpacity>
    );
  }

  const themeSel = THEME_OPTIONS.find(o => o.id === selectedTheme);
  const langSel = LANGUAGE_OPTIONS.find(o => o.id === selectedLang);
  const styleSel = STYLE_OPTIONS.find(o => o.id === selectedStyle);
  const toneSel = TONE_OPTIONS.find(o => o.id === selectedTone);
  const modelSel = MODEL_OPTIONS.find(o => o.id === selectedModel);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{t.settingsTitle}</Text>

        {/* Visual Theme */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.themeSection}</Text>
          <Text style={styles.sectionDesc}>{t.themeDesc}</Text>
          <Dropdown sectionId="theme" selectedLabel={themeSel ? t[themeSel.textKey] : ''}>
            {THEME_OPTIONS.map((opt, i) => (
              <OptionRow
                key={opt.id} name={t[opt.textKey]} desc={t[opt.descKey]}
                selected={selectedTheme === opt.id} isFirst={i === 0}
                onPress={() => { selectTheme(opt.id); toggleSection('theme'); }}
              />
            ))}
          </Dropdown>
        </View>

        {/* Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.langSection}</Text>
          <Text style={styles.sectionDesc}>{t.langDesc}</Text>
          <Dropdown sectionId="lang" icon={langSel?.icon} selectedLabel={langSel?.name || ''}>
            {LANGUAGE_OPTIONS.map((opt, i) => (
              <OptionRow
                key={opt.id} icon={opt.icon} name={opt.name}
                selected={selectedLang === opt.id} isFirst={i === 0}
                onPress={() => { selectLang(opt.id); toggleSection('lang'); }}
              />
            ))}
          </Dropdown>
        </View>

        {/* Reading Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.styleSection}</Text>
          <Text style={styles.sectionDesc}>{t.styleDesc}</Text>
          <Dropdown sectionId="style" selectedLabel={styleSel ? t[styleSel.textKey] : ''}>
            {STYLE_OPTIONS.map((opt, i) => (
              <OptionRow
                key={opt.id} name={t[opt.textKey]} desc={t[opt.descKey]}
                selected={selectedStyle === opt.id} isFirst={i === 0}
                onPress={() => { selectStyle(opt.id); toggleSection('style'); }}
              />
            ))}
          </Dropdown>
        </View>

        {/* Tone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.toneSection}</Text>
          <Text style={styles.sectionDesc}>{t.toneDesc}</Text>
          <Dropdown sectionId="tone" selectedLabel={toneSel ? t[toneSel.textKey] : ''}>
            {TONE_OPTIONS.map((opt, i) => (
              <OptionRow
                key={opt.id} name={t[opt.textKey]} desc={t[opt.descKey]}
                selected={selectedTone === opt.id} isFirst={i === 0}
                onPress={() => { selectTone(opt.id); toggleSection('tone'); }}
              />
            ))}
          </Dropdown>
        </View>

        {/* AI Model */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.modelSection}</Text>
          <Text style={styles.sectionDesc}>{t.modelDesc}</Text>
          <Dropdown sectionId="model" icon={modelSel?.icon} selectedLabel={modelSel ? modelTexts[modelSel.id]?.name : ''}>
            {MODEL_OPTIONS.map((opt, i) => {
              const mt = modelTexts[opt.id];
              return (
                <OptionRow
                  key={opt.id} icon={opt.icon} name={mt?.name} desc={mt?.desc}
                  selected={selectedModel === opt.id} isFirst={i === 0}
                  onPress={() => { selectModel(opt.id); toggleSection('model'); }}
                />
              );
            })}
          </Dropdown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
