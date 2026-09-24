import type { Attributes, CharacterClass } from '../types'
import { getClassById } from '../data/classes'
import { getEquipmentBonuses } from './combat'

/** 计算升到下一级所需经验值: level * 100 + 50 */
export function expToNextLevel(level: number): number {
  return level * 100 + 50
}

/** 检查是否可以升级 */
export function checkLevelUp(exp: number, level: number): boolean {
  return exp >= expToNextLevel(level)
}

/** 执行升级：将成长属性加到 baseAttrs，重新计算最终属性 */
export function levelUp(
  oldLevel: number,
  attrs: Attributes,
  baseAttrs: Attributes,
  charClass: CharacterClass,
): { level: number; baseAttrs: Attributes; attrs: Attributes } {
  const classDef = getClassById(charClass)
  const growth = classDef?.growth ?? {}

  const newLevel = oldLevel + 1
  const newBaseAttrs = { ...baseAttrs }

  // 应用成长属性
  for (const key of Object.keys(growth) as (keyof Attributes)[]) {
    if (growth[key] !== undefined) {
      newBaseAttrs[key] = (newBaseAttrs[key] ?? 0) + (growth[key] ?? 0)
    }
  }

  // HP/MP 升级时回满
  const equipmentBonuses = getEquipmentBonuses({})
  const newAttrs = recalcAttrs(newBaseAttrs, equipmentBonuses)

  return {
    level: newLevel,
    baseAttrs: newBaseAttrs,
    attrs: {
      ...newAttrs,
      hp: newAttrs.maxHp,
      mp: newAttrs.maxMp,
    },
  }
}

/** 根据基础属性 + 装备加成计算最终属性 */
export function recalcAttrs(
  base: Attributes,
  bonuses: Partial<Attributes>,
): Attributes {
  return {
    hp: Math.max(1, (base.hp ?? 0) + (bonuses.hp ?? 0)),
    maxHp: Math.max(1, (base.maxHp ?? 0) + (bonuses.maxHp ?? 0)),
    mp: Math.max(0, (base.mp ?? 0) + (bonuses.mp ?? 0)),
    maxMp: Math.max(0, (base.maxMp ?? 0) + (bonuses.maxMp ?? 0)),
    atk: Math.max(1, (base.atk ?? 0) + (bonuses.atk ?? 0)),
    def: Math.max(0, (base.def ?? 0) + (bonuses.def ?? 0)),
    agi: Math.max(1, (base.agi ?? 0) + (bonuses.agi ?? 0)),
    crit: Math.max(0, Math.min(100, (base.crit ?? 0) + (bonuses.crit ?? 0))),
  }
}
