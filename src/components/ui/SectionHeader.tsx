import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'font-mono text-sm font-semibold tracking-widest uppercase mb-3',
            dark ? 'text-uqa-sky' : 'text-uqa-sky'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl font-bold leading-tight tracking-tight',
          dark ? 'text-white' : 'text-uqa-deep-blue'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            dark ? 'text-white/70' : 'text-uqa-gray-mid'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
