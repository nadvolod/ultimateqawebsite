import { cn } from '@/lib/utils'

interface MetricBadgeProps {
  value: string
  label: string
  dark?: boolean
  className?: string
}

export function MetricBadge({ value, label, dark = false, className }: MetricBadgeProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start',
        className
      )}
    >
      <span
        className={cn(
          'font-mono text-2xl font-bold leading-none',
          dark ? 'text-uqa-sky' : 'text-uqa-deep-blue'
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          'text-xs font-medium mt-0.5 uppercase tracking-wide',
          dark ? 'text-white/60' : 'text-uqa-gray-mid'
        )}
      >
        {label}
      </span>
    </div>
  )
}
