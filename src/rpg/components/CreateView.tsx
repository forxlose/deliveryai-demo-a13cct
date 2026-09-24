import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sword, Wand, Sparkles, User, ArrowRight } from 'lucide-react'
import type { CharacterClass } from '../types'
import { CLASSES } from '../data/classes'
import { loadGame, deleteSave } from '../lib/storage'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, typeof Sword> = {
  Sword,
  Wand,
  Target: Sparkles,
}

interface CreateViewProps {
  onCreate: (name: string, charClass: CharacterClass) => void
  onLoad: () => void
}

export function CreateView({ onCreate, onLoad }: CreateViewProps) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [selectedClass, setSelectedClass] = useState<CharacterClass>('warrior')
  const [showConfirm, setShowConfirm] = useState(false)

  const nameError = name.length > 0 && (name.length < 2 || name.length > 12)
  const canStart = name.length >= 2 && name.length <= 12 && selectedClass

  const existingSave = loadGame()

  const handleStart = () => {
    if (!canStart) return
    onCreate(name, selectedClass)
  }

  if (existingSave && !showConfirm) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rice-100 paper-noise px-4">
        <div className="w-full max-w-md animate-rise space-y-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-chili-50">
            <User size={32} className="text-chili-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-charcoal-900">{t('rpg.create.title')}</h1>
          <p className="text-sm text-charcoal-500">
            {t('rpg.create.save_found', { name: existingSave.characterName, level: existingSave.level })}
          </p>
          <div className="space-y-3">
            <button
              onClick={onLoad}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-chili-500 py-3 font-bold text-white shadow-card transition hover:bg-chili-600"
            >
              {t('rpg.create.continue_btn')} <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full rounded-xl border border-charcoal-900/10 bg-white py-3 text-sm font-semibold text-charcoal-500 transition hover:bg-rice-100"
            >
              {t('rpg.create.new_game_btn')}
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (existingSave && showConfirm) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rice-100 paper-noise px-4">
        <div className="w-full max-w-md animate-rise space-y-6 text-center">
          <h2 className="text-xl font-bold text-chili-500">{t('rpg.create.confirm_new_title')}</h2>
          <p className="text-sm text-charcoal-500">{t('rpg.create.confirm_new_desc')}</p>
          <div className="flex gap-3">
            <button
              onClick={() => { deleteSave(); setShowConfirm(false) }}
              className="flex-1 rounded-xl bg-chili-500 py-3 font-bold text-white shadow-card transition hover:bg-chili-600"
            >
              {t('rpg.create.confirm_yes')}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 rounded-xl border border-charcoal-900/10 bg-white py-3 font-semibold text-charcoal-700 transition hover:bg-rice-100"
            >
              {t('rpg.create.confirm_no')}
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-rice-100 paper-noise px-4 py-8">
      <div className="w-full max-w-md animate-rise space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-charcoal-900">{t('rpg.create.title')}</h1>
          <p className="mt-1 text-sm text-charcoal-500">{t('rpg.create.subtitle')}</p>
        </div>

        {/* 名字输入 */}
        <div>
          <label className="mb-2 block text-sm font-bold text-charcoal-700">{t('rpg.create.name_label')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('rpg.create.name_placeholder')}
            maxLength={12}
            className="w-full rounded-xl border border-charcoal-900/10 bg-white px-4 py-3 text-charcoal-900 placeholder-charcoal-400 transition focus:border-chili-500 focus:outline-none"
          />
          {nameError && <p className="mt-1 text-xs text-chili-500">{t('rpg.create.name_error')}</p>}
        </div>

        {/* 职业选择 */}
        <div>
          <p className="mb-3 text-sm font-bold text-charcoal-700">{t('rpg.create.select_class')}</p>
          <div className="space-y-3">
            {CLASSES.map((cls) => {
              const Icon = ICON_MAP[cls.icon] ?? Sword
              const isSelected = selectedClass === cls.id
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={cn(
                    'flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition',
                    isSelected
                      ? 'border-chili-500 bg-chili-50 shadow-card'
                      : 'border-charcoal-900/10 bg-white hover:border-charcoal-900/20',
                  )}
                >
                  <div className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                    isSelected ? 'bg-chili-100 text-chili-600' : 'bg-rice-100 text-charcoal-500',
                  )}>
                    <Icon size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-charcoal-900">{t(cls.nameKey)}</p>
                    <p className="text-xs text-charcoal-500">{t(cls.descKey)}</p>
                    <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                      <span className="text-charcoal-500">HP:{cls.baseAttrs.hp}</span>
                      <span className="text-charcoal-500">ATK:{cls.baseAttrs.atk}</span>
                      <span className="text-charcoal-500">DEF:{cls.baseAttrs.def}</span>
                      <span className="text-charcoal-500">MP:{cls.baseAttrs.mp}</span>
                      <span className="text-charcoal-500">AGI:{cls.baseAttrs.agi}</span>
                      <span className="text-charcoal-500">CRIT:{cls.baseAttrs.crit}%</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!canStart}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition',
            canStart
              ? 'bg-chili-500 text-white shadow-card hover:bg-chili-600'
              : 'cursor-not-allowed bg-charcoal-900/10 text-charcoal-400',
          )}
        >
          {t('rpg.create.start_btn')} <ArrowRight size={18} />
        </button>
      </div>
    </main>
  )
}
