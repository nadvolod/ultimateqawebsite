const STATS = [
  // Only results from published case studies; see src/data/caseStudies.ts
  { value: '25x', label: 'Faster Mobile Testing' },
  { value: '8 Hrs/Day', label: 'Manual Testing Saved' },
  { value: '300+', label: 'Published Guides' },
  { value: 'Since 2015', label: 'Engineering Excellence' },
]

export function ProofStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-12">
      {STATS.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-8">
          <div className="text-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-white leading-none">
              {stat.value}
            </div>
            <div className="text-xs text-white/50 mt-1 uppercase tracking-wider font-medium">
              {stat.label}
            </div>
          </div>
          {i < STATS.length - 1 && (
            <div className="hidden sm:block h-8 w-px bg-white/20" />
          )}
        </div>
      ))}
    </div>
  )
}
