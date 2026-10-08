import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { BattleLogEntry } from '../../types'
import { cn } from '@/lib/utils'

interface BattleLogProps {
  entries: BattleLogEntry[]
  className?: string
}

const COLOR_MAP: Record<string, string> = {
  player_attack: 'text-blue-600',
  player_skill: 'text-purple-600',
  player_defend: 'text-green-600',
  player_flee_success: 'text-emerald-600',
  player_flee_fail: 'text-amber-600',
  player_item: 'text-teal-600',
  enemy_attack: 'text-chili-600',
  enemy_skill: 'text-red-600',
  victory: 'text-amber-500 font-bold',
  defeat: 'text-charcoal-500 font-bold',
}

export function BattleLog({ entries, className }: BattleLogProps) {
  const { t } = useTranslation()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries.length])

  return (
    <div className={cn('max-h-48 overflow-y-auto rounded-xl border border-charcoal-900/10 bg-white/80 p-3', className)}>
      {entries.length === 0 ? (
        <p className="text-center text-xs text-charcoal-400">{t('rpg.battle.log_empty', '战斗开始...')}</p>
      ) : (
        <div className="space-y-1 text-xs">
          {entries.map((entry, i) => {
            const key = `rpg.${entry.textKey}`
            const color = COLOR_MAP[entry.textKey.replace('battle_log.', '')] ?? 'text-charcoal-700'
            return (
              <p key={i} className={cn('font-medium', color)}>
                <span className="mr-1 text-charcoal-400">[{entry.turn}]</span>
                {t(key, entry.params as Record<string, string | number>)}
              </p>
            )
          })}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
