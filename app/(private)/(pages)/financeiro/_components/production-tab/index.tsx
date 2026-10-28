"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import type { DashboardSeries } from "../mock-data"
import { ChartCard } from "../chart-card"

interface ProductionTabProps {
  year: number
  onMoveYear: (delta: number) => void
  production: DashboardSeries
  receipts: DashboardSeries
}

export function ProductionTab({
  year,
  onMoveYear,
  production,
  receipts,
}: ProductionTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ButtonGroup>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label="Ano anterior"
            onClick={() => onMoveYear(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="flex items-center px-3 text-sm font-medium">
            {year}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label="Próximo ano"
            onClick={() => onMoveYear(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </ButtonGroup>
      </div>

      <ChartCard
        title="Produção médica"
        series={production.series}
        referenceMonth={production.referenceMonth}
        periodLabel={production.periodLabel}
        monthValue={production.monthValue}
        yearValue={production.yearValue}
        monthTitle="Produção do mês"
        yearTitle="Produção do ano"
      />

      <ChartCard
        title="Recebimentos"
        series={receipts.series}
        referenceMonth={receipts.referenceMonth}
        periodLabel={receipts.periodLabel}
        monthValue={receipts.monthValue}
        yearValue={receipts.yearValue}
        monthTitle="Recebimentos do mês"
        yearTitle="Recebimentos do ano"
      />
    </div>
  )
}
