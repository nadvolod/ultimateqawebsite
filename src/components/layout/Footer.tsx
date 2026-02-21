import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Projects', href: 'https://projects.ultimateqa.com', external: true },
  { label: 'Case Studies', href: 'https://ultimateqa.com/case-studies/', external: true },
  { label: 'Blog', href: 'https://ultimateqa.com/blog/', external: true },
  { label: 'Newsletter', href: 'https://ck.page/profile', external: true },
  { label: 'Free Courses', href: 'https://ultimateqa.com/free-courses/', external: true },
  { label: 'Automation Exercises', href: 'https://ultimateqa.com/automation-exercises/', external: true },
]

export function Footer() {
  return (
    <footer className="bg-uqa-deep-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <span className="font-bold text-2xl text-white tracking-tight">
                Ultimate<span className="text-uqa-sky">QA</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              Engineering excellence meets AI innovation. Building the digital infrastructure for companies that refuse to settle.
            </p>
          </div>

          {/* Links */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} UltimateQA. All rights reserved.
          </p>
          <p className="text-white/40 text-sm font-mono">
            Engineering excellence since 2015
          </p>
        </div>
      </div>
    </footer>
  )
}
