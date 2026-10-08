import type { RpgState } from '../types'

const SAVE_KEY = 'rpg-save'

/** 保存游戏状态到 localStorage */
export function saveGame(state: RpgState): boolean {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

/** 从 localStorage 加载游戏存档 */
export function loadGame(): RpgState | null {
  try {
    const data = localStorage.getItem(SAVE_KEY)
    if (!data) return null
    const parsed = JSON.parse(data) as RpgState
    // 基本校验
    if (!parsed || typeof parsed !== 'object' || !parsed.characterName || !parsed.charClass) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

/** 删除存档 */
export function deleteSave(): boolean {
  try {
    localStorage.removeItem(SAVE_KEY)
    return true
  } catch {
    return false
  }
}
