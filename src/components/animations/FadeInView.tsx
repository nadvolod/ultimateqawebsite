'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInViewProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeInView({ children, className, delay = 0 }: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Start as not-animated (no styles applied) until JS runs
  const [state, setState] = useState<'idle' | 'hidden' | 'visible'>('idle')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setState('visible')
      return
    }

    const el = ref.current
    if (!el) return

    // If already in viewport, skip the animation entirely
    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight - 40 && rect.bottom > 0
    if (inView) {
      setState('visible')
      return
    }

    // Otherwise hide and wait for scroll
    setState('hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible')
          observer.disconnect()
        }
      },
      { rootMargin: '-40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style =
    state === 'hidden'
      ? {
          opacity: 0,
          transform: 'translateY(20px)',
          transition: `opacity 0.55s ease-out ${delay}s, transform 0.55s ease-out ${delay}s`,
        }
      : state === 'visible'
      ? {
          opacity: 1,
          transform: 'none',
          transition: `opacity 0.55s ease-out ${delay}s, transform 0.55s ease-out ${delay}s`,
        }
      : undefined // 'idle': no styles, content fully visible (SSR + initial client paint)

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
