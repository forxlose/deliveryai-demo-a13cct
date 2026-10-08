import type { SkillDef } from '../types'

export const SKILLS: SkillDef[] = [
  { id: 'heavy_strike', nameKey: 'rpg.skill.heavy_strike.name', descKey: 'rpg.skill.heavy_strike.desc', mpCost: 15, damageMultiplier: 1.5, hitCount: 1, damagePerHit: 1 },
  { id: 'fireball', nameKey: 'rpg.skill.fireball.name', descKey: 'rpg.skill.fireball.desc', mpCost: 20, damageMultiplier: 2.0, hitCount: 1, damagePerHit: 1 },
  { id: 'double_shot', nameKey: 'rpg.skill.double_shot.name', descKey: 'rpg.skill.double_shot.desc', mpCost: 12, damageMultiplier: 0.8, hitCount: 2, damagePerHit: 0.8 },
  { id: 'bite', nameKey: 'rpg.skill.bite.name', descKey: 'rpg.skill.bite.desc', mpCost: 0, damageMultiplier: 1.2, hitCount: 1, damagePerHit: 1 },
  { id: 'claw_swipe', nameKey: 'rpg.skill.claw_swipe.name', descKey: 'rpg.skill.claw_swipe.desc', mpCost: 0, damageMultiplier: 1.4, hitCount: 1, damagePerHit: 1 },
  { id: 'shadow_strike', nameKey: 'rpg.skill.shadow_strike.name', descKey: 'rpg.skill.shadow_strike.desc', mpCost: 0, damageMultiplier: 1.6, hitCount: 1, damagePerHit: 1 },
  { id: 'fire_breath', nameKey: 'rpg.skill.fire_breath.name', descKey: 'rpg.skill.fire_breath.desc', mpCost: 0, damageMultiplier: 1.5, hitCount: 1, damagePerHit: 1 },
]

export function getSkillById(id: string): SkillDef | undefined {
  return SKILLS.find((s) => s.id === id)
}
