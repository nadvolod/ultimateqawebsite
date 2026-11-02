import type { Cta } from '@/types'

/** The paid-Offer CTA placed mid-post: the one dark panel inside the reading column. */
export function OfferCta({ cta }: { cta: Cta }) {
  const external = cta.href.startsWith('http')
  return (
    <aside aria-label={cta.kind} data-cta={cta.id} className="not-prose my-12 rounded-[20px] bg-uqa-ink px-7 py-9 text-white sm:px-9">
      <p className="text-[15px] font-semibold text-[#8fd0ff]">{cta.kind}</p>
      <h2 className="mt-2.5 font-display text-[28px] font-bold leading-[1.15]">{cta.headline}</h2>
      <p className="mt-3 text-[17px] leading-relaxed text-[#c9d1e4]">{cta.pitch}</p>
      <a
        href={cta.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="mt-6 inline-block rounded-full bg-uqa-sky px-6 py-3.5 font-semibold text-uqa-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-uqa-ink"
      >
        {cta.action}
      </a>
    </aside>
  )
}
