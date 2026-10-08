import { useEffect } from 'react'
import type { RpgView } from '../types'

const RPG_VIEWS: RpgView[] = ['create', 'town', 'quests', 'wilderness', 'battle', 'character', 'inventory', 'shop', 'victory', 'defeat']

export const rpgViewToHash = (view: RpgView, wildernessId?: string | null): string => {
  if (view === 'wilderness' && wildernessId) return `#/rpg/wilderness/${wildernessId}`
  return `#/rpg/${view}`
}

export const hashToRpgView = (hash: string): { view: RpgView; wildernessId?: string } | null => {
  const clean = hash.replace(/^#\/?/, '')
  const parts = clean.split('/')
  // 格式: rpg/<view>[/wilderness/<id>]
  if (parts[0] !== 'rpg') return null

  if (parts.length >= 3 && parts[1] === 'wilderness') {
    return { view: 'wilderness', wildernessId: parts[2] }
  }

  const view = parts[1] as RpgView
  if (RPG_VIEWS.includes(view)) return { view }
  return null
}

interface UseRpgRouteOptions {
  onNavigate: (view: RpgView, wildernessId?: string) => void
}

/**
 * 保持 RPG 视图与 URL hash 双向同步
 */
export function useRpgRoute(view: RpgView, wildernessId: string | null, { onNavigate }: UseRpgRouteOptions) {
  // 视图 → hash
  useEffect(() => {
    const target = rpgViewToHash(view, wildernessId)
    if (window.location.hash === target) return
    if (hashToRpgView(window.location.hash)) {
      window.location.hash = target
    } else {
      window.history.replaceState(null, '', target)
    }
  }, [view, wildernessId])

  // hash → 视图
  useEffect(() => {
    const handler = () => {
      const result = hashToRpgView(window.location.hash)
      if (result && result.view !== view) {
        onNavigate(result.view, result.wildernessId)
      }
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [view, onNavigate])
}
