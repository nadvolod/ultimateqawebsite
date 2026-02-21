import Link from 'next/link'
import { TagPill } from './TagPill'
import { MetricBadge } from './MetricBadge'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-[#0d1f42] border border-white/10 rounded-2xl overflow-hidden
                 hover:border-uqa-sky/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue"
    >
      {/* Card top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-uqa-deep-blue via-uqa-bright-blue to-uqa-purple" />

      <div className="flex flex-col flex-1 p-6">
        {/* Metric */}
        {project.metric && (
          <div className="mb-4">
            <MetricBadge value={project.metric} label={project.metricLabel ?? ''} dark />
          </div>
        )}

        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-uqa-sky transition-colors duration-200 mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-white/60 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagPill key={tag} label={tag} variant="dark" />
          ))}
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-uqa-sky">
          <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  )
}
