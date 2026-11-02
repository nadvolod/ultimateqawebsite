import type { CaseStudy } from '@/types'

export const CASE_STUDIES: CaseStudy[] = [
  // Results below are from UltimateQA's own published case studies on the Legacy Site
  {
    id: 'hotel-mobile-ai',
    company: 'International hotel brand',
    industry: 'Hospitality',
    problem: 'A single mobile test took about 20 minutes and ran on one device at a time, so automation blocked releases instead of speeding them up.',
    approach: 'Rebuilt the Appium and Java suite with JUnit 5, parallel iOS and Android runs, and AI-assisted engineering with Claude Code standards.',
    result: 'All 15 mobile tests across iOS and Android now finish in 11 minutes, with over 98% stability.',
    metric: '25x',
    metricLabel: 'Faster mobile testing',
  },
  {
    id: 'hospitality-runtime',
    company: 'International hotel brand',
    industry: 'Hospitality',
    problem: 'Slow, unstable automated testing for a business-facing mobile app built on outdated tools.',
    approach: 'Refactored the mobile automation to Java, JUnit and Appium with atomic tests that run in parallel.',
    result: 'Test execution time cut by two thirds, giving the team faster, more trustworthy feedback.',
    metric: '66%',
    metricLabel: 'Less test execution time',
  },
  {
    id: 'health-org-automation',
    company: 'International health organization',
    industry: 'Healthcare',
    problem: 'No automated testing: manual checks delayed every release and developers waited for feedback.',
    approach: 'Built API, end-to-end, cross-browser, performance and accessibility tests with Playwright, TypeScript, Azure DevOps and GitHub Actions.',
    result: '8 hours of manual testing saved every day, with feedback to developers within 4 minutes.',
    metric: '8 hrs/day',
    metricLabel: 'Manual testing saved',
  },
]
