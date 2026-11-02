import Link from 'next/link'
import type { Post } from '@/types'
import { getTopic } from '@/data/topics'
import { formatDate } from '@/lib/utils'

export function PostList({ posts, showTopic = false }: { posts: Post[]; showTopic?: boolean }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-uqa-line py-7">
          <article className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
            <time dateTime={post.date} className="pt-1.5 text-sm text-[#5b6272]">
              {formatDate(post.date)}
            </time>
            <div>
              <h3 className="font-display text-[23px] font-bold leading-snug text-uqa-ink">
                <Link href={`/${post.slug}/`} className="hover:text-uqa-deep-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-[17px] leading-relaxed text-uqa-slate">{post.description}</p>
              <p className="mt-3 flex gap-4 text-sm text-[#5b6272]">
                {showTopic && post.topic && (
                  <Link href={`/library/topic/${post.topic}/`} className="font-semibold text-uqa-purple hover:text-uqa-deep-blue">
                    {getTopic(post.topic).name}
                  </Link>
                )}
                <span>{post.readingMinutes} min read</span>
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
