import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { getTexts } from '../services/i18n';
import { getSettings } from '../services/settingsStorage';
import { addReading } from '../services/historyStorage';
import { analyzeSpreadStream } from '../services/tarotAnalyzer';
import { drawRandom, SPREADS } from '../data/cards';
import { COLORS, SUIT_COLORS } from '../constants/theme';
import TarotCardImage from '../components/TarotCardImage';

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
  const res = await fetch(`${WORKER_URL}?model=gemini-2.0-flash&stream=false`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'transcription failed');
  return data.candidates?.[0]?.content?.parts?.find(p => p.text && !p.thought)?.text || '';
}

export default function SpreadScreen({ lang = 'zh', onNavigate }) {
  const t = getTexts(lang);
  const [step, setStep] = useState('select'); // 'select' | 'question' | 'draw' | 'reading'
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [result, setResult] = useState(null);
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
    setStep('reading');

    const settings = await getSettings();
    try {
      const res = await analyzeSpreadStream(
        drawnCards, question, settings.model, lang, settings.style,
        () => {} // streaming callback — suppress raw text
      );
      setResult(res);

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
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsTranscribing(true);
      if (Platform.OS === 'web') {
        mediaRecorderRef.current?.stop();
      } else {
        try {
          await recordingRef.current.stopAndUnloadAsync();
          const uri = recordingRef.current.getURI();
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
          const text = await transcribeAudio(base64, 'audio/mp4');
          if (text) setQuestion(text);
          else alert('识别失败，请重试');
        } catch (e) {
          alert('识别出错: ' + e.message);
        } finally {
          setIsTranscribing(false);
        }
      }
    } else {
      // Start recording
      try {
        if (Platform.OS === 'web') {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];
          mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
          mediaRecorder.onstop = async () => {
            mediaRecorder.stream.getTracks().forEach(t => t.stop());
            const rawMime = mediaRecorder.mimeType || 'audio/webm';
            const mimeType = rawMime.split(';')[0];
            const blob = new Blob(audioChunksRef.current, { type: mimeType });
            if (blob.size === 0) { setIsTranscribing(false); return; }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
              try {
                const base64 = reader.result.split(',')[1];
                const text = await transcribeAudio(base64, mimeType);
                if (text) setQuestion(text);
                else alert('识别失败，请重试');
              } catch (e) {
                alert('识别出错: ' + e.message);
              } finally {
                setIsTranscribing(false);
              }
            };
          };
          mediaRecorder.start();
        } else {
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
          const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
          recordingRef.current = recording;
        }
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

  // ─── Step: Select Spread ───
  if (step === 'select') {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>{t.spreadTitle}</Text>
          {Object.values(SPREADS).map(spread => (
            <TouchableOpacity key={spread.id} style={styles.spreadCard} onPress={() => handleSelectSpread(spread)} activeOpacity={0.8}>
              <View style={styles.spreadCardInner}>
                <Text style={styles.spreadName}>{spread.name[lang]}</Text>
                <Text style={styles.spreadCount}>{spread.count} 张</Text>
              </View>
              <View style={styles.positionPills}>
                {spread.positions.map((p, i) => (
                  <View key={i} style={styles.posPill}><Text style={styles.posPillText}>{p[lang]}</Text></View>
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
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => setStep('select')}><Text style={styles.backBtn}>← {selectedSpread.name[lang]}</Text></TouchableOpacity>
          <Text style={styles.pageTitle}>{t.spreadQuestion}</Text>
          <TextInput
            style={styles.questionInput}
            placeholder={t.spreadQuestionHint}
            placeholderTextColor={COLORS.TEXT_MUTED}
            value={question}
            onChangeText={setQuestion}
            multiline
          />
          <TouchableOpacity style={[styles.micBtn, isRecording && styles.micBtnActive]} onPress={handleMicPress} activeOpacity={0.8} disabled={isTranscribing}>
            <Text style={styles.micIcon}>{isTranscribing ? '⏳' : isRecording ? '⏹ 停止录音' : '🎤 语音输入'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleStartDraw} activeOpacity={0.8}>
            <Text style={styles.primaryBtnText}>{t.startReading}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Step: Draw Cards ───
  if (step === 'draw') {
    const allRevealed = revealed.length === drawnCards.length;
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>{selectedSpread.name[lang]}</Text>
          <Text style={styles.subtitle}>{allRevealed ? t.readingLoading : t.drawCard}</Text>
          <View style={styles.cardsGrid}>
            {drawnCards.map((item, i) => {
              const isRevealed = revealed.includes(i);
              const suitColor = SUIT_COLORS[item.card.arcana] || COLORS.GOLD;
              return (
                <TouchableOpacity key={i} style={styles.cardSlot} onPress={() => revealCard(i)} activeOpacity={0.8} disabled={isRevealed}>
                  <TarotCardImage
                    card={isRevealed ? item.card : null}
                    isReversed={item.isReversed}
                    showBack={!isRevealed}
                    width={90}
                    height={140}
                  />
                  {isRevealed && (
                    <View style={[styles.revealedBadge, { backgroundColor: suitColor + '22', borderColor: suitColor }]}>
                      <Text style={[styles.revealedName, { color: suitColor }]} numberOfLines={1}>
                        {item.card.name[lang]}
                      </Text>
                      <Text style={styles.revealedState}>{item.isReversed ? t.reversed : t.upright}</Text>
                    </View>
                  )}
                  <Text style={styles.cardPosition}>{item.position}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Step: Reading Result ───
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>{t.cardReading}</Text>
        {loading ? (
          <View style={styles.loadingSection}>
            <Text style={styles.loadingOrb}>✦</Text>
            <Text style={styles.loadingText}>{t.readingLoading}</Text>
            <Text style={styles.loadingSubtext}>星象正在汇聚，请稍候...</Text>
          </View>
        ) : result ? (
          <>
            {/* Energy tags */}
            {result.energy?.length > 0 && (
              <View style={styles.energyRow}>
                {result.energy.map((e, i) => (
                  <View key={i} style={styles.energyPill}><Text style={styles.energyText}>{e}</Text></View>
                ))}
              </View>
            )}

            {/* Card readings with images */}
            {result.cardReadings?.map((cr, i) => {
              const drawn = drawnCards[i];
              const suitColor = drawn ? (SUIT_COLORS[drawn.card.arcana] || COLORS.GOLD) : COLORS.GOLD;
              return (
                <View key={i} style={[styles.cardReadingCard, { borderLeftColor: suitColor }]}>
                  <View style={styles.cardReadingTop}>
                    {drawn && (
                      <TarotCardImage
                        card={drawn.card}
                        isReversed={drawn.isReversed}
                        width={70}
                        height={110}
                        style={styles.cardReadingImg}
                      />
                    )}
                    <View style={styles.cardReadingMeta}>
                      <Text style={[styles.crPosition, { color: suitColor }]}>{cr.position}</Text>
                      {drawn && (
                        <>
                          <Text style={styles.crCardName}>{drawn.card.name[lang]}</Text>
                          <Text style={styles.crState}>{drawn.isReversed ? t.reversed : t.upright}</Text>
                        </>
                      )}
                    </View>
                  </View>
                  <Text style={styles.crReading}>{cr.reading}</Text>
                </View>
              );
            })}

            {/* Overall message */}
            <View style={styles.overallCard}>
              <Text style={styles.overallLabel}>{t.overallMessage}</Text>
              <Text style={styles.overallText}>{result.overallMessage}</Text>
              {result.advice ? <Text style={styles.adviceText}>{result.advice}</Text> : null}
            </View>

            <TouchableOpacity style={styles.resetBtn} onPress={reset} activeOpacity={0.8}>
              <Text style={styles.resetBtnText}>重新占卜</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.BG_PAGE },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: COLORS.GOLD, marginBottom: 8 },
  subtitle: { fontSize: 13, color: COLORS.TEXT_SECONDARY, marginBottom: 24 },
  backBtn: { color: COLORS.TEXT_SECONDARY, fontSize: 14, marginBottom: 20 },
  spreadCard: { backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.BORDER },
  spreadCardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  spreadName: { fontSize: 17, fontWeight: '700', color: COLORS.TEXT_PRIMARY },
  spreadCount: { fontSize: 13, color: COLORS.TEXT_MUTED },
  positionPills: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  posPill: { backgroundColor: COLORS.BG_GLASS, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  posPillText: { color: COLORS.TEXT_SECONDARY, fontSize: 12 },
  questionInput: {
    backgroundColor: COLORS.BG_CARD, borderRadius: 12, padding: 16,
    color: COLORS.TEXT_PRIMARY, fontSize: 15, minHeight: 100,
    borderWidth: 1, borderColor: COLORS.BORDER, marginBottom: 24,
    textAlignVertical: 'top',
  },
  micBtn: { borderRadius: 30, borderWidth: 1, borderColor: COLORS.BORDER, padding: 12, alignItems: 'center', marginBottom: 12 },
  micBtnActive: { borderColor: '#e53935', backgroundColor: '#e5393520' },
  micIcon: { color: COLORS.TEXT_SECONDARY, fontSize: 15 },
  primaryBtn: { backgroundColor: COLORS.GOLD, borderRadius: 30, padding: 16, alignItems: 'center' },
  primaryBtnText: { color: COLORS.BG_DEEP, fontWeight: '700', fontSize: 16 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  cardSlot: { alignItems: 'center', width: 90 },
  revealedBadge: { marginTop: 6, borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, alignItems: 'center', width: '100%' },
  revealedName: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  revealedState: { fontSize: 10, color: COLORS.TEXT_MUTED, marginTop: 1 },
  cardPosition: { marginTop: 4, fontSize: 11, color: COLORS.TEXT_SECONDARY, textAlign: 'center' },
  loadingSection: { alignItems: 'center', gap: 16, paddingTop: 60 },
  loadingOrb: { fontSize: 56, color: COLORS.GOLD },
  loadingText: { color: COLORS.TEXT_PRIMARY, fontSize: 17, fontWeight: '600' },
  loadingSubtext: { color: COLORS.TEXT_MUTED, fontSize: 13 },
  energyRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  energyPill: { backgroundColor: COLORS.BG_CARD, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: COLORS.BORDER_GOLD },
  energyText: { color: COLORS.GOLD, fontSize: 13, fontWeight: '600' },
  cardReadingCard: {
    backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.BORDER, borderLeftWidth: 3,
  },
  cardReadingTop: { flexDirection: 'row', marginBottom: 10 },
  cardReadingImg: { marginRight: 12, borderRadius: 8 },
  cardReadingMeta: { flex: 1, justifyContent: 'flex-start', paddingTop: 2 },
  crPosition: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  crCardName: { fontSize: 15, fontWeight: '700', color: COLORS.TEXT_PRIMARY, marginBottom: 2 },
  crState: { fontSize: 12, color: COLORS.TEXT_MUTED },
  crReading: { fontSize: 14, color: COLORS.TEXT_PRIMARY, lineHeight: 23 },
  overallCard: { backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 18, marginTop: 8, borderWidth: 1, borderColor: COLORS.BORDER_GOLD, gap: 10 },
  overallLabel: { fontSize: 12, color: COLORS.GOLD, fontWeight: '700', letterSpacing: 1 },
  overallText: { fontSize: 15, color: COLORS.TEXT_PRIMARY, lineHeight: 24 },
  adviceText: { fontSize: 14, color: COLORS.TEXT_SECONDARY, lineHeight: 22 },
  resetBtn: { marginTop: 24, borderRadius: 30, borderWidth: 1, borderColor: COLORS.BORDER, padding: 14, alignItems: 'center' },
  resetBtnText: { color: COLORS.TEXT_SECONDARY, fontSize: 15 },
});
