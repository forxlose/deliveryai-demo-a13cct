import { useTranslation } from 'react-i18next'
import { Swords, Zap, Shield, FlaskConical, Footprints } from 'lucide-react'
import type { RpgState, BattleCommand } from '../types'
import { getClassById } from '../data/classes'
import { getSkillById } from '../data/skills'
import { getConsumableById } from '../data/equipment'
import { HpBar } from './ui/HpBar'
import { BattleLog } from './ui/BattleLog'
import { getMonsterById } from '../data/monsters'

interface BattleViewProps {
  state: RpgState
  onBattleCommand: (command: BattleCommand, skillId?: string) => void
  onUseItem: (itemUid: string) => void
}

export function BattleView({ state, onBattleCommand, onUseItem }: BattleViewProps) {
  const { t } = useTranslation()
  const { battleMonster, battlePhase, attrs, battleItems, isDefending } = state

  const monsterDef = battleMonster ? getMonsterById(battleMonster.defId) : null
  const classDef = getClassById(state.charClass)
  const playerSkill = classDef ? getSkillById(classDef.skillId) : null

  const isPlayerTurn = battlePhase === 'player_turn'
  const canUseSkill = playerSkill && attrs.mp >= playerSkill.mpCost

  if (!battleMonster) return null

  return (
    <main className="flex min-h-screen flex-col bg-rice-100 paper-noise">
      {/* 战斗主体 */}
      <div className="flex-1 px-4 py-4">
        <div className="mx-auto max-w-lg space-y-4">
          {/* 敌人信息 */}
          <div className="rounded-2xl border border-chili-500/10 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-extrabold text-charcoal-900 text-lg">
                {monsterDef ? t(monsterDef.nameKey, { defaultValue: monsterDef.nameKey }) : '???'}
              </h2>
              {battleMonster.skillId && (
                <span className="rounded-full bg-chili-50 px-2 py-0.5 text-xs font-semibold text-chili-500">
                  {t('rpg.monster.elite', '精英')}
                </span>
              )}
            </div>
            <HpBar
              current={battleMonster.attrs.hp}
              max={battleMonster.attrs.maxHp}
              color="bg-chili-500"
              size="lg"
            />
          </div>

          {/* 玩家信息 */}
          <div className="rounded-2xl border border-charcoal-900/10 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-bold text-charcoal-900">{state.characterName}</h3>
              <span className="text-xs font-semibold text-charcoal-500">
                {t('rpg.common.level', 'Lv')}.{state.level}
              </span>
            </div>
            <div className="space-y-2">
              <HpBar
                current={attrs.hp}
                max={attrs.maxHp}
                color="bg-emerald-500"
                label="HP"
                size="sm"
              />
              <HpBar
                current={attrs.mp}
                max={attrs.maxMp}
                color="bg-blue-500"
                label="MP"
                size="sm"
              />
            </div>
            {isDefending && (
              <p className="mt-2 text-xs font-semibold text-indigo-500">
                {t('rpg.battle.defending', '防御姿态中 (伤害减半)')}
              </p>
            )}
          </div>

          {/* 战斗日志 */}
          <BattleLog entries={state.battleLog} />
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="sticky bottom-0 border-t border-charcoal-900/10 bg-white/95 px-4 py-3 backdrop-blur safe-bottom">
        <div className="mx-auto max-w-lg">
          {isPlayerTurn ? (
            <div className="grid grid-cols-5 gap-2">
              <CommandButton
                icon={Swords}
                label={t('rpg.battle.command_attack')}
                onClick={() => onBattleCommand('attack')}
              />
              <CommandButton
                icon={Zap}
                label={`${t('rpg.battle.command_skill')}${playerSkill ? ` (${playerSkill.mpCost}MP)` : ''}`}
                onClick={() => onBattleCommand('skill', classDef?.skillId)}
                disabled={!canUseSkill}
                disabledHint={t('rpg.message.not_enough_mp')}
              />
              <CommandButton
                icon={Shield}
                label={t('rpg.battle.command_defend')}
                onClick={() => onBattleCommand('defend')}
              />
              <CommandButton
                icon={FlaskConical}
                label={`${t('rpg.battle.command_item')}${battleItems.length > 0 ? ` (${battleItems.length})` : ''}`}
                onClick={() => {
                  if (battleItems.length > 0) {
                    onUseItem(battleItems[0].uid)
                  }
                }}
                disabled={battleItems.length === 0}
                disabledHint={t('rpg.battle.no_items')}
                hasSubItems={battleItems.length > 1}
                subItems={battleItems}
                onSubItemSelect={(uid) => onUseItem(uid)}
                t={t}
              />
              <CommandButton
                icon={Footprints}
                label={t('rpg.battle.command_flee')}
                onClick={() => onBattleCommand('flee')}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center py-2">
              <p className="animate-pulse text-sm font-semibold text-charcoal-500">
                {t('rpg.battle.enemy_turn')}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// ─── 内部命令按钮组件 ───

interface CommandButtonProps {
  icon: typeof Swords
  label: string
  onClick: () => void
  disabled?: boolean
  disabledHint?: string
  hasSubItems?: boolean
  subItems?: RpgState['battleItems']
  onSubItemSelect?: (uid: string) => void
  t?: ReturnType<typeof import('react-i18next').useTranslation>['t']
}

function CommandButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  disabledHint,
  hasSubItems,
  subItems,
  onSubItemSelect,
  t: tFn,
}: CommandButtonProps) {
  if (hasSubItems && subItems && subItems.length > 1 && onSubItemSelect) {
    return (
      <div className="relative group">
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex w-full flex-col items-center gap-0.5 rounded-xl bg-chili-500 py-2 text-white transition hover:bg-chili-600 disabled:cursor-not-allowed disabled:bg-charcoal-900/10 disabled:text-charcoal-400"
          title={disabled ? disabledHint : undefined}
        >
          <Icon size={18} />
          <span className="text-[10px] font-semibold leading-tight">{label}</span>
        </button>
        {/* 子物品弹出菜单 */}
        <div className="absolute bottom-full left-0 mb-1 hidden w-40 rounded-xl border border-charcoal-900/10 bg-white p-1 shadow-float group-hover:block">
          {subItems.map((item) => {
            const def = item.type === 'consumable' ? getConsumableById(item.defId) : null
            const name = def && tFn ? tFn(def.nameKey, { defaultValue: def.nameKey }) : item.defId
            return (
              <button
                key={item.uid}
                onClick={() => onSubItemSelect(item.uid)}
                className="w-full rounded-lg px-2 py-1.5 text-left text-xs font-medium text-charcoal-700 hover:bg-rice-50"
              >
                {name} x{item.quantity}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex w-full flex-col items-center gap-0.5 rounded-xl bg-chili-500 py-2 text-white transition hover:bg-chili-600 disabled:cursor-not-allowed disabled:bg-charcoal-900/10 disabled:text-charcoal-400"
      title={disabled ? disabledHint : undefined}
    >
      <Icon size={18} />
      <span className="text-[10px] font-semibold leading-tight">{label}</span>
    </button>
  )
}
