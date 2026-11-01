'use client'

import { useState } from 'react'

interface YouTubeProps {
  id: string
  start?: number | string
  title?: string
}

/** Click-to-load embed: shows the thumbnail only, so pages with many videos stay fast. */
export function YouTube({ id, start, title = 'YouTube video' }: YouTubeProps) {
  const [playing, setPlaying] = useState(false)
  const params = new URLSearchParams({ autoplay: '1', rel: '0', ...(start ? { start: String(start) } : {}) })

  return (
    <div className="not-prose my-8 relative aspect-video overflow-hidden rounded-xl bg-black shadow-card">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-uqa-sky"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-uqa-deep-blue/90 text-white shadow-glow-blue transition-transform group-hover:scale-105">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
