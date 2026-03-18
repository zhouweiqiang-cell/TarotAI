import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getTexts } from '../services/i18n';
import { getSettings } from '../services/settingsStorage';
import { getTodayReading, getHistory, addReading, removeReading } from '../services/historyStorage';
import { analyzeSpreadStream } from '../services/tarotAnalyzer';
import { drawRandom, getCard, SPREADS } from '../data/cards';
import { COLORS } from '../constants/theme';
import TarotCardImage from '../components/TarotCardImage';

export default function HomeScreen({ lang = 'zh', showHistoryOnly = false, onNavigate }) {
  const t = getTexts(lang);
  const [todayCard, setTodayCard] = useState(null);   // { card, isReversed }
  const [todayReading, setTodayReading] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [today, hist] = await Promise.all([getTodayReading(), getHistory()]);
    setTodayReading(today);
    setHistory(hist);
    // Reconstruct card object from stored reading
    if (today?.cards?.[0]) {
      const { cardId, isReversed } = today.cards[0];
      const card = getCard(cardId);
      if (card) setTodayCard({ card, isReversed });
    }
  }

  async function handleDailyDraw() {
    if (todayReading) return;
    setLoading(true);

    const settings = await getSettings();
    const [drawn] = drawRandom(1);
    setTodayCard(drawn);
    const cards = [{ ...drawn, position: t.cardReading }];

    try {
      const result = await analyzeSpreadStream(
        cards, '', settings.model, lang, settings.style,
        () => {} // suppress raw streaming text
      );

      const reading = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        question: '',
        spread: 'single',
        cards: cards.map(({ card, isReversed, position }) => ({ cardId: card.id, isReversed, position })),
        result,
        model: settings.model,
      };

      await addReading(reading);
      setTodayReading(reading);
      await loadData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await removeReading(id);
    await loadData();
  }

  if (showHistoryOnly) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.container}>
          <Text style={[styles.pageTitle, { padding: 20, paddingBottom: 0 }]}>{t.historyTitle}</Text>
          <View style={{ padding: 20 }}>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>{t.historyEmpty}</Text>
            ) : (
              history.map(item => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyDate}>{item.date}</Text>
                    <Text style={styles.historySpread}>{SPREADS[item.spread]?.name[lang] || item.spread}</Text>
                  </View>
                  {item.question ? <Text style={styles.historyQuestion}>{item.question}</Text> : null}
                  <Text style={styles.historyMessage} numberOfLines={3}>{item.result?.overallMessage}</Text>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.deleteBtn}>{t.delete}</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>{t.dailyTitle}</Text>
        <Text style={styles.subtitle}>{t.dailySubtitle}</Text>

        {!todayReading ? (
          <View style={styles.drawSection}>
            <TarotCardImage showBack width={120} height={200} />
            <TouchableOpacity
              style={[styles.drawBtn, loading && styles.drawBtnDisabled]}
              onPress={handleDailyDraw}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.drawBtnText}>{loading ? '✦ 正在解读...' : t.dailyDraw}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultSection}>
            {/* Card image + identity */}
            {todayCard && (
              <View style={styles.resultCardRow}>
                <TarotCardImage
                  card={todayCard.card}
                  isReversed={todayCard.isReversed}
                  width={100}
                  height={160}
                />
                <View style={styles.resultCardInfo}>
                  <Text style={styles.sectionLabel}>{t.alreadyDrawn}</Text>
                  <Text style={styles.todayCardName}>{todayCard.card.name[lang]}</Text>
                  <Text style={styles.todayCardState}>{todayCard.isReversed ? t.reversed : t.upright}</Text>
                  <View style={styles.energyRow}>
                    {todayReading.result?.energy?.map((e, i) => (
                      <View key={i} style={styles.energyPill}>
                        <Text style={styles.energyText}>{e}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
            <Text style={styles.overallMessage}>{todayReading.result?.overallMessage}</Text>
            <Text style={styles.advice}>{todayReading.result?.advice}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.spreadCTA} onPress={() => onNavigate?.('spread')} activeOpacity={0.8}>
          <Text style={styles.spreadCTAText}>{t.tabSpread} →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.BG_PAGE },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: COLORS.GOLD, marginBottom: 6 },
  subtitle: { fontSize: 14, color: COLORS.TEXT_SECONDARY, marginBottom: 32 },
  drawSection: { alignItems: 'center', gap: 24 },
  drawBtn: {
    backgroundColor: COLORS.GOLD, paddingHorizontal: 36, paddingVertical: 14,
    borderRadius: 30, minWidth: 200, alignItems: 'center',
  },
  drawBtnDisabled: { opacity: 0.6 },
  drawBtnText: { color: COLORS.BG_DEEP, fontWeight: '700', fontSize: 16 },
  resultSection: { gap: 16 },
  resultCardRow: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  resultCardInfo: { flex: 1, gap: 6, paddingTop: 4 },
  sectionLabel: { fontSize: 12, color: COLORS.TEXT_MUTED },
  todayCardName: { fontSize: 20, fontWeight: '800', color: COLORS.GOLD },
  todayCardState: { fontSize: 13, color: COLORS.TEXT_SECONDARY },
  energyRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 4 },
  energyPill: { backgroundColor: COLORS.BG_CARD, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: COLORS.BORDER_GOLD },
  energyText: { color: COLORS.GOLD, fontSize: 12, fontWeight: '600' },
  overallMessage: { fontSize: 15, color: COLORS.TEXT_PRIMARY, lineHeight: 24 },
  advice: { fontSize: 14, color: COLORS.TEXT_SECONDARY, lineHeight: 22 },
  spreadCTA: {
    marginTop: 32, backgroundColor: COLORS.BG_CARD, borderRadius: 12,
    padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.BORDER,
  },
  spreadCTAText: { color: COLORS.PRIMARY_LIGHT, fontSize: 15, fontWeight: '600' },
  // History
  historyCard: { backgroundColor: COLORS.BG_CARD, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.BORDER },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  historyDate: { color: COLORS.TEXT_MUTED, fontSize: 12 },
  historySpread: { color: COLORS.PRIMARY_LIGHT, fontSize: 12 },
  historyQuestion: { color: COLORS.TEXT_SECONDARY, fontSize: 13, marginBottom: 8, fontStyle: 'italic' },
  historyMessage: { color: COLORS.TEXT_PRIMARY, fontSize: 13, lineHeight: 20, marginBottom: 10 },
  deleteBtn: { color: COLORS.TEXT_MUTED, fontSize: 12, textAlign: 'right' },
  emptyText: { color: COLORS.TEXT_MUTED, textAlign: 'center', marginTop: 60, fontSize: 15 },
});
