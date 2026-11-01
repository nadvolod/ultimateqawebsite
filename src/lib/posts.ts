import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'
import type { BlogEntry, Post, PostFrontmatter } from '@/types'
import { BRIDGE_POSTS } from '@/data/goals'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const WORDS_PER_MINUTE = 230
/** Drafts appear in `next dev` and in builds with SHOW_DRAFTS=1 (set only for Vercel previews). */
export const SHOW_DRAFTS = process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === '1'

let cache: Post[] | null = null

function readDir(dir: string): Post[] {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), 'utf8'))
      const words = content.replace(/```[\s\S]*?```/g, '').split(/\s+/).length
      return {
        ...(data as PostFrontmatter),
        slug: file.replace(/\.mdx$/, ''),
        body: content,
        readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
      }
    })
}

export function getAllPosts(): Post[] {
  if (cache) return cache
  cache = [...readDir('posts'), ...(SHOW_DRAFTS ? readDir('drafts') : [])].sort((a, b) => b.date.localeCompare(a.date))
  return cache
}

/** Engineering Library Posts: everything with a Topic. */
export function getLibraryPosts(): Post[] {
  return getAllPosts().filter((p) => p.topic)
}

/** The /blog front page: Blog Posts plus Bridge Posts, newest first. */
export function getBlogEntries(): BlogEntry[] {
  const own = getAllPosts()
    .filter((p) => p.goal)
    .map((p) => toEntry(p, p.description, false))
  const bridged = BRIDGE_POSTS.flatMap((b) => {
    const post = getPost(b.slug)
    return post ? [toEntry({ ...post, goal: b.goal }, b.pitch, true)] : []
  })
  return [...own, ...bridged].sort((a, b) => b.date.localeCompare(a.date))
}

function toEntry(p: Post, dek: string, fromLibrary: boolean): BlogEntry {
  return {
    slug: p.slug,
    title: p.title,
    dek,
    goal: p.goal!,
    date: p.date,
    readingMinutes: p.readingMinutes,
    placement: p.placement,
    image: p.image,
    draft: p.status === 'draft',
    fromLibrary,
  }
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getPostsByTopic(topic: string): Post[] {
  return getAllPosts().filter((p) => p.topic === topic)
}

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

/** Walk the MDX source outside code fences, calling `fn` for each line with its fence state. */
function eachLine(body: string, fn: (line: string, index: number) => void) {
  let inFence = false
  body.split('\n').forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    else if (!inFence) fn(line, i)
  })
}

const plainText = (md: string) =>
  md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\\([{}])/g, '$1')
    .replace(/&lt;/g, '<')
    .trim()

/** h2/h3 headings with the same ids rehype-slug will generate. */
export function getHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger()
  const headings: Heading[] = []
  eachLine(body, (line) => {
    const m = line.match(/^(#{2,6})\s+(.+)$/)
    if (!m) return
    const text = plainText(m[2])
    const id = slugger.slug(text)
    if (m[1].length <= 3) headings.push({ id, text, level: m[1].length as 2 | 3 })
  })
  return headings
}

/** Split the body at the h2 closest to `ratio` of its length, so a CTA can sit between sections. */
export function splitBody(body: string, ratio = 0.4): [string, string] {
  const lines = body.split('\n')
  const target = body.length * ratio
  let offset = 0
  let best: { line: number; distance: number } | null = null
  const offsets = lines.map((l) => (offset += l.length + 1) - l.length - 1)
  eachLine(body, (line, i) => {
    if (!/^##\s/.test(line) || offsets[i] < body.length * 0.15) return
    // keep a legacy anchor that precedes the heading attached to it
    const at = i >= 2 && /^<a id=/.test(lines[i - 2]) ? i - 2 : i
    const distance = Math.abs(offsets[at] - target)
    if (!best || distance < best.distance) best = { line: at, distance }
  })
  if (!best) return [body, '']
  const { line } = best
  return [lines.slice(0, line).join('\n'), lines.slice(line).join('\n')]
}
