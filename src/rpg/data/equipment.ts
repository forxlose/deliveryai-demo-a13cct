import type { EquipmentDef, ConsumableDef } from '../types'

export const EQUIPMENT: EquipmentDef[] = [
  { id: 'equip_iron_sword', nameKey: 'rpg.equip.iron_sword.name', descKey: 'rpg.equip.iron_sword.desc', slot: 'weapon', rarity: 'common', attrs: { atk: 5 }, price: 30 },
  { id: 'equip_steel_sword', nameKey: 'rpg.equip.steel_sword.name', descKey: 'rpg.equip.steel_sword.desc', slot: 'weapon', rarity: 'rare', attrs: { atk: 10, crit: 3 }, price: 80 },
  { id: 'equip_shadow_blade', nameKey: 'rpg.equip.shadow_blade.name', descKey: 'rpg.equip.shadow_blade.desc', slot: 'weapon', rarity: 'epic', attrs: { atk: 16, agi: 5, crit: 8 }, price: 200 },
  { id: 'equip_leather_armor', nameKey: 'rpg.equip.leather_armor.name', descKey: 'rpg.equip.leather_armor.desc', slot: 'armor', rarity: 'common', attrs: { def: 4, hp: 10 }, price: 25 },
  { id: 'equip_wooden_shield', nameKey: 'rpg.equip.wooden_shield.name', descKey: 'rpg.equip.wooden_shield.desc', slot: 'armor', rarity: 'common', attrs: { def: 6 }, price: 20 },
  { id: 'equip_mage_robe', nameKey: 'rpg.equip.mage_robe.name', descKey: 'rpg.equip.mage_robe.desc', slot: 'armor', rarity: 'rare', attrs: { def: 6, mp: 20, crit: 3 }, price: 70 },
  { id: 'equip_dragon_scale', nameKey: 'rpg.equip.dragon_scale.name', descKey: 'rpg.equip.dragon_scale.desc', slot: 'armor', rarity: 'epic', attrs: { def: 14, hp: 30, atk: 5 }, price: 180 },
  { id: 'equip_spider_ring', nameKey: 'rpg.equip.spider_ring.name', descKey: 'rpg.equip.spider_ring.desc', slot: 'accessory', rarity: 'common', attrs: { agi: 3 }, price: 15 },
  { id: 'equip_crystal_ring', nameKey: 'rpg.equip.crystal_ring.name', descKey: 'rpg.equip.crystal_ring.desc', slot: 'accessory', rarity: 'rare', attrs: { mp: 15, crit: 5 }, price: 60 },
]

export const CONSUMABLES: ConsumableDef[] = [
  { id: 'consume_hp_potion', nameKey: 'rpg.consume.hp_potion.name', descKey: 'rpg.consume.hp_potion.desc', effect: { hp: 40 }, price: 15 },
  { id: 'consume_mp_potion', nameKey: 'rpg.consume.mp_potion.name', descKey: 'rpg.consume.mp_potion.desc', effect: { mp: 30 }, price: 12 },
]

export function getEquipmentById(id: string): EquipmentDef | undefined {
  return EQUIPMENT.find((e) => e.id === id)
}

export function getConsumableById(id: string): ConsumableDef | undefined {
  return CONSUMABLES.find((c) => c.id === id)
}
