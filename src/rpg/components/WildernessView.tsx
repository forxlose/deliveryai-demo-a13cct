import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Trees, ArrowLeft, Search } from 'lucide-react'
import type { RpgState, MonsterInstance } from '../types'
import { getWildernessById } from '../data/wilderness'
import { cloneMonsterForBattle } from '../state/rpgReducer'
import { randomElement } from '../lib/random'

interface WildernessViewProps {
  state: RpgState
  onEncounter: (monster: MonsterInstance) => void
  onReturn: () => void
}

export function WildernessView({ state, onEncounter, onReturn }: WildernessViewProps) {
  const { t } = useTranslation()
  const [exploring, setExploring] = useState(false)

  const wilderness = state.currentWilderness ? getWildernessById(state.currentWilderness) : null

  const handleExplore = useCallback(() => {
    if (!wilderness || exploring) return
    setExploring(true)

    // 模拟探索延迟
    setTimeout(() => {
      setExploring(false)
      // 2/3 概率遇敌
      if (Math.random() < 0.66 && wilderness.monsterPool.length > 0) {
        const monsterId = randomElement(wilderness.monsterPool)
        const monster = cloneMonsterForBattle(monsterId)
        if (monster) {
          onEncounter(monster)
          return
        }
      }
      // 否则无事发生
    }, 800)
  }, [wilderness, exploring, onEncounter])

  if (!wilderness) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rice-100 paper-noise px-4">
        <div className="text-center">
          <p className="text-charcoal-500">{t('rpg.wild.unknown', '未知区域')}</p>
          <button onClick={onReturn} className="mt-4 rounded-xl bg-chili-500 px-4 py-2 text-sm font-bold text-white">
            {t('rpg.wild.return', '返回小镇')}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-rice-100 paper-noise px-4">
      <div className="w-full max-w-md animate-rise space-y-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <Trees size={28} className="text-emerald-600" />
          <h1 className="text-2xl font-extrabold text-charcoal-900">{t(wilderness.nameKey)}</h1>
        </div>
        <p className="text-sm text-charcoal-500">{t(wilderness.descKey)}</p>

        {/* 任务提示 */}
        {state.activeQuest && state.activeQuest.target.wildernessId === wilderness.id && (
          <div className="rounded-xl bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
            {t('rpg.wild.quest_hint', '任务目标区域！')}
          </div>
        )}

        <button
          onClick={handleExplore}
          disabled={exploring}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-14 font-extrabold text-lg shadow-card transition ${
            exploring
              ? 'cursor-wait bg-charcoal-900/10 text-charcoal-400'
              : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
          }`}
        >
          <Search size={24} />
          {exploring ? t('rpg.wild.exploring', '探索中...') : t('rpg.wild.explore', '探索')}
        </button>

        <button
          onClick={onReturn}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-charcoal-900/10 bg-white py-3 font-bold text-charcoal-700 transition hover:bg-rice-50"
        >
          <ArrowLeft size={18} />
          {t('rpg.wild.return', '返回小镇')}
        </button>
      </div>
    </main>
  )
}
