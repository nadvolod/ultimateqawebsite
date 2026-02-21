import { SectionHeader } from '@/components/ui/SectionHeader'
import { DifferentiatorBlock } from '@/components/ui/DifferentiatorBlock'
import { FadeInView } from '@/components/animations/FadeInView'
import { DIFFERENTIATORS } from '@/data/differentiators'

export function WhyUltimateQA() {
  return (
    <section className="py-24 bg-uqa-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <SectionHeader
            eyebrow="Why UltimateQA"
            title="What separates us from the rest"
            subtitle="Ten years of delivering for companies that demand more than good enough — we know what makes the difference between projects that ship and projects that stick."
          />
        </FadeInView>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <FadeInView key={item.id} delay={i * 0.08}>
              <DifferentiatorBlock item={item} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
