import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeInView } from '@/components/animations/FadeInView'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const EDUCATION_LINKS = [
  {
    label: 'Free Courses',
    href: 'https://courses.ultimateqa.com/collections',
    description: 'Start your automation journey with zero cost.',
    icon: '🎓',
  },
  {
    label: 'Selenium Java',
    href: 'https://courses.ultimateqa.com/courses/selenium-java-bootcamp',
    description: 'Complete Selenium WebDriver course in Java.',
    icon: '☕',
  },
  {
    label: 'Video Courses (Udemy)',
    href: 'https://www.udemy.com/user/nikolay/?kw=nikolay+advolodkin',
    description: 'Best-selling automation courses on Udemy.',
    icon: '▶️',
  },
  {
    label: 'Selenium C#',
    href: 'https://courses.ultimateqa.com/courses/selenium-with-c',
    description: 'Selenium WebDriver for .NET developers.',
    icon: '#️⃣',
  },
  {
    label: 'Automation Exercises',
    href: 'https://ultimateqa.com/automation/',
    description: 'Practice automation on purpose-built test sites.',
    icon: '🔬',
  },
  {
    label: 'Selenium Resources',
    href: 'https://ultimateqa.com/best-selenium-webdriver-resources/',
    description: 'Curated library of Selenium learning resources.',
    icon: '📚',
  },
]

export function EducationNewsletter() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <SectionHeader
            eyebrow="Learn & Stay Informed"
            title="3.5M learners can't be wrong"
            subtitle="Whether you're starting your automation journey or staying sharp on AI — we've built the resources."
          />
        </FadeInView>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education links — 2/3 */}
          <FadeInView delay={0.1} className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-xl border border-uqa-gray-light hover:border-uqa-sky/40 hover:shadow-card transition-all duration-200"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{link.icon}</span>
                  <div>
                    <h3 className="font-semibold text-uqa-deep-blue text-sm group-hover:text-uqa-sky transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-xs text-uqa-gray-mid mt-0.5 leading-relaxed">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInView>

          {/* Newsletter card — 1/3 */}
          <FadeInView delay={0.2}>
            <div className="flex flex-col bg-gradient-card rounded-2xl p-8 border border-white/10 h-full">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-uqa-sky/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-uqa-sky">
                  <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M22 6L12 13 2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Stay Ahead of the Curve</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                Get practical insights on AI engineering, web performance, and automation — delivered straight to your inbox. No fluff, just signal.
              </p>

              <div className="space-y-3">
                <div className="flex gap-2 text-xs text-white/50">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-uqa-sky flex-shrink-0 mt-0.5">
                    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Weekly deep-dives on AI & engineering
                </div>
                <div className="flex gap-2 text-xs text-white/50">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-uqa-sky flex-shrink-0 mt-0.5">
                    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Trusted by engineers at top companies
                </div>
                <div className="flex gap-2 text-xs text-white/50">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-uqa-sky flex-shrink-0 mt-0.5">
                    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Unsubscribe anytime, zero spam
                </div>
              </div>

              <div className="mt-6">
                <Button
                  href="https://ultimateqa.ck.page/profile"
                  external
                  variant="primary"
                  size="md"
                  className="w-full justify-center bg-uqa-sky hover:bg-white hover:text-uqa-deep-blue border-0"
                >
                  Join the Newsletter
                </Button>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
