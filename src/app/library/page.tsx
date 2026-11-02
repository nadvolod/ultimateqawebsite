import type { Metadata } from 'next'
import { getLibraryPosts } from '@/lib/posts'
import { LibraryIndex } from '@/components/blog/LibraryIndex'

const description = 'Practical guides on test automation, Selenium, CI/CD and AI-assisted engineering, written for developers and QA teams since 2016.'

export const metadata: Metadata = {
  title: { absolute: 'Engineering Library - Ultimate QA' },
  description,
  alternates: { canonical: '/library/' },
}

export default function LibraryPage() {
  return <LibraryIndex posts={getLibraryPosts()} title="Engineering library" description={description} />
}
