"use client"

import { useState } from "react"
import { toast } from "sonner"

import {
  paymentMethodTotalsMock,
  productionDashboardMock,
  professionalsMock,
  receivableDateTotalsMock,
  receivableRowsMock,
  receivableSummaryMock,
  receiptsDashboardMock,
  type PaymentMethodTotal,
  type ReceivableDateTotal,
  type ReceivableRow,
} from "../_components/mock-data"

export type FinanceTab = "production" | "receivable"

export function useFinanceDashboard() {
  const [tab, setTab] = useState<FinanceTab>("production")
  const [year, setYear] = useState(2026)
  const [professionals, setProfessionals] = useState<string[]>([])

  function moveYear(delta: number) {
    setYear((current) => current + delta)
  }

  const production = productionDashboardMock
  const receipts = receiptsDashboardMock

  const paymentMethods: PaymentMethodTotal[] = paymentMethodTotalsMock
  const dateTotals: ReceivableDateTotal[] = receivableDateTotalsMock

  const receivableTotal =
    receivableSummaryMock.overdue +
    receivableSummaryMock.next30 +
    receivableSummaryMock.after30

  const rows: ReceivableRow[] = receivableRowsMock

  function exportCsv() {
    if (rows.length === 0) {
      toast("Nenhum registro para exportar.")
      return
    }

    const csv = [
      ["Data", "Paciente", "Descrição", "Status", "Pagamento", "Valor"],
      ...rows.map((row) => [
        row.date,
        row.patient,
        row.description,
        row.status,
        row.payment,
        row.amount,
      ]),
    ]
      .map((line) => line.map((value) => `"${value}"`).join(";"))
      .join("\r\n")

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "a-receber.csv"
    link.click()
    URL.revokeObjectURL(url)

    toast("Relatório exportado.")
  }

  return {
    tab,
    setTab,
    year,
    moveYear,
    professionals,
    setProfessionals,
    professionalOptions: professionalsMock,
    production,
    receipts,
    paymentMethods,
    dateTotals,
    receivableSummary: receivableSummaryMock,
    receivableTotal,
    rows,
    exportCsv,
  }
}
