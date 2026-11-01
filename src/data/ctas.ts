import type { Cta, CtaId, OfferId, PostFrontmatter } from '@/types'
import { getTopic } from '@/data/topics'

// TODO: replace with the real Substack publication URL before launch
export const SUBSTACK_URL = 'https://ultimateqa.substack.com'

/** Consulting lives on the Legacy Site until /consulting/ is migrated; the path stays the same after Cutover. */
const CONSULTING_URL = 'https://ultimateqa.com/consulting/'

export const CTAS: Record<CtaId, Cta> = {
  consulting: {
    id: 'consulting',
    kind: 'Consulting',
    headline: 'Get your test automation reviewed by the person who wrote this',
    pitch:
      'We have cut test run times by up to 25x for our clients. Book a free 30-minute call and leave with a concrete plan for your suite.',
    action: 'Book a free intro call',
    href: CONSULTING_URL,
  },
  speaking: {
    id: 'speaking',
    kind: 'Speaking',
    headline: 'Bring Nikolay to your conference or engineering team',
    pitch: 'Keynotes and hands-on workshops on test automation, AI-assisted engineering and building a culture of quality.',
    action: 'See talks and availability',
    href: 'https://nikolayspeaks.com',
  },
  courses: {
    id: 'courses',
    kind: 'Course',
    headline: 'Learn Selenium WebDriver properly, from the first locator up',
    pitch:
      'The Selenium Java bootcamp takes you from your first test to a framework you would be proud to show in an interview.',
    action: 'View the course',
    href: 'https://courses.ultimateqa.com/courses/selenium-java-bootcamp',
  },
  newsletter: {
    id: 'newsletter',
    kind: 'Newsletter',
    headline: 'One AI idea for your business, every week',
    pitch: 'Short, practical, and something you can try before Friday. Unsubscribe whenever you like.',
    action: 'Subscribe',
    href: SUBSTACK_URL,
  },
}

/** Topic-specific wording for an Offer, so the pitch matches what the reader just read. */
const TOPIC_COPY: Partial<Record<string, Partial<Record<OfferId, Pick<Cta, 'headline' | 'pitch'>>>>> = {
  'ai-testing': {
    consulting: {
      headline: 'Bring AI agents into your engineering team without losing trust in what ships',
      pitch:
        'We design and build agentic AI systems for engineering teams, with the testing discipline to run them in production. Start with a free 30-minute call.',
    },
  },
  'web-development': {
    consulting: {
      headline: 'Need a website that is fast, accessible and actually tested?',
      pitch: 'We build high-quality websites with automated quality checks from day one. Tell us what you need on a free 30-minute call.',
    },
  },
  devops: {
    consulting: {
      headline: 'Make your pipeline the fastest part of your release',
      pitch: 'We untangle slow, flaky CI so every merge ships with confidence. Book a free 30-minute call to review yours.',
    },
  },
}

/** Blog Posts (business owners) get one consulting pitch regardless of Goal. */
const BLOG_CONSULTING: Pick<Cta, 'kind' | 'headline' | 'pitch' | 'action'> = {
  kind: 'Free 30-minute call',
  headline: 'Find out where AI could make your business money',
  pitch:
    "Tell us how you win customers today. We'll show you the two or three places AI would pay for itself first, whether or not you work with us.",
  action: 'Book a free call',
}

function offerFor(id: OfferId, topicSlug: string | undefined): Cta {
  if (!topicSlug) return id === 'consulting' ? { ...CTAS.consulting, ...BLOG_CONSULTING } : CTAS[id]
  return { ...CTAS[id], ...TOPIC_COPY[topicSlug]?.[id] }
}

/**
 * Every Post gets at least two CTAs: a paid Offer mid-post (matched to its Topic, or consulting for Blog Posts) and the Newsletter at the end.
 * `ctas` in front matter replaces the mid-post Offer; any further ids are added after it.
 */
export function selectCtas(post: Pick<PostFrontmatter, 'topic' | 'ctas'>): { midPost: Cta[]; end: Cta } {
  const fallback: OfferId = post.topic ? getTopic(post.topic).offer : 'consulting'
  const offers = (post.ctas ?? [fallback]).filter((id): id is OfferId => id !== 'newsletter')
  return { midPost: offers.map((id) => offerFor(id, post.topic)), end: CTAS.newsletter }
}
