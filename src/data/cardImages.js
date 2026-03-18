// 静态 require 映射 — 78 张塔罗牌本地图片
// React Native 要求 require() 路径必须是静态字面量

const IMAGES = {
  // ── Major Arcana ──
  the_fool:           require('../../assets/cards/major_00.jpg'),
  the_magician:       require('../../assets/cards/major_01.jpg'),
  the_high_priestess: require('../../assets/cards/major_02.jpg'),
  the_empress:        require('../../assets/cards/major_03.jpg'),
  the_emperor:        require('../../assets/cards/major_04.jpg'),
  the_hierophant:     require('../../assets/cards/major_05.jpg'),
  the_lovers:         require('../../assets/cards/major_06.jpg'),
  the_chariot:        require('../../assets/cards/major_07.jpg'),
  strength:           require('../../assets/cards/major_08.jpg'),
  the_hermit:         require('../../assets/cards/major_09.jpg'),
  wheel_of_fortune:   require('../../assets/cards/major_10.jpg'),
  justice:            require('../../assets/cards/major_11.jpg'),
  the_hanged_man:     require('../../assets/cards/major_12.jpg'),
  death:              require('../../assets/cards/major_13.jpg'),
  temperance:         require('../../assets/cards/major_14.jpg'),
  the_devil:          require('../../assets/cards/major_15.jpg'),
  the_tower:          require('../../assets/cards/major_16.jpg'),
  the_star:           require('../../assets/cards/major_17.jpg'),
  the_moon:           require('../../assets/cards/major_18.jpg'),
  the_sun:            require('../../assets/cards/major_19.jpg'),
  judgement:          require('../../assets/cards/major_20.jpg'),
  the_world:          require('../../assets/cards/major_21.jpg'),

  // ── Wands ──
  wands_1:  require('../../assets/cards/wands_01.jpg'),
  wands_2:  require('../../assets/cards/wands_02.jpg'),
  wands_3:  require('../../assets/cards/wands_03.jpg'),
  wands_4:  require('../../assets/cards/wands_04.jpg'),
  wands_5:  require('../../assets/cards/wands_05.jpg'),
  wands_6:  require('../../assets/cards/wands_06.jpg'),
  wands_7:  require('../../assets/cards/wands_07.jpg'),
  wands_8:  require('../../assets/cards/wands_08.jpg'),
  wands_9:  require('../../assets/cards/wands_09.jpg'),
  wands_10: require('../../assets/cards/wands_10.jpg'),
  wands_11: require('../../assets/cards/wands_11.jpg'),
  wands_12: require('../../assets/cards/wands_12.jpg'),
  wands_13: require('../../assets/cards/wands_13.jpg'),
  wands_14: require('../../assets/cards/wands_14.jpg'),

  // ── Cups ──
  cups_1:   require('../../assets/cards/cups_01.jpg'),
  cups_2:   require('../../assets/cards/cups_02.jpg'),
  cups_3:   require('../../assets/cards/cups_03.jpg'),
  cups_4:   require('../../assets/cards/cups_04.jpg'),
  cups_5:   require('../../assets/cards/cups_05.jpg'),
  cups_6:   require('../../assets/cards/cups_06.jpg'),
  cups_7:   require('../../assets/cards/cups_07.jpg'),
  cups_8:   require('../../assets/cards/cups_08.jpg'),
  cups_9:   require('../../assets/cards/cups_09.jpg'),
  cups_10:  require('../../assets/cards/cups_10.jpg'),
  cups_11:  require('../../assets/cards/cups_11.jpg'),
  cups_12:  require('../../assets/cards/cups_12.jpg'),
  cups_13:  require('../../assets/cards/cups_13.jpg'),
  cups_14:  require('../../assets/cards/cups_14.jpg'),

  // ── Swords ──
  swords_1:  require('../../assets/cards/swords_01.jpg'),
  swords_2:  require('../../assets/cards/swords_02.jpg'),
  swords_3:  require('../../assets/cards/swords_03.jpg'),
  swords_4:  require('../../assets/cards/swords_04.jpg'),
  swords_5:  require('../../assets/cards/swords_05.jpg'),
  swords_6:  require('../../assets/cards/swords_06.jpg'),
  swords_7:  require('../../assets/cards/swords_07.jpg'),
  swords_8:  require('../../assets/cards/swords_08.jpg'),
  swords_9:  require('../../assets/cards/swords_09.jpg'),
  swords_10: require('../../assets/cards/swords_10.jpg'),
  swords_11: require('../../assets/cards/swords_11.jpg'),
  swords_12: require('../../assets/cards/swords_12.jpg'),
  swords_13: require('../../assets/cards/swords_13.jpg'),
  swords_14: require('../../assets/cards/swords_14.jpg'),

  // ── Pentacles ──
  pents_1:  require('../../assets/cards/pents_01.jpg'),
  pents_2:  require('../../assets/cards/pents_02.jpg'),
  pents_3:  require('../../assets/cards/pents_03.jpg'),
  pents_4:  require('../../assets/cards/pents_04.jpg'),
  pents_5:  require('../../assets/cards/pents_05.jpg'),
  pents_6:  require('../../assets/cards/pents_06.jpg'),
  pents_7:  require('../../assets/cards/pents_07.jpg'),
  pents_8:  require('../../assets/cards/pents_08.jpg'),
  pents_9:  require('../../assets/cards/pents_09.jpg'),
  pents_10: require('../../assets/cards/pents_10.jpg'),
  pents_11: require('../../assets/cards/pents_11.jpg'),
  pents_12: require('../../assets/cards/pents_12.jpg'),
  pents_13: require('../../assets/cards/pents_13.jpg'),
  pents_14: require('../../assets/cards/pents_14.jpg'),
};

export function getLocalCardImage(card) {
  if (!card) return null;
  if (card.arcana === 'major') {
    return IMAGES[card.id] || null;
  }
  const key = `${card.arcana}_${card.number}`;
  return IMAGES[key] || null;
}
