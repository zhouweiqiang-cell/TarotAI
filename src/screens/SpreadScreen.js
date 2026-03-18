import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, Animated, TouchableOpacity, TextInput, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import { getTexts } from '../services/i18n';
import { getSettings } from '../services/settingsStorage';
import { addReading } from '../services/historyStorage';
import { analyzeSpreadStream } from '../services/tarotAnalyzer';
import { drawRandom, SPREADS } from '../data/cards';
import { CAUTION } from '../constants/theme';
import { extractStreamingReadable } from '../utils/streamingParser';
import { getSuitColorFromTheme } from '../utils/cardUtils';
import { useTheme } from '../contexts/ThemeContext';
import TarotCardImage from '../components/TarotCardImage';
import FlipCard from '../components/FlipCard';
import MatrixRain from '../components/MatrixRain';
import NebulaBackground from '../components/NebulaBackground';
import DuneBackground from '../components/DuneBackground';
import EnergyTagRow from '../components/EnergyTagRow';
import CardReadingBlock from '../components/CardReadingBlock';
import TypewriterLine from '../components/TypewriterLine';

const WORKER_URL = 'https://tarot-proxy.zhouweiqiang.workers.dev/';

async function transcribeAudio(base64, mimeType) {
  const body = {
    contents: [{
      parts: [
        { text: '请将这段音频转录成文字，只返回转录的原文，不要翻译或添加任何解释。' },
        { inline_data: { mime_type: mimeType, data: base64 } },
      ],
    }],
  };
  const res = await fetch(`${WORKER_URL}?model=gemini-3.1-flash-lite-preview&stream=false`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  let data;
  try { data = JSON.parse(raw); } catch { throw new Error('响应解析失败: ' + raw.slice(0, 200)); }
  if (!res.ok) throw new Error('API错误(' + res.status + '): ' + (data.error?.message || raw.slice(0, 200)));
  return data.candidates?.[0]?.content?.parts?.find(p => p.text && !p.thought)?.text || '';
}

export default function SpreadScreen({ lang = 'zh', onNavigate }) {
  const t = getTexts(lang);
  const { colors, suitColors, isDune } = useTheme();
  const ds = useMemo(() => cs(colors), [colors]);
  const [step, setStep] = useState('select'); // 'select' | 'question' | 'draw' | 'reading'
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [result, setResult] = useState(null);
  const [streamingText, setStreamingText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingRef = useRef(null);

  function handleSelectSpread(spread) {
    setSelectedSpread(spread);
    setStep('question');
  }

  function handleStartDraw() {
    const cards = drawRandom(selectedSpread.count).map(({ card, isReversed }, i) => ({
      card,
      isReversed,
      position: selectedSpread.positions[i]?.[lang] || `Card ${i + 1}`,
    }));
    setDrawnCards(cards);
    setRevealed([]);
    setStep('draw');
  }

  function revealCard(index) {
    if (revealed.includes(index)) return;
    const next = [...revealed, index];
    setRevealed(next);
    if (next.length === drawnCards.length) {
      setTimeout(() => handleGetReading(), 600);
    }
  }

  async function handleGetReading() {
    setLoading(true);
    setResult(null);
    setStreamingText('');
    setStep('reading');

    const settings = await getSettings();
    try {
      const res = await analyzeSpreadStream(
        drawnCards, question, settings.model, lang, settings.style,
        (text) => setStreamingText(text),
        settings.tone
      );
      setResult(res);
      setStreamingText('');

      await addReading({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        question,
        spread: selectedSpread.id,
        cards: drawnCards.map(({ card, isReversed, position }) => ({ cardId: card.id, isReversed, position })),
        result: res,
        model: settings.model,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep('select'); setSelectedSpread(null); setQuestion(''); setDrawnCards([]);
    setRevealed([]); setResult(null);
  }

  async function handleMicPress() {
    if (isTranscribing) return;

    if (Platform.OS === 'web') {
      // Web: MediaRecorder → Gemini AI transcription
      if (isRecording && mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
        mediaRecorder.onstop = async () => {
          mediaRecorder.stream.getTracks().forEach(tr => tr.stop());
          mediaRecorderRef.current = null;
          setIsRecording(false);
          const rawMime = (mediaRecorder.mimeType || 'audio/webm').split(';')[0];
          const blob = new Blob(audioChunksRef.current, { type: rawMime });
          if (blob.size === 0) return;
          setIsTranscribing(true);
          try {
            const reader = new FileReader();
            const base64 = await new Promise((resolve) => {
              reader.onloadend = () => resolve(reader.result.split(',')[1]);
              reader.readAsDataURL(blob);
            });
            const text = await transcribeAudio(base64, rawMime);
            if (text) setQuestion(text);
            else alert('识别失败，请重试');
          } catch (e) {
            alert('识别出错: ' + e.message);
          } finally {
            setIsTranscribing(false);
          }
        };
        mediaRecorder.start();
        setIsRecording(true);
      } catch (e) {
        alert('麦克风访问失败: ' + e.message);
      }
      return;
    }

    // Native: expo-av recording → Gemini transcription
    if (isRecording) {
      setIsRecording(false);
      setIsTranscribing(true);
      try {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        if (!uri) throw new Error('录音文件不存在');
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        if (!base64 || base64.length < 100) throw new Error('录音数据为空');
        const text = await transcribeAudio(base64, 'audio/aac');
        if (text) setQuestion(text);
        else alert('识别失败，请重试');
      } catch (e) {
        alert('识别出错: ' + e.message);
      } finally {
        setIsTranscribing(false);
      }
    } else {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        recordingRef.current = recording;
        setIsRecording(true);
      } catch (e) {
        alert('录音失败: ' + e.message);
      }
    }
  }

  // ─── Step: Select Spread ───
  if (step === 'select') {
    return (
      <SafeAreaView style={ds.safe}>
        {isDune && <DuneBackground />}
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={ds.pageTitle}>{t.spreadTitle}</Text>
          {Object.values(SPREADS).map(spread => (
            <TouchableOpacity key={spread.id} style={ds.spreadCard} onPress={() => handleSelectSpread(spread)} activeOpacity={0.8}>
              <View style={styles.spreadCardInner}>
                <Text style={ds.spreadName}>{spread.name[lang]}</Text>
                <Text style={ds.spreadCount}>{spread.count} 张</Text>
              </View>
              <View style={styles.positionPills}>
                {spread.positions.map((p, i) => (
                  <View key={i} style={ds.posPill}><Text style={ds.posPillText}>{p[lang]}</Text></View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Step: Enter Question ───
  if (step === 'question') {
    return (
      <SafeAreaView style={ds.safe}>
        {isDune && <DuneBackground />}
        <View style={styles.content}>
          <TouchableOpacity onPress={() => setStep('select')}><Text style={ds.backBtn}>← {selectedSpread.name[lang]}</Text></TouchableOpacity>
          <Text style={ds.pageTitle}>{t.spreadQuestion}</Text>
          <TextInput
            style={ds.questionInput}
            placeholder={t.spreadQuestionHint}
            placeholderTextColor={colors.TEXT_MUTED}
            value={question}
            onChangeText={setQuestion}
            multiline
          />
          <TouchableOpacity style={[ds.micBtn, isRecording && styles.micBtnActive]} onPress={handleMicPress} activeOpacity={0.8} disabled={isTranscribing}>
            <Text style={ds.micIcon}>{isTranscribing ? '⏳' : isRecording ? '⏹ 停止录音' : '🎤 语音输入'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ds.primaryBtn} onPress={handleStartDraw} activeOpacity={0.8}>
            <Text style={ds.primaryBtnText}>{t.startReading}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Render a single card slot ───
  function renderCardSlot(i, width = 90, height = 140, extraStyle) {
    const item = drawnCards[i];
    if (!item) return null;
    const isRevealed = revealed.includes(i);
    const suitColor = getSuitColorFromTheme(item.card, colors, suitColors);
    return (
      <View key={i} style={[styles.cardSlot, extraStyle]}>
        <FlipCard
          card={item.card}
          isReversed={item.isReversed}
          revealed={isRevealed}
          onPress={() => revealCard(i)}
          width={width}
          height={height}
          disabled={isRevealed}
        />
        {isRevealed && (
          <View style={[styles.revealedBadge, { backgroundColor: suitColor + '22', borderColor: suitColor }]}>
            <Text style={[styles.revealedName, { color: suitColor }]} numberOfLines={1}>
              {item.card.name[lang]}
            </Text>
            <Text style={ds.revealedState}>{item.isReversed ? t.reversed : t.upright}</Text>
          </View>
        )}
        <Text style={ds.cardPosition}>{item.position}</Text>
      </View>
    );
  }

  // ─── Step: Draw Cards ───
  if (step === 'draw') {
    const allRevealed = revealed.length === drawnCards.length;
    const isCeltic = selectedSpread?.id === 'celtic_cross';

    return (
      <SafeAreaView style={ds.safe}>
        {isDune && <DuneBackground />}
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={ds.pageTitle}>{selectedSpread.name[lang]}</Text>
          <Text style={ds.subtitle}>{allRevealed ? t.readingLoading : t.drawCard}</Text>

          {isCeltic ? (
            /* Celtic Cross layout:
               Cross section (left): cards 0-5
               Staff section (right): cards 6-9
               Layout:
                      [4]
                 [3] [0/1] [5]
                      [2]
                              [9]
                              [8]
                              [7]
                              [6]
            */
            <View style={styles.celticContainer}>
              <View style={styles.celticCross}>
                {/* Row 1: Goal (top) */}
                <View style={styles.celticRow}>
                  <View style={styles.celticEmpty} />
                  {renderCardSlot(4, 70, 110)}
                  <View style={styles.celticEmpty} />
                </View>
                {/* Row 2: Past - Present+Challenge - Future */}
                <View style={styles.celticRow}>
                  {renderCardSlot(3, 70, 110)}
                  <View style={styles.celticCenterCol}>
                    {renderCardSlot(0, 70, 110)}
                    {/* Challenge card below, slightly rotated to show "crossing" */}
                    {renderCardSlot(1, 70, 110, { transform: [{ rotate: '12deg' }], marginTop: -16 })}
                  </View>
                  {renderCardSlot(5, 70, 110)}
                </View>
                {/* Row 3: Subconscious (bottom) */}
                <View style={styles.celticRow}>
                  <View style={styles.celticEmpty} />
                  {renderCardSlot(2, 70, 110)}
                  <View style={styles.celticEmpty} />
                </View>
              </View>
              {/* Staff column */}
              <View style={styles.celticStaff}>
                {renderCardSlot(9, 70, 110)}
                {renderCardSlot(8, 70, 110)}
                {renderCardSlot(7, 70, 110)}
                {renderCardSlot(6, 70, 110)}
              </View>
            </View>
          ) : (
            <View style={styles.cardsGrid}>
              {drawnCards.map((_, i) => renderCardSlot(i))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Step: Reading Result ───
  return (
    <SafeAreaView style={ds.safe}>
      {isDune && <DuneBackground />}
      {loading && (isDune
        ? <MatrixRain streamingText={streamingText} colors={colors} />
        : <NebulaBackground />
      )}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={ds.pageTitle}>{t.cardReading}</Text>
        {loading ? (
          <View style={styles.loadingSection}>
            <Text style={[styles.loadingOrb, { color: colors.GOLD }]}>✦</Text>
            <Text style={[styles.loadingText, { color: colors.TEXT_PRIMARY }]}>{t.readingLoading}</Text>
            <Text style={[styles.loadingSubtext, { color: colors.TEXT_MUTED }]}>星象正在汇聚，请稍候...</Text>
            <TypewriterLine streamingText={streamingText} />
          </View>
        ) : result ? (
          <>
            {/* Energy tags */}
            <EnergyTagRow energies={result.energy} style={{ marginBottom: 20 }} />

            {/* Card readings with images */}
            {result.cardReadings?.map((cr, i) => {
              const drawn = drawnCards[i];
              return (
                <CardReadingBlock
                  key={i}
                  card={drawn?.card}
                  isReversed={drawn?.isReversed}
                  position={cr.position}
                  reading={cr.reading}
                  lang={lang}
                  t={t}
                />
              );
            })}

            {/* Connections */}
            {result.connections ? (
              <View style={ds.sectionCard}>
                <Text style={ds.sectionLabel}>{t.connections}</Text>
                <Text style={ds.sectionText}>{result.connections}</Text>
              </View>
            ) : null}

            {/* Narrative */}
            {result.narrative ? (
              <View style={ds.sectionCard}>
                <Text style={ds.sectionLabel}>{t.narrative}</Text>
                <Text style={ds.sectionText}>{result.narrative}</Text>
              </View>
            ) : null}

            {/* Overall message */}
            <View style={ds.overallCard}>
              <Text style={ds.overallLabel}>{t.overallMessage}</Text>
              <Text style={ds.overallText}>{result.overallMessage}</Text>
              {result.advice ? <Text style={ds.adviceText}>{result.advice}</Text> : null}
            </View>

            {/* Caution */}
            {result.caution ? (
              <View style={ds.cautionCard}>
                <Text style={ds.cautionLabel}>{t.caution}</Text>
                <Text style={ds.cautionText}>{result.caution}</Text>
              </View>
            ) : null}

            <TouchableOpacity style={ds.resetBtn} onPress={reset} activeOpacity={0.8}>
              <Text style={ds.resetBtnText}>重新占卜</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

// Layout-only static styles (no colors)
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  spreadCardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  positionPills: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  celticContainer: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  celticCross: { alignItems: 'center' },
  celticRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  celticEmpty: { width: 90 },
  celticCenterCol: { alignItems: 'center' },
  celticStaff: { justifyContent: 'flex-end', gap: 4 },
  cardSlot: { alignItems: 'center', width: 90 },
  revealedBadge: { marginTop: 6, borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, alignItems: 'center', width: '100%' },
  revealedName: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  loadingSection: { alignItems: 'center', gap: 16, paddingTop: 60 },
  loadingOrb: { fontSize: 56 },
  loadingText: { fontSize: 19, fontWeight: '600' },
  loadingSubtext: { fontSize: 15 },
  micBtnActive: { borderColor: '#e53935', backgroundColor: '#e5393520' },
});

// Color-dependent styles helper
function cs(colors) {
  return {
    safe: { flex: 1, backgroundColor: colors.BG_PAGE },
    pageTitle: { fontSize: 28, fontWeight: '800', color: colors.GOLD, marginBottom: 8 },
    subtitle: { fontSize: 15, color: colors.TEXT_SECONDARY, marginBottom: 24 },
    backBtn: { color: colors.TEXT_SECONDARY, fontSize: 16, marginBottom: 20 },
    spreadCard: { backgroundColor: colors.BG_CARD, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.BORDER },
    spreadName: { fontSize: 19, fontWeight: '700', color: colors.TEXT_PRIMARY },
    spreadCount: { fontSize: 15, color: colors.TEXT_MUTED },
    posPill: { backgroundColor: colors.BG_GLASS, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
    posPillText: { color: colors.TEXT_SECONDARY, fontSize: 14 },
    questionInput: {
      backgroundColor: colors.BG_CARD, borderRadius: 12, padding: 16,
      color: colors.TEXT_PRIMARY, fontSize: 17, minHeight: 100,
      borderWidth: 1, borderColor: colors.BORDER, marginBottom: 24, textAlignVertical: 'top',
    },
    micBtn: { borderRadius: 30, borderWidth: 1, borderColor: colors.BORDER, padding: 12, alignItems: 'center', marginBottom: 12 },
    micIcon: { color: colors.TEXT_SECONDARY, fontSize: 17 },
    primaryBtn: { backgroundColor: colors.GOLD, borderRadius: 30, padding: 16, alignItems: 'center' },
    primaryBtnText: { color: colors.BG_DEEP, fontWeight: '700', fontSize: 18 },
    revealedState: { fontSize: 12, color: colors.TEXT_MUTED, marginTop: 1 },
    cardPosition: { marginTop: 4, fontSize: 13, color: colors.TEXT_SECONDARY, textAlign: 'center' },
    overallCard: { backgroundColor: colors.BG_CARD, borderRadius: 14, padding: 18, marginTop: 8, borderWidth: 1, borderColor: colors.BORDER_GOLD, gap: 10 },
    overallLabel: { fontSize: 14, color: colors.GOLD, fontWeight: '700', letterSpacing: 1 },
    overallText: { fontSize: 17, color: colors.TEXT_PRIMARY, lineHeight: 28 },
    adviceText: { fontSize: 16, color: colors.TEXT_SECONDARY, lineHeight: 26 },
    sectionCard: { backgroundColor: colors.BG_CARD, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.BORDER, gap: 8 },
    sectionLabel: { fontSize: 13, color: colors.PRIMARY_LIGHT, fontWeight: '700', letterSpacing: 0.5 },
    sectionText: { fontSize: 16, color: colors.TEXT_PRIMARY, lineHeight: 26 },
    cautionCard: { backgroundColor: CAUTION.BG, borderRadius: 14, padding: 16, marginTop: 8, borderWidth: 1, borderColor: CAUTION.BORDER, gap: 8 },
    cautionLabel: { fontSize: 13, color: CAUTION.TEXT, fontWeight: '700', letterSpacing: 0.5 },
    cautionText: { fontSize: 16, color: colors.TEXT_SECONDARY, lineHeight: 26 },
    resetBtn: { marginTop: 24, borderRadius: 30, borderWidth: 1, borderColor: colors.BORDER, padding: 14, alignItems: 'center' },
    resetBtnText: { color: colors.TEXT_SECONDARY, fontSize: 17 },
  };
}
