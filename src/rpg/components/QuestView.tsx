import { useTranslation } from 'react-i18next'
import { ScrollText, MapPin, Coins, Star, X, Check } from 'lucide-react'
import { useMemo } from 'react'
import type { RpgState } from '../types'
import { pickRandomQuests, createActiveQuest } from '../data/quests'

interface QuestViewProps {
  state: RpgState
  onAccept: (quest: ReturnType<typeof createActiveQuest>) => void
  onAbandon: () => void
  onClaim: () => void
  onBack: () => void
}

export function QuestView({ state, onAccept, onAbandon, onClaim, onBack }: QuestViewProps) {
  const { t } = useTranslation()

  const availableQuests = useMemo(() => pickRandomQuests(state, 3), [state])
  // 显示已完成待领奖的任务
  if (state.activeQuest?.completed) {
    const quest = state.activeQuest
    return (
      <main className="min-h-screen bg-rice-100 paper-noise px-4 py-6">
        <div className="mx-auto max-w-lg space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <X size={18} className="text-charcoal-500" />
            </button>
            <h2 className="text-lg font-extrabold text-charcoal-900">{t('rpg.quest.complete_title', '任务完成')}</h2>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-50 p-6 text-center shadow-sm">
            <Star size={40} className="mx-auto text-amber-500" />
            <h3 className="mt-3 text-lg font-bold text-charcoal-900">{t(quest.nameKey, { defaultValue: quest.nameKey })}</h3>
            <p className="mt-1 text-sm text-charcoal-500">{t(quest.descKey, { defaultValue: quest.descKey })}</p>
            <div className="mt-4 flex justify-center gap-4 text-sm font-semibold">
              <span className="flex items-center gap-1 text-amber-600"><Star size={14} /> +{quest.rewards.exp} EXP</span>
              <span className="flex items-center gap-1 text-amber-600"><Coins size={14} /> +{quest.rewards.gold} G</span>
            </div>
            <button
              onClick={onClaim}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 font-bold text-white shadow-sm transition hover:bg-amber-600"
            >
              <Check size={16} /> {t('rpg.quest.claim', '领取奖励')}
            </button>
          </div>
        </div>
      </main>
    )
  }

  // 显示进行中的任务
  if (state.activeQuest) {
    const quest = state.activeQuest
    return (
      <main className="min-h-screen bg-rice-100 paper-noise px-4 py-6">
        <div className="mx-auto max-w-lg space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <X size={18} className="text-charcoal-500" />
            </button>
            <h2 className="text-lg font-extrabold text-charcoal-900">{t('rpg.quest.active_title', '当前任务')}</h2>
          </div>
          <div className="rounded-2xl border border-charcoal-900/10 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-charcoal-900">{t(quest.nameKey, { defaultValue: quest.nameKey })}</h3>
            <p className="mt-1 text-sm text-charcoal-500">{t(quest.descKey, { defaultValue: quest.descKey })}</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-charcoal-600">
                <MapPin size={14} className="text-amber-500" />
                {t(`rpg.wild.${quest.target.wildernessId}.name`, { defaultValue: quest.target.wildernessId })}
              </div>
              <div className="flex items-center gap-2 text-charcoal-600">
                <ScrollText size={14} className="text-purple-500" />
                {t(`rpg.quest.target_${quest.target.type}`, { defaultValue: quest.target.type })}: {quest.target.current}/{quest.target.count}
              </div>
            </div>
            <button
              onClick={onAbandon}
              className="mt-4 rounded-xl border border-chili-500/20 px-4 py-2 text-sm font-semibold text-chili-500 transition hover:bg-chili-50"
            >
              {t('rpg.quest.abandon', '放弃任务')}
            </button>
          </div>
        </div>
      </main>
    )
  }


  return (
    <main className="min-h-screen bg-rice-100 paper-noise px-4 py-6">
      <div className="mx-auto max-w-lg space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
            <X size={18} className="text-charcoal-500" />
          </button>
          <h2 className="text-lg font-extrabold text-charcoal-900">{t('rpg.quest.title', '任务公告板')}</h2>
        </div>
        {availableQuests.length === 0 ? (
          <div className="rounded-2xl border border-charcoal-900/10 bg-white p-8 text-center shadow-sm">
            <ScrollText size={40} className="mx-auto text-charcoal-300" />
            <p className="mt-3 text-sm text-charcoal-500">{t('rpg.quest.empty', '暂无可用任务，请先完成其他类型的任务')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {availableQuests.map((qt) => (
              <div key={qt.id} className="rounded-2xl border border-charcoal-900/10 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-charcoal-900">{t(qt.nameKey, { defaultValue: qt.nameKey })}</h3>
                    <p className="mt-0.5 text-xs text-charcoal-500">{t(qt.descKey, { defaultValue: qt.descKey })}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-700">
                        <Star size={12} /> +{qt.rewards.exp} EXP
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-700">
                        <Coins size={12} /> +{qt.rewards.gold} G
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-700">
                        <MapPin size={12} /> {t(`rpg.wild.${qt.target.wildernessId}.name`, { defaultValue: qt.target.wildernessId })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onAccept(createActiveQuest(qt))}
                    className="flex-1 rounded-xl bg-chili-500 py-2 text-sm font-bold text-white transition hover:bg-chili-600"
                  >
                    {t('rpg.quest.accept', '接受')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
