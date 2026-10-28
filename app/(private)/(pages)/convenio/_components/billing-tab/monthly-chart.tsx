"use client"

import { Card, CardContent } from "@/components/ui/card"

import { BarChart } from "@/components/ui/bar-chart"
import type { MonthlySeries } from "../mock-data"

interface MonthlyChartProps {
  series: MonthlySeries[]
}

export function MonthlyChart({ series }: MonthlyChartProps) {
  const chartSeries = series.map((item) => ({
    month: item.month,
    amount: item.amount,
  }))

  return (
    <Card className="gap-0 py-0">
      <CardContent className="space-y-2 px-4 py-4">
        <BarChart series={chartSeries} height="h-[360px]" />

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Valores em R$</span>
          <span>Qtd. Lotes</span>
        </div>
      </CardContent>
    </Card>
  )
}
