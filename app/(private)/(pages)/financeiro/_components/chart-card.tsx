"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BarChart } from "@/components/ui/bar-chart"
import { formatCurrency } from "@/lib/utils"

import type { MonthAmount } from "./mock-data"
import { KpiCard } from "./kpi-card"

interface ChartCardProps {
  title: string
  series: MonthAmount[]
  referenceMonth: string
  periodLabel: string
  monthValue: number
  yearValue: number
  monthTitle: string
  yearTitle: string
}

export function ChartCard({
  title,
  series,
  referenceMonth,
  periodLabel,
  monthValue,
  yearValue,
  monthTitle,
  yearTitle,
}: ChartCardProps) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="space-y-4 px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="rounded-full bg-secondary px-2 text-xs text-secondary-foreground">
            {referenceMonth}
          </span>
        </div>

        <Separator />

        <BarChart series={series} height="h-[220px]" highlight={referenceMonth} />

        <div className="grid gap-3 sm:grid-cols-2">
          <KpiCard
            title={monthTitle}
            description={periodLabel}
            value={formatCurrency(monthValue)}
          />
          <KpiCard title={yearTitle} value={formatCurrency(yearValue)} />
        </div>
      </CardContent>
    </Card>
  )
}
