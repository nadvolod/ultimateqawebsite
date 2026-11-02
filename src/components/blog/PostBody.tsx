import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { Figure } from './Figure'
import { YouTube } from './YouTube'
import { getPost } from '@/lib/posts'

const LEGACY_ORIGIN = 'https://ultimateqa.com'
const SITE_SECTIONS = new Set(['', 'blog', 'library'])

/**
 * Internal links resolve on this site only when the target exists here (a section or a migrated Post).
 * Anything else still lives on the Legacy Site, so it gets the absolute ultimateqa.com address:
 * the WordPress page before Cutover, and the Redirect Map after it.
 */
function resolveInternal(href: string): string {
  if (href.startsWith('#')) return href
  const first = href.split(/[?#]/)[0].split('/')[1] ?? ''
  if (SITE_SECTIONS.has(first) || getPost(first)) return href
  return LEGACY_ORIGIN + href
}

const components = {
  Figure,
  YouTube,
  a: ({ href = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href.startsWith('/') && !href.startsWith('#')) return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    const resolved = resolveInternal(href)
    return resolved === href ? <Link href={href} {...props} /> : <a href={resolved} {...props} />
  },
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
}

export function PostBody({ source }: { source: string }) {
  if (!source.trim()) return null
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, { theme: 'github-dark-default', keepBackground: false, defaultLang: { block: 'text' } }],
          ],
        },
      }}
    />
  )
}
