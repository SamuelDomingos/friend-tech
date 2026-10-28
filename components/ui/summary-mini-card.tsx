"use client"

import { cn } from "@/lib/utils"

interface SummaryMiniCardProps {
  title: string
  description?: string
  badge?: string | number
  value: string
  className?: string
}

export function SummaryMiniCard({
  title,
  description,
  badge,
  value,
  className,
}: SummaryMiniCardProps) {
  return (
    <div
      className={cn(
        "min-w-[210px] rounded-lg border bg-card px-4 py-3",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{title}</p>

        {badge !== undefined && (
          <span className="rounded-full bg-secondary px-2 text-xs text-secondary-foreground">
            {badge}
          </span>
        )}
      </div>

      {description && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}

      <p className="mt-1 text-right text-lg font-semibold">{value}</p>
    </div>
  )
}
