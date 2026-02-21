import type { ProcessStepData } from '@/types'
import { cn } from '@/lib/utils'

interface ProcessStepProps {
  step: ProcessStepData
  isLast?: boolean
}

export function ProcessStep({ step, isLast = false }: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Number circle */}
      <div className="relative z-10 w-14 h-14 rounded-full bg-uqa-deep-blue flex items-center justify-center mb-4 shadow-md group-hover:bg-uqa-bright-blue transition-colors duration-200">
        <span className="font-mono text-lg font-bold text-white">{step.number}</span>
      </div>

      {/* Connector line */}
      {!isLast && (
        <div className="absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-uqa-gray-light hidden lg:block" />
      )}

      <h3 className="font-bold text-uqa-deep-blue text-sm mb-2 leading-snug">{step.title}</h3>
      <p className="text-xs text-uqa-gray-mid leading-relaxed max-w-[140px]">{step.description}</p>
    </div>
  )
}
