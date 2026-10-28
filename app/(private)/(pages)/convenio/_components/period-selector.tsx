"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import type { Period } from "../_hooks/use-insurance"

const PERIODS: { value: Period; label: string }[] = [
  { value: "year", label: "Ano atual" },
  { value: "month", label: "Mês atual" },
  { value: "lastMonth", label: "Mês anterior" },
  { value: "all", label: "Todos" },
]

interface PeriodSelectorProps {
  period: Period
  onPeriod: (period: Period) => void
  className?: string
}

export function PeriodSelector({
  period,
  onPeriod,
  className,
}: PeriodSelectorProps) {
  return (
    <div className={className}>
      <ButtonGroup>
        {PERIODS.map((item) => (
          <Button
            key={item.value}
            type="button"
            size="sm"
            variant={period === item.value ? "default" : "secondary"}
            onClick={() => onPeriod(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}
