import { SectionHeader } from '@/components/ui/SectionHeader'
import { CaseSnippet } from '@/components/ui/CaseSnippet'
import { FadeInView } from '@/components/animations/FadeInView'
import { CASE_STUDIES } from '@/data/caseStudies'

export function SocialProof() {
  return (
    <section className="py-24 bg-uqa-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <SectionHeader
            eyebrow="Case Studies"
            title="Results, not promises"
            subtitle="Real problems, real solutions, real numbers. Each engagement is measured by the business outcome it drives."
          />
        </FadeInView>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.slice(0, 3).map((study, i) => (
            <FadeInView key={study.id} delay={i * 0.1}>
              <CaseSnippet caseStudy={study} />
            </FadeInView>
          ))}
        </div>

        {/* Second row — 2 centered */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[calc(66.67%+12px)] mx-auto">
          {CASE_STUDIES.slice(3).map((study, i) => (
            <FadeInView key={study.id} delay={(i + 3) * 0.1}>
              <CaseSnippet caseStudy={study} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
