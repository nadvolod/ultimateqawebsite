export interface NavChild {
  label: string
  href: string
  external?: boolean
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
  children?: NavChild[]
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image?: string
  href: string
  metric?: string
  metricLabel?: string
}

export interface CaseStudy {
  id: string
  company: string
  industry: string
  problem: string
  approach: string
  result: string
  metric: string
  metricLabel: string
}

export interface Differentiator {
  id: string
  icon: string
  title: string
  description: string
}

export interface ProcessStepData {
  number: string
  title: string
  description: string
}

export interface EducationLink {
  label: string
  href: string
  description: string
}

export type OfferId = 'consulting' | 'speaking' | 'courses'
export type CtaId = OfferId | 'newsletter'

export interface Topic {
  slug: string
  name: string
  description: string
  offer: OfferId
  legacyCategories: string[]
}

export type GoalId = 'customers' | 'time' | 'sales' | 'tools'

export interface Goal {
  id: GoalId
  name: string
  description: string
  /** The Goal phrased as the problem a business owner would recognise; used by the /blog hero picker. */
  problem: string
}

/** A Legacy Site Post that stays in the Engineering Library but is also listed under a Goal in the Blog. */
export interface BridgePost {
  slug: string
  goal: GoalId
  /** Card copy written for business owners; the Post itself is unchanged. */
  pitch: string
}

export interface Cta {
  id: CtaId
  kind: string
  headline: string
  pitch: string
  action: string
  href: string
}

export interface PostFrontmatter {
  title: string
  description: string
  seoTitle?: string
  date: string
  modified?: string
  /** Engineering Library Posts have a Topic; Blog Posts have a Goal instead. */
  topic?: string
  goal?: GoalId
  /** Where a Blog Post sits on the /blog front page. */
  placement?: 'lead' | 'start-here'
  /** Drafts are only built locally or when SHOW_DRAFTS=1. */
  status?: 'draft'
  image?: string
  legacyId?: number
  legacyCategories?: string[]
  /** Overrides the automatic mid-post Offer CTA; extra ids add further CTAs. */
  ctas?: CtaId[]
}

export interface Post extends PostFrontmatter {
  slug: string
  body: string
  readingMinutes: number
}

/** One card on the /blog front page: a Blog Post, or a Bridge Post with its business-owner pitch. */
export interface BlogEntry {
  slug: string
  title: string
  dek: string
  goal: GoalId
  date: string
  readingMinutes: number
  placement?: 'lead' | 'start-here'
  image?: string
  draft: boolean
  /** True for Bridge Posts, which come from the Engineering Library. */
  fromLibrary: boolean
}
