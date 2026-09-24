import { useTranslation } from 'react-i18next'
import { ArrowLeft, Sword, Shield, Gem, X } from 'lucide-react'
import type { RpgState, EquipmentSlot } from '../types'
import { getClassById } from '../data/classes'
import { getEquipmentById } from '../data/equipment'
import { expToNextLevel } from '../lib/leveling'
import { HpBar } from './ui/HpBar'
import { cn } from '@/lib/utils'

interface CharacterPanelProps {
  state: RpgState
  onEquip: (uid: string) => void
  onUnequip: (slot: EquipmentSlot) => void
  onBack: () => void
}

const ATTR_KEYS: { key: keyof typeof ATTR_LABELS; color: string }[] = [
  { key: 'hp', color: 'bg-emerald-500' },
  { key: 'mp', color: 'bg-blue-500' },
  { key: 'atk', color: 'bg-chili-500' },
  { key: 'def', color: 'bg-indigo-500' },
  { key: 'agi', color: 'bg-amber-500' },
  { key: 'crit', color: 'bg-purple-500' },
]

const ATTR_LABELS = {
  hp: 'HP',
  mp: 'MP',
  atk: 'ATK',
  def: 'DEF',
  agi: 'AGI',
  crit: 'CRIT',
}

const SLOT_CONFIG: { slot: EquipmentSlot; labelKey: string; icon: typeof Sword }[] = [
  { slot: 'weapon', labelKey: 'rpg.character.weapon', icon: Sword },
  { slot: 'armor', labelKey: 'rpg.character.armor', icon: Shield },
  { slot: 'accessory', labelKey: 'rpg.character.accessory', icon: Gem },
]

export function CharacterPanel({ state, onUnequip, onBack }: CharacterPanelProps) {
  const { t } = useTranslation()
  const classDef = getClassById(state.charClass)

  const expNeeded = expToNextLevel(state.level)
  const expPct = Math.min(100, (state.exp / expNeeded) * 100)

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
            {t('rpg.character.title', '角色信息')}
          </h2>
        </div>

        {/* 角色基本信息 */}
        <div className="rounded-2xl border border-charcoal-900/10 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-chili-50 text-chili-500 text-xl font-extrabold">
              {state.characterName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-extrabold text-charcoal-900">{state.characterName}</h3>
              <p className="text-sm text-charcoal-500">
                {classDef ? t(classDef.nameKey, { defaultValue: classDef.nameKey }) : state.charClass}{' '}
                · {t('rpg.common.level', 'Lv')}.{state.level}
              </p>
            </div>
          </div>

          {/* EXP 条 */}
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs font-semibold">
              <span className="text-charcoal-500">{t('rpg.common.exp', 'EXP')}</span>
              <span className="text-charcoal-400">
                {state.exp}/{expNeeded}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-charcoal-900/10">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-300"
                style={{ width: `${expPct}%` }}
              />
            </div>
          </div>

          {/* 金币 */}
          <div className="mt-3 flex items-center gap-2 text-sm font-bold text-amber-600">
            <span className="text-lg">🪙</span>
            {state.gold} G
          </div>
        </div>

        {/* 属性面板 */}
        <div className="rounded-2xl border border-charcoal-900/10 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-extrabold text-charcoal-700">
            {t('rpg.character.attributes', '属性')}
          </h3>
          <div className="space-y-4">
            {/* HP / MP 条形 */}
            <HpBar
              current={state.attrs.hp}
              max={state.attrs.maxHp}
              color="bg-emerald-500"
              label="HP"
              size="md"
            />
            <HpBar
              current={state.attrs.mp}
              max={state.attrs.maxMp}
              color="bg-blue-500"
              label="MP"
              size="md"
            />

            {/* ATK/DEF/AGI/CRIT */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {ATTR_KEYS.filter(({ key }) => key !== 'hp' && key !== 'mp').map(({ key }) => {
                const current = state.attrs[key]
                const base = state.baseAttrs[key]
                const bonus = current - base

                return (
                  <div
                    key={key}
                    className="rounded-xl border border-charcoal-900/5 bg-rice-50 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal-500">{ATTR_LABELS[key]}</span>
                      <span className="text-lg font-extrabold text-charcoal-900">{current}</span>
                    </div>
                    {bonus !== 0 && (
                      <div className="mt-1 flex items-center gap-1 text-xs">
                        <span className="text-charcoal-400">
                          {t('rpg.character.base_value', '基础')}: {base}
                        </span>
                        <span
                          className={cn(
                            'font-semibold',
                            bonus > 0 ? 'text-emerald-600' : 'text-chili-500',
                          )}
                        >
                          {bonus > 0 ? '+' : ''}{bonus}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 装备槽位 */}
        <div className="rounded-2xl border border-charcoal-900/10 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-extrabold text-charcoal-700">
            {t('rpg.character.equipment_slots', '装备')}
          </h3>
          <div className="space-y-3">
            {SLOT_CONFIG.map(({ slot, labelKey, icon: Icon }) => {
              const equipped = state.equipment[slot]
              const equipDef = equipped ? getEquipmentById(equipped.defId) : null

              return (
                <div
                  key={slot}
                  className="flex items-center gap-3 rounded-xl border border-charcoal-900/5 bg-rice-50 p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-charcoal-400">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-charcoal-500">
                      {t(labelKey, { defaultValue: slot })}
                    </p>
                    {equipDef ? (
                      <div>
                        <p className="text-sm font-bold text-charcoal-900">
                          {t(equipDef.nameKey, { defaultValue: equipDef.nameKey })}
                        </p>
                        <p className="text-xs text-charcoal-400">
                          {equipDef.attrs &&
                            Object.entries(equipDef.attrs)
                              .map(([k, v]) => `${ATTR_LABELS[k as keyof typeof ATTR_LABELS] ?? k}+${v}`)
                              .join(' ')}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-charcoal-400">
                        {t('rpg.character.no_equipment', '无装备')}
                      </p>
                    )}
                  </div>
                  {equipped && (
                    <button
                      onClick={() => onUnequip(slot)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-charcoal-400 transition hover:bg-chili-50 hover:text-chili-500"
                      title={t('rpg.inventory.unequip', '卸下')}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
