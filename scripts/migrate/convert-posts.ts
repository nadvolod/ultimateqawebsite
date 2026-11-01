/**
 * Convert Legacy Site posts (WordPress REST) into MDX files under content/posts/.
 *
 *   GITHUB_TOKEN=$(gh auth token) npx tsx scripts/migrate/convert-posts.ts <slug> [<slug> ...]
 *
 * - Gutenberg/classic HTML → Markdown via Turndown
 * - YouTube embeds → <YouTube />, GitHub gists → inline fenced code (no client JS)
 * - Every image is downloaded to public/blog/<slug>/ and rendered through <Figure />
 * - Links to ultimateqa.com become root-relative; legacy heading ids are kept as anchors
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import TurndownService from 'turndown'
// @ts-expect-error: no types published
import { gfm } from 'turndown-plugin-gfm'
import { imageSize } from 'image-size'
import { topicForCategories } from './topic-map'

const WP = 'https://ultimateqa.com/wp-json/wp/v2'
const ROOT = path.resolve(__dirname, '../..')
const LEGACY_HOSTS = /^https?:\/\/(www\.)?(ultimateqa\.com|ultimateqa(\.staging)?\.wpmudev\.host)/i

type WpPost = {
  id: number
  slug: string
  date_gmt: string
  modified_gmt: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  categories: number[]
  yoast_head_json?: { title?: string; description?: string; canonical?: string }
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string; alt_text?: string }[]
    'wp:term'?: { id: number; slug: string; taxonomy: string }[][]
  }
}

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()

async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  const res = await fetch(url, { headers: { 'User-Agent': 'ultimateqa-migration', ...headers } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json() as Promise<T>
}

// ---------------------------------------------------------------- images

/** Prefer the original upload over Jetpack/i0.wp.com proxies and resized variants. */
function originalImageUrl(img: HTMLImageElement): string {
  // Lazy-load plugins (Smush, WP Rocket) move the real URLs into data-* attributes and leave a data: URI in src
  const attr = (name: string) => img.getAttribute(name) ?? img.getAttribute(`data-${name}`) ?? img.getAttribute(`data-lazy-${name}`)
  const candidates = [img.getAttribute('data-orig-file'), largestFromSrcset(attr('srcset')), attr('src'), img.getAttribute('data-src')]
  let url = candidates.find((c) => c && !c.startsWith('data:')) as string
  url = url.replace(/&amp;/g, '&')
  const proxied = url.match(/^https?:\/\/i\d\.wp\.com\/([^?]+)/)
  if (proxied) url = `https://${proxied[1]}`
  url = url.replace(LEGACY_HOSTS, 'https://ultimateqa.com')
  if (url.includes('/wp-content/uploads/')) url = url.split('?')[0]
  return url
}

function largestFromSrcset(srcset: string | null): string | null {
  if (!srcset) return null
  const best = srcset
    .split(',')
    .map((s) => s.trim().split(/\s+/))
    .map(([u, w]) => ({ u, w: parseInt(w) || 0 }))
    .sort((a, b) => b.w - a.w)[0]
  return best?.u ?? null
}

async function downloadImage(url: string, slug: string, index: number) {
  const res = await fetch(url, { headers: { 'User-Agent': 'ultimateqa-migration' } })
  if (!res.ok) throw new Error(`image ${res.status} ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const { width, height, type } = imageSize(buf)
  const base = path
    .basename(new URL(url).pathname)
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9-]+/gi, '-')
    .slice(0, 60)
    .replace(/^-+|-+$/g, '')
  const name = `${String(index).padStart(2, '0')}-${base || 'image'}.${type === 'jpg' ? 'jpg' : type}`
  const dir = path.join(ROOT, 'public', 'blog', slug)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, name), buf)
  return { src: `/blog/${slug}/${name}`, width, height }
}

// ---------------------------------------------------------------- embeds

function youtubeEmbed(url: string): { id: string; start?: number } | null {
  const u = decodeURIComponent(url).replace(/&amp;/g, '&')
  const id = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1]
  if (!id) return null
  const start = u.match(/[?&](?:start|t)=(\d+)/)?.[1]
  return { id, start: start ? Number(start) : undefined }
}

async function gistToMarkdown(gistId: string): Promise<string> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const gist = await getJson<{ html_url: string; files: Record<string, { filename: string; language: string | null; content: string }> }>(
    `https://api.github.com/gists/${gistId}`,
    headers
  )
  return Object.values(gist.files)
    .map((f) => {
      const lang = (f.language ?? 'text').toLowerCase().replace('c#', 'csharp').replace(/\s+/g, '')
      return '```' + `${lang} title="${f.filename}"\n${f.content.replace(/\n+$/, '')}\n` + '```'
    })
    .join('\n\n')
}

// ---------------------------------------------------------------- html → mdx

const ENLIGHTER_LANGS: Record<string, string> = { generic: 'text', shell: 'bash', raw: 'text', js: 'javascript', ts: 'typescript' }

function buildTurndown(placeholders: Map<string, () => Promise<string>>, slug: string) {
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '*' })
  td.use(gfm)
  let imageIndex = 0
  const token = (job: () => Promise<string>) => {
    const key = `@@EMBED${placeholders.size}@@`
    placeholders.set(key, job)
    return `\n\n${key}\n\n`
  }

  td.remove(['script', 'style', 'form', 'noscript'])

  td.addRule('embed', {
    filter: (node) => node.nodeName === 'FIGURE' && /wp-block-embed/.test(node.getAttribute('class') ?? ''),
    replacement: (_content, node) => {
      const el = node as HTMLElement
      const url = el.querySelector('iframe')?.getAttribute('src') ?? el.textContent?.trim() ?? ''
      const yt = youtubeEmbed(url)
      if (yt) return `\n\n<YouTube id="${yt.id}"${yt.start ? ` start="${yt.start}"` : ''} />\n\n`
      const gist = url.match(/gist\.github\.com\/[\w-]+\/([0-9a-f]+)/)?.[1]
      if (gist) return token(() => gistToMarkdown(gist))
      return /^https?:/.test(url) ? `\n\n[${url}](${url})\n\n` : ''
    },
  })

  td.addRule('iframe', {
    filter: 'iframe',
    replacement: (_c, node) => {
      const yt = youtubeEmbed((node as HTMLElement).getAttribute('src') ?? '')
      return yt ? `\n\n<YouTube id="${yt.id}"${yt.start ? ` start="${yt.start}"` : ''} />\n\n` : ''
    },
  })

  td.addRule('code', {
    filter: 'pre',
    replacement: (_c, node) => {
      const el = node as HTMLElement
      const raw =
        el.getAttribute('data-enlighter-language') ??
        el.querySelector('code')?.getAttribute('class')?.match(/language-([\w+#-]+)/)?.[1] ??
        ''
      const lang = ENLIGHTER_LANGS[raw] ?? raw.replace('c#', 'csharp')
      const code = (el.textContent ?? '').replace(/\n+$/, '')
      const fence = code.includes('```') ? '````' : '```'
      return `\n\n${fence}${lang}\n${code}\n${fence}\n\n`
    },
  })

  td.addRule('figure-image', {
    filter: (node) => (node.nodeName === 'FIGURE' && !!node.querySelector('img')) || node.nodeName === 'IMG',
    replacement: (_c, node) => {
      const el = node as HTMLElement
      const img = (el.nodeName === 'IMG' ? el : el.querySelector('img')) as HTMLImageElement
      const url = originalImageUrl(img)
      const alt = img.getAttribute('alt') ?? ''
      const caption = el.querySelector?.('figcaption')?.textContent?.trim()
      const index = ++imageIndex
      return token(async () => {
        try {
          const { src, width, height } = await downloadImage(url, slug, index)
          const attrs = [`src="${src}"`, `width="${width}"`, `height="${height}"`, `alt=${JSON.stringify(alt)}`]
          if (caption) attrs.push(`caption=${JSON.stringify(caption)}`)
          return `<Figure ${attrs.join(' ')} />`
        } catch (e) {
          console.warn(`  ! ${(e as Error).message}`)
          return `{/* missing image: ${url} */}`
        }
      })
    },
  })

  td.addRule('heading-anchor', {
    filter: ['h2', 'h3', 'h4', 'h5', 'h6'],
    replacement: (content, node) => {
      const el = node as HTMLElement
      const level = Number(el.nodeName[1])
      const text = content.replace(/\n+/g, ' ').trim()
      if (!text) return ''
      const id = el.getAttribute('id')
      const anchor = id ? `<a id="${id}" />\n\n` : ''
      return `\n\n${anchor}${'#'.repeat(level)} ${text}\n\n`
    },
  })

  td.addRule('link', {
    filter: (node) => node.nodeName === 'A' && !!node.getAttribute('href'),
    replacement: (content, node) => {
      let href = (node as HTMLElement).getAttribute('href') ?? ''
      href = href.replace(LEGACY_HOSTS, '') || '/'
      if (!content.trim()) return ''
      if (/^about:/.test(href)) return ''
      // Tag archives are retired outright; category archives become their Topic page
      if (/^\/tag\//.test(href)) return content
      const category = href.match(/^\/category\/([\w-]+)/)?.[1]
      if (category) href = `/library/topic/${topicForCategories([category])}/`
      // Linked images (usually to their own full-size file): keep the image, drop the link
      if (content.includes('@@EMBED')) return content
      return `[${content}](${href})`
    },
  })

  return td
}

/** Hand-written "Table of Contents" sections duplicate the generated one; drop them. */
function stripManualToc(md: string): string {
  return md.replace(/^#{2,6} \**(table of contents|contents)\**\s*\n+((\s*[-*\d.]+\s+\[[^\]]*\]\(#[^\n]*\)\s*\n)+)/gim, '')
}

function summary(text: string, max = 160): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const sentence = cut.lastIndexOf('. ')
  return sentence > 80 ? cut.slice(0, sentence + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

/** Escape characters MDX would parse as JSX/expressions, leaving code and our components alone. */
function escapeForMdx(md: string): string {
  let inFence = false
  return md
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence
        return line
      }
      if (inFence) return line
      if (/^\s*(<(YouTube|Figure|a id)\b|\{\/\*)/.test(line)) return line
      return line
        .split(/(`+[^`]*`+)/)
        .map((part, i) => (i % 2 ? part : part.replace(/[{}]/g, '\\$&').replace(/</g, '&lt;')))
        .join('')
    })
    .join('\n')
}

async function convert(slug: string) {
  const [post] = await getJson<WpPost[]>(`${WP}/posts?slug=${slug}&_embed=wp:featuredmedia,wp:term`)
  if (!post) throw new Error(`no post with slug ${slug}`)
  console.log(`→ ${slug}`)

  const html = post.content.rendered.replace(/\[toc\]/gi, '')
  const placeholders = new Map<string, () => Promise<string>>()
  let body = buildTurndown(placeholders, slug).turndown(html)
  // Turndown converts children before their parent, so an <img> inside a <figure> queues a job
  // the figure rule then discards; only run jobs whose placeholder survived.
  for (const [key, job] of placeholders) if (body.includes(key)) body = body.replace(key, await job())
  body = escapeForMdx(stripManualToc(body)).replace(/\n{3,}/g, '\n\n').trim()

  const categories = (post._embedded?.['wp:term']?.[0] ?? []).filter((t) => t.taxonomy === 'category').map((t) => t.slug)
  const featured = post._embedded?.['wp:featuredmedia']?.[0]
  const image = featured?.source_url ? await downloadImage(featured.source_url, slug, 0).catch(() => null) : null
  const yoast = post.yoast_head_json ?? {}

  const frontmatter = {
    title: decode(post.title.rendered),
    description: yoast.description ?? summary(decode(post.excerpt.rendered).replace(/\s*\[…\]$/, '')),
    seoTitle: yoast.title,
    date: post.date_gmt + 'Z',
    modified: post.modified_gmt + 'Z',
    topic: topicForCategories(categories),
    image: image?.src,
    legacyId: post.id,
    legacyCategories: categories,
  }
  const yaml = Object.entries(frontmatter)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n')

  const out = path.join(ROOT, 'content', 'posts', `${slug}.mdx`)
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, `---\n${yaml}\n---\n\n${body}\n`)
  console.log(`  wrote ${path.relative(ROOT, out)}`)
}

async function main() {
  const slugs = process.argv.slice(2)
  if (!slugs.length) throw new Error('usage: convert-posts.ts <slug> [<slug> ...]')
  for (const slug of slugs) await convert(slug)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
