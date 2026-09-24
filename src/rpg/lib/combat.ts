import type { Attributes, EquipmentSlot, EquipmentInstance, DropEntry } from '../types'
import { randomFloat, rollChance } from './random'
import { getEquipmentById } from '../data/equipment'
import { getSkillById } from '../data/skills'

/** 伤害计算公式: max(1, atk * random(0.9-1.1) - def * 0.5)，暴击时 *1.5 */
export function calculateDamage(atk: number, def: number, isCrit: boolean): number {
  const base = atk * randomFloat(0.9, 1.1) - def * 0.5
  const damage = Math.max(1, Math.round(base))
  return isCrit ? Math.round(damage * 1.5) : damage
}

/** 暴击判定 */
export function rollCrit(critRate: number): boolean {
  return rollChance(critRate / 100)
}

/** 聚合装备加成属性 */
export function getEquipmentBonuses(
  equipment: Partial<Record<EquipmentSlot, EquipmentInstance>>,
): Partial<Attributes> {
  const bonuses: Partial<Attributes> = {}

  for (const inst of Object.values(equipment)) {
    if (!inst) continue
    const def = getEquipmentById(inst.defId)
    if (!def) continue
    for (const key of Object.keys(def.attrs) as (keyof Attributes)[]) {
      bonuses[key] = (bonuses[key] ?? 0) + (def.attrs[key] ?? 0)
    }
  }

  return bonuses
}

/** 执行一次攻击计算 */
export function applyAttack(
  attacker: { atk: number; crit: number },
  defender: { def: number },
  multiplier?: number,
): { damage: number; isCrit: boolean } {
  const isCrit = rollCrit(attacker.crit)
  const rawDamage = calculateDamage(attacker.atk, defender.def, isCrit)
  const damage = multiplier ? Math.round(rawDamage * multiplier) : rawDamage
  return { damage, isCrit }
}

/** 技能伤害计算（多段） */
export function applySkill(
  skillId: string,
  attacker: { atk: number; crit: number },
  defender: { def: number },
): { totalDamage: number; hits: { damage: number; isCrit: boolean }[] } {
  const skill = getSkillById(skillId)
  if (!skill) return { totalDamage: 0, hits: [] }

  const hits: { damage: number; isCrit: boolean }[] = []
  let totalDamage = 0

  for (let i = 0; i < skill.hitCount; i++) {
    const result = applyAttack(attacker, defender, skill.damagePerHit)
    hits.push(result)
    totalDamage += result.damage
  }

  return { totalDamage, hits }
}

/** 生成掉落物品 */
export function generateDrop(
  dropTable: DropEntry[],
): { defId: string; type: 'equipment' | 'consumable' }[] {
  const drops: { defId: string; type: 'equipment' | 'consumable' }[] = []

  for (const entry of dropTable) {
    if (rollChance(entry.chance)) {
      drops.push({ defId: entry.defId, type: entry.type })
    }
  }

  return drops
}
