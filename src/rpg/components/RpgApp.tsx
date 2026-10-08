import { useReducer, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { rpgReducer, createInitialRpgState } from '../state/rpgReducer'
import { useRpgRoute } from '../hooks/useRpgRoute'
import { saveGame, loadGame } from '../lib/storage'
import { getClassById } from '../data/classes'
import type { RpgState, RpgView, CharacterClass } from '../types'
import { CreateView } from './CreateView'
import { TownView } from './TownView'
import { QuestView } from './QuestView'
import { WildernessView } from './WildernessView'
import { BattleView } from './BattleView'
import { CharacterPanel } from './CharacterPanel'
import { InventoryPanel } from './InventoryPanel'
import { ShopPanel } from './ShopPanel'

const INITIAL = createInitialRpgState()

const TOPBAR_HIDDEN_VIEWS: Set<RpgView> = new Set(['create', 'battle', 'victory', 'defeat'])

export function RpgApp() {
  const { t } = useTranslation()

  const [state, dispatch] = useReducer(
    rpgReducer,
    loadGame() || INITIAL,
  )

  // 视图 ↔ hash 同步
  const navigateHandler = useCallback(
    (view: RpgView, wildernessId?: string) => {
      if (view === 'wilderness' && wildernessId) {
        dispatch({ type: 'ENTER_WILDERNESS', wildernessId })
      } else {
        dispatch({ type: 'SET_VIEW', view })
      }
    },
    [],
  )

  useRpgRoute(state.view, state.currentWilderness, { onNavigate: navigateHandler })

  // 持久化
  useEffect(() => {
    if (state.characterName) {
      saveGame(state)
    }
  }, [state])

  // 自动清除 toast
  useEffect(() => {
    if (!state.message) return
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_MESSAGE', message: null })
    }, 3000)
    return () => clearTimeout(timer)
  }, [state.message])

  const showTopBar = !TOPBAR_HIDDEN_VIEWS.has(state.view)

  const classDef = getClassById(state.charClass)

  return (
    <div className="relative min-h-screen">
      {/* 全局顶部栏 */}
      {showTopBar && (
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-charcoal-900/5 bg-white/95 px-4 py-2.5 backdrop-blur">
          <button
            onClick={() => dispatch({ type: 'RETURN_TO_TOWN' })}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rice-50 shadow-sm transition hover:bg-rice-100"
            title={t('rpg.common.back', '返回')}
          >
            <ArrowLeft size={16} className="text-charcoal-500" />
          </button>
          {state.characterName && (
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="font-bold text-charcoal-900 text-sm">{state.characterName}</span>
              <span className="text-xs text-charcoal-500">
                {classDef ? t(classDef.nameKey, { defaultValue: classDef.nameKey }) : ''}{' '}
                {t('rpg.common.level', 'Lv')}.{state.level}
              </span>
            </div>
          )}
          <span className="text-xs font-semibold text-amber-600">{state.gold} G</span>
        </div>
      )}

      {/* 视图路由 */}
      {state.view === 'create' && (
        <CreateView
          onCreate={(name, charClass: CharacterClass) =>
            dispatch({ type: 'CREATE_CHARACTER', name, charClass })
          }
          onLoad={() => {
            const save = loadGame()
            if (save) {
              dispatch({ type: 'LOAD_SAVE', save })
            }
          }}
        />
      )}

      {state.view === 'town' && (
        <TownView
          state={state}
          onNavigate={(view) => dispatch({ type: 'SET_VIEW', view })}
          onEnterWilderness={(id) => dispatch({ type: 'ENTER_WILDERNESS', wildernessId: id })}
          onRest={() => dispatch({ type: 'HEAL_REST' })}
        />
      )}

      {state.view === 'quests' && (
        <QuestView
          state={state}
          onAccept={(quest) => dispatch({ type: 'ACCEPT_QUEST', quest })}
          onAbandon={() => dispatch({ type: 'ABANDON_QUEST' })}
          onClaim={() => dispatch({ type: 'CLAIM_REWARD' })}
          onBack={() => dispatch({ type: 'SET_VIEW', view: 'town' })}
        />
      )}

      {state.view === 'wilderness' && (
        <WildernessView
          state={state}
          onEncounter={(monster) =>
            dispatch({ type: 'ENCOUNTER_MONSTER', monster })
          }
          onReturn={() => dispatch({ type: 'RETURN_TO_TOWN' })}
        />
      )}

      {state.view === 'battle' && (
        <BattleView
          state={state}
          onBattleCommand={(command, skillId) =>
            dispatch({ type: 'BATTLE_COMMAND', command, skillId })
          }
          onUseItem={(itemUid) => dispatch({ type: 'USE_ITEM', itemUid })}
        />
      )}

      {state.view === 'character' && (
        <CharacterPanel
          state={state}
          onEquip={(uid) => dispatch({ type: 'EQUIP_ITEM', itemUid: uid })}
          onUnequip={(slot) => dispatch({ type: 'UNEQUIP_ITEM', slot })}
          onBack={() => dispatch({ type: 'SET_VIEW', view: 'town' })}
        />
      )}

      {state.view === 'inventory' && (
        <InventoryPanel
          state={state}
          onEquip={(uid) => dispatch({ type: 'EQUIP_ITEM', itemUid: uid })}
          onUnequip={(slot) => dispatch({ type: 'UNEQUIP_ITEM', slot })}
          onSell={(uid) => dispatch({ type: 'SELL_ITEM', itemUid: uid })}
          onUse={(uid) => dispatch({ type: 'USE_ITEM', itemUid: uid })}
          onBack={() => dispatch({ type: 'SET_VIEW', view: 'town' })}
        />
      )}

      {state.view === 'shop' && (
        <ShopPanel
          state={state}
          onBuy={(defId, itemType) => dispatch({ type: 'BUY_ITEM', defId, itemType })}
          onBack={() => dispatch({ type: 'SET_VIEW', view: 'town' })}
        />
      )}

      {state.view === 'victory' && (
        <VictoryScreen
          state={state}
          onContinue={() => dispatch({ type: 'RETURN_TO_TOWN' })}
        />
      )}

      {state.view === 'defeat' && (
        <DefeatScreen
          state={state}
          onContinue={() => dispatch({ type: 'RETURN_TO_TOWN' })}
        />
      )}

      {/* Toast */}
      {state.message && (
        <div className="pointer-events-none fixed left-1/2 top-20 z-40 -translate-x-1/2 rounded-full bg-charcoal-900/90 px-4 py-2 text-xs font-semibold text-white shadow-float">
          {t(state.message, { defaultValue: state.message })}
        </div>
      )}
    </div>
  )
}

/* ─── Victory/Defeat screens ─── */

function VictoryScreen({ state, onContinue }: { state: RpgState; onContinue: () => void }) {
  const { t } = useTranslation()
  const monster = state.battleMonster
  return (
    <main className="flex min-h-screen items-center justify-center bg-rice-100 paper-noise px-4">
      <div className="w-full max-w-sm rounded-2xl border border-charcoal-900/10 bg-white p-6 text-center shadow-float">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
          ⚔️
        </div>
        <h2 className="text-xl font-extrabold text-amber-600">
          {t('rpg.battle.victory_title', '胜利！')}
        </h2>
        {monster && (
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-charcoal-700">
              +{monster.expReward} EXP · +{monster.goldReward} G
            </p>
          </div>
        )}
        <button
          onClick={onContinue}
          className="mt-6 w-full rounded-xl bg-chili-500 py-3 font-bold text-white transition hover:bg-chili-600"
        >
          {t('rpg.battle.continue', '继续')}
        </button>
      </div>
    </main>
  )
}

function DefeatScreen({ onContinue }: { state: RpgState; onContinue: () => void }) {
  const { t } = useTranslation()
  return (
    <main className="flex min-h-screen items-center justify-center bg-rice-100 paper-noise px-4">
      <div className="w-full max-w-sm rounded-2xl border border-charcoal-900/10 bg-white p-6 text-center shadow-float">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-chili-50 text-3xl">
          💀
        </div>
        <h2 className="text-xl font-extrabold text-chili-500">
          {t('rpg.battle.defeat_title', '战败...')}
        </h2>
        <p className="mt-2 text-sm text-charcoal-500">
          {t('rpg.message.defeat', '你被击败了，返回城镇休息吧。')}
        </p>
        <button
          onClick={onContinue}
          className="mt-6 w-full rounded-xl bg-chili-500 py-3 font-bold text-white transition hover:bg-chili-600"
        >
          {t('rpg.battle.continue', '继续')}
        </button>
      </div>
    </main>
  )
}
