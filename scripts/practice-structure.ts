import { createHash } from 'node:crypto'

/**
 * A Practice Page's public contract: every element's tag, id, class, name and type, in document order.
 * Asset URLs and text are deliberately left out, so localising assets never counts as a change.
 */
export function structureOf(html: string): string {
  const withoutRawText = html.replace(/<(script|style)\b([^>]*)>[\s\S]*?<\/\1>/gi, '<$1$2></$1>').replace(/<!--[\s\S]*?-->/g, '')
  const elements: string[] = []
  for (const m of withoutRawText.matchAll(/<([a-zA-Z][\w-]*)\b([^>]*)>/g)) {
    const attrs = m[2]
    const pick = (name: string) => attrs.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))?.slice(2).find((v) => v !== undefined) ?? ''
    elements.push([m[1].toLowerCase(), pick('id'), pick('class'), pick('name'), pick('type')].join('|'))
  }
  return `${elements.length}:${createHash('sha256').update(elements.join('\n')).digest('hex')}`
}
