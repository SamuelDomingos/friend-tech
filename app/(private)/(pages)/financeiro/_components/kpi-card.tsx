"use client"

import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string
  description?: string
  className?: string
}

export function KpiCard({ title, value, description, className }: KpiCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card px-4 py-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <span className="text-[11px] text-muted-foreground">
            {description}
          </span>
        )}
      </div>

      <p className="mt-1 text-right text-xl font-semibold">{value}</p>
    </div>
  )
}
