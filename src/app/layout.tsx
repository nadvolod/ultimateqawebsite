import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'UltimateQA — High-Quality Websites & Agentic AI Systems',
  description:
    'We design AI-powered systems and high-quality websites that scale with your ambition — built on a decade of engineering excellence. 3.5M+ learners, 200+ companies served.',
  metadataBase: new URL('https://ultimateqa.com'),
  openGraph: {
    title: 'UltimateQA — High-Quality Websites & Agentic AI Systems',
    description:
      'We design AI-powered systems and high-quality websites that scale with your ambition — built on a decade of engineering excellence.',
    url: 'https://ultimateqa.com',
    siteName: 'UltimateQA',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UltimateQA — High-Quality Websites & Agentic AI Systems',
    description:
      'We design AI-powered systems and high-quality websites that scale with your ambition.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
