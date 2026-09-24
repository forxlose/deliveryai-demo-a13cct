import type { ClassDefinition } from '../types'

export const CLASSES: ClassDefinition[] = [
  {
    id: 'warrior',
    nameKey: 'rpg.class.warrior.name',
    descKey: 'rpg.class.warrior.desc',
    icon: 'Sword',
    baseAttrs: { hp: 150, maxHp: 150, mp: 30, maxMp: 30, atk: 18, def: 15, agi: 8, crit: 5 },
    growth: { hp: 18, maxHp: 18, mp: 4, maxMp: 4, atk: 3, def: 2, agi: 1, crit: 0.3 },
    skillId: 'heavy_strike',
  },
  {
    id: 'mage',
    nameKey: 'rpg.class.mage.name',
    descKey: 'rpg.class.mage.desc',
    icon: 'Wand',
    baseAttrs: { hp: 80, maxHp: 80, mp: 80, maxMp: 80, atk: 12, def: 8, agi: 10, crit: 8 },
    growth: { hp: 10, maxHp: 10, mp: 12, maxMp: 12, atk: 4, def: 1, agi: 1.5, crit: 0.5 },
    skillId: 'fireball',
  },
  {
    id: 'ranger',
    nameKey: 'rpg.class.ranger.name',
    descKey: 'rpg.class.ranger.desc',
    icon: 'Target',
    baseAttrs: { hp: 100, maxHp: 100, mp: 50, maxMp: 50, atk: 15, def: 10, agi: 18, crit: 15 },
    growth: { hp: 13, maxHp: 13, mp: 7, maxMp: 7, atk: 3, def: 1.5, agi: 3, crit: 0.8 },
    skillId: 'double_shot',
  },
]

export function getClassById(id: string): ClassDefinition | undefined {
  return CLASSES.find((c) => c.id === id)
}
