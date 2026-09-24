import type { RpgState, RpgAction, Attributes, InventoryItem, MonsterInstance } from '../types'
import { getClassById } from '../data/classes'
import { getEquipmentById, getConsumableById } from '../data/equipment'
import { getSkillById } from '../data/skills'
import { getMonsterById } from '../data/monsters'
import { recalcAttrs, checkLevelUp, levelUp, expToNextLevel } from '../lib/leveling'
import { applyAttack, applySkill, generateDrop, getEquipmentBonuses } from '../lib/combat'
import { uid } from '@/lib/utils'

export function createInitialRpgState(): RpgState {
  return {
    characterName: '',
    charClass: 'warrior',
    level: 1,
    exp: 0,
    attrs: { hp: 0, maxHp: 0, mp: 0, maxMp: 0, atk: 0, def: 0, agi: 0, crit: 0 },
    baseAttrs: { hp: 0, maxHp: 0, mp: 0, maxMp: 0, atk: 0, def: 0, agi: 0, crit: 0 },
    gold: 50,
    equipment: {},
    inventory: [],
    activeQuest: null,
    completedQuests: [],
    recentQuestTypes: [],
    view: 'create',
    currentWilderness: null,
    battlePhase: 'player_turn',
    battleMonster: null,
    battleLog: [],
    battleTurn: 0,
    isDefending: false,
    battleItems: [],
    message: null,
  }
}

/** 克隆 MonsterDef 为战斗 MonsterInstance */
export function cloneMonsterForBattle(defId: string): MonsterInstance | null {
  const def = getMonsterById(defId)
  if (!def) return null
  return {
    defId: def.id,
    attrs: { ...def.attrs, hp: def.attrs.hp, mp: def.attrs.mp },
    skillId: def.skillId,
    expReward: def.expReward,
    goldReward: def.goldReward,
    dropTable: [...def.dropTable],
  }
}

function applyEquipBonuses(baseAttrs: Attributes, equip: RpgState['equipment']): Attributes {
  const bonuses = getEquipmentBonuses(equip)
  return recalcAttrs(baseAttrs, bonuses)
}

function addInventoryItem(
  inv: InventoryItem[],
  defId: string,
  type: 'equipment' | 'consumable',
  qty: number,
): InventoryItem[] {
  const existing = inv.find((i) => i.defId === defId && i.type === type)
  if (existing) {
    return inv.map((i) =>
      i.uid === existing.uid ? { ...i, quantity: i.quantity + qty } : i,
    )
  }
  return [...inv, { uid: uid(), defId, type, quantity: qty }]
}

export function rpgReducer(state: RpgState, action: RpgAction): RpgState {
  switch (action.type) {
    // ─── 角色创建 ───
    case 'CREATE_CHARACTER': {
      const classDef = getClassById(action.charClass)
      if (!classDef) return state
      const baseAttrs = { ...classDef.baseAttrs }
      const attrs = { ...baseAttrs, hp: baseAttrs.hp, mp: baseAttrs.mp }
      return {
        ...state,
        characterName: action.name,
        charClass: action.charClass,
        level: 1,
        exp: 0,
        baseAttrs,
        attrs,
        gold: 50,
        equipment: {},
        inventory: [
          { uid: uid(), defId: 'consume_hp_potion', type: 'consumable', quantity: 3 },
          { uid: uid(), defId: 'consume_mp_potion', type: 'consumable', quantity: 2 },
        ],
        activeQuest: null,
        completedQuests: [],
        recentQuestTypes: [],
        view: 'town',
        currentWilderness: null,
        battlePhase: 'player_turn',
        battleMonster: null,
        battleLog: [],
        battleTurn: 0,
        isDefending: false,
        battleItems: [],
        message: null,
      }
    }

    case 'NEW_GAME': {
      return createInitialRpgState()
    }

    case 'LOAD_SAVE': {
      return { ...action.save, view: 'town', battleMonster: null, battleLog: [], battleTurn: 0, isDefending: false }
    }

    // ─── 视图 ───
    case 'SET_VIEW': {
      return { ...state, view: action.view }
    }

    // ─── 城镇 ───
    case 'RETURN_TO_TOWN': {
      return { ...state, view: 'town', currentWilderness: null, battleMonster: null, battleLog: [], battleTurn: 0, isDefending: false }
    }

    case 'HEAL_REST': {
      const fullAttrs = { ...state.attrs, hp: state.attrs.maxHp, mp: state.attrs.maxMp }
      return { ...state, attrs: fullAttrs, message: 'rpg.message.heal' }
    }

    // ─── 任务 ───
    case 'ACCEPT_QUEST': {
      const recent = [...state.recentQuestTypes, action.quest.type].slice(-3)
      return { ...state, activeQuest: action.quest, recentQuestTypes: recent, view: 'town' }
    }

    case 'ABANDON_QUEST': {
      return { ...state, activeQuest: null }
    }

    case 'COMPLETE_QUEST': {
      if (!state.activeQuest) return state
      const completedQuests = [...state.completedQuests, state.activeQuest.templateId]
      return {
        ...state,
        activeQuest: { ...state.activeQuest, completed: true },
        completedQuests,
        message: 'rpg.message.quest_complete',
      }
    }

    case 'CLAIM_REWARD': {
      if (!state.activeQuest) return state
      let { gold, exp } = state
      const inventory = [...state.inventory]

      gold += state.activeQuest.rewards.gold
      exp += state.activeQuest.rewards.exp

      if (state.activeQuest.rewards.equipment) {
        const updated = addInventoryItem(inventory, state.activeQuest.rewards.equipment, 'equipment', 1)
        inventory.length = 0
        inventory.push(...updated)
      }
      if (state.activeQuest.rewards.consumable) {
        const updated = addInventoryItem(inventory, state.activeQuest.rewards.consumable, 'consumable', 1)
        inventory.length = 0
        inventory.push(...updated)
      }

      // 检查升级
      let { level, baseAttrs, attrs } = state
      while (checkLevelUp(exp, level)) {
        const result = levelUp(level, attrs, baseAttrs, state.charClass)
        level = result.level
        baseAttrs = result.baseAttrs
        attrs = result.attrs
        exp -= expToNextLevel(level - 1)
      }

      return { ...state, activeQuest: null, gold, exp, level, baseAttrs, attrs, inventory }
    }

    // ─── 野外 ───
    case 'ENTER_WILDERNESS': {
      // 探索型任务：进入目标野外自动完成
      let activeQuest = state.activeQuest
      if (activeQuest && activeQuest.type === 'explore' && activeQuest.target.wildernessId === action.wildernessId) {
        activeQuest = { ...activeQuest, completed: true }
      }
      return { ...state, view: 'wilderness', currentWilderness: action.wildernessId, activeQuest }
    }

    case 'ENCOUNTER_MONSTER': {
      return {
        ...state,
        view: 'battle',
        battleMonster: action.monster,
        battlePhase: 'player_turn',
        battleLog: [],
        battleTurn: 1,
        isDefending: false,
        battleItems: state.inventory.filter((i) => i.type === 'consumable' && i.quantity > 0),
      }
    }

    // ─── 战斗 ───
    case 'BATTLE_COMMAND': {
      if (state.battlePhase !== 'player_turn' || !state.battleMonster) return state

      const monster = { ...state.battleMonster }
      const monsterAttrs = { ...monster.attrs }
      let playerAttrs = { ...state.attrs }
      const battleLog = [...state.battleLog]
      const battleTurn = state.battleTurn
      let isDefending = false

      // 处理玩家指令
      if (action.command === 'defend') {
        isDefending = true
        battleLog.push({
          turn: battleTurn,
          textKey: 'battle_log.player_defend',
          params: {},
        })
        // 防御后进入敌人回合
        return processEnemyTurn({
          ...state,
          attrs: playerAttrs,
          battleMonster: { ...monster, attrs: monsterAttrs },
          battleLog,
          isDefending,
          battlePhase: 'enemy_turn',
        })
      }

      if (action.command === 'flee') {
        // 逃跑成功率 = 玩家AGI / (玩家AGI + 敌人AGI + 20)
        const fleeChance = playerAttrs.agi / (playerAttrs.agi + monsterAttrs.agi + 20)
        if (Math.random() < fleeChance) {
          return { ...state, view: 'wilderness', battleMonster: null, battleLog: [], battleTurn: 0, isDefending: false, message: 'rpg.message.flee_success' }
        } else {
          battleLog.push({ turn: battleTurn, textKey: 'battle_log.player_flee_fail', params: {} })
          return processEnemyTurn({ ...state, battleLog, battleMonster: { ...monster, attrs: monsterAttrs }, battlePhase: 'enemy_turn' })
        }
      }

      if (action.command === 'item') {
        // item 指令通过 USE_ITEM 处理，这里不做
        return state
      }

      // attack 或 skill
      let playerDamage = 0
      let skillName = ''

      if (action.command === 'skill' && action.skillId) {
        const skill = getSkillById(action.skillId)
        if (!skill) return state
        // 检查 MP
        if (playerAttrs.mp < skill.mpCost) {
          return { ...state, message: 'rpg.message.not_enough_mp' }
        }
        playerAttrs = { ...playerAttrs, mp: playerAttrs.mp - skill.mpCost }
        const result = applySkill(action.skillId, { atk: playerAttrs.atk, crit: playerAttrs.crit }, { def: monsterAttrs.def })
        playerDamage = result.totalDamage
        
        skillName = skill.nameKey
        battleLog.push({
          turn: battleTurn,
          textKey: 'battle_log.player_skill',
          params: { damage: String(playerDamage), skill: skillName },
        })
      } else {
        // 普通攻击
        const result = applyAttack({ atk: playerAttrs.atk, crit: playerAttrs.crit }, { def: monsterAttrs.def })
        playerDamage = result.damage
        battleLog.push({
          turn: battleTurn,
          textKey: 'battle_log.player_attack',
          params: { damage: String(playerDamage) },
        })
      }

      monsterAttrs.hp = Math.max(0, monsterAttrs.hp - playerDamage)

      // 检查怪物死亡
      if (monsterAttrs.hp <= 0) {
        return processVictory({ ...state, attrs: playerAttrs, battleLog })
      }

      // 进入敌人回合
      return processEnemyTurn({
        ...state,
        attrs: playerAttrs,
        battleMonster: { ...monster, attrs: monsterAttrs },
        battleLog,
        battlePhase: 'enemy_turn',
      })
    }

    case 'ENEMY_ACTION': {
      // 通常在 BATTLE_COMMAND 中已处理，这个 action 用作备用/手动触发
      if (state.battlePhase !== 'enemy_turn' || !state.battleMonster) return state
      return processEnemyTurn(state)
    }

    case 'END_BATTLE': {
      if (!state.battleMonster) return state

      if (action.result === 'victory') {
        return processVictory(state)
      }

      if (action.result === 'fled') {
        return {
          ...state,
          view: 'wilderness',
          battleMonster: null,
          battleLog: [],
          battleTurn: 0,
          isDefending: false,
        }
      }

      // defeat
      return processDefeat(state)
    }

    // ─── 物品 ───
    case 'USE_ITEM': {
      const itemIdx = state.inventory.findIndex((i) => i.uid === action.itemUid)
      if (itemIdx === -1) return state

      const item = state.inventory[itemIdx]
      if (item.type !== 'consumable' || item.quantity <= 0) return state

      const def = getConsumableById(item.defId)
      if (!def) return state

      const newAttrs = { ...state.attrs }
      if (def.effect.hp) newAttrs.hp = Math.min(newAttrs.maxHp, newAttrs.hp + def.effect.hp)
      if (def.effect.mp) newAttrs.mp = Math.min(newAttrs.maxMp, newAttrs.mp + def.effect.mp)

      const newInv = [...state.inventory]
      if (item.quantity <= 1) {
        newInv.splice(itemIdx, 1)
      } else {
        newInv[itemIdx] = { ...item, quantity: item.quantity - 1 }
      }

      const battleItems = newInv.filter((i) => i.type === 'consumable' && i.quantity > 0)

      return { ...state, attrs: newAttrs, inventory: newInv, battleItems, message: 'rpg.message.item_used' }
    }

    case 'EQUIP_ITEM': {
      const itemIdx = state.inventory.findIndex((i) => i.uid === action.itemUid)
      if (itemIdx === -1) return state

      const item = state.inventory[itemIdx]
      if (item.type !== 'equipment') return state

      const def = getEquipmentById(item.defId)
      if (!def) return state

      // 先卸下同槽位装备
      const newEquip = { ...state.equipment }
      const oldEquip = newEquip[def.slot]
      const newInv = [...state.inventory]
      newInv.splice(itemIdx, 1)

      if (oldEquip) {
        newInv.push({ uid: oldEquip.uid, defId: oldEquip.defId, type: 'equipment', quantity: 1 })
      }

      newEquip[def.slot] = { uid: item.uid, defId: item.defId }

      const newAttrs = applyEquipBonuses(state.baseAttrs, newEquip)
      // 保留当前 HP/MP（不超过新上限）
      newAttrs.hp = Math.min(state.attrs.hp, newAttrs.maxHp)
      newAttrs.mp = Math.min(state.attrs.mp, newAttrs.maxMp)

      return { ...state, equipment: newEquip, inventory: newInv, attrs: newAttrs }
    }

    case 'UNEQUIP_ITEM': {
      const equip = state.equipment[action.slot]
      if (!equip) return state

      const newEquip = { ...state.equipment }
      delete newEquip[action.slot]

      const newInv = addInventoryItem([...state.inventory], equip.defId, 'equipment', 1)

      const newAttrs = applyEquipBonuses(state.baseAttrs, newEquip)
      newAttrs.hp = Math.min(state.attrs.hp, newAttrs.maxHp)
      newAttrs.mp = Math.min(state.attrs.mp, newAttrs.maxMp)

      return { ...state, equipment: newEquip, inventory: newInv, attrs: newAttrs }
    }

    case 'SELL_ITEM': {
      const itemIdx = state.inventory.findIndex((i) => i.uid === action.itemUid)
      if (itemIdx === -1) return state

      const item = state.inventory[itemIdx]

      let price = 0
      if (item.type === 'equipment') {
        const def = getEquipmentById(item.defId)
        if (def) price = Math.floor(def.price * 0.5)
      } else {
        const def = getConsumableById(item.defId)
        if (def) price = Math.floor(def.price * 0.5)
      }

      const newInv = [...state.inventory]
      if (item.quantity <= 1) {
        newInv.splice(itemIdx, 1)
      } else {
        newInv[itemIdx] = { ...item, quantity: item.quantity - 1 }
      }

      return { ...state, inventory: newInv, gold: state.gold + price }
    }

    case 'BUY_ITEM': {
      let price = 0
      if (action.itemType === 'equipment') {
        const def = getEquipmentById(action.defId)
        if (!def) return state
        price = def.price
      } else {
        const def = getConsumableById(action.defId)
        if (!def) return state
        price = def.price
      }

      if (state.gold < price) {
        return { ...state, message: 'rpg.message.not_enough_gold' }
      }

      const newInv = addInventoryItem([...state.inventory], action.defId, action.itemType, 1)

      return { ...state, inventory: newInv, gold: state.gold - price, message: 'rpg.message.item_bought' }
    }

    case 'ADD_GOLD': {
      return { ...state, gold: state.gold + action.amount }
    }

    case 'SET_MESSAGE': {
      return { ...state, message: action.message }
    }

    default:
      return state
  }
}

// ─── 内部辅助 ───

function processEnemyTurn(state: RpgState): RpgState {
  if (!state.battleMonster) return state

  const monster = { ...state.battleMonster }
  const monsterAttrs = { ...monster.attrs }
  let playerAttrs = { ...state.attrs }
  const battleLog = [...state.battleLog]
  const battleTurn = state.battleTurn

  // 敌人行动
  const monsterSkill = monster.skillId
  let enemyDamage = 0

  if (monsterSkill) {
    const result = applySkill(monsterSkill, { atk: monsterAttrs.atk, crit: monsterAttrs.crit }, { def: playerAttrs.def })
    enemyDamage = result.totalDamage
    battleLog.push({
      turn: battleTurn,
      textKey: 'battle_log.enemy_skill',
      params: { damage: String(enemyDamage) },
    })
  } else {
    const result = applyAttack({ atk: monsterAttrs.atk, crit: monsterAttrs.crit }, { def: playerAttrs.def })
    enemyDamage = result.damage
    battleLog.push({
      turn: battleTurn,
      textKey: 'battle_log.enemy_attack',
      params: { damage: String(enemyDamage) },
    })
  }

  // 防御减伤
  if (state.isDefending) {
    enemyDamage = Math.max(1, Math.round(enemyDamage * 0.5))
  }

  playerAttrs = { ...playerAttrs, hp: Math.max(0, playerAttrs.hp - enemyDamage) }

  // 玩家死亡
  if (playerAttrs.hp <= 0) {
    return processDefeat({ ...state, attrs: playerAttrs, battleLog })
  }

  return {
    ...state,
    attrs: playerAttrs,
    battleMonster: { ...monster, attrs: monsterAttrs },
    battleLog,
    battlePhase: 'player_turn',
    battleTurn: battleTurn + 1,
    isDefending: false,
    battleItems: state.inventory.filter((i) => i.type === 'consumable' && i.quantity > 0),
  }
}

function processVictory(state: RpgState): RpgState {
  const monster = state.battleMonster
  if (!monster) return state

  const drops = generateDrop(monster.dropTable)
  let inventory = [...state.inventory]

  for (const drop of drops) {
    inventory = addInventoryItem(inventory, drop.defId, drop.type, 1)
  }

  let { exp, gold, level, baseAttrs, attrs } = state
  exp += monster.expReward
  gold += monster.goldReward

  // 更新任务进度
  let activeQuest = state.activeQuest
  if (activeQuest) {
    const newTarget = { ...activeQuest.target }
    if (
      (activeQuest.type === 'slay' || activeQuest.type === 'elite') &&
      newTarget.type === 'kill' &&
      newTarget.monsterId === monster.defId
    ) {
      newTarget.current += 1
    }
    if (activeQuest.type === 'collect' && newTarget.type === 'collect' && newTarget.monsterId === monster.defId) {
      newTarget.current += 1
    }
    if (activeQuest.type === 'escort' && newTarget.type === 'battle') {
      newTarget.current += 1
    }
    activeQuest = { ...activeQuest, target: newTarget }
    if (newTarget.current >= newTarget.count) {
      activeQuest = { ...activeQuest, completed: true }
    }
  }

  // 检查升级
  let leveled = false
  while (checkLevelUp(exp, level)) {
    const result = levelUp(level, attrs, baseAttrs, state.charClass)
    level = result.level
    baseAttrs = result.baseAttrs
    attrs = result.attrs
    exp -= expToNextLevel(level - 1)
    leveled = true
  }

  const battleLog = [...state.battleLog, { turn: state.battleTurn, textKey: 'battle_log.victory' as const, params: {} }]

  return {
    ...state,
    attrs,
    baseAttrs,
    level,
    exp,
    gold,
    inventory,
    activeQuest,
    battleMonster: null,
    battlePhase: 'victory',
    battleLog,
    view: 'victory',
    message: leveled ? 'rpg.message.level_up' : 'rpg.message.victory',
  }
}

function processDefeat(state: RpgState): RpgState {
  const goldLoss = Math.floor(state.gold * 0.15)
  const fullAttrs = { ...state.attrs, hp: state.attrs.maxHp, mp: state.attrs.maxMp }
  const battleLog = [...state.battleLog, { turn: state.battleTurn, textKey: 'battle_log.defeat' as const, params: {} }]

  return {
    ...state,
    attrs: fullAttrs,
    gold: Math.max(0, state.gold - goldLoss),
    view: 'defeat',
    battleMonster: null,
    battleLog,
    battlePhase: 'defeat',
    currentWilderness: null,
    isDefending: false,
    message: 'rpg.message.defeat',
  }
}
