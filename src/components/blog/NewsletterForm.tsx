import { useId } from 'react'
import type { Cta } from '@/types'
import { cn } from '@/lib/utils'

/** Posts straight to Substack's subscribe page (email prefilled): no embed script, no form backend. */
export function NewsletterForm({ cta, variant = 'light' }: { cta: Cta; variant?: 'dark' | 'light' }) {
  const id = useId()
  const dark = variant === 'dark'
  return (
    <section
      aria-labelledby={`${id}-heading`}
      data-cta={cta.id}
      className={cn('rounded-[20px] p-8 sm:p-10', dark ? 'bg-uqa-ink text-white' : 'border-[1.5px] border-uqa-line')}
    >
      <h2 id={`${id}-heading`} className={cn('font-display text-[28px] font-bold leading-tight sm:text-[32px]', !dark && 'text-uqa-ink')}>
        {cta.headline}
      </h2>
      <p className={cn('mt-3 text-[17px] leading-relaxed', dark ? 'text-[#c9d1e4]' : 'text-uqa-slate')}>{cta.pitch}</p>
      <form action={`${cta.href}/subscribe`} method="get" target="_blank" className="mt-6 flex flex-wrap gap-2.5">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@yourbusiness.com"
          className={cn(
            'min-w-0 flex-[1_1_220px] rounded-full px-5 py-3.5 text-base text-uqa-dark placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-uqa-sky',
            dark ? 'border-0' : 'border-[1.5px] border-[#cfd4e0]'
          )}
        />
        <button
          type="submit"
          className={cn(
            'rounded-full px-6 py-3.5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky focus-visible:ring-offset-2',
            dark ? 'bg-uqa-sky text-uqa-ink hover:bg-white' : 'bg-uqa-deep-blue text-white hover:bg-uqa-ink'
          )}
        >
          {cta.action}
        </button>
      </form>
    </section>
  )
}
