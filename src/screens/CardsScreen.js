import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { ALL_CARDS } from '../data/cards';
import { getTexts } from '../services/i18n';
import { COLORS, SUIT_COLORS, SUIT_LABELS } from '../constants/theme';
import TarotCardImage from '../components/TarotCardImage';

const FILTER_SUITS = ['all', 'major', 'wands', 'cups', 'swords', 'pentacles'];

const ELEMENT_ICON = {
  '火': { emoji: '🔥', color: '#EF4444' },
  '水': { emoji: '💧', color: '#3B82F6' },
  '风': { emoji: '🌬️', color: '#A78BFA' },
  '土': { emoji: '🌿', color: '#10B981' },
  '风/火': { emoji: '🌪️', color: '#F59E0B' },
};

const ASTRO_ICON = {
  '牡羊座': '♈', '金牛座': '♉', '双子座': '♊', '巨蟹座': '♋',
  '狮子座': '♌', '处女座': '♍', '天秤座': '♎', '天蝎座': '♏',
  '射手座': '♐', '摩羯座': '♑', '水瓶座': '♒', '双鱼座': '♓',
  '太阳': '☀️', '月亮': '🌙', '水星': '☿', '金星': '♀',
  '火星': '♂', '木星': '♃', '土星': '♄', '天王星': '⛢',
  '海王星': '♆', '冥王星': '♇',
};

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
              <TarotCardImage card={card} width={56} height={88} style={styles.cardThumb} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{name}</Text>
                <Text style={styles.cardKeywords}>{card.keywords.upright.slice(0, 3).join(' · ')}</Text>
                {(card.element || card.astrology) ? (
                  <View style={styles.cardMetaRow}>
                    {card.element && ELEMENT_ICON[card.element] ? (
                      <View style={[styles.metaBadge, { borderColor: ELEMENT_ICON[card.element].color + '60' }]}>
                        <Text style={styles.metaIcon}>{ELEMENT_ICON[card.element].emoji}</Text>
                        <Text style={[styles.metaText, { color: ELEMENT_ICON[card.element].color }]}>{card.element}</Text>
                      </View>
                    ) : null}
                    {card.astrology ? (
                      <View style={[styles.metaBadge, { borderColor: COLORS.GOLD + '40' }]}>
                        <Text style={styles.metaIcon}>{ASTRO_ICON[card.astrology] || '✦'}</Text>
                        <Text style={[styles.metaText, { color: COLORS.TEXT_SECONDARY }]}>{card.astrology}</Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                <Text style={styles.cardSummary} numberOfLines={2}>{card.meaning.upright[lang] || card.meaning.upright.zh}</Text>
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
              {(selected.element || selected.astrology) ? (
                <View style={styles.detailMetaRow}>
                  {selected.element && ELEMENT_ICON[selected.element] ? (
                    <View style={[styles.detailMetaBadge, { backgroundColor: ELEMENT_ICON[selected.element].color + '18', borderColor: ELEMENT_ICON[selected.element].color + '50' }]}>
                      <Text style={styles.detailMetaEmoji}>{ELEMENT_ICON[selected.element].emoji}</Text>
                      <View>
                        <Text style={styles.detailMetaLabel}>{t.element}</Text>
                        <Text style={[styles.detailMetaValue, { color: ELEMENT_ICON[selected.element].color }]}>{selected.element}</Text>
                      </View>
                    </View>
                  ) : null}
                  {selected.astrology ? (
                    <View style={[styles.detailMetaBadge, { backgroundColor: COLORS.GOLD + '12', borderColor: COLORS.GOLD + '40' }]}>
                      <Text style={styles.detailMetaEmoji}>{ASTRO_ICON[selected.astrology] || '✦'}</Text>
                      <View>
                        <Text style={styles.detailMetaLabel}>{t.astrology}</Text>
                        <Text style={[styles.detailMetaValue, { color: COLORS.GOLD }]}>{selected.astrology}</Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              ) : null}

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
  pageTitle: { fontSize: 28, fontWeight: '800', color: COLORS.GOLD, marginBottom: 12 },
  searchInput: { backgroundColor: COLORS.BG_CARD, borderRadius: 10, padding: 12, color: COLORS.TEXT_PRIMARY, fontSize: 16, borderWidth: 1, borderColor: COLORS.BORDER, marginBottom: 12 },
  filterRow: { marginBottom: 8 },
  filterContent: { gap: 8, paddingRight: 20 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: COLORS.BG_CARD, borderWidth: 1, borderColor: COLORS.BORDER },
  filterChipActive: { backgroundColor: COLORS.PRIMARY, borderColor: COLORS.PRIMARY },
  filterChipText: { color: COLORS.TEXT_MUTED, fontSize: 15 },
  filterChipTextActive: { color: '#fff', fontWeight: '600' },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 2 },
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.BG_CARD, borderRadius: 12, padding: 12, marginBottom: 8 },
  cardThumb: { marginRight: 14, borderRadius: 8 },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 17, fontWeight: '600', color: COLORS.TEXT_PRIMARY },
  cardKeywords: { fontSize: 14, color: COLORS.GOLD, marginTop: 3 },
  cardMetaRow: { flexDirection: 'row', gap: 6, marginTop: 4, flexWrap: 'wrap' },
  metaBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 8, borderWidth: 1, paddingHorizontal: 6, paddingVertical: 2 },
  metaIcon: { fontSize: 12 },
  metaText: { fontSize: 11, fontWeight: '600' },
  cardSummary: { fontSize: 13, color: COLORS.TEXT_MUTED, marginTop: 4, lineHeight: 19 },
  cardArrow: { color: COLORS.TEXT_MUTED, fontSize: 22 },
  modal: { flex: 1, backgroundColor: COLORS.BG_PAGE },
  modalContent: { padding: 24, paddingBottom: 40, alignItems: 'center' },
  closeBtn: { alignSelf: 'flex-end', padding: 8 },
  closeBtnText: { color: COLORS.TEXT_MUTED, fontSize: 18 },
  modalCardImg: { marginVertical: 20, borderRadius: 12 },
  detailName: { fontSize: 26, fontWeight: '800', color: COLORS.GOLD, marginBottom: 8 },
  detailMetaRow: { flexDirection: 'row', gap: 10, marginBottom: 16, flexWrap: 'wrap' },
  detailMetaBadge: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  detailMetaEmoji: { fontSize: 24 },
  detailMetaLabel: { fontSize: 12, color: COLORS.TEXT_MUTED, marginBottom: 1 },
  detailMetaValue: { fontSize: 16, fontWeight: '700' },
  meaningBlock: { width: '100%', backgroundColor: COLORS.BG_CARD, borderRadius: 14, padding: 16, marginTop: 16, borderWidth: 1, borderColor: COLORS.BORDER_GOLD },
  reversedBlock: { borderColor: COLORS.BORDER },
  meaningLabel: { fontSize: 14, fontWeight: '700', color: COLORS.GOLD, letterSpacing: 1, marginBottom: 10 },
  reversedLabel: { color: COLORS.TEXT_MUTED },
  keywordRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  keyword: { backgroundColor: 'rgba(240,192,64,0.15)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  keywordReversed: { backgroundColor: 'rgba(167,139,250,0.1)' },
  keywordText: { color: COLORS.GOLD, fontSize: 14 },
  keywordReversedText: { color: COLORS.TEXT_MUTED },
  meaningText: { fontSize: 16, color: COLORS.TEXT_PRIMARY, lineHeight: 26 },
});
