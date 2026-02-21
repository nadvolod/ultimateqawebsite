import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProcessStep } from '@/components/ui/ProcessStep'
import { FadeInView } from '@/components/animations/FadeInView'
import type { ProcessStepData } from '@/types'

const STEPS: ProcessStepData[] = [
  {
    number: '01',
    title: 'Discovery & Scoping',
    description: 'Deep dive into your goals, constraints, and success metrics. No assumptions.',
  },
  {
    number: '02',
    title: 'Architecture Design',
    description: 'We design the system architecture with scalability, reliability, and maintainability in mind.',
  },
  {
    number: '03',
    title: 'Iterative Build',
    description: 'Rapid sprint cycles with continuous delivery to staging. You see progress every week.',
  },
  {
    number: '04',
    title: 'Quality Engineering',
    description: 'Automated test suites, performance audits, and security reviews baked in — not bolted on.',
  },
  {
    number: '05',
    title: 'Production Launch',
    description: 'Zero-downtime deployment with monitoring, alerting, and runbooks ready from day one.',
  },
  {
    number: '06',
    title: 'Ownership Handoff',
    description: 'Full documentation, ADRs, and onboarding session so your team owns the system confidently.',
  },
]

export function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <SectionHeader
            eyebrow="How We Work"
            title="A process built for predictability"
            subtitle="Engineering projects fail when expectations drift. Our process keeps you informed, involved, and confident at every step."
          />
        </FadeInView>

        <FadeInView delay={0.15}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            {STEPS.map((step, i) => (
              <ProcessStep key={step.number} step={step} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
