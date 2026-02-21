import type { NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Projects',     href: 'https://projects.ultimateqa.com',       external: true },
  { label: 'Case Studies', href: 'https://ultimateqa.com/case-studies/',   external: true },
  { label: 'Blog',         href: 'https://ultimateqa.com/blog/',           external: true },
  { label: 'Newsletter',   href: 'https://ck.page/profile',                external: true },
  {
    label: 'Education',
    href: '#',
    children: [
      { label: 'Free Courses',          href: 'https://ultimateqa.com/free-courses/',         external: true },
      { label: 'Selenium Java',         href: 'https://ultimateqa.com/selenium-java/',         external: true },
      { label: 'Video Courses (Udemy)', href: 'https://ultimateqa.com/udemy/',                external: true },
      { label: 'Selenium C#',           href: 'https://ultimateqa.com/selenium-c-sharp/',     external: true },
      { label: 'Selenium Resources',    href: 'https://ultimateqa.com/selenium-resources/',   external: true },
      { label: 'Automation Exercises',  href: 'https://ultimateqa.com/automation-exercises/', external: true },
    ],
  },
]
