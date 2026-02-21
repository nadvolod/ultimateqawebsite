import type { Project } from '@/types'

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'fraud-detection',
    title: 'Real-Time Fraud Detection Pipeline',
    description:
      'Multi-agent AI system that processes 50k transactions/second with sub-100ms latency, reducing fraud losses by 73%.',
    tags: ['AI/ML', 'LangGraph', 'Python', 'Redis'],
    href: 'https://projects.ultimateqa.com',
    metric: '73%',
    metricLabel: 'Fraud Reduction',
  },
  {
    id: 'test-intelligence',
    title: 'AI-Powered Test Intelligence Platform',
    description:
      'Autonomous test generation and failure analysis platform saving 900 minutes per day across 40+ engineering teams.',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Temporal'],
    href: 'https://projects.ultimateqa.com',
    metric: '900 min/day',
    metricLabel: 'Time Saved',
  },
  {
    id: 'ecommerce-platform',
    title: 'High-Performance E-Commerce Platform',
    description:
      'Next.js storefront achieving 99 Lighthouse score and 3.2× conversion uplift through Core Web Vitals optimization.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    href: 'https://projects.ultimateqa.com',
    metric: '3.2×',
    metricLabel: 'Conversion Uplift',
  },
  {
    id: 'education-platform',
    title: 'Scalable Learning Management System',
    description:
      'Full-stack LMS serving 3.5M+ learners with real-time progress tracking, AI-generated exercises, and multi-tenant architecture.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
    href: 'https://projects.ultimateqa.com',
    metric: '3.5M+',
    metricLabel: 'Learners Served',
  },
]
