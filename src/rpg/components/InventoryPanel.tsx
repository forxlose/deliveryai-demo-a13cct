import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Coins } from 'lucide-react'
import type { RpgState, EquipmentSlot } from '../types'
import { getEquipmentById, getConsumableById } from '../data/equipment'

interface InventoryPanelProps {
  state: RpgState
  onEquip: (uid: string) => void
  onUnequip: (slot: EquipmentSlot) => void
  onSell: (uid: string) => void
  onUse: (uid: string) => void
  onBack: () => void
}

const RARITY_COLORS: Record<string, { text: string; bg: string; label: string }> = {
  common: { text: 'text-charcoal-500', bg: 'bg-charcoal-50', label: '普通' },
  rare: { text: 'text-blue-600', bg: 'bg-blue-50', label: '精良' },
  epic: { text: 'text-purple-600', bg: 'bg-purple-50', label: '稀有' },
}

export function InventoryPanel({ state, onEquip, onSell, onUse, onBack }: InventoryPanelProps) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'equipment' | 'consumable'>('equipment')

  const equipmentItems = state.inventory.filter((i) => i.type === 'equipment')
  const consumableItems = state.inventory.filter((i) => i.type === 'consumable')

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
            {t('rpg.inventory.title', '背包')}
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
            {t('rpg.inventory.tab_equipment', '装备')}
          </button>
          <button
            onClick={() => setTab('consumable')}
            className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
              tab === 'consumable'
                ? 'bg-chili-500 text-white shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-700'
            }`}
          >
            {t('rpg.inventory.tab_consumable', '消耗品')}
          </button>
        </div>

        {/* 内容 */}
        {tab === 'equipment' && (
          <>
            {equipmentItems.length === 0 ? (
              <div className="rounded-2xl border border-charcoal-900/10 bg-white p-8 text-center">
                <p className="text-sm font-semibold text-charcoal-400">
                  {t('rpg.inventory.empty', '背包空空如也，去冒险吧！')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {equipmentItems.map((item) => {
                  const def = getEquipmentById(item.defId)
                  if (!def) return null
                  const rarity = RARITY_COLORS[def.rarity] ?? RARITY_COLORS.common

                  return (
                    <div
                      key={item.uid}
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
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => onEquip(item.uid)}
                          className="flex-1 rounded-lg bg-chili-500 py-2 text-xs font-bold text-white transition hover:bg-chili-600"
                        >
                          {t('rpg.inventory.equip', '装备')}
                        </button>
                        <button
                          onClick={() => onSell(item.uid)}
                          className="flex-1 rounded-lg border border-charcoal-900/10 bg-white py-2 text-xs font-bold text-charcoal-500 transition hover:bg-rice-50"
                        >
                          {t('rpg.inventory.sell', '出售')} ({Math.floor(def.price * 0.5)}G)
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {tab === 'consumable' && (
          <>
            {consumableItems.length === 0 ? (
              <div className="rounded-2xl border border-charcoal-900/10 bg-white p-8 text-center">
                <p className="text-sm font-semibold text-charcoal-400">
                  {t('rpg.inventory.empty', '背包空空如也，去冒险吧！')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {consumableItems.map((item) => {
                  const def = getConsumableById(item.defId)
                  if (!def) return null
                  const effectText = []
                  if (def.effect.hp) effectText.push(`HP+${def.effect.hp}`)
                  if (def.effect.mp) effectText.push(`MP+${def.effect.mp}`)

                  return (
                    <div
                      key={item.uid}
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
                          <div className="mt-2 flex items-center gap-2">
                            {effectText.length > 0 && (
                              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-600">
                                {effectText.join(' ')}
                              </span>
                            )}
                            <span className="text-xs text-charcoal-400">
                              x{item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => onUse(item.uid)}
                          className="flex-1 rounded-lg bg-chili-500 py-2 text-xs font-bold text-white transition hover:bg-chili-600"
                        >
                          {t('rpg.inventory.use', '使用')}
                        </button>
                        <button
                          onClick={() => onSell(item.uid)}
                          className="flex-1 rounded-lg border border-charcoal-900/10 bg-white py-2 text-xs font-bold text-charcoal-500 transition hover:bg-rice-50"
                        >
                          {t('rpg.inventory.sell', '出售')}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
