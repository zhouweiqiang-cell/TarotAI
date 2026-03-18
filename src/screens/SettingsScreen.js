import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getSettings, saveSettings } from '../services/settingsStorage';
import { getTexts, LANGUAGE_OPTIONS } from '../services/i18n';
import { COLORS } from '../constants/theme';

const MODEL_OPTIONS = [
  { id: 'gemini-3.1-pro-preview',       icon: '🧠' },
  { id: 'gemini-3-flash-preview',        icon: '✨' },
  { id: 'gemini-2.5-flash',             icon: '🎯' },
  { id: 'gemini-3.1-flash-lite-preview', icon: '⚡' },
  { id: 'qwen-vl-max',                  icon: '🔮' },
  { id: 'glm-4v-flash',                 icon: '🌟' },
];

const STYLE_OPTIONS = [
  { id: 'mystical',       textKey: 'styleMystical',       descKey: 'styleMysticalDesc' },
  { id: 'psychological',  textKey: 'stylePsychological',  descKey: 'stylePsychologicalDesc' },
  { id: 'practical',      textKey: 'stylePractical',      descKey: 'stylePracticalDesc' },
];

export default function SettingsScreen({ lang: propLang = 'zh', onLangChange }) {
  const [selectedModel, setSelectedModel] = useState('gemini-3.1-flash-lite-preview');
  const [selectedLang, setSelectedLang] = useState(propLang);
  const [selectedStyle, setSelectedStyle] = useState('mystical');
  const t = getTexts(selectedLang);

  useEffect(() => {
    (async () => {
      const s = await getSettings();
      setSelectedModel(s.model);
      setSelectedLang(s.language);
      setSelectedStyle(s.style || 'mystical');
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

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{t.settingsTitle}</Text>

        {/* Language */}
        <Text style={styles.sectionTitle}>{t.langSection}</Text>
        <Text style={styles.sectionDesc}>{t.langDesc}</Text>
        {LANGUAGE_OPTIONS.map(opt => {
          const sel = selectedLang === opt.id;
          return (
            <TouchableOpacity key={opt.id} style={[styles.card, sel && styles.cardSelected]} onPress={() => selectLang(opt.id)} activeOpacity={0.7}>
              <View style={styles.row}>
                <Text style={styles.icon}>{opt.icon}</Text>
                <Text style={[styles.optName, sel && styles.optNameSel]}>{opt.name}</Text>
                <Radio selected={sel} />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Reading Style */}
        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>{t.styleSection}</Text>
        <Text style={styles.sectionDesc}>{t.styleDesc}</Text>
        {STYLE_OPTIONS.map(opt => {
          const sel = selectedStyle === opt.id;
          return (
            <TouchableOpacity key={opt.id} style={[styles.card, sel && styles.cardSelected]} onPress={() => selectStyle(opt.id)} activeOpacity={0.7}>
              <View style={styles.row}>
                <View style={styles.optInfo}>
                  <Text style={[styles.optName, sel && styles.optNameSel]}>{t[opt.textKey]}</Text>
                  <Text style={styles.optDesc}>{t[opt.descKey]}</Text>
                </View>
                <Radio selected={sel} />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* AI Model */}
        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>{t.modelSection}</Text>
        <Text style={styles.sectionDesc}>{t.modelDesc}</Text>
        {MODEL_OPTIONS.map(opt => {
          const sel = selectedModel === opt.id;
          const mt = modelTexts[opt.id];
          return (
            <TouchableOpacity key={opt.id} style={[styles.card, sel && styles.cardSelected]} onPress={() => selectModel(opt.id)} activeOpacity={0.7}>
              <View style={styles.row}>
                <Text style={styles.icon}>{opt.icon}</Text>
                <View style={styles.optInfo}>
                  <Text style={[styles.optName, sel && styles.optNameSel]}>{mt.name}</Text>
                  <Text style={styles.optDesc}>{mt.desc}</Text>
                </View>
                <Radio selected={sel} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function Radio({ selected }) {
  return (
    <View style={[styles.radio, selected && styles.radioSel]}>
      {selected && <View style={styles.radioDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.BG_PAGE },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.GOLD, marginBottom: 28, textAlign: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.TEXT_PRIMARY, marginBottom: 4 },
  sectionDesc: { fontSize: 14, color: COLORS.TEXT_MUTED, marginBottom: 14 },
  card: { backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1.5, borderColor: 'transparent' },
  cardSelected: { borderColor: COLORS.GOLD, backgroundColor: 'rgba(240,192,64,0.08)' },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 24, marginRight: 12 },
  optInfo: { flex: 1 },
  optName: { fontSize: 17, fontWeight: '600', color: COLORS.TEXT_PRIMARY },
  optNameSel: { color: COLORS.GOLD },
  optDesc: { fontSize: 14, color: COLORS.TEXT_MUTED, marginTop: 2, lineHeight: 20 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.TEXT_MUTED, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  radioSel: { borderColor: COLORS.GOLD },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.GOLD },
});
