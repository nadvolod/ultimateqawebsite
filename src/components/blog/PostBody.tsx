import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { Figure } from './Figure'
import { YouTube } from './YouTube'

const components = {
  Figure,
  YouTube,
  a: ({ href = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith('/') || href.startsWith('#') ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
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
