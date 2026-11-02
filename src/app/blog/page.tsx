import type { Metadata } from 'next'
import { getBlogEntries, getLibraryPosts } from '@/lib/posts'
import { getTopic } from '@/data/topics'
import { Magazine } from '@/components/blog/Magazine'

const description = 'Plain-English ideas for business owners: where AI wins you customers, saves your team hours and lifts sales.'

export const metadata: Metadata = {
  title: { absolute: 'Make more money with AI - Ultimate QA Blog' },
  description,
  alternates: { canonical: '/blog/' },
}

export default function BlogPage() {
  const library = getLibraryPosts().map((p) => ({ slug: p.slug, title: p.title, topicName: getTopic(p.topic!).name }))
  return <Magazine entries={getBlogEntries()} library={library} />
}
