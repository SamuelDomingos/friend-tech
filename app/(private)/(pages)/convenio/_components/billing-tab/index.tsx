"use client"

import { formatCurrency } from "@/lib/utils"

import type { Period } from "../../_hooks/use-insurance"
import type {
  InsuranceBillingSummary,
  MonthlySeries,
  ResponsibleSummary,
} from "../mock-data"
import { PeriodSelector } from "../period-selector"
import { SectionHeader } from "../section-header"
import { SummaryTable } from "@/components/ui/summary-table"
import { MonthlyChart } from "./monthly-chart"
import { SummaryCards } from "./summary-cards"

interface BillingTabProps {
  totalSent: number
  batches: number
  pendingGuides: number
  pendingAmount: number
  series: MonthlySeries[]
  period: Period
  onPeriod: (period: Period) => void
  insurances: InsuranceBillingSummary[]
  insuranceTotals: { batchCount: number; amount: number }
  responsibles: ResponsibleSummary[]
  responsibleTotals: { batchCount: number; amount: number }
  classificationTotals: { procedures: number; matmeds: number }
}

export function BillingTab({
  totalSent,
  batches,
  pendingGuides,
  pendingAmount,
  series,
  period,
  onPeriod,
  insurances,
  insuranceTotals,
  responsibles,
  responsibleTotals,
  classificationTotals,
}: BillingTabProps) {
  return (
    <div className="space-y-4">
      <SectionHeader description="Faturamento enviado (pode conter faturamento de atendimentos de mais de uma competência)" />

      <SummaryCards
        totalSent={totalSent}
        batches={batches}
        pendingGuides={pendingGuides}
        pendingAmount={pendingAmount}
      />

      <MonthlyChart series={series} />

      <PeriodSelector
        period={period}
        onPeriod={onPeriod}
        className="flex justify-end"
      />

      <SummaryTable
        title="Faturamento por convênio"
        year="2026"
        columns={[
          { label: "Convênio" },
          { label: "Qtd. lotes", align: "center", width: "120px" },
          { label: "Valor(R$)", align: "right", width: "160px" },
        ]}
        rows={insurances.map((item) => [
          item.insurer,
          item.batchCount,
          formatCurrency(item.amount),
        ])}
        footer={[
          "Total",
          insuranceTotals.batchCount,
          formatCurrency(insuranceTotals.amount),
        ]}
      />

      <SummaryTable
        title="Faturamento por responsável"
        year="2026"
        columns={[
          { label: "Responsável de envio" },
          { label: "Qtd. lotes", align: "center", width: "120px" },
          { label: "Valor(R$)", align: "right", width: "160px" },
        ]}
        rows={responsibles.map((item) => [
          item.responsible,
          item.batchCount,
          formatCurrency(item.amount),
        ])}
        footer={[
          "Total",
          responsibleTotals.batchCount,
          formatCurrency(responsibleTotals.amount),
        ]}
      />

      <SummaryTable
        title="Faturamento por classificação"
        year="2026"
        columns={[
          { label: "Classificação" },
          { label: "Valor(R$)", align: "right", width: "160px" },
        ]}
        rows={[
          ["Procedimentos", formatCurrency(classificationTotals.procedures)],
          ["Matmeds", formatCurrency(classificationTotals.matmeds)],
        ]}
        footer={[
          "Total",
          formatCurrency(
            classificationTotals.procedures + classificationTotals.matmeds
          ),
        ]}
      />
    </div>
  )
}
