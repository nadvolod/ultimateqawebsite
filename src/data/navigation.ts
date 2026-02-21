import type { NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Projects',     href: 'https://ultimateqaportfolio.vercel.app/',              external: true },
  { label: 'Case Studies', href: 'https://ultimateqa.com/case-studies/',                 external: true },
  { label: 'Blog',         href: 'https://ultimateqa.com/blog/',                         external: true },
  { label: 'Newsletter',   href: 'https://ultimateqa.ck.page/profile',                   external: true },
  {
    label: 'Education',
    href: '#',
    children: [
      { label: 'Free Courses',          href: 'https://courses.ultimateqa.com/collections',               external: true },
      { label: 'Selenium Java',         href: 'https://courses.ultimateqa.com/courses/selenium-java-bootcamp', external: true },
      { label: 'Video Courses (Udemy)', href: 'https://www.udemy.com/user/nikolay/?kw=nikolay+advolodkin', external: true },
      { label: 'Selenium C#',           href: 'https://courses.ultimateqa.com/courses/selenium-with-c',   external: true },
      { label: 'Selenium Resources',    href: 'https://ultimateqa.com/best-selenium-webdriver-resources/', external: true },
      { label: 'Automation Exercises',  href: 'https://ultimateqa.com/automation/',                       external: true },
    ],
  },
]
