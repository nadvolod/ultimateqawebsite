import { Button } from '@/components/ui/Button'
import { ProofStrip } from '@/components/ui/ProofStrip'
import { OrbitalBackground } from '@/components/animations/OrbitalBackground'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Orbital animation background */}
      <OrbitalBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase text-uqa-sky mb-6">
            <span className="inline-block w-8 h-px bg-uqa-sky/50" />
            Engineering Excellence Since 2015
            <span className="inline-block w-8 h-px bg-uqa-sky/50" />
          </p>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Build Better.
            <br />
            <span className="bg-gradient-to-r from-uqa-sky via-white to-uqa-sky bg-clip-text text-transparent">
              Automate Everything.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            We design AI-powered systems and high-quality websites that scale with your ambition —
            built on a decade of engineering excellence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="https://ultimateqaportfolio.vercel.app/"
              external
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-uqa-sky hover:bg-white hover:text-uqa-deep-blue border-0 shadow-glow-blue"
            >
              See Projects
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-1">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button
              href="https://ultimateqa.ck.page/profile"
              external
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Join Newsletter
            </Button>
          </div>

          {/* Proof strip */}
          <ProofStrip />
        </div>
      </div>
    </section>
  )
}
