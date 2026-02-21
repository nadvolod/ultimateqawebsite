import { Button } from '@/components/ui/Button'
import { FadeInView } from '@/components/animations/FadeInView'

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-brand relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 50%, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInView>
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">
            Ready to build something exceptional?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Let&apos;s build something
            <br />
            <span className="text-uqa-sky">exceptional together.</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            From AI pipelines to high-performance web apps — if it requires engineering excellence, we&apos;re the team you want.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="https://projects.ultimateqa.com"
              external
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-uqa-deep-blue font-bold hover:bg-uqa-gray-bg"
            >
              See Projects
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-1">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button
              href="https://ck.page/profile"
              external
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/50 hover:border-white hover:bg-white/15"
            >
              Join Newsletter
            </Button>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
