import { useTranslation } from 'react-i18next'
import { Swords, User, Backpack, Store, Moon, MapPin } from 'lucide-react'
import type { RpgState, RpgView } from '../types'

interface TownViewProps {
  state: RpgState
  onNavigate: (view: RpgView) => void
  onEnterWilderness: (wildernessId: string) => void
  onRest: () => void
}

export function TownView({ state, onNavigate, onEnterWilderness, onRest }: TownViewProps) {
  const { t } = useTranslation()

  const actions = [
    { view: 'quests' as const, icon: Swords, label: t('rpg.town.quest_btn'), color: 'text-amber-500', bg: 'bg-amber-50' },
    { view: 'character' as const, icon: User, label: t('rpg.town.character_btn'), color: 'text-blue-500', bg: 'bg-blue-50' },
    { view: 'inventory' as const, icon: Backpack, label: t('rpg.town.inventory_btn'), color: 'text-purple-500', bg: 'bg-purple-50' },
    { view: 'shop' as const, icon: Store, label: t('rpg.town.shop_btn'), color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ]

  const wildernessActions = [
    { id: 'dark_forest', nameKey: 'rpg.wild.dark_forest.name', descKey: 'rpg.wild.dark_forest.desc' },
    { id: 'ancient_ruins', nameKey: 'rpg.wild.ancient_ruins.name', descKey: 'rpg.wild.ancient_ruins.desc' },
    { id: 'crystal_cave', nameKey: 'rpg.wild.crystal_cave.name', descKey: 'rpg.wild.crystal_cave.desc' },
    { id: 'goblin_camp', nameKey: 'rpg.wild.goblin_camp.name', descKey: 'rpg.wild.goblin_camp.desc' },
    { id: 'misty_swamp', nameKey: 'rpg.wild.misty_swamp.name', descKey: 'rpg.wild.misty_swamp.desc' },
    { id: 'haunted_graveyard', nameKey: 'rpg.wild.haunted_graveyard.name', descKey: 'rpg.wild.haunted_graveyard.desc' },
  ]

  return (
    <main className="min-h-screen bg-rice-100 paper-noise px-4 py-6">
      <div className="mx-auto max-w-lg space-y-5">
        <div className="rounded-2xl border border-charcoal-900/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-charcoal-900">{t('rpg.town.title', '冒险者小镇')}</h2>
          <p className="mt-1 text-sm text-charcoal-500">{t('rpg.town.environment_desc')}</p>
          {state.activeQuest && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
              <MapPin size={14} />
              {t('rpg.town.quest_active', '当前任务')}: {t(state.activeQuest.nameKey, { defaultValue: state.activeQuest.nameKey })}
              ({state.activeQuest.target.current}/{state.activeQuest.target.count})
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {actions.map(({ view, icon: Icon, label, color, bg }) => (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className="flex items-center gap-3 rounded-2xl border border-charcoal-900/10 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`}>
                <Icon size={20} />
              </span>
              <span className="font-bold text-charcoal-900 text-sm">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onRest}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-charcoal-900/10 bg-white py-4 font-bold text-charcoal-700 shadow-sm transition hover:bg-rice-50"
        >
          <Moon size={18} className="text-indigo-500" />
          {t('rpg.town.rest_btn')}
        </button>

        <div>
          <h3 className="mb-3 text-sm font-bold text-charcoal-500">{t('rpg.town.wilderness_title', '探索野外')}</h3>
          <div className="space-y-2">
            {wildernessActions.map((w) => (
              <button
                key={w.id}
                onClick={() => onEnterWilderness(w.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-charcoal-900/10 bg-white p-3 text-left shadow-sm transition hover:border-amber-400/30 hover:bg-rice-50"
              >
                <MapPin size={18} className="text-amber-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-charcoal-900">{t(w.nameKey)}</p>
                  <p className="text-xs text-charcoal-400 truncate">{t(w.descKey)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
