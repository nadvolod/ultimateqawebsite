import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getBlogEntries, getHeadings, getPost, getPostsByTopic, splitBody } from '@/lib/posts'
import { getTopic } from '@/data/topics'
import { GOALS } from '@/data/goals'
import { selectCtas } from '@/data/ctas'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'
import { PostBody } from '@/components/blog/PostBody'
import { OfferCta } from '@/components/blog/OfferCta'
import { NewsletterForm } from '@/components/blog/NewsletterForm'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { DraftBadge } from '@/components/blog/DraftBadge'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const url = `/${post.slug}/`
  return {
    title: { absolute: post.seoTitle ?? `${post.title} - Ultimate QA` },
    description: post.description,
    alternates: { canonical: url },
    robots: post.status === 'draft' ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

interface ReadNext {
  slug: string
  label: string
  title: string
}

/** Blog Posts link to more of the Blog (same Goal first); library Posts to the same Topic. */
function readNext(post: Post): ReadNext[] {
  if (post.topic) {
    const topic = getTopic(post.topic)
    return getPostsByTopic(post.topic)
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3)
      .map((p) => ({ slug: p.slug, label: topic.name, title: p.title }))
  }
  const others = getBlogEntries().filter((e) => e.slug !== post.slug)
  return [...others.filter((e) => e.goal === post.goal), ...others.filter((e) => e.goal !== post.goal)].slice(0, 3).map((e) => ({
    slug: e.slug,
    label: GOALS.find((g) => g.id === e.goal)!.name,
    title: e.title,
  }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  const topic = post.topic ? getTopic(post.topic) : undefined
  const goal = GOALS.find((g) => g.id === post.goal)
  const headings = getHeadings(post.body)
  const ctas = selectCtas(post)
  const [beforeOffer, afterOffer] = splitBody(post.body)
  const related = readNext(post)
  const updated = post.modified && formatDate(post.modified) !== formatDate(post.date) && post.modified > post.date

  return (
    <article className="bg-white">
      {/* One centred reading column shared by header and body; the table of contents sits in the right margin. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_680px_minmax(0,1fr)] xl:gap-x-12">
        <header className="mx-auto max-w-[680px] pt-14 xl:col-start-2 xl:row-start-1 xl:w-full">
          {topic && (
            <p className="rounded-xl bg-uqa-mist px-4 py-3 text-[15px] leading-relaxed text-uqa-slate">
              From the{' '}
              <Link href="/library/" className="font-semibold text-uqa-deep-blue hover:text-uqa-purple">
                engineering library
              </Link>
              , written for developers and QA teams. Running a business?{' '}
              <Link href="/blog/" className="font-semibold text-uqa-deep-blue hover:text-uqa-purple">
                Read the blog for business owners
              </Link>
              .
            </p>
          )}
          <p className="mt-8 flex items-center gap-3 text-sm font-semibold">
            {topic ? (
              <Link href={`/library/topic/${topic.slug}/`} className="text-uqa-purple hover:text-uqa-deep-blue">
                {topic.name}
              </Link>
            ) : (
              <Link href="/blog/" className="text-uqa-purple hover:text-uqa-deep-blue">
                {goal?.name ?? 'Blog'}
              </Link>
            )}
            {post.status === 'draft' && <DraftBadge />}
          </p>
          <h1 className="mt-3 text-balance font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-uqa-ink">
            {post.title}
          </h1>
          <p className="mt-6 text-[21px] leading-normal text-uqa-slate">{post.description}</p>
          <div className="mt-7 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dfe6f5] font-bold text-uqa-deep-blue"
            >
              NA
            </span>
            <span className="text-[15px] leading-snug">
              <span className="block font-semibold">Nikolay Advolodkin</span>
              <span className="text-[#5b6272]">
                {post.status !== 'draft' && <time dateTime={post.date}>{formatDate(post.date)}</time>}
                {updated && <> · Updated {formatDate(post.modified!)}</>}
                {post.status !== 'draft' && ' · '}
                {post.readingMinutes} min read
              </span>
            </span>
          </div>
        </header>

        {post.image && (
          <div className="mx-auto mt-10 max-w-[1000px] xl:col-span-3 xl:row-start-2 xl:w-full">
            <Image
              src={post.image}
              alt=""
              width={1200}
              height={675}
              sizes="(min-width: 1000px) 952px, 100vw"
              className="h-auto w-full rounded-[20px]"
              priority
            />
          </div>
        )}

        <div className="mx-auto w-full max-w-[680px] py-12 xl:col-start-2 xl:row-start-3">
          {headings.length > 2 && (
            <details className="mb-10 rounded-xl border border-uqa-line px-5 py-4 xl:hidden">
              <summary className="cursor-pointer font-semibold text-uqa-ink">On this page</summary>
              <ol className="mt-3 space-y-2 text-sm">
                {headings
                  .filter((h) => h.level === 2)
                  .map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-uqa-deep-blue hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
              </ol>
            </details>
          )}

          <div className="prose-post">
            <PostBody source={beforeOffer} />
            {ctas.midPost.map((cta) => (
              <OfferCta key={cta.id} cta={cta} />
            ))}
            <PostBody source={afterOffer} />
          </div>

          <div className="mt-14">
            <NewsletterForm cta={ctas.end} />
          </div>
        </div>

        {headings.length > 2 && (
          <aside className="hidden xl:col-start-3 xl:row-start-3 xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] max-w-[240px] overflow-y-auto py-12">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="read-next" className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          <h2 id="read-next" className="font-display text-3xl font-bold text-uqa-ink">
            Read next
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}/`}
                className="group flex flex-col gap-3 rounded-2xl bg-uqa-mist p-6 transition-colors hover:bg-[#e8ecf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky"
              >
                <span className="text-[13px] font-semibold text-uqa-deep-blue">{r.label}</span>
                <span className="font-display text-[22px] font-bold leading-tight text-uqa-ink group-hover:text-uqa-deep-blue">
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
