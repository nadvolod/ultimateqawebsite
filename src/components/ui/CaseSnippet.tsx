import type { CaseStudy } from '@/types'

interface CaseSnippetProps {
  caseStudy: CaseStudy
}

export function CaseSnippet({ caseStudy }: CaseSnippetProps) {
  return (
    <div className="bg-white rounded-2xl border border-uqa-gray-light p-6 hover:border-uqa-sky/40 hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="font-mono text-xs text-uqa-sky uppercase tracking-wider mb-1">{caseStudy.industry}</p>
          <h3 className="font-bold text-uqa-deep-blue text-base">{caseStudy.company}</h3>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-mono text-2xl font-bold text-uqa-deep-blue leading-none">{caseStudy.metric}</div>
          <div className="text-xs text-uqa-gray-mid mt-0.5 max-w-[100px]">{caseStudy.metricLabel}</div>
        </div>
      </div>

      {/* Problem → Approach → Result */}
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold font-mono text-uqa-gray-mid uppercase tracking-wider">Problem</span>
          <p className="text-sm text-uqa-dark mt-1 leading-relaxed">{caseStudy.problem}</p>
        </div>
        <div>
          <span className="text-xs font-semibold font-mono text-uqa-sky uppercase tracking-wider">Approach</span>
          <p className="text-sm text-uqa-dark mt-1 leading-relaxed">{caseStudy.approach}</p>
        </div>
        <div>
          <span className="text-xs font-semibold font-mono text-uqa-deep-blue uppercase tracking-wider">Result</span>
          <p className="text-sm text-uqa-dark mt-1 leading-relaxed">{caseStudy.result}</p>
        </div>
      </div>
    </div>
  )
}
