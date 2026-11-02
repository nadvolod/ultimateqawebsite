import type { BridgePost, Goal } from '@/types'

/** Goals organise the Blog (business owners); Topics organise the Engineering Library. */
export const GOALS: Goal[] = [
  { id: 'customers', name: 'Get more customers', description: 'Use AI to win attention and answer every enquiry fast.', problem: 'Enquiries wait too long for a reply' },
  { id: 'time', name: 'Save time', description: 'Hand repetitive work to AI and get your hours back.', problem: 'My team is buried in repetitive work' },
  { id: 'sales', name: 'Sell more', description: 'Turn more quotes, leads and existing customers into revenue.', problem: 'Quotes and leads go cold' },
  { id: 'tools', name: 'Choose the right tools', description: 'Plain-English guides to the AI tools worth paying for.', problem: 'I don’t know which AI tools to trust' },
]

/**
 * Legacy Posts cross-listed in the Blog. They keep their Legacy URL and Engineering Library CTAs;
 * only the card pitch is written for business owners.
 */
export const BRIDGE_POSTS: BridgePost[] = [
  {
    slug: 'how-to-use-v0-by-vercel-for-beginners',
    goal: 'tools',
    pitch: 'Describe the website you want in plain English and get a working one, contact form included. A walkthrough of v0, with pricing.',
  },
  {
    slug: 'github-spark-an-excellent-ai-developer',
    goal: 'tools',
    pitch: 'One prompt, one working web app. How GitHub Spark compares with Replit, v0 and Lovable for building without a developer.',
  },
  {
    slug: 'unveiling-thumbnail-wizard',
    goal: 'customers',
    pitch: 'A custom GPT that designs YouTube thumbnails from a video title, so your videos get clicked without hiring a designer.',
  },
  {
    slug: 'daily-time-savings',
    goal: 'time',
    pitch: 'How automation gave a health organisation 8 hours of manual checking back every day, with answers in 4 minutes.',
  },
  {
    slug: 'build-an-ai-system-that-reviews-your-code-yes-really',
    goal: 'time',
    pitch: 'Run a software business? A team of AI reviewers can check every change before it ships, without adding headcount.',
  },
  {
    slug: 'appium-with-java-ai-case-study',
    goal: 'time',
    pitch: 'A hotel brand’s releases were blocked by 20-minute tests. Rebuilt with AI-assisted engineering, they ran 25x faster.',
  },
]
