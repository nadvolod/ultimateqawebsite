import type { Project } from '@/types'

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'fraud-detection',
    title: 'Real-Time Fraud Detection Pipeline',
    description:
      'Multi-agent AI system that scores transactions in real time and flags likely fraud for review.',
    tags: ['AI/ML', 'LangGraph', 'Python', 'Redis'],
    href: 'https://ultimateqaportfolio.vercel.app/',
  },
  {
    id: 'test-intelligence',
    title: 'AI-Powered Test Intelligence Platform',
    description:
      'Generates tests and explains failures automatically, so engineers spend less time on manual triage.',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Temporal'],
    href: 'https://ultimateqaportfolio.vercel.app/',
  },
  {
    id: 'ecommerce-platform',
    title: 'High-Performance E-Commerce Platform',
    description:
      'Fast Next.js storefront built around Core Web Vitals and a conversion-focused checkout.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    href: 'https://ultimateqaportfolio.vercel.app/',
  },
  {
    id: 'education-platform',
    title: 'Scalable Learning Management System',
    description:
      'Full-stack learning platform with real-time progress tracking, AI-generated exercises and multi-tenant architecture.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
    href: 'https://ultimateqaportfolio.vercel.app/',
  },
]
