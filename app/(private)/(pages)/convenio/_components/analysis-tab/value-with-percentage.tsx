"use client"

import { formatCurrency } from "@/lib/utils"

interface ValueWithPercentageProps {
  value: number
  percentage: number
}

export function ValueWithPercentage({
  value,
  percentage,
}: ValueWithPercentageProps) {
  return (
    <span className="whitespace-nowrap">
      {formatCurrency(value)}
      <span className="ml-1 text-[11px] text-muted-foreground">
        ({percentage}%)
      </span>
    </span>
  )
}
