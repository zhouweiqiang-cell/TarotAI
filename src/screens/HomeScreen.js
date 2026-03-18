import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { getTexts } from '../services/i18n';
import { getSettings } from '../services/settingsStorage';
import { getTodayReading, getHistory, addReading, removeReading } from '../services/historyStorage';
import { analyzeSpreadStream } from '../services/tarotAnalyzer';
import { drawRandom, getCard, SPREADS } from '../data/cards';
import { COLORS } from '../constants/theme';
import TarotCardImage from '../components/TarotCardImage';

function extractStreamingReadable(text) {
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const parts = [];
  const readings = [...clean.matchAll(/"reading"\s*:\s*"((?:[^"\\]|\\.)*)"/g)];
  readings.forEach(m => parts.push(m[1]));
  const partial = clean.match(/"reading"\s*:\s*"((?:[^"\\]|\\.)*)$/);
  if (partial) parts.push(partial[1] + '...');
  const overall = clean.match(/"overallMessage"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  if (overall) parts.push(overall[1]);
  const partialO = !overall && clean.match(/"overallMessage"\s*:\s*"((?:[^"\\]|\\.)*)$/);
  if (partialO) parts.push(partialO[1] + '...');
  const advice = clean.match(/"advice"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  if (advice) parts.push(advice[1]);
  const partialA = !advice && clean.match(/"advice"\s*:\s*"((?:[^"\\]|\\.)*)$/);
  if (partialA) parts.push(partialA[1] + '...');
  return parts.join('\n\n').replace(/\\n/g, '\n').replace(/\\"/g, '"') || '星象正在汇聚...';
}

export default function HomeScreen({ lang = 'zh', showHistoryOnly = false, onNavigate }) {
  const t = getTexts(lang);
  const [todayCard, setTodayCard] = useState(null);   // { card, isReversed }
  const [todayReading, setTodayReading] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [selectedReading, setSelectedReading] = useState(null);

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
        (text) => setStreamingText(text)
      );
      setStreamingText('');

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
                <TouchableOpacity key={item.id} style={styles.historyCard} onPress={() => setSelectedReading(item)} activeOpacity={0.7}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyDate}>{item.date}</Text>
                    <Text style={styles.historySpread}>{SPREADS[item.spread]?.name[lang] || item.spread}</Text>
                  </View>
                  {item.question ? <Text style={styles.historyQuestion}>{item.question}</Text> : null}
                  <Text style={styles.historyMessage} numberOfLines={3}>{item.result?.overallMessage}</Text>
                  <View style={styles.historyFooter}>
                    <Text style={styles.historyTap}>{t.viewDetail || '查看详情 →'}</Text>
                    <TouchableOpacity onPress={(e) => { e.stopPropagation(); handleDelete(item.id); }}>
                      <Text style={styles.deleteBtn}>{t.delete}</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>

        {/* Reading Detail Modal */}
        <Modal visible={!!selectedReading} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSelectedReading(null)}>
          {selectedReading && (
            <SafeAreaView style={styles.safe}>
              <ScrollView contentContainerStyle={styles.detailContent}>
                <TouchableOpacity onPress={() => setSelectedReading(null)} style={styles.detailClose}>
                  <Text style={styles.detailCloseText}>✕</Text>
                </TouchableOpacity>

                <Text style={styles.detailDate}>{selectedReading.date}</Text>
                <Text style={styles.detailSpread}>{SPREADS[selectedReading.spread]?.name[lang] || selectedReading.spread}</Text>
                {selectedReading.question ? <Text style={styles.detailQuestion}>"{selectedReading.question}"</Text> : null}

                {/* Cards */}
                {selectedReading.cards?.map((c, i) => {
                  const card = getCard(c.cardId);
                  const cr = selectedReading.result?.cardReadings?.[i];
                  return (
                    <View key={i} style={styles.detailCardRow}>
                      {card && <TarotCardImage card={card} isReversed={c.isReversed} width={60} height={95} style={{ marginRight: 12, borderRadius: 8 }} />}
                      <View style={{ flex: 1 }}>
                        <Text style={styles.detailCardPos}>{c.position || cr?.position}</Text>
                        <Text style={styles.detailCardName}>{card?.name[lang] || c.cardId}</Text>
                        <Text style={styles.detailCardState}>{c.isReversed ? t.reversed : t.upright}</Text>
                        {cr?.reading ? <Text style={styles.detailCardReading}>{cr.reading}</Text> : null}
                      </View>
                    </View>
                  );
                })}

                {/* Energy */}
                {selectedReading.result?.energy?.length > 0 && (
                  <View style={styles.detailEnergyRow}>
                    {selectedReading.result.energy.map((e, i) => (
                      <View key={i} style={styles.energyPill}><Text style={styles.energyText}>{e}</Text></View>
                    ))}
                  </View>
                )}

                {/* Overall */}
                <View style={styles.detailOverallCard}>
                  <Text style={styles.detailOverallLabel}>{t.overallMessage || '综合建议'}</Text>
                  <Text style={styles.detailOverallText}>{selectedReading.result?.overallMessage}</Text>
                  {selectedReading.result?.advice ? <Text style={styles.detailAdviceText}>{selectedReading.result.advice}</Text> : null}
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>
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
            {!loading && <TarotCardImage showBack width={120} height={200} />}
            {loading && todayCard && (
              <TarotCardImage card={todayCard.card} isReversed={todayCard.isReversed} width={120} height={200} />
            )}
            <TouchableOpacity
              style={[styles.drawBtn, loading && styles.drawBtnDisabled]}
              onPress={handleDailyDraw}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.drawBtnText}>{loading ? '✦ 正在解读...' : t.dailyDraw}</Text>
            </TouchableOpacity>
            {loading && streamingText ? (
              <Text style={styles.streamingText}>
                {extractStreamingReadable(streamingText)}
              </Text>
            ) : null}
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
  pageTitle: { fontSize: 28, fontWeight: '800', color: COLORS.GOLD, marginBottom: 6 },
  subtitle: { fontSize: 16, color: COLORS.TEXT_SECONDARY, marginBottom: 32 },
  drawSection: { alignItems: 'center', gap: 24 },
  drawBtn: {
    backgroundColor: COLORS.GOLD, paddingHorizontal: 36, paddingVertical: 14,
    borderRadius: 30, minWidth: 200, alignItems: 'center',
  },
  drawBtnDisabled: { opacity: 0.6 },
  drawBtnText: { color: COLORS.BG_DEEP, fontWeight: '700', fontSize: 18 },
  resultSection: { gap: 16 },
  resultCardRow: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  resultCardInfo: { flex: 1, gap: 6, paddingTop: 4 },
  sectionLabel: { fontSize: 14, color: COLORS.TEXT_MUTED },
  todayCardName: { fontSize: 22, fontWeight: '800', color: COLORS.GOLD },
  todayCardState: { fontSize: 15, color: COLORS.TEXT_SECONDARY },
  energyRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 4 },
  energyPill: { backgroundColor: COLORS.BG_CARD, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: COLORS.BORDER_GOLD },
  energyText: { color: COLORS.GOLD, fontSize: 14, fontWeight: '600' },
  overallMessage: { fontSize: 17, color: COLORS.TEXT_PRIMARY, lineHeight: 28 },
  advice: { fontSize: 16, color: COLORS.TEXT_SECONDARY, lineHeight: 26 },
  spreadCTA: {
    marginTop: 32, backgroundColor: COLORS.BG_CARD, borderRadius: 12,
    padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.BORDER,
  },
  spreadCTAText: { color: COLORS.PRIMARY_LIGHT, fontSize: 17, fontWeight: '600' },
  // History
  historyCard: { backgroundColor: COLORS.BG_CARD, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.BORDER },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  historyDate: { color: COLORS.TEXT_MUTED, fontSize: 14 },
  historySpread: { color: COLORS.PRIMARY_LIGHT, fontSize: 14 },
  historyQuestion: { color: COLORS.TEXT_SECONDARY, fontSize: 15, marginBottom: 8, fontStyle: 'italic' },
  historyMessage: { color: COLORS.TEXT_PRIMARY, fontSize: 15, lineHeight: 24, marginBottom: 10 },
  historyFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyTap: { color: COLORS.PRIMARY_LIGHT, fontSize: 14 },
  deleteBtn: { color: COLORS.TEXT_MUTED, fontSize: 14 },
  emptyText: { color: COLORS.TEXT_MUTED, textAlign: 'center', marginTop: 60, fontSize: 17 },
  streamingText: { color: COLORS.TEXT_PRIMARY, fontSize: 16, lineHeight: 26, textAlign: 'center', marginTop: 8 },
  // Detail Modal
  detailContent: { padding: 24, paddingBottom: 40 },
  detailClose: { alignSelf: 'flex-end', padding: 8 },
  detailCloseText: { color: COLORS.TEXT_MUTED, fontSize: 20 },
  detailDate: { fontSize: 14, color: COLORS.TEXT_MUTED, marginBottom: 4 },
  detailSpread: { fontSize: 22, fontWeight: '800', color: COLORS.GOLD, marginBottom: 8 },
  detailQuestion: { fontSize: 16, color: COLORS.TEXT_SECONDARY, fontStyle: 'italic', marginBottom: 20, lineHeight: 24 },
  detailCardRow: { flexDirection: 'row', backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.BORDER },
  detailCardPos: { fontSize: 13, fontWeight: '700', color: COLORS.GOLD, letterSpacing: 0.5, marginBottom: 4 },
  detailCardName: { fontSize: 17, fontWeight: '700', color: COLORS.TEXT_PRIMARY, marginBottom: 2 },
  detailCardState: { fontSize: 14, color: COLORS.TEXT_MUTED, marginBottom: 6 },
  detailCardReading: { fontSize: 15, color: COLORS.TEXT_PRIMARY, lineHeight: 24 },
  detailEnergyRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginVertical: 12 },
  detailOverallCard: { backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 18, marginTop: 8, borderWidth: 1, borderColor: COLORS.BORDER_GOLD, gap: 10 },
  detailOverallLabel: { fontSize: 14, color: COLORS.GOLD, fontWeight: '700', letterSpacing: 1 },
  detailOverallText: { fontSize: 17, color: COLORS.TEXT_PRIMARY, lineHeight: 28 },
  detailAdviceText: { fontSize: 16, color: COLORS.TEXT_SECONDARY, lineHeight: 26 },
});
