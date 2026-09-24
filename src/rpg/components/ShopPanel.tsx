import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Coins } from 'lucide-react'
import type { RpgState } from '../types'
import { EQUIPMENT, CONSUMABLES } from '../data/equipment'

interface ShopPanelProps {
  state: RpgState
  onBuy: (defId: string, itemType: 'equipment' | 'consumable') => void
  onBack: () => void
}

const RARITY_COLORS: Record<string, { text: string; bg: string; label: string }> = {
  common: { text: 'text-charcoal-500', bg: 'bg-charcoal-50', label: '普通' },
  rare: { text: 'text-blue-600', bg: 'bg-blue-50', label: '精良' },
  epic: { text: 'text-purple-600', bg: 'bg-purple-50', label: '稀有' },
}

export function ShopPanel({ state, onBuy, onBack }: ShopPanelProps) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'equipment' | 'consumable'>('equipment')

  return (
    <main className="min-h-screen bg-rice-100 paper-noise px-4 py-6">
      <div className="mx-auto max-w-lg space-y-5">
        {/* 顶部导航 */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition hover:bg-rice-50"
          >
            <ArrowLeft size={18} className="text-charcoal-500" />
          </button>
          <h2 className="text-lg font-extrabold text-charcoal-900">
            {t('rpg.shop.title', '冒险商店')}
          </h2>
        </div>

        {/* 金币 */}
        <div className="flex items-center gap-2 text-sm font-bold text-amber-600">
          <Coins size={18} />
          {t('rpg.common.gold', '金币')}: {state.gold} G
        </div>

        {/* 标签页 */}
        <div className="flex gap-2 rounded-xl bg-white p-1 shadow-sm">
          <button
            onClick={() => setTab('equipment')}
            className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
              tab === 'equipment'
                ? 'bg-chili-500 text-white shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-700'
            }`}
          >
            {t('rpg.shop.tab_equipment', '装备')}
          </button>
          <button
            onClick={() => setTab('consumable')}
            className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
              tab === 'consumable'
                ? 'bg-chili-500 text-white shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-700'
            }`}
          >
            {t('rpg.shop.tab_consumable', '消耗品')}
          </button>
        </div>

        {/* 装备列表 */}
        {tab === 'equipment' && (
          <div className="space-y-3">
            {EQUIPMENT.map((def) => {
              const rarity = RARITY_COLORS[def.rarity] ?? RARITY_COLORS.common
              const canAfford = state.gold >= def.price

              return (
                <div
                  key={def.id}
                  className="rounded-2xl border border-charcoal-900/10 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-charcoal-900">
                          {t(def.nameKey, { defaultValue: def.nameKey })}
                        </h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${rarity.text} ${rarity.bg}`}>
                          {rarity.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-charcoal-500">
                        {t(def.descKey, { defaultValue: def.descKey })}
                      </p>
                      {def.attrs && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {Object.entries(def.attrs).map(([k, v]) => (
                            <span
                              key={k}
                              className="rounded-md bg-rice-50 px-1.5 py-0.5 text-xs font-semibold text-charcoal-600"
                            >
                              {k.toUpperCase()}+{v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-amber-600">{def.price} G</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => onBuy(def.id, 'equipment')}
                      disabled={!canAfford}
                      className="w-full rounded-lg bg-chili-500 py-2 text-xs font-bold text-white transition hover:bg-chili-600 disabled:cursor-not-allowed disabled:bg-charcoal-900/10 disabled:text-charcoal-400"
                    >
                      {canAfford
                        ? t('rpg.shop.buy', '购买')
                        : t('rpg.shop.not_enough_gold', '金币不足！')}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 消耗品列表 */}
        {tab === 'consumable' && (
          <div className="space-y-3">
            {CONSUMABLES.map((def) => {
              const canAfford = state.gold >= def.price
              const effectText = []
              if (def.effect.hp) effectText.push(`HP+${def.effect.hp}`)
              if (def.effect.mp) effectText.push(`MP+${def.effect.mp}`)

              return (
                <div
                  key={def.id}
                  className="rounded-2xl border border-charcoal-900/10 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-charcoal-900">
                        {t(def.nameKey, { defaultValue: def.nameKey })}
                      </h3>
                      <p className="mt-1 text-xs text-charcoal-500">
                        {t(def.descKey, { defaultValue: def.descKey })}
                      </p>
                      {effectText.length > 0 && (
                        <div className="mt-2">
                          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-600">
                            {effectText.join(' ')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-amber-600">{def.price} G</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => onBuy(def.id, 'consumable')}
                      disabled={!canAfford}
                      className="w-full rounded-lg bg-chili-500 py-2 text-xs font-bold text-white transition hover:bg-chili-600 disabled:cursor-not-allowed disabled:bg-charcoal-900/10 disabled:text-charcoal-400"
                    >
                      {canAfford
                        ? t('rpg.shop.buy', '购买')
                        : t('rpg.shop.not_enough_gold', '金币不足！')}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
