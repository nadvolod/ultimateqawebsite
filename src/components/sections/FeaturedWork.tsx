import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FadeInView } from '@/components/animations/FadeInView'
import { FEATURED_PROJECTS } from '@/data/projects'
import Link from 'next/link'

export function FeaturedWork() {
  return (
    <section className="py-24 bg-uqa-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <SectionHeader
              eyebrow="Featured Work"
              title="Projects that move the needle"
              subtitle="A sample of systems and sites we've built — each measured by business impact, not just technical specs."
              align="left"
              dark
            />
            <Link
              href="https://projects.ultimateqa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-uqa-sky hover:text-white transition-colors duration-200"
            >
              View All Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PROJECTS.map((project, i) => (
            <FadeInView key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
