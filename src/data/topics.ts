import type { Topic } from '@/types'

/**
 * Topics replace the Legacy Site's 49 categories and 410 tags.
 * `legacyCategories` maps old category slugs onto a Topic (first matching Topic in this list wins),
 * `offer` is the paid Offer promoted mid-post for Posts in this Topic.
 */
export const TOPICS: Topic[] = [
  {
    slug: 'ai-testing',
    name: 'AI in testing',
    description: 'Using AI agents and AI-assisted tools to build and test software faster.',
    offer: 'consulting',
    legacyCategories: ['ai', 'github-spark', 'vibium'],
  },
  {
    slug: 'devops',
    name: 'CI/CD & DevOps',
    description: 'Pipelines, infrastructure and durable workflows that keep releases boring.',
    offer: 'consulting',
    legacyCategories: ['ci-cd', 'devops', 'temporal'],
  },
  {
    slug: 'career',
    name: 'Career & leadership',
    description: 'Growing as an automation engineer, interviews, and lessons from the field.',
    offer: 'speaking',
    legacyCategories: ['careers', 'automation-engineer', 'interviews', 'case-studies', 'philanthropy'],
  },
  {
    slug: 'selenium',
    name: 'Selenium & WebDriver',
    description: 'Locators, waits, page objects and everything else in WebDriver, in Java and C#.',
    offer: 'courses',
    legacyCategories: [
      'selenium-webdriver', 'selenium', 'sychronization', 'selenium-problems', 'webdriverio',
      'csharp', 'visual-studio', 'automation-exercises', 'courses',
    ],
  },
  {
    slug: 'test-automation',
    name: 'Test automation strategy',
    description: 'Patterns, anti-patterns, frameworks and tools for automation that actually pays off.',
    offer: 'consulting',
    legacyCategories: [
      'automation-best-practices', 'test-automation', 'automation', 'automation-tools', 'automation-techniques',
      'test-automation-frameworks', 'automation-productivity', 'software-testing', 'playwright', 'appium',
      'cucumber', 'applitools', 'sauce-labs', 'testproject', 'browser-stack', 'mobile-automation',
      'integration-testing', 'usability-testing',
    ],
  },
  {
    slug: 'web-development',
    name: 'Web development',
    description: 'JavaScript, React and building fast, high-quality websites.',
    offer: 'consulting',
    legacyCategories: ['javascript', 'react', 'react-training', 'development', 'programming', 'programming-languages'],
  },
]

export const DEFAULT_TOPIC = 'test-automation'

export function getTopic(slug: string): Topic {
  return TOPICS.find((t) => t.slug === slug) ?? TOPICS.find((t) => t.slug === DEFAULT_TOPIC)!
}

export function topicForCategories(categories: string[]): string {
  return TOPICS.find((t) => t.legacyCategories.some((c) => categories.includes(c)))?.slug ?? DEFAULT_TOPIC
}
