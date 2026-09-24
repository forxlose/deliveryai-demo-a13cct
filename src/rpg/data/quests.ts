import type { QuestTemplate, ActiveQuest, QuestTemplateType, RpgState } from '../types'
import { WILDERNESS } from './wilderness'
import { MONSTERS } from './monsters'

const normalMonsters = MONSTERS.filter((m) => m.type === 'normal').map((m) => m.id)
const eliteMonsters = MONSTERS.filter((m) => m.type === 'elite').map((m) => m.id)

export const QUEST_TEMPLATES: QuestTemplate[] = [
  ...normalMonsters.map((mid, i) => ({
    id: `slay_${mid}`,
    type: 'slay' as QuestTemplateType,
    nameKey: `rpg.quest.slay_${mid}.name`,
    descKey: `rpg.quest.slay_${mid}.desc`,
    target: { type: 'kill' as const, monsterId: mid, count: 2 + (i % 3), wildernessId: WILDERNESS[i % WILDERNESS.length].id },
    rewards: { exp: 50 + i * 10, gold: 20 + i * 5 },
  })),
  ...normalMonsters.map((mid, i) => ({
    id: `collect_${mid}`,
    type: 'collect' as QuestTemplateType,
    nameKey: `rpg.quest.collect_${mid}.name`,
    descKey: `rpg.quest.collect_${mid}.desc`,
    target: { type: 'collect' as const, monsterId: mid, count: 3 + (i % 2), wildernessId: WILDERNESS[(i + 3) % WILDERNESS.length].id },
    rewards: { exp: 35 + i * 8, gold: 15 + i * 4, equipment: 'equip_steel_sword' },
  })),
  ...WILDERNESS.slice(0, 5).map((w, i) => ({
    id: `explore_${w.id}`,
    type: 'explore' as QuestTemplateType,
    nameKey: `rpg.quest.explore_${w.id}.name`,
    descKey: `rpg.quest.explore_${w.id}.desc`,
    target: { type: 'reach' as const, count: 1, wildernessId: w.id },
    rewards: { exp: 30 + i * 5, gold: 25 + i * 5 },
  })),
  ...eliteMonsters.map((mid, i) => ({
    id: `elite_${mid}`,
    type: 'elite' as QuestTemplateType,
    nameKey: `rpg.quest.elite_${mid}.name`,
    descKey: `rpg.quest.elite_${mid}.desc`,
    target: { type: 'kill' as const, monsterId: mid, count: 1, wildernessId: WILDERNESS[(i + 8) % WILDERNESS.length].id },
    rewards: { exp: 120 + i * 30, gold: 50 + i * 10, equipment: 'equip_shadow_blade' },
  })),
  ...normalMonsters.map((mid, i) => ({
    id: `escort_${mid}`,
    type: 'escort' as QuestTemplateType,
    nameKey: `rpg.quest.escort_${mid}.name`,
    descKey: `rpg.quest.escort_${mid}.desc`,
    target: { type: 'battle' as const, count: 3, wildernessId: WILDERNESS[(i + 5) % WILDERNESS.length].id },
    rewards: { exp: 60 + i * 10, gold: 18 + i * 3 },
  })),
]

export function getQuestTemplateById(id: string): QuestTemplate | undefined {
  return QUEST_TEMPLATES.find((q) => q.id === id)
}

export function getAvailableTemplates(state: RpgState): QuestTemplate[] {
  return QUEST_TEMPLATES.filter((q) => !state.recentQuestTypes.includes(q.type))
}

export function pickRandomQuests(state: RpgState, count: number): QuestTemplate[] {
  const available = getAvailableTemplates(state)
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function createActiveQuest(template: QuestTemplate): ActiveQuest {
  return {
    templateId: template.id,
    type: template.type,
    nameKey: template.nameKey,
    descKey: template.descKey,
    target: { ...template.target, current: 0 },
    rewards: { ...template.rewards },
    completed: false,
  }
}
