// === RPG 核心类型 ===

// 职业
export type CharacterClass = 'warrior' | 'mage' | 'ranger'

// 装备槽位
export type EquipmentSlot = 'weapon' | 'armor' | 'accessory'

// 稀有度
export type Rarity = 'common' | 'rare' | 'epic'

// 属性
export type AttributeKey = 'hp' | 'mp' | 'atk' | 'def' | 'agi' | 'crit'

// RPG 视图
export type RpgView =
  | 'create'
  | 'town'
  | 'quests'
  | 'wilderness'
  | 'battle'
  | 'character'
  | 'inventory'
  | 'shop'
  | 'victory'
  | 'defeat'

// 战斗指令
export type BattleCommand = 'attack' | 'skill' | 'defend' | 'item' | 'flee'

// 战斗状态
export type BattlePhase = 'player_turn' | 'enemy_turn' | 'victory' | 'defeat' | 'fled'

// 任务模板类型
export type QuestTemplateType = 'slay' | 'collect' | 'explore' | 'elite' | 'escort'

// 怪物类型
export type MonsterType = 'normal' | 'elite'

// 属性集合
export interface Attributes {
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  atk: number
  def: number
  agi: number
  crit: number // 百分比 0-100
}

// 职业定义
export interface ClassDefinition {
  id: CharacterClass
  nameKey: string
  descKey: string
  baseAttrs: Attributes
  growth: Partial<Attributes> // 每级成长
  skillId: string
  icon: string
}

// 装备定义
export interface EquipmentDef {
  id: string
  nameKey: string
  descKey: string
  slot: EquipmentSlot
  rarity: Rarity
  attrs: Partial<Attributes>
  price: number
}

// 玩家装备实例
export interface EquipmentInstance {
  uid: string
  defId: string
}

// 消耗品定义
export interface ConsumableDef {
  id: string
  nameKey: string
  descKey: string
  effect: {
    hp?: number
    mp?: number
  }
  price: number
}

// 背包物品
export interface InventoryItem {
  uid: string
  defId: string
  type: 'equipment' | 'consumable'
  quantity: number
}

// 技能定义
export interface SkillDef {
  id: string
  nameKey: string
  descKey: string
  mpCost: number
  damageMultiplier: number
  hitCount: number
  damagePerHit: number
}

// 怪物定义
export interface MonsterDef {
  id: string
  nameKey: string
  type: MonsterType
  attrs: Attributes
  skillId: string | null
  expReward: number
  goldReward: number
  dropTable: DropEntry[]
}

// 掉落条目
export interface DropEntry {
  defId: string
  type: 'equipment' | 'consumable'
  chance: number // 0-1
}

// 怪物实例（战斗中）
export interface MonsterInstance {
  defId: string
  attrs: Attributes
  skillId: string | null
  expReward: number
  goldReward: number
  dropTable: DropEntry[]
}

// 任务模板定义
export interface QuestTemplate {
  id: string
  type: QuestTemplateType
  nameKey: string
  descKey: string
  target: {
    type: 'kill' | 'collect' | 'reach' | 'battle'
    monsterId?: string
    count: number
    wildernessId: string
  }
  rewards: {
    exp: number
    gold: number
    equipment?: string
    consumable?: string
  }
}

// 活跃任务实例
export interface ActiveQuest {
  templateId: string
  type: QuestTemplateType
  nameKey: string
  descKey: string
  target: {
    type: 'kill' | 'collect' | 'reach' | 'battle'
    monsterId?: string
    count: number
    wildernessId: string
    current: number
  }
  rewards: {
    exp: number
    gold: number
    equipment?: string
    consumable?: string
  }
  completed: boolean
}

// 野外场景
export interface WildernessDef {
  id: string
  nameKey: string
  descKey: string
  monsterPool: string[] // 怪物 ID 列表
}

// 战斗日志条目
export interface BattleLogEntry {
  turn: number
  textKey: 'battle_log.player_attack' | 'battle_log.player_skill' | 'battle_log.player_defend' |
    'battle_log.player_flee_success' | 'battle_log.player_flee_fail' | 'battle_log.player_item' |
    'battle_log.enemy_attack' | 'battle_log.enemy_skill' |
    'battle_log.victory' | 'battle_log.defeat'
  params: Record<string, string | number>
}

// RPG 游戏状态
export interface RpgState {
  // 存档
  characterName: string
  charClass: CharacterClass
  level: number
  exp: number
  attrs: Attributes
  baseAttrs: Attributes // 不含装备的基础属性
  gold: number

  // 装备
  equipment: Partial<Record<EquipmentSlot, EquipmentInstance>>

  // 背包
  inventory: InventoryItem[]

  // 任务
  activeQuest: ActiveQuest | null
  completedQuests: string[] // 已完成任务模板 ID 列表
  recentQuestTypes: QuestTemplateType[] // 冷却中的任务类型

  // 场景
  view: RpgView
  currentWilderness: string | null

  // 战斗
  battlePhase: BattlePhase
  battleMonster: MonsterInstance | null
  battleLog: BattleLogEntry[]
  battleTurn: number
  isDefending: boolean

  // 物品（战斗中）
  battleItems: InventoryItem[] // 可从背包使用的消耗品

  // 消息
  message: string | null
}

// RPG Action
export type RpgAction =
  | { type: 'CREATE_CHARACTER'; name: string; charClass: CharacterClass }
  | { type: 'LOAD_SAVE'; save: RpgState }
  | { type: 'SET_VIEW'; view: RpgView }
  | { type: 'ACCEPT_QUEST'; quest: ActiveQuest }
  | { type: 'ABANDON_QUEST' }
  | { type: 'COMPLETE_QUEST' }
  | { type: 'CLAIM_REWARD' }
  | { type: 'ENTER_WILDERNESS'; wildernessId: string }
  | { type: 'ENCOUNTER_MONSTER'; monster: MonsterInstance }
  | { type: 'BATTLE_COMMAND'; command: BattleCommand; skillId?: string }
  | { type: 'ENEMY_ACTION' }
  | { type: 'END_BATTLE'; result: 'victory' | 'defeat' | 'fled' }
  | { type: 'USE_ITEM'; itemUid: string }
  | { type: 'EQUIP_ITEM'; itemUid: string }
  | { type: 'UNEQUIP_ITEM'; slot: EquipmentSlot }
  | { type: 'SELL_ITEM'; itemUid: string }
  | { type: 'BUY_ITEM'; defId: string; itemType: 'equipment' | 'consumable' }
  | { type: 'ADD_GOLD'; amount: number }
  | { type: 'SET_MESSAGE'; message: string | null }
  | { type: 'NEW_GAME' }
  | { type: 'RETURN_TO_TOWN' }
  | { type: 'HEAL_REST' }
