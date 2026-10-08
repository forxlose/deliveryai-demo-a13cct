import { cn } from '@/lib/utils'

interface HpBarProps {
  current: number
  max: number
  color: string
  label?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

export function HpBar({ current, max, color, label, showText = true, size = 'md' }: HpBarProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0

  return (
    <div className="w-full">
      {(label || showText) && (
        <div className="mb-0.5 flex justify-between text-xs font-semibold">
          {label && <span className="text-charcoal-700">{label}</span>}
          {showText && (
            <span className="text-charcoal-500">
              {current}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-charcoal-900/10', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-300', color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
