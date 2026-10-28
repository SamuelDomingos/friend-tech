"use client"

import { formatCurrency, formatDate } from "@/lib/utils"

import { SummaryMiniCard } from "@/components/ui/summary-mini-card"

interface SummaryCardsProps {
  totalSent: number
  batches: number
  pendingGuides: number
  pendingAmount: number
}

export function SummaryCards({
  totalSent,
  batches,
  pendingGuides,
  pendingAmount,
}: SummaryCardsProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="text-lg font-semibold">Enviados mês a mês</h2>

      <div className="flex flex-col gap-3 sm:flex-row">
        <SummaryMiniCard
          title="Guias a enviar"
          badge={pendingGuides}
          description={`Valores até ${formatDate(new Date())}`}
          value={formatCurrency(pendingAmount)}
        />

        <SummaryMiniCard
          title="Faturamento"
          badge={batches}
          description="Acumulado 12 meses"
          value={formatCurrency(totalSent)}
        />
      </div>
    </div>
  )
}
