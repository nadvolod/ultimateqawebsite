import { NextResponse, type NextRequest } from 'next/server'
import { practicePage } from '@/data/practice-pages'

/** Divi contact forms on Practice Pages POST back to the page URL; answer them the way WordPress did. */
export function middleware(request: NextRequest) {
  const page = practicePage(request.nextUrl.pathname)
  if (request.method !== 'POST' || !page?.forms) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = '/api/practice-form/'
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/complicated-page/:path*', '/filling-out-forms/:path*', '/complicated-page', '/filling-out-forms'],
}
