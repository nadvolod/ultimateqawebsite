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
