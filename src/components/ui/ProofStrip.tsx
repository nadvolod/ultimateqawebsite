const STATS = [
  { value: '3.5M+', label: 'Learners' },
  { value: '200+', label: 'Companies Served' },
  { value: '900 Min/Day', label: 'Saved' },
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
