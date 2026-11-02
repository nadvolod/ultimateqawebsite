import { cn } from '@/lib/utils'

/** Marks unpublished Blog Posts; only visible where drafts are built (local dev, SHOW_DRAFTS previews). */
export function DraftBadge({ className }: { className?: string }) {
  return (
    <span className={cn('inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900', className)}>
      Draft
    </span>
  )
}
