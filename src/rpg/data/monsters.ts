import type { MonsterDef } from '../types'

export const MONSTERS: MonsterDef[] = [
  // 普通怪物
  { id: 'slime', nameKey: 'rpg.monster.slime', type: 'normal', attrs: { hp: 40, maxHp: 40, mp: 0, maxMp: 0, atk: 10, def: 4, agi: 3, crit: 2 }, skillId: null, expReward: 20, goldReward: 8, dropTable: [{ defId: 'consume_hp_potion', type: 'consumable', chance: 0.2 }] },
  { id: 'goblin', nameKey: 'rpg.monster.goblin', type: 'normal', attrs: { hp: 55, maxHp: 55, mp: 20, maxMp: 20, atk: 14, def: 6, agi: 8, crit: 5 }, skillId: 'bite', expReward: 30, goldReward: 12, dropTable: [{ defId: 'consume_hp_potion', type: 'consumable', chance: 0.15 }, { defId: 'equip_iron_sword', type: 'equipment', chance: 0.05 }] },
  { id: 'wolf', nameKey: 'rpg.monster.wolf', type: 'normal', attrs: { hp: 50, maxHp: 50, mp: 15, maxMp: 15, atk: 16, def: 5, agi: 12, crit: 8 }, skillId: 'claw_swipe', expReward: 35, goldReward: 10, dropTable: [{ defId: 'consume_mp_potion', type: 'consumable', chance: 0.15 }, { defId: 'equip_leather_armor', type: 'equipment', chance: 0.05 }] },
  { id: 'skeleton', nameKey: 'rpg.monster.skeleton', type: 'normal', attrs: { hp: 65, maxHp: 65, mp: 10, maxMp: 10, atk: 17, def: 10, agi: 5, crit: 3 }, skillId: null, expReward: 40, goldReward: 15, dropTable: [{ defId: 'consume_hp_potion', type: 'consumable', chance: 0.2 }, { defId: 'equip_wooden_shield', type: 'equipment', chance: 0.08 }] },
  { id: 'giant_spider', nameKey: 'rpg.monster.giant_spider', type: 'normal', attrs: { hp: 60, maxHp: 60, mp: 25, maxMp: 25, atk: 18, def: 7, agi: 14, crit: 10 }, skillId: 'bite', expReward: 45, goldReward: 18, dropTable: [{ defId: 'consume_mp_potion', type: 'consumable', chance: 0.2 }, { defId: 'equip_spider_ring', type: 'equipment', chance: 0.06 }] },
  { id: 'orc', nameKey: 'rpg.monster.orc', type: 'normal', attrs: { hp: 80, maxHp: 80, mp: 15, maxMp: 15, atk: 22, def: 12, agi: 6, crit: 4 }, skillId: null, expReward: 55, goldReward: 22, dropTable: [{ defId: 'consume_hp_potion', type: 'consumable', chance: 0.25 }, { defId: 'equip_steel_sword', type: 'equipment', chance: 0.06 }] },
  { id: 'dark_mage', nameKey: 'rpg.monster.dark_mage', type: 'normal', attrs: { hp: 55, maxHp: 55, mp: 60, maxMp: 60, atk: 24, def: 8, agi: 10, crit: 7 }, skillId: 'fire_breath', expReward: 50, goldReward: 20, dropTable: [{ defId: 'consume_mp_potion', type: 'consumable', chance: 0.25 }, { defId: 'equip_mage_robe', type: 'equipment', chance: 0.05 }] },
  // 精英怪物
  { id: 'ogre_chief', nameKey: 'rpg.monster.ogre_chief', type: 'elite', attrs: { hp: 180, maxHp: 180, mp: 30, maxMp: 30, atk: 30, def: 18, agi: 6, crit: 5 }, skillId: 'claw_swipe', expReward: 120, goldReward: 50, dropTable: [{ defId: 'equip_crystal_ring', type: 'equipment', chance: 0.15 }, { defId: 'consume_hp_potion', type: 'consumable', chance: 0.4 }] },
  { id: 'dragon_whelp', nameKey: 'rpg.monster.dragon_whelp', type: 'elite', attrs: { hp: 200, maxHp: 200, mp: 50, maxMp: 50, atk: 32, def: 16, agi: 12, crit: 8 }, skillId: 'fire_breath', expReward: 150, goldReward: 60, dropTable: [{ defId: 'equip_dragon_scale', type: 'equipment', chance: 0.12 }, { defId: 'consume_hp_potion', type: 'consumable', chance: 0.5 }] },
  { id: 'shadow_warrior', nameKey: 'rpg.monster.shadow_warrior', type: 'elite', attrs: { hp: 160, maxHp: 160, mp: 40, maxMp: 40, atk: 35, def: 20, agi: 14, crit: 15 }, skillId: 'shadow_strike', expReward: 135, goldReward: 55, dropTable: [{ defId: 'equip_shadow_blade', type: 'equipment', chance: 0.1 }, { defId: 'consume_mp_potion', type: 'consumable', chance: 0.3 }] },
]

export function getMonsterById(id: string): MonsterDef | undefined {
  return MONSTERS.find((m) => m.id === id)
}
