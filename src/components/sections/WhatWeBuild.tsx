import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeInView } from '@/components/animations/FadeInView'
import Link from 'next/link'

const PILLAR_A = {
  title: 'High-Quality Websites',
  icon: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="24" height="18" rx="2" stroke="#003c96" strokeWidth="1.5" />
      <line x1="2" y1="10" x2="26" y2="10" stroke="#003c96" strokeWidth="1.5" />
      <circle cx="5.5" cy="7.5" r="1" fill="#003c96" />
      <circle cx="8.5" cy="7.5" r="1" fill="#003c96" />
      <circle cx="11.5" cy="7.5" r="1" fill="#003c96" />
    </svg>
  ),
  description: 'Pixel-perfect, conversion-optimized web experiences engineered for performance and built to scale.',
  bullets: [
    'Full-stack Next.js applications',
    'Conversion-optimized landing pages',
    'Performance & Core Web Vitals',
    'Design-to-code fidelity',
    'E-commerce and booking systems',
  ],
  cta: { label: 'View Web Projects', href: 'https://ultimateqaportfolio.vercel.app/' },
}

const PILLAR_B = {
  title: 'Agentic AI Systems',
  icon: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="5" stroke="#8c3cf9" strokeWidth="1.5" />
      <path d="M14 5V3M14 25V23M5 14H3M25 14H23M7.22 7.22L5.81 5.81M22.19 22.19L20.78 20.78M20.78 7.22L22.19 5.81M5.81 22.19L7.22 20.78" stroke="#8c3cf9" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  description: 'Production-grade multi-agent systems that automate complex workflows and unlock new business capabilities.',
  bullets: [
    'Multi-agent orchestration (Temporal, LangGraph)',
    'Real-time fraud detection pipelines',
    'AI-powered test intelligence',
    'OpenAI/Anthropic integrations',
    'Production-grade reliability + guardrails',
  ],
  cta: { label: 'View AI Projects', href: 'https://ultimateqaportfolio.vercel.app/' },
}

function Pillar({ data, accent }: { data: typeof PILLAR_A; accent: 'blue' | 'purple' }) {
  const accentColor = accent === 'blue' ? 'text-uqa-deep-blue' : 'text-uqa-purple'
  const bgAccent = accent === 'blue' ? 'bg-uqa-deep-blue/8 border-uqa-deep-blue/20' : 'bg-uqa-purple/8 border-uqa-purple/20'
  const bulletColor = accent === 'blue' ? 'text-uqa-sky' : 'text-uqa-purple'

  return (
    <div className="flex flex-col p-8 rounded-2xl border border-uqa-gray-light bg-white hover:shadow-card-hover transition-all duration-300 group">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border ${bgAccent} mb-6`}>
        {data.icon}
      </div>

      <h3 className={`text-2xl font-bold mb-3 ${accentColor}`}>{data.title}</h3>
      <p className="text-uqa-gray-mid text-base leading-relaxed mb-6">{data.description}</p>

      <ul className="space-y-2.5 mb-8 flex-1">
        {data.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-uqa-dark">
            <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${bulletColor}`} viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {bullet}
          </li>
        ))}
      </ul>

      <Link
        href={data.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accentColor} hover:gap-2.5 transition-all duration-200`}
      >
        {data.cta.label}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}

export function WhatWeBuild() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <SectionHeader
            eyebrow="What We Build"
            title="Two pillars of engineering excellence"
            subtitle="We don't spread thin across every technology. We go deep on the two disciplines where engineering quality directly impacts business outcomes."
          />
        </FadeInView>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeInView delay={0.1}>
            <Pillar data={PILLAR_A} accent="blue" />
          </FadeInView>
          <FadeInView delay={0.2}>
            <Pillar data={PILLAR_B} accent="purple" />
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
