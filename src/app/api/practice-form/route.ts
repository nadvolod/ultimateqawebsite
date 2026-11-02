import { DIVI_SUCCESS_MESSAGE, practicePage } from '@/data/practice-pages'

/**
 * Stand-in for WordPress's Divi contact form handler on Practice Pages. WordPress answered a submit with the
 * whole page, the submitted form's container emptied down to a success message; Divi's script then swaps
 * that container into the live page. Nothing is stored or emailed.
 */
export async function POST(request: Request) {
  // reached through the middleware rewrite, so request.url is still the Practice Page's own URL
  const page = practicePage(new URL(request.url).pathname)
  if (!page?.forms) return new Response('Not found', { status: 404 })

  const form = await request.formData()
  const submitted = [...form.keys()].map((k) => k.match(/^et_pb_contactform_submit_(\d+)$/)?.[1]).find(Boolean)
  const res = await fetch(new URL(`/practice/pages/${page.key}.html`, request.url))
  let html = await res.text()
  if (submitted !== undefined) html = withSuccessMessage(html, Number(submitted))
  return new Response(html, { headers: { 'content-type': 'text/html; charset=UTF-8' } })
}

/** Replace the contents of `#et_pb_contact_form_N` (a div with nested divs) with the success message. */
function withSuccessMessage(html: string, n: number): string {
  const open = html.match(new RegExp(`<div id="et_pb_contact_form_${n}"[^>]*>`))
  if (!open || open.index === undefined) return html
  const start = open.index + open[0].length
  let depth = 1
  const tags = /<div\b[^>]*>|<\/div>/g
  tags.lastIndex = start
  for (let m = tags.exec(html); m; m = tags.exec(html)) {
    depth += m[0] === '</div>' ? -1 : 1
    if (depth === 0) return `${html.slice(0, start)}\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t${DIVI_SUCCESS_MESSAGE}\n\t\t\t\t\n\t\t\t${html.slice(m.index)}`
  }
  return html
}
