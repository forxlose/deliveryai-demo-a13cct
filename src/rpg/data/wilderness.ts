import type { WildernessDef } from '../types'

export const WILDERNESS: WildernessDef[] = [
  { id: 'dark_forest', nameKey: 'rpg.wild.dark_forest.name', descKey: 'rpg.wild.dark_forest.desc', monsterPool: ['slime', 'goblin', 'wolf'] },
  { id: 'ancient_ruins', nameKey: 'rpg.wild.ancient_ruins.name', descKey: 'rpg.wild.ancient_ruins.desc', monsterPool: ['skeleton', 'slime', 'dark_mage'] },
  { id: 'crystal_cave', nameKey: 'rpg.wild.crystal_cave.name', descKey: 'rpg.wild.crystal_cave.desc', monsterPool: ['giant_spider', 'skeleton', 'slime'] },
  { id: 'misty_swamp', nameKey: 'rpg.wild.misty_swamp.name', descKey: 'rpg.wild.misty_swamp.desc', monsterPool: ['giant_spider', 'slime', 'goblin'] },
  { id: 'goblin_camp', nameKey: 'rpg.wild.goblin_camp.name', descKey: 'rpg.wild.goblin_camp.desc', monsterPool: ['goblin', 'orc', 'wolf'] },
  { id: 'haunted_graveyard', nameKey: 'rpg.wild.haunted_graveyard.name', descKey: 'rpg.wild.haunted_graveyard.desc', monsterPool: ['skeleton', 'dark_mage', 'giant_spider'] },
  { id: 'wolf_ridge', nameKey: 'rpg.wild.wolf_ridge.name', descKey: 'rpg.wild.wolf_ridge.desc', monsterPool: ['wolf', 'orc', 'goblin'] },
  { id: 'orc_stronghold', nameKey: 'rpg.wild.orc_stronghold.name', descKey: 'rpg.wild.orc_stronghold.desc', monsterPool: ['orc', 'skeleton', 'dark_mage'] },
  { id: 'spider_lair', nameKey: 'rpg.wild.spider_lair.name', descKey: 'rpg.wild.spider_lair.desc', monsterPool: ['giant_spider', 'slime', 'wolf'] },
  { id: 'frost_peak', nameKey: 'rpg.wild.frost_peak.name', descKey: 'rpg.wild.frost_peak.desc', monsterPool: ['wolf', 'orc', 'slime'] },
  { id: 'dragon_valley', nameKey: 'rpg.wild.dragon_valley.name', descKey: 'rpg.wild.dragon_valley.desc', monsterPool: ['dragon_whelp', 'orc', 'wolf'] },
  { id: 'shadow_realm', nameKey: 'rpg.wild.shadow_realm.name', descKey: 'rpg.wild.shadow_realm.desc', monsterPool: ['shadow_warrior', 'dark_mage', 'skeleton'] },
]

export function getWildernessById(id: string): WildernessDef | undefined {
  return WILDERNESS.find((w) => w.id === id)
}
