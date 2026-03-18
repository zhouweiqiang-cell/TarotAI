import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { ALL_CARDS } from '../data/cards';
import { getTexts } from '../services/i18n';
import { COLORS, SUIT_COLORS, SUIT_LABELS } from '../constants/theme';
import TarotCardImage from '../components/TarotCardImage';

const FILTER_SUITS = ['all', 'major', 'wands', 'cups', 'swords', 'pentacles'];

export default function CardsScreen({ lang = 'zh' }) {
  const t = getTexts(lang);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return ALL_CARDS.filter(card => {
      const matchSuit = filter === 'all' || card.arcana === filter;
      const name = card.name[lang] || card.name.zh;
      const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
      return matchSuit && matchSearch;
    });
  }, [search, filter, lang]);

  const suitLabels = SUIT_LABELS[lang] || SUIT_LABELS.zh;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>{t.cardsTitle}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t.searchPlaceholder}
          placeholderTextColor={COLORS.TEXT_MUTED}
          value={search}
          onChangeText={setSearch}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
          {FILTER_SUITS.map(suit => (
            <TouchableOpacity key={suit} style={[styles.filterChip, filter === suit && styles.filterChipActive]} onPress={() => setFilter(suit)}>
              <Text style={[styles.filterChipText, filter === suit && styles.filterChipTextActive]}>
                {suit === 'all' ? t.allCards : suitLabels[suit]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filtered.map(card => {
          const suitColor = SUIT_COLORS[card.arcana] || COLORS.GOLD;
          const name = card.name[lang] || card.name.zh;
          return (
            <TouchableOpacity key={card.id} style={styles.cardRow} onPress={() => setSelected(card)} activeOpacity={0.7}>
              <TarotCardImage card={card} width={36} height={56} style={styles.cardThumb} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{name}</Text>
                <Text style={styles.cardKeywords}>{card.keywords.upright.slice(0, 3).join(' · ')}</Text>
              </View>
              <Text style={styles.cardArrow}>›</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Card Detail Modal */}
      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSelected(null)}>
        {selected && (
          <SafeAreaView style={styles.modal}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
              <TarotCardImage card={selected} width={120} height={190} style={styles.modalCardImg} />
              <Text style={styles.detailName}>{selected.name[lang] || selected.name.zh}</Text>
              {selected.element ? <Text style={styles.detailMeta}>{t.element}: {selected.element}</Text> : null}
              {selected.astrology ? <Text style={styles.detailMeta}>{t.astrology}: {selected.astrology}</Text> : null}

              <View style={styles.meaningBlock}>
                <Text style={styles.meaningLabel}>▲ {t.upright}</Text>
                <View style={styles.keywordRow}>
                  {selected.keywords.upright.map((k, i) => (
                    <View key={i} style={styles.keyword}><Text style={styles.keywordText}>{k}</Text></View>
                  ))}
                </View>
                <Text style={styles.meaningText}>{selected.meaning.upright[lang] || selected.meaning.upright.zh}</Text>
              </View>

              <View style={[styles.meaningBlock, styles.reversedBlock]}>
                <Text style={[styles.meaningLabel, styles.reversedLabel]}>▼ {t.reversed}</Text>
                <View style={styles.keywordRow}>
                  {selected.keywords.reversed.map((k, i) => (
                    <View key={i} style={[styles.keyword, styles.keywordReversed]}><Text style={[styles.keywordText, styles.keywordReversedText]}>{k}</Text></View>
                  ))}
                </View>
                <Text style={styles.meaningText}>{selected.meaning.reversed[lang] || selected.meaning.reversed.zh}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.BG_PAGE },
  header: { padding: 20, paddingBottom: 0 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: COLORS.GOLD, marginBottom: 12 },
  searchInput: { backgroundColor: COLORS.BG_CARD, borderRadius: 10, padding: 12, color: COLORS.TEXT_PRIMARY, fontSize: 14, borderWidth: 1, borderColor: COLORS.BORDER, marginBottom: 12 },
  filterRow: { marginBottom: 8 },
  filterContent: { gap: 8, paddingRight: 20 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: COLORS.BG_CARD, borderWidth: 1, borderColor: COLORS.BORDER },
  filterChipActive: { backgroundColor: COLORS.PRIMARY, borderColor: COLORS.PRIMARY },
  filterChipText: { color: COLORS.TEXT_MUTED, fontSize: 13 },
  filterChipTextActive: { color: '#fff', fontWeight: '600' },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 2 },
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.BG_CARD, borderRadius: 10, padding: 10, marginBottom: 6 },
  cardThumb: { marginRight: 12, borderRadius: 6 },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '600', color: COLORS.TEXT_PRIMARY },
  cardKeywords: { fontSize: 12, color: COLORS.TEXT_MUTED, marginTop: 2 },
  cardArrow: { color: COLORS.TEXT_MUTED, fontSize: 20 },
  modal: { flex: 1, backgroundColor: COLORS.BG_PAGE },
  modalContent: { padding: 24, paddingBottom: 40, alignItems: 'center' },
  closeBtn: { alignSelf: 'flex-end', padding: 8 },
  closeBtnText: { color: COLORS.TEXT_MUTED, fontSize: 18 },
  modalCardImg: { marginVertical: 20, borderRadius: 12 },
  detailName: { fontSize: 24, fontWeight: '800', color: COLORS.GOLD, marginBottom: 8 },
  detailMeta: { fontSize: 13, color: COLORS.TEXT_SECONDARY, marginBottom: 4 },
  meaningBlock: { width: '100%', backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 16, marginTop: 16, borderWidth: 1, borderColor: COLORS.BORDER_GOLD },
  reversedBlock: { borderColor: COLORS.BORDER },
  meaningLabel: { fontSize: 12, fontWeight: '700', color: COLORS.GOLD, letterSpacing: 1, marginBottom: 10 },
  reversedLabel: { color: COLORS.TEXT_MUTED },
  keywordRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  keyword: { backgroundColor: 'rgba(240,192,64,0.15)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  keywordReversed: { backgroundColor: 'rgba(167,139,250,0.1)' },
  keywordText: { color: COLORS.GOLD, fontSize: 12 },
  keywordReversedText: { color: COLORS.TEXT_MUTED },
  meaningText: { fontSize: 14, color: COLORS.TEXT_PRIMARY, lineHeight: 22 },
});
