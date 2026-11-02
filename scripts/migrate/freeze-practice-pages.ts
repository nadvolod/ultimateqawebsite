/**
 * Freeze the Practice Pages (ADR 0002): copy their archived HTML verbatim and make them self-hosted.
 *
 *   npx tsx scripts/migrate/freeze-practice-pages.ts [archiveDir]   (default ../ultimateqa-archive)
 *
 * - The page HTML is kept byte-for-byte except for asset URLs (CSS, JS, fonts, images) on WordPress hosts,
 *   which are downloaded to public/practice/assets/<host>/<path> and rewritten to that local path
 * - Folder URLs that Divi's scripts use as a base for runtime assets are rewritten the same way
 * - Links between pages are left alone: they point at ultimateqa.com, which is this site after Cutover
 * - Writes public/practice/pages/<key>.html and content/practice/structure.json (the element signature
 *   that scripts/check-practice-pages.ts compares against on every build)
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { PRACTICE_PAGES } from '../../src/data/practice-pages'
import { structureOf } from '../practice-structure'

const ROOT = path.resolve(__dirname, '../..')
const ARCHIVE = path.resolve(process.argv[2] ?? path.join(ROOT, '../ultimateqa-archive'))
const ASSET_DIR = path.join(ROOT, 'public/practice/assets')
const PAGE_DIR = path.join(ROOT, 'public/practice/pages')

/** Hosts that disappear with the Legacy Site. ultimateqa.com counts only for WordPress asset paths. */
const ASSET_URL =
  /https?:(?:\\?\/){2}(?:ultimateqa\.com(?:\\?\/)(?:wp-content|wp-includes)|hb\.wpmucdn\.com|[a-z0-9-]+\.assetcdn\.net|ultimateqa(?:\.staging)?\.wpmudev\.host|i[0-3]\.wp\.com)[^\s"'()<>]*/gi
const ASSET_EXT = /\.(css|js|mjs|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|json)$/i

const unescapeUrl = (u: string) => u.replace(/\\\//g, '/').replace(/&amp;/g, '&').replace(/&#038;/g, '&')

/** Folder URLs (no extension) are base paths Divi's scripts build runtime asset URLs from: mapped, never downloaded. */
const isFolder = (pathname: string) => !path.posix.extname(pathname)

function localPath(url: string): string | null {
  const u = new URL(url)
  const file = decodeURIComponent(u.pathname)
  if (!ASSET_EXT.test(file) && !isFolder(file)) return null
  return path.posix.join('/practice/assets', u.hostname, file) + (isFolder(file) && file.endsWith('/') ? '/' : '')
}

const downloaded = new Map<string, boolean>()

async function download(url: string): Promise<boolean> {
  if (downloaded.has(url)) return downloaded.get(url)!
  const local = localPath(url)
  if (!local) return false
  if (isFolder(new URL(url).pathname)) return true
  const dest = path.join(ROOT, 'public', local)
  let ok = true
  try {
    await fs.access(dest)
  } catch {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (UltimateQA migration)' } })
    if (!res.ok) {
      console.warn(`  ! ${res.status} ${url}`)
      ok = false
    } else {
      await fs.mkdir(path.dirname(dest), { recursive: true })
      const body = Buffer.from(await res.arrayBuffer())
      if (dest.endsWith('.css')) {
        const css = body.toString('utf8')
        await followCss(url, css)
        await fs.writeFile(dest, await localiseCss(css))
      } else await fs.writeFile(dest, body)
    }
  }
  downloaded.set(url, ok)
  return ok
}

/** Fonts, images and @imports referenced by a stylesheet; relative refs keep working because paths are mirrored. */
async function followCss(cssUrl: string, css: string) {
  const refs = [...css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)|@import\s+['"]([^'"]+)['"]/g)]
  for (const m of refs) {
    const ref = (m[1] ?? m[2]).trim()
    if (ref.startsWith('data:') || ref.startsWith('#')) continue
    const abs = new URL(ref, cssUrl)
    abs.search = ''
    abs.hash = ''
    if (abs.href.match(ASSET_URL)) await download(abs.href)
  }
}

/** Absolute WordPress asset URLs inside a stylesheet point at the local mirror too. */
async function localiseCss(css: string): Promise<string> {
  for (const raw of new Set(css.match(ASSET_URL) ?? [])) {
    const url = unescapeUrl(raw)
    const local = localPath(url.split('?')[0])
    if (local && (await download(url.split('?')[0]))) css = css.split(raw).join(local)
  }
  return css
}

async function freeze(page: (typeof PRACTICE_PAGES)[number]) {
  const source = path.join(ARCHIVE, 'html/pages', `${page.archiveFile}.html`)
  let html = await fs.readFile(source, 'utf8')
  const original = structureOf(html)
  const found = new Set(html.match(ASSET_URL) ?? [])
  let rewritten = 0
  for (const raw of found) {
    const url = unescapeUrl(raw).split('#')[0]
    const local = localPath(url.split('?')[0])
    if (!local || !(await download(url))) continue
    // keep the original query string (cache-busting ?ver=) so attribute values change as little as possible
    const query = url.includes('?') ? raw.slice(raw.indexOf('?')) : ''
    const replacement = raw.includes('\\/') ? (local + query).replace(/\//g, '\\/') : local + query
    html = html.split(raw).join(replacement)
    rewritten++
  }
  if (structureOf(html) !== original) throw new Error(`${page.path}: localising assets changed the page structure`)
  await fs.mkdir(PAGE_DIR, { recursive: true })
  await fs.writeFile(path.join(PAGE_DIR, `${page.key}.html`), html)
  console.log(`✓ ${page.path} (${rewritten} asset URLs localised)`)
  return [page.key, structureOf(html)] as const
}

async function main() {
  const structure: Record<string, string> = {}
  for (const page of PRACTICE_PAGES) {
    const [key, sig] = await freeze(page)
    structure[key] = sig
  }
  await fs.mkdir(path.join(ROOT, 'content/practice'), { recursive: true })
  await fs.writeFile(path.join(ROOT, 'content/practice/structure.json'), JSON.stringify(structure, null, 2) + '\n')
  const failed = [...downloaded].filter(([, ok]) => !ok).length
  console.log(`\n${downloaded.size} assets, ${failed} failed`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
