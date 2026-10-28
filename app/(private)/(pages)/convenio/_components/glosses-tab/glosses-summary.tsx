"use client"

import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

import { BarChart } from "@/components/ui/bar-chart"
import { SummaryMiniCard } from "@/components/ui/summary-mini-card"

interface GlossSeriesItem {
  month: string
  amount: number
}

interface GlossesSummaryProps {
  toRecover: number
  recoveredPercentage: number
  averagePercentage: number
  series: GlossSeriesItem[]
}

export function GlossesSummary({
  toRecover,
  recoveredPercentage,
  averagePercentage,
  series,
}: GlossesSummaryProps) {
  const total = series.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-semibold">Últimos 12 meses</h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SummaryMiniCard
            title="Glosas a recuperar"
            value={formatCurrency(toRecover)}
          />
          <SummaryMiniCard
            title="%Recuperado"
            value={`${recoveredPercentage}%`}
            className="min-w-[160px]"
          />
          <SummaryMiniCard
            title="%Médio"
            value={`${averagePercentage}%`}
            className="min-w-[140px]"
          />
        </div>
      </div>

      <Card className="gap-0 py-0">
        <CardContent className="px-4 py-4">
          <BarChart
            series={series}
            height="h-[180px]"
            description={`Glosas no período: ${formatCurrency(total)}`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
