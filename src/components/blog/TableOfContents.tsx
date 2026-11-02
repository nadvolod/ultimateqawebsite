'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/posts'
import { cn } from '@/lib/utils'

/** Sticky "On this page" rail; highlights the section currently being read. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-semibold text-uqa-dark">On this page</p>
      <ol className="space-y-1 border-l border-uqa-gray-light">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 py-1 leading-snug transition-colors',
                h.level === 3 ? 'pl-7' : 'pl-4',
                active === h.id
                  ? 'border-uqa-deep-blue font-medium text-uqa-deep-blue'
                  : 'border-transparent text-uqa-gray-mid hover:text-uqa-dark'
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
