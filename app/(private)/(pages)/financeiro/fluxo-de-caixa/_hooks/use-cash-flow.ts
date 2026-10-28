"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import {
  cashFlowAccountsMock,
  cashFlowStartingBalanceMock,
} from "../_components/cash-flow-mock"

const MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
]

export function useCashFlow() {
  const [year, setYear] = useState(2026)
  const [units, setUnits] = useState<string[]>([])
  const [costCenters, setCostCenters] = useState<string[]>([])
  const [showPaid, setShowPaid] = useState(true)
  const [showUnpaid, setShowUnpaid] = useState(true)

  function moveYear(delta: number) {
    setYear((current) => current + delta)
  }

  const factor = useMemo(() => {
    if (showPaid && showUnpaid) return 1
    if (showPaid) return 0.7
    if (showUnpaid) return 0.3
    return 0
  }, [showPaid, showUnpaid])

  const months = useMemo(
    () => MONTHS.map((month) => `${month}/${String(year).slice(2)}`),
    [year]
  )

  const accounts = useMemo(
    () =>
      cashFlowAccountsMock.map((account) => ({
        title: account.title,
        values: account.values.map((value) => Math.round(value * factor)),
      })),
    [factor]
  )

  const summary = useMemo(() => {
    const receipts = accounts[0]?.values ?? []
    const payments = accounts[1]?.values ?? []

    const net = receipts.map((value, index) => value - (payments[index] ?? 0))

    let balance = cashFlowStartingBalanceMock
    const previous: number[] = []
    const final: number[] = []

    net.forEach((value) => {
      previous.push(balance)
      balance += value
      final.push(balance)
    })

    return { net, previous, final }
  }, [accounts])

  function exportCsv() {
    const rows = [
      ["Conta", ...months, "Total"],
      ...accounts.map((account) => [
        account.title,
        ...account.values,
        account.values.reduce((sum, value) => sum + value, 0),
      ]),
      ["Fluxo de caixa líquido do período", ...summary.net],
      ["Saldo Anterior", ...summary.previous],
      ["Saldo final", ...summary.final],
    ]

    const csv = rows
      .map((row) => row.map((value) => `"${value}"`).join(";"))
      .join("\r\n")

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `fluxo-de-caixa-${year}.csv`
    link.click()
    URL.revokeObjectURL(url)

    toast("Fluxo de caixa exportado.")
  }

  return {
    year,
    moveYear,
    months,
    accounts,
    summary,
    units,
    setUnits,
    costCenters,
    setCostCenters,
    showPaid,
    setShowPaid,
    showUnpaid,
    setShowUnpaid,
    exportCsv,
  }
}
