'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogEntry, GoalId } from '@/types'
import { GOALS } from '@/data/goals'
import { cn } from '@/lib/utils'
import { CTAS } from '@/data/ctas'
import { DraftBadge } from './DraftBadge'
import { NewsletterForm } from './NewsletterForm'

export interface LibraryHit {
  slug: string
  title: string
  topicName: string
}

interface MagazineProps {
  entries: BlogEntry[]
  /** Searched too, shown as a separate group below Blog results. */
  library: LibraryHit[]
}

const goalName = (id: GoalId) => GOALS.find((g) => g.id === id)?.name ?? ''
const matches = (q: string, ...fields: string[]) => fields.join(' ').toLowerCase().includes(q)

/** /blog front page: masthead with search and Goal filters, then either the curated layout or filtered results. */
export function Magazine({ entries, library }: MagazineProps) {
  const [goal, setGoal] = useState<GoalId | 'all'>('all')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const results = useMemo(
    () => entries.filter((e) => (goal === 'all' || e.goal === goal) && (!q || matches(q, e.title, e.dek))),
    [entries, goal, q]
  )
  const libraryResults = useMemo(() => (q ? library.filter((p) => matches(q, p.title, p.topicName)).slice(0, 8) : []), [library, q])
  const showHome = goal === 'all' && !q

  const lead = entries.find((e) => e.placement === 'lead') ?? entries[0]
  const startHere = entries.filter((e) => e.placement === 'start-here').slice(0, 3)
  const inGoal = goal === 'all' ? [] : entries.filter((e) => e.goal === goal)
  const recommended = inGoal.find((e) => e.placement) ?? inGoal[0]
  const clear = () => {
    setGoal('all')
    setQuery('')
  }

  return (
    <div className="bg-white text-uqa-dark">
      <section className="relative isolate overflow-hidden bg-uqa-ink text-white">
        <HeroOrbits />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <h1 className="text-balance font-display text-[clamp(2.75rem,6.2vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              Make more money with AI
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#c9d1e4]">
              Plain-English ideas for business owners: where AI wins you customers, saves your team hours and lifts sales. No jargon, no hype.
            </p>
            <div className="mt-9">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, e.g. leads, hiring, tools"
                className="w-full max-w-md rounded-full border-0 bg-white px-5 py-3.5 text-base text-uqa-dark placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-uqa-sky"
              />
            </div>
          </div>

          <ProblemPicker goal={goal} onPick={setGoal} recommended={recommended} count={results.length} />
        </div>
      </section>

      {showHome && lead ? (
        <>
          <LeadStory entry={lead} />

          {startHere.length > 0 && (
            <section aria-labelledby="start-here" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
              <h2 id="start-here" className="font-display text-3xl font-bold text-uqa-ink">
                New here? Start with these
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {startHere.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/${e.slug}/`}
                    className="group flex min-h-[200px] flex-col gap-3.5 rounded-2xl bg-uqa-mist p-6 transition-colors hover:bg-[#e8ecf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky"
                  >
                    <span className="text-[13px] font-semibold text-uqa-deep-blue">{goalName(e.goal)}</span>
                    <span className="font-display text-[23px] font-bold leading-tight text-uqa-ink group-hover:text-uqa-deep-blue">{e.title}</span>
                    <span className="mt-auto flex items-center gap-3 text-sm text-[#5b6272]">
                      {e.readingMinutes} min read
                      {e.draft && <DraftBadge />}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {GOALS.map((g) => {
            const posts = entries.filter((e) => e.goal === g.id)
            if (!posts.length) return null
            return (
              <section key={g.id} aria-labelledby={`goal-${g.id}`} className="mx-auto max-w-7xl px-4 pt-[72px] sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-uqa-ink pb-3">
                  <h2 id={`goal-${g.id}`} className="font-display text-3xl font-bold text-uqa-ink">
                    {g.name}
                  </h2>
                  {posts.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setGoal(g.id)}
                      className="py-2.5 text-[15px] font-semibold text-uqa-deep-blue hover:text-uqa-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky"
                    >
                      See all {posts.length}
                    </button>
                  )}
                </div>
                <div className="grid gap-x-10 md:grid-cols-3">
                  {posts.slice(0, 3).map((e) => (
                    <Link
                      key={e.slug}
                      href={`/${e.slug}/`}
                      className="group block border-b border-uqa-line py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky"
                    >
                      <span className="block font-display text-[21px] font-bold leading-snug text-uqa-ink group-hover:text-uqa-deep-blue">{e.title}</span>
                      <span className="mt-2 block text-base leading-relaxed text-uqa-slate">{e.dek}</span>
                      {e.draft && <DraftBadge className="mt-3" />}
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </>
      ) : (
        <section aria-live="polite" className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
          <p className="text-[15px] text-[#5b6272]">
            {results.length} {results.length === 1 ? 'article' : 'articles'}
            {goal !== 'all' && ` in ${goalName(goal)}`}
            {q && ` matching “${query.trim()}”`}
          </p>
          {results.length === 0 && (
            <p className="mt-6 text-lg">
              No articles match that yet. Try a broader word, or{' '}
              <button type="button" onClick={clear} className="text-uqa-deep-blue underline">
                show all articles
              </button>
              .
            </p>
          )}
          <ul className="mt-2">
            {results.map((e) => (
              <li key={e.slug} className="border-b border-uqa-line">
                <Link
                  href={`/${e.slug}/`}
                  className="group grid gap-2 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10"
                >
                  <span className="text-sm font-semibold text-uqa-purple">{goalName(e.goal)}</span>
                  <span>
                    <span className="block font-display text-[26px] font-bold leading-tight text-uqa-ink group-hover:text-uqa-deep-blue">{e.title}</span>
                    <span className="mt-2 block text-[17px] leading-relaxed text-uqa-slate">{e.dek}</span>
                    {e.draft && <DraftBadge className="mt-3" />}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {libraryResults.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-xl font-bold text-uqa-ink">From the engineering library</h2>
              <p className="mt-1 text-[15px] text-[#5b6272]">Technical articles written for developers and QA teams.</p>
              <ul className="mt-3">
                {libraryResults.map((p) => (
                  <li key={p.slug} className="border-b border-uqa-line">
                    <Link href={`/${p.slug}/`} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 hover:text-uqa-deep-blue">
                      <span className="font-medium text-uqa-ink">{p.title}</span>
                      <span className="text-sm text-[#5b6272]">{p.topicName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <NewsletterForm cta={CTAS.newsletter} variant="dark" />
        <div className="flex flex-col rounded-[20px] border-[1.5px] border-uqa-line p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-uqa-ink">Looking for the technical articles?</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-uqa-slate">
            300+ guides on test automation, Selenium and engineering, written for developers and QA teams, now live in their own library.
          </p>
          <Link href="/library/" className="mt-auto pt-6 font-semibold text-uqa-deep-blue hover:text-uqa-purple">
            Open the engineering library
          </Link>
        </div>
      </section>
    </div>
  )
}

function LeadStory({ entry }: { entry: BlogEntry }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
      <Link
        href={`/${entry.slug}/`}
        className="group grid items-center gap-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-uqa-deep-blue">
          {entry.image ? (
            <Image src={entry.image} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" priority />
          ) : (
            <span aria-hidden="true" className="absolute inset-0 flex flex-col justify-end bg-uqa-deep-blue p-8 sm:p-10">
              <span className="text-sm font-semibold text-[#8fd0ff]">If this sounds familiar</span>
              <span className="mt-2 max-w-md font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
                “{GOALS.find((g) => g.id === entry.goal)?.problem}”
              </span>
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-uqa-purple">{goalName(entry.goal)}</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-uqa-ink group-hover:text-uqa-deep-blue">
            {entry.title}
          </h2>
          <p className="mt-5 text-[19px] leading-relaxed text-uqa-slate">{entry.dek}</p>
          <p className="mt-5 flex items-center gap-3 text-sm text-[#5b6272]">
            {entry.readingMinutes} min read
            {entry.draft && <DraftBadge />}
          </p>
        </div>
      </Link>
    </section>
  )
}

/** The homepage's orbit motif, large and faint behind the hero. */
function HeroOrbits() {
  return (
    <svg aria-hidden="true" viewBox="0 0 800 800" className="absolute -right-56 -top-40 -z-10 h-[52rem] w-[52rem] opacity-60 sm:-right-40">
      <circle cx="400" cy="400" r="390" fill="none" stroke="#2ea3f2" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="400" cy="400" r="270" fill="none" stroke="#8c3cf9" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="400" cy="400" r="150" fill="none" stroke="#2ea3f2" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="400" cy="130" r="9" fill="#2ea3f2" />
      <circle cx="670" cy="400" r="6" fill="#8c3cf9" />
    </svg>
  )
}

interface ProblemPickerProps {
  goal: GoalId | 'all'
  onPick: (goal: GoalId | 'all') => void
  recommended?: BlogEntry
  count: number
}

/** The hero's job: turn "what's hurting?" into the one article to read first. Picking a problem also filters the page. */
function ProblemPicker({ goal, onPick, recommended, count }: ProblemPickerProps) {
  return (
    <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/15 backdrop-blur-sm sm:p-8">
      <h2 id="picker-heading" className="font-display text-2xl font-bold leading-tight sm:text-[28px]">
        What’s costing you money right now?
      </h2>
      <div role="group" aria-labelledby="picker-heading" className="mt-6 grid gap-2.5">
        {GOALS.map((g) => {
          const on = goal === g.id
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(on ? 'all' : g.id)}
              className={cn(
                'flex min-h-14 items-center justify-between gap-4 rounded-2xl px-5 py-3.5 text-left text-[17px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky',
                on ? 'bg-white text-uqa-ink' : 'bg-white/[0.07] text-white hover:bg-white/[0.14]'
              )}
            >
              {g.problem}
              <span aria-hidden="true" className={cn('h-3 w-3 flex-shrink-0 rounded-full border-2', on ? 'border-uqa-purple bg-uqa-purple' : 'border-white/40')} />
            </button>
          )
        })}
      </div>

      <div aria-live="polite" className="mt-6 min-h-[8rem] border-t border-white/15 pt-5">
        {recommended ? (
          <div key={recommended.slug} className="motion-safe:animate-fade-in-up">
            <p className="text-sm text-[#c9d1e4]">Start with</p>
            <Link href={`/${recommended.slug}/`} className="mt-1 block font-display text-xl font-bold leading-snug text-uqa-sky hover:text-white">
              {recommended.title}
            </Link>
            <p className="mt-2 text-sm text-[#c9d1e4]">
              {count > 1 ? `${count - 1} more on this below.` : 'More on this soon.'}{' '}
              <button type="button" onClick={() => onPick('all')} className="font-semibold text-white underline underline-offset-2">
                Show everything
              </button>
            </p>
          </div>
        ) : (
          <p className="text-[15px] leading-relaxed text-[#c9d1e4]">Pick one and we’ll point you to the article to read first.</p>
        )}
      </div>
    </div>
  )
}
