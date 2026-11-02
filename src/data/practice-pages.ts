/**
 * Practice Pages (ADR 0002): frozen copies of Legacy Site pages that people's automation scripts run against.
 * `path` is the public URL and must never change; `key` names the frozen file in public/practice/pages/.
 * `forms` lists the Divi contact forms on the page, which this site answers the way WordPress did.
 */
export interface PracticePage {
  path: string
  key: string
  archiveFile: string
  forms?: number
}

export const PRACTICE_PAGES: PracticePage[] = [
  { path: '/automation/', key: 'automation', archiveFile: 'automation' },
  { path: '/automation/fake-pricing-page/', key: 'fake-pricing-page', archiveFile: 'fake-pricing-page' },
  { path: '/complicated-page/', key: 'complicated-page', archiveFile: 'complicated-page', forms: 3 },
  { path: '/fake-landing-page/', key: 'fake-landing-page', archiveFile: 'fake-landing-page' },
  { path: '/fake-landing-page-small/', key: 'fake-landing-page-small', archiveFile: 'fake-landing-page-small' },
  { path: '/filling-out-forms/', key: 'filling-out-forms', archiveFile: 'filling-out-forms', forms: 2 },
  { path: '/simple-html-elements-for-automation/', key: 'simple-html-elements-for-automation', archiveFile: 'simple-html-elements-for-automation' },
  ...[1, 2, 3, 4, 5].map((n) => ({
    path: `/sample-application-lifecycle-sprint-${n}/`,
    key: `sample-application-lifecycle-sprint-${n}`,
    archiveFile: `sample-application-lifecycle-sprint-${n}`,
  })),
  { path: '/sample-application-lifecycle-form-page-2/', key: 'sample-application-lifecycle-form-page-2', archiveFile: 'sample-application-lifecycle-form-page-2' },
]

/** The success markup WordPress put inside `#et_pb_contact_form_N` after a submit (captured 2026-11-01). */
export const DIVI_SUCCESS_MESSAGE = '<div class="et-pb-contact-message"><p>Thanks for contacting us</p></div>'

export function practicePage(pathname: string): PracticePage | undefined {
  const normalised = pathname.endsWith('/') ? pathname : `${pathname}/`
  return PRACTICE_PAGES.find((p) => p.path === normalised)
}
