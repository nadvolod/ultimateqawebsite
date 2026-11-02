import Link from 'next/link'
import type { Post, Topic } from '@/types'
import { TOPICS } from '@/data/topics'
import { cn } from '@/lib/utils'
import { PostList } from './PostList'

interface LibraryIndexProps {
  posts: Post[]
  title: string
  description: string
  activeTopic?: Topic
}

/** Shared by /library and each Topic page: masthead with Topic links, then Posts grouped by year. */
export function LibraryIndex({ posts, title, description, activeTopic }: LibraryIndexProps) {
  const byYear = posts.reduce<Record<string, Post[]>>((acc, p) => {
    ;(acc[p.date.slice(0, 4)] ??= []).push(p)
    return acc
  }, {})
  const years = Object.keys(byYear).sort().reverse()

  return (
    <div className="bg-white">
      <header className="mx-auto max-w-5xl px-4 pb-6 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-uqa-ink">{title}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-uqa-slate">{description}</p>
        <p className="mt-4 text-[15px] text-[#5b6272]">
          Running a business?{' '}
          <Link href="/blog/" className="font-semibold text-uqa-deep-blue hover:text-uqa-purple">
            Read the blog for business owners
          </Link>
          .
        </p>
        <nav aria-label="Topics" className="-mx-4 mt-9 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
          <ul className="flex gap-2.5 pb-1 md:flex-wrap">
            <TopicLink href="/library/" label="All topics" active={!activeTopic} />
            {TOPICS.map((t) => (
              <TopicLink key={t.slug} href={`/library/topic/${t.slug}/`} label={t.name} active={activeTopic?.slug === t.slug} />
            ))}
          </ul>
        </nav>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        {posts.length === 0 && (
          <p className="mt-10 text-lg text-uqa-slate">
            No articles in this topic yet. Browse{' '}
            <Link href="/library/" className="text-uqa-deep-blue underline">
              the whole library
            </Link>{' '}
            instead.
          </p>
        )}
        {years.map((year) => (
          <section key={year} aria-labelledby={`year-${year}`} className="mt-14">
            <h2 id={`year-${year}`} className="border-b-2 border-uqa-ink pb-3 font-display text-3xl font-bold text-uqa-ink">
              {year}
            </h2>
            <PostList posts={byYear[year]} showTopic={!activeTopic} />
          </section>
        ))}
      </div>
    </div>
  )
}

function TopicLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li className="flex-shrink-0">
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'block min-h-11 whitespace-nowrap rounded-full border-[1.5px] px-[18px] py-2.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky focus-visible:ring-offset-2',
          active ? 'border-uqa-ink bg-uqa-ink text-white' : 'border-[#cfd4e0] text-uqa-dark hover:border-uqa-ink'
        )}
      >
        {label}
      </Link>
    </li>
  )
}
