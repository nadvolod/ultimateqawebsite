'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from '@/data/navigation'
import { EducationDropdown } from './EducationDropdown'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-uqa-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-bold text-xl text-uqa-deep-blue tracking-tight">
              Ultimate<span className="text-uqa-sky">QA</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return <EducationDropdown key={item.label} item={item} />
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="font-medium text-sm text-uqa-dark hover:text-uqa-deep-blue transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="https://ultimateqaportfolio.vercel.app/"
              external
              variant="primary"
              size="sm"
            >
              See Projects
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-uqa-dark hover:bg-uqa-gray-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uqa-sky"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-uqa-gray-light bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <p className="px-3 py-2 text-xs font-mono font-semibold text-uqa-gray-mid uppercase tracking-wider">
                      {item.label}
                    </p>
                    <div className="pl-3 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-uqa-dark hover:text-uqa-deep-blue hover:bg-uqa-gray-bg rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-uqa-dark hover:text-uqa-deep-blue hover:bg-uqa-gray-bg rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-3 border-t border-uqa-gray-light">
              <Button
                href="https://ultimateqaportfolio.vercel.app/"
                external
                variant="primary"
                size="sm"
                className="w-full justify-center"
              >
                See Projects
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
