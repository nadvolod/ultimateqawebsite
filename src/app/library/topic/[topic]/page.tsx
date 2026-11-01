import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TOPICS } from '@/data/topics'
import { getPostsByTopic } from '@/lib/posts'
import { LibraryIndex } from '@/components/blog/LibraryIndex'

export const dynamicParams = false

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params
  const topic = TOPICS.find((t) => t.slug === slug)
  if (!topic) return {}
  return {
    title: { absolute: `${topic.name} - Ultimate QA` },
    description: topic.description,
    alternates: { canonical: `/library/topic/${topic.slug}/` },
  }
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const topic = TOPICS.find((t) => t.slug === slug)
  if (!topic) notFound()
  return <LibraryIndex posts={getPostsByTopic(topic.slug)} title={topic.name} description={topic.description} activeTopic={topic} />
}
