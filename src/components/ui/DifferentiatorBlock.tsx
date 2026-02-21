import type { Differentiator } from '@/types'

interface DifferentiatorBlockProps {
  item: Differentiator
}

export function DifferentiatorBlock({ item }: DifferentiatorBlockProps) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-white border border-uqa-gray-light hover:border-uqa-sky/40 hover:shadow-card-hover transition-all duration-300 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-uqa-deep-blue/8 flex items-center justify-center text-2xl">
        {item.icon}
      </div>
      <div>
        <h3 className="font-bold text-uqa-deep-blue text-base mb-1.5 group-hover:text-uqa-bright-blue transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-uqa-gray-mid leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}
