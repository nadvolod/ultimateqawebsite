import { cn } from '@/lib/utils'

interface TagPillProps {
  label: string
  variant?: 'default' | 'dark' | 'accent'
  className?: string
}

export function TagPill({ label, variant = 'default', className }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium',
        variant === 'default' && 'bg-uqa-gray-bg text-uqa-deep-blue border border-uqa-gray-light',
        variant === 'dark' && 'bg-white/10 text-uqa-sky border border-white/20',
        variant === 'accent' && 'bg-uqa-deep-blue/10 text-uqa-deep-blue border border-uqa-deep-blue/20',
        className
      )}
    >
      {label}
    </span>
  )
}
