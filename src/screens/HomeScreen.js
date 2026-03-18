import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { getTexts } from '../services/i18n';
import { getSettings } from '../services/settingsStorage';
import { getTodayReading, getHistory, addReading, removeReading } from '../services/historyStorage';
import { analyzeSpreadStream } from '../services/tarotAnalyzer';
import { drawRandom, getCard, SPREADS } from '../data/cards';
import { COLORS, CAUTION, BASE_STYLES } from '../constants/theme';
import { extractStreamingReadable } from '../utils/streamingParser';
import TarotCardImage from '../components/TarotCardImage';
import EnergyTagRow from '../components/EnergyTagRow';
import CardReadingBlock from '../components/CardReadingBlock';

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
        (text) => setStreamingText(text),
        settings.tone
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
                    <CardReadingBlock
                      key={i}
                      card={card}
                      isReversed={c.isReversed}
                      position={c.position || cr?.position}
                      reading={cr?.reading}
                      lang={lang}
                      t={t}
                      size="compact"
                    />
                  );
                })}

                {/* Energy */}
                <EnergyTagRow energies={selectedReading.result?.energy} style={{ marginVertical: 12 }} />

                {/* Connections */}
                {selectedReading.result?.connections ? (
                  <View style={styles.detailSectionCard}>
                    <Text style={styles.detailSectionLabel}>{t.connections || '牌间关联'}</Text>
                    <Text style={styles.detailSectionText}>{selectedReading.result.connections}</Text>
                  </View>
                ) : null}

                {/* Narrative */}
                {selectedReading.result?.narrative ? (
                  <View style={styles.detailSectionCard}>
                    <Text style={styles.detailSectionLabel}>{t.narrative || '整体叙事'}</Text>
                    <Text style={styles.detailSectionText}>{selectedReading.result.narrative}</Text>
                  </View>
                ) : null}

                {/* Overall */}
                <View style={styles.detailOverallCard}>
                  <Text style={styles.detailOverallLabel}>{t.overallMessage || '综合建议'}</Text>
                  <Text style={styles.detailOverallText}>{selectedReading.result?.overallMessage}</Text>
                  {selectedReading.result?.advice ? <Text style={styles.detailAdviceText}>{selectedReading.result.advice}</Text> : null}
                </View>

                {/* Caution */}
                {selectedReading.result?.caution ? (
                  <View style={styles.detailCautionCard}>
                    <Text style={styles.detailCautionLabel}>{t.caution || '注意事项'}</Text>
                    <Text style={styles.detailCautionText}>{selectedReading.result.caution}</Text>
                  </View>
                ) : null}
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
                  <EnergyTagRow energies={todayReading.result?.energy} style={{ marginTop: 4 }} />
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
  safe: BASE_STYLES.safe,
  container: BASE_STYLES.container,
  content: { padding: 20, paddingBottom: 40 },
  pageTitle: BASE_STYLES.pageTitle,
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
  detailSectionCard: { backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.BORDER, gap: 8 },
  detailSectionLabel: { fontSize: 13, color: COLORS.PRIMARY_LIGHT, fontWeight: '700', letterSpacing: 0.5 },
  detailSectionText: { fontSize: 15, color: COLORS.TEXT_PRIMARY, lineHeight: 24 },
  detailCautionCard: { backgroundColor: CAUTION.BG, borderRadius: 14, padding: 16, marginTop: 8, borderWidth: 1, borderColor: CAUTION.BORDER, gap: 8 },
  detailCautionLabel: { fontSize: 13, color: CAUTION.TEXT, fontWeight: '700', letterSpacing: 0.5 },
  detailCautionText: { fontSize: 15, color: COLORS.TEXT_SECONDARY, lineHeight: 24 },
  detailOverallCard: { backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 18, marginTop: 8, borderWidth: 1, borderColor: COLORS.BORDER_GOLD, gap: 10 },
  detailOverallLabel: { fontSize: 14, color: COLORS.GOLD, fontWeight: '700', letterSpacing: 1 },
  detailOverallText: { fontSize: 17, color: COLORS.TEXT_PRIMARY, lineHeight: 28 },
  detailAdviceText: { fontSize: 16, color: COLORS.TEXT_SECONDARY, lineHeight: 26 },
});
