"use client"

import { Download } from "lucide-react"

import { BarChart } from "@/components/ui/bar-chart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SummaryTable } from "@/components/ui/summary-table"
import { formatCurrency, formatDate } from "@/lib/utils"

import type {
  PaymentMethodTotal,
  ReceivableDateTotal,
  ReceivableRow,
} from "../mock-data"
import { KpiCard } from "../kpi-card"

interface ReceivableTabProps {
  paymentMethods: PaymentMethodTotal[]
  dateTotals: ReceivableDateTotal[]
  summary: { overdue: number; next30: number; after30: number }
  total: number
  rows: ReceivableRow[]
  onExport: () => void
}

export function ReceivableTab({
  paymentMethods,
  dateTotals,
  summary,
  total,
  rows,
  onExport,
}: ReceivableTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">A Receber</h2>

        <Button type="button" variant="secondary" size="sm" onClick={onExport}>
          <Download className="size-4" />
          Exportar
        </Button>
      </div>

      <Separator />

      <div className="grid items-start gap-4 xl:grid-cols-2">
        <section className="space-y-3">
          <h3 className="text-sm font-semibold">Forma de pagamento</h3>
          <Separator />

          <BarChart
            series={paymentMethods.map((item) => ({
              month: item.method,
              amount: item.amount,
            }))}
            height="h-[250px]"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <KpiCard
              title="Vencido"
              value={formatCurrency(summary.overdue)}
            />
            <KpiCard
              title="Vence nos próximos 30 dias"
              value={formatCurrency(summary.next30)}
            />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold">Por data</h3>
          <Separator />

          <BarChart
            series={dateTotals.map((item) => ({
              month: item.label,
              amount: item.amount,
            }))}
            height="h-[250px]"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <KpiCard
              title="A partir dos próximos 30 dias"
              value={formatCurrency(summary.after30)}
            />
            <KpiCard title="Total" value={formatCurrency(total)} />
          </div>
        </section>
      </div>

      <SummaryTable
        title="Lançamentos a receber"
        columns={[
          { label: "Data", width: "120px" },
          { label: "Paciente" },
          { label: "Descrição" },
          { label: "Status", align: "center", width: "120px" },
          { label: "Pagamento", width: "140px" },
          { label: "Valor", align: "right", width: "140px" },
        ]}
        rows={rows.map((row) => [
          formatDate(row.date),
          row.patient,
          row.description,
          row.status,
          row.payment,
          formatCurrency(row.amount),
        ])}
        footer={[
          "Total",
          "",
          "",
          "",
          "",
          formatCurrency(rows.reduce((sum, row) => sum + row.amount, 0)),
        ]}
      />
    </div>
  )
}
