"use client"

import { cn, formatCurrency } from "@/lib/utils"

export interface BarSeriesItem {
  month: string
  amount: number
}

interface BarChartProps {
  series: BarSeriesItem[]
  height?: string
  description?: string
  highlight?: string
  className?: string
}

export function BarChart({
  series,
  height = "h-[200px]",
  description,
  highlight,
  className,
}: BarChartProps) {
  const maximum = Math.max(...series.map((item) => item.amount), 1)

  return (
    <div className={cn("space-y-2", className)}>
      <div className={cn("flex items-end gap-2", height)}>
        {series.map((item) => (
          <div
            key={item.month}
            className="flex flex-1 flex-col items-center gap-1"
            title={`${item.month}: ${formatCurrency(item.amount)}`}
          >
            <div
              className={
                highlight && item.month === highlight
                  ? "w-full rounded-t-md bg-primary transition-all"
                  : "w-full rounded-t-md bg-primary/50 transition-all hover:bg-primary"
              }
              style={{
                height: `${Math.max(
                  6,
                  Math.round((item.amount / maximum) * 100)
                )}%`,
              }}
            />
            <span className="text-[10px] text-muted-foreground">
              {item.month}
            </span>
          </div>
        ))}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
