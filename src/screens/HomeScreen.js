import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { getTexts } from '../services/i18n';
import { getSettings } from '../services/settingsStorage';
import { getTodayReading, getHistory, addReading, removeReading } from '../services/historyStorage';
import { analyzeSpreadStream } from '../services/tarotAnalyzer';
import { drawRandom, getCard, SPREADS } from '../data/cards';
import { CAUTION } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';
import TarotCardImage from '../components/TarotCardImage';
import EnergyTagRow from '../components/EnergyTagRow';
import CardReadingBlock from '../components/CardReadingBlock';
import TypewriterLine from '../components/TypewriterLine';
import CardDrawAnimation from '../components/CardDrawAnimation';
import DuneBackground from '../components/DuneBackground';

export default function HomeScreen({ lang = 'zh', showHistoryOnly = false, onNavigate }) {
  const t = getTexts(lang);
  const { colors, isDune } = useTheme();
  const ds = useMemo(() => cs(colors), [colors]);
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

  const [animating, setAnimating] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  function handleRedraw() {
    setTodayReading(null);
    setTodayCard(null);
    setStreamingText('');
    setAnimating(false);
    setAnimDone(false);
    setLoading(false);
  }

  async function handleDailyDraw() {
    const settings = await getSettings();
    const [drawn] = drawRandom(1);
    setTodayCard(drawn);
    setAnimating(true);
    setAnimDone(false);

    // Wait for the animation to complete (CardDrawAnimation calls onComplete)
    // Meanwhile, we can start the AI request in parallel after a short delay
    const cards = [{ ...drawn, position: t.cardReading }];

    // Store settings for use in onAnimComplete
    drawnRef.current = { drawn, cards, settings };
  }

  const drawnRef = useRef(null);

  async function onAnimComplete() {
    setAnimDone(true);
    setLoading(true);
    const { drawn, cards, settings } = drawnRef.current;

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
      <SafeAreaView style={ds.safe}>
        {isDune && <DuneBackground />}
        <ScrollView style={styles.container}>
          <Text style={[ds.pageTitle, { padding: 20, paddingBottom: 0 }]}>{t.historyTitle}</Text>
          <View style={{ padding: 20 }}>
            {history.length === 0 ? (
              <Text style={ds.emptyText}>{t.historyEmpty}</Text>
            ) : (
              history.map(item => (
                <TouchableOpacity key={item.id} style={ds.historyCard} onPress={() => setSelectedReading(item)} activeOpacity={0.7}>
                  <View style={styles.historyHeader}>
                    <Text style={ds.historyDate}>{item.date}</Text>
                    <Text style={ds.historySpread}>{SPREADS[item.spread]?.name[lang] || item.spread}</Text>
                  </View>
                  {item.question ? <Text style={ds.historyQuestion}>{item.question}</Text> : null}
                  <Text style={ds.historyMessage} numberOfLines={3}>{item.result?.overallMessage}</Text>
                  <View style={styles.historyFooter}>
                    <Text style={ds.historyTap}>{t.viewDetail}</Text>
                    <TouchableOpacity onPress={(e) => { e.stopPropagation(); handleDelete(item.id); }}>
                      <Text style={ds.deleteBtn}>{t.delete}</Text>
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
            <SafeAreaView style={ds.safe}>
              <ScrollView contentContainerStyle={styles.detailContent}>
                <TouchableOpacity onPress={() => setSelectedReading(null)} style={styles.detailClose}>
                  <Text style={ds.detailCloseText}>✕</Text>
                </TouchableOpacity>

                <Text style={ds.detailDate}>{selectedReading.date}</Text>
                <Text style={ds.detailSpread}>{SPREADS[selectedReading.spread]?.name[lang] || selectedReading.spread}</Text>
                {selectedReading.question ? <Text style={ds.detailQuestion}>"{selectedReading.question}"</Text> : null}

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
                  <View style={ds.detailSectionCard}>
                    <Text style={ds.detailSectionLabel}>{t.connections}</Text>
                    <Text style={ds.detailSectionText}>{selectedReading.result.connections}</Text>
                  </View>
                ) : null}

                {/* Narrative */}
                {selectedReading.result?.narrative ? (
                  <View style={ds.detailSectionCard}>
                    <Text style={ds.detailSectionLabel}>{t.narrative}</Text>
                    <Text style={ds.detailSectionText}>{selectedReading.result.narrative}</Text>
                  </View>
                ) : null}

                {/* Overall */}
                <View style={ds.detailOverallCard}>
                  <Text style={ds.detailOverallLabel}>{t.overallMessage}</Text>
                  <Text style={ds.detailOverallText}>{selectedReading.result?.overallMessage}</Text>
                  {selectedReading.result?.advice ? <Text style={ds.detailAdviceText}>{selectedReading.result.advice}</Text> : null}
                </View>

                {/* Caution */}
                {selectedReading.result?.caution ? (
                  <View style={ds.detailCautionCard}>
                    <Text style={ds.detailCautionLabel}>{t.caution}</Text>
                    <Text style={ds.detailCautionText}>{selectedReading.result.caution}</Text>
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
    <SafeAreaView style={ds.safe}>
      {isDune && <DuneBackground />}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={ds.pageTitle}>{t.dailyTitle}</Text>
        <Text style={ds.subtitle}>{t.dailySubtitle}</Text>

        {!todayReading ? (
          <View style={styles.drawSection}>
            {/* Before draw: show card back + draw button */}
            {!animating && (
              <>
                <TarotCardImage showBack width={120} height={200} />
                <TouchableOpacity style={ds.drawBtn} onPress={handleDailyDraw} activeOpacity={0.8}>
                  <Text style={ds.drawBtnText}>{t.dailyDraw}</Text>
                </TouchableOpacity>
              </>
            )}
            {/* Draw animation — stays mounted after completion so card doesn't jump */}
            {animating && todayCard && (
              <>
                <CardDrawAnimation
                  card={todayCard.card}
                  isReversed={todayCard.isReversed}
                  onComplete={onAnimComplete}
                />
                {animDone && loading && (
                  <Text style={ds.interpretingText}>{'✦ ' + t.interpreting}</Text>
                )}
              </>
            )}
            {loading && streamingText ? (
              <TypewriterLine streamingText={streamingText} />
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
                  <Text style={ds.sectionLabel}>{t.alreadyDrawn}</Text>
                  <Text style={ds.todayCardName}>{todayCard.card.name[lang]}</Text>
                  <Text style={ds.todayCardState}>{todayCard.isReversed ? t.reversed : t.upright}</Text>
                  <EnergyTagRow energies={todayReading.result?.energy} style={{ marginTop: 4 }} />
                </View>
              </View>
            )}
            <Text style={ds.overallMessage}>{todayReading.result?.overallMessage}</Text>
            <Text style={ds.advice}>{todayReading.result?.advice}</Text>
            <TouchableOpacity style={ds.redrawBtn} onPress={handleRedraw} activeOpacity={0.8}>
              <Text style={ds.redrawBtnText}>{t.redraw}</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={ds.spreadCTA} onPress={() => onNavigate?.('spread')} activeOpacity={0.8}>
          <Text style={ds.spreadCTAText}>{t.tabSpread} →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Layout-only static styles (no colors)
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  drawSection: { alignItems: 'center', gap: 24 },
  drawBtnDisabled: { opacity: 0.6 },
  resultSection: { gap: 16 },
  resultCardRow: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  resultCardInfo: { flex: 1, gap: 6, paddingTop: 4 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  historyFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailContent: { padding: 24, paddingBottom: 40 },
  detailClose: { alignSelf: 'flex-end', padding: 8 },
});

// Color-dependent styles helper
function cs(colors) {
  return {
    safe: { flex: 1, backgroundColor: colors.BG_PAGE },
    pageTitle: { fontSize: 28, fontWeight: '800', color: colors.GOLD, marginBottom: 12 },
    subtitle: { fontSize: 16, color: colors.TEXT_SECONDARY, marginBottom: 32 },
    drawBtn: {
      backgroundColor: colors.GOLD, paddingHorizontal: 36, paddingVertical: 14,
      borderRadius: 30, minWidth: 200, alignItems: 'center',
    },
    drawBtnText: { color: colors.BG_DEEP, fontWeight: '700', fontSize: 18 },
    sectionLabel: { fontSize: 14, color: colors.TEXT_MUTED },
    todayCardName: { fontSize: 22, fontWeight: '800', color: colors.GOLD },
    todayCardState: { fontSize: 15, color: colors.TEXT_SECONDARY },
    overallMessage: { fontSize: 17, color: colors.TEXT_PRIMARY, lineHeight: 28 },
    advice: { fontSize: 16, color: colors.TEXT_SECONDARY, lineHeight: 26 },
    interpretingText: { color: colors.TEXT_MUTED, fontSize: 15, fontWeight: '600', marginTop: 16, textAlign: 'center' },
    redrawBtn: {
      marginTop: 20, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 10,
      borderRadius: 20, borderWidth: 1, borderColor: colors.BORDER,
    },
    redrawBtnText: { color: colors.TEXT_MUTED, fontSize: 15, fontWeight: '600' },
    spreadCTA: {
      marginTop: 32, backgroundColor: colors.BG_CARD, borderRadius: 12,
      padding: 16, alignItems: 'center', borderWidth: 1, borderColor: colors.BORDER,
    },
    spreadCTAText: { color: colors.PRIMARY_LIGHT, fontSize: 17, fontWeight: '600' },
    streamingText: { color: colors.TEXT_PRIMARY, fontSize: 16, lineHeight: 26, textAlign: 'center', marginTop: 8 },
    emptyText: { color: colors.TEXT_MUTED, textAlign: 'center', marginTop: 60, fontSize: 17 },
    // History
    historyCard: { backgroundColor: colors.BG_CARD, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.BORDER },
    historyDate: { color: colors.TEXT_MUTED, fontSize: 14 },
    historySpread: { color: colors.PRIMARY_LIGHT, fontSize: 14 },
    historyQuestion: { color: colors.TEXT_SECONDARY, fontSize: 15, marginBottom: 8, fontStyle: 'italic' },
    historyMessage: { color: colors.TEXT_PRIMARY, fontSize: 15, lineHeight: 24, marginBottom: 10 },
    historyTap: { color: colors.PRIMARY_LIGHT, fontSize: 14 },
    deleteBtn: { color: colors.TEXT_MUTED, fontSize: 14 },
    // Detail Modal
    detailCloseText: { color: colors.TEXT_MUTED, fontSize: 20 },
    detailDate: { fontSize: 14, color: colors.TEXT_MUTED, marginBottom: 4 },
    detailSpread: { fontSize: 22, fontWeight: '800', color: colors.GOLD, marginBottom: 8 },
    detailQuestion: { fontSize: 16, color: colors.TEXT_SECONDARY, fontStyle: 'italic', marginBottom: 20, lineHeight: 24 },
    detailSectionCard: { backgroundColor: colors.BG_CARD, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.BORDER, gap: 8 },
    detailSectionLabel: { fontSize: 13, color: colors.PRIMARY_LIGHT, fontWeight: '700', letterSpacing: 0.5 },
    detailSectionText: { fontSize: 15, color: colors.TEXT_PRIMARY, lineHeight: 24 },
    detailCautionCard: { backgroundColor: CAUTION.BG, borderRadius: 14, padding: 16, marginTop: 8, borderWidth: 1, borderColor: CAUTION.BORDER, gap: 8 },
    detailCautionLabel: { fontSize: 13, color: CAUTION.TEXT, fontWeight: '700', letterSpacing: 0.5 },
    detailCautionText: { fontSize: 15, color: colors.TEXT_SECONDARY, lineHeight: 24 },
    detailOverallCard: { backgroundColor: colors.BG_CARD, borderRadius: 14, padding: 18, marginTop: 8, borderWidth: 1, borderColor: colors.BORDER_GOLD, gap: 10 },
    detailOverallLabel: { fontSize: 14, color: colors.GOLD, fontWeight: '700', letterSpacing: 1 },
    detailOverallText: { fontSize: 17, color: colors.TEXT_PRIMARY, lineHeight: 28 },
    detailAdviceText: { fontSize: 16, color: colors.TEXT_SECONDARY, lineHeight: 26 },
  };
}
