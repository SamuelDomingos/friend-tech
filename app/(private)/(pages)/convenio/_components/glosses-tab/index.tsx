"use client"

import { formatCurrency } from "@/lib/utils"

import type { useGlosses } from "../../_hooks/use-glosses"
import type { Period } from "../../_hooks/use-insurance"
import { PeriodSelector } from "../period-selector"
import { SectionHeader } from "../section-header"
import { SummaryTable } from "@/components/ui/summary-table"
import { GlossesBalance } from "./glosses-balance"
import { GlossesSummary } from "./glosses-summary"

interface GlossesTabProps {
  period: Period
  onPeriod: (period: Period) => void
  data: ReturnType<typeof useGlosses>
}

export function GlossesTab({ period, onPeriod, data }: GlossesTabProps) {
  return (
    <div className="space-y-4">
      <SectionHeader description="Glosas contidas nos extratos (pode conter glosas de atendimentos de mais de uma competência)" />

      <GlossesSummary
        toRecover={data.summary.toRecover}
        recoveredPercentage={data.summary.recoveredPercentage}
        averagePercentage={data.summary.averagePercentage}
        series={data.summary.series}
      />

      <PeriodSelector
        period={period}
        onPeriod={onPeriod}
        className="flex justify-end"
      />

      <div className="grid items-start gap-4 xl:grid-cols-2">
        <GlossesBalance
          items={data.balance.items}
          total={data.balance.total}
          resubmitted={data.balance.resubmitted}
          percentage={data.percentage}
        />

        <SummaryTable
          title="Glosas por convênio"
          year="2026"
          columns={[
            { label: "Convênio" },
            { label: "Valor faturado(R$)", align: "right" },
            { label: "Valor glosado(R$)", align: "right" },
            { label: "%", align: "right", width: "80px" },
          ]}
          rows={data.byInsurance.items.map((item) => [
            item.insurer,
            formatCurrency(item.billed),
            formatCurrency(item.glossed),
            data.percentage(item.glossed, item.billed),
          ])}
          footer={[
            "Total",
            formatCurrency(data.byInsurance.totalBilled),
            formatCurrency(data.byInsurance.totalGlossed),
            data.percentage(
              data.byInsurance.totalGlossed,
              data.byInsurance.totalBilled
            ),
          ]}
        />

        <SummaryTable
          title="Glosas por responsável recepção"
          year="2026"
          columns={[
            { label: "Nome" },
            { label: "Valor glosado(R$)", align: "right" },
            { label: "%", align: "right", width: "80px" },
          ]}
          rows={data.byResponsible.map((item) => [
            item.name,
            formatCurrency(item.glossed),
            data.percentage(item.glossed, item.total),
          ])}
        />

        <SummaryTable
          title="Glosas por classificação"
          year="2026"
          columns={[
            { label: "Classificação" },
            { label: "Valor(R$)", align: "right", width: "140px" },
          ]}
          rows={data.byClassification.flatMap((group) => [
            [
              <span key={`${group.group}-title`} className="font-medium">
                {group.group}
              </span>,
              <span key={`${group.group}-total`} className="font-medium">
                {formatCurrency(group.total)}
              </span>,
            ],
            ...group.items.map((item) => [
              <span key={`${group.group}-${item.name}`} className="pl-4">
                {item.name}
              </span>,
              formatCurrency(item.total),
            ]),
          ])}
          footer={["Total", formatCurrency(data.classificationTotal)]}
        />
      </div>
    </div>
  )
}
