"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import {
  financeEntriesMock,
  type FinanceEntry,
  type FinanceEntryStatus,
} from "../_components/finance-flow-mock"
import { financeEntryDetailsMock } from "../_components/finance-entry-details"
import type { FinanceFlowMode } from "../_lib/finance"
import type { MovementKind } from "../_schemas/finance-movement.schema"
import { isWithinRange, monthRange } from "../_lib/finance"
import {
  FINANCE_FILTERS_INITIAL,
  type FinanceFiltersFormData,
} from "../_schemas/finance-filters.schema"

export type FinanceTab = "pending" | "approved"

export function useFinanceFlow(mode: FinanceFlowMode) {
  const [entries, setEntries] = useState<FinanceEntry[]>(financeEntriesMock)
  const [tab, setTab] = useState<FinanceTab>("pending")
  const [search, setSearch] = useState("")
  const [range, setRange] = useState(monthRange())
  const [advanced, setAdvanced] = useState<FinanceFiltersFormData>(
    FINANCE_FILTERS_INITIAL
  )
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [movementKind, setMovementKind] = useState<MovementKind | null>(null)
  const [settling, setSettling] = useState<FinanceEntry | null>(null)
  const [deleting, setDeleting] = useState<FinanceEntry | null>(null)
  const [selected, setSelected] = useState<string[]>([])

  const base = useMemo(() => {
    return entries.filter((entry) => {
      if (mode === "to-pay") {
        if (entry.type !== "PAY") return false
        return tab === "pending"
          ? entry.status === "PENDING"
          : entry.status === "APPROVED"
      }

      if (mode === "to-receive") {
        return entry.type === "RECEIVE" && entry.status === "PENDING"
      }

      return entry.status === "PAID" || entry.status === "RECEIVED"
    })
  }, [entries, mode, tab])

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase()

    return base.filter((entry) => {
      if (!isWithinRange(entry.date, range.from, range.to)) return false

      if (term) {
        const detail = financeEntryDetailsMock[entry.id]
        const target = [
          entry.party,
          entry.description,
          entry.documentNumber,
          detail?.professional ?? "",
          detail?.bankAccount ?? "",
        ]
          .join(" ")
          .toLowerCase()
        if (!target.includes(term)) return false
      }

      const detail = financeEntryDetailsMock[entry.id]

      if (advanced.type) {
        const type = entry.type === "PAY" ? "expense" : "income"
        if (type !== advanced.type) return false
      }
      if (advanced.account && detail?.bankAccount !== advanced.account) {
        return false
      }
      if (
        advanced.professional &&
        detail?.professional !== advanced.professional
      ) {
        return false
      }
      if (advanced.payment && detail?.paymentMethod !== advanced.payment) {
        return false
      }
      if (advanced.tag && detail?.tag !== advanced.tag) return false
      if (advanced.category && detail?.category !== advanced.category) {
        return false
      }

      return true
    })
  }, [base, search, range, advanced])

  const totals = useMemo(() => {
    const amount = rows.reduce((sum, entry) => sum + entry.amount, 0)
    const today = new Date().toISOString().slice(0, 10)

    return {
      amount,
      count: rows.length,
      incomeTotal: rows
        .filter((entry) => entry.type === "RECEIVE")
        .reduce((sum, entry) => sum + entry.amount, 0),
      incomeCount: rows.filter((entry) => entry.type === "RECEIVE").length,
      expenseTotal: rows
        .filter((entry) => entry.type === "PAY")
        .reduce((sum, entry) => sum + entry.amount, 0),
      expenseCount: rows.filter((entry) => entry.type === "PAY").length,
      todayCount: rows.filter((entry) => entry.date === today).length,
      delayedCount: rows.filter(
        (entry) =>
          entry.date < today &&
          entry.status !== "PAID" &&
          entry.status !== "RECEIVED"
      ).length,
    }
  }, [rows])

  const counts = useMemo(() => {
    const pay = entries.filter((entry) => entry.type === "PAY")
    return {
      pending: pay.filter((entry) => entry.status === "PENDING").length,
      approved: pay.filter((entry) => entry.status === "APPROVED").length,
    }
  }, [entries])

  const allSelected =
    rows.length > 0 && rows.every((row) => selected.includes(row.id))

  function toggleSelected(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  function toggleAll() {
    setSelected(allSelected ? [] : rows.map((row) => row.id))
  }

  function clearFilters() {
    const initial = monthRange()
    setSearch("")
    setRange(initial)
    setAdvanced(FINANCE_FILTERS_INITIAL)
    setSelected([])
  }

  function nextStatus(entry: FinanceEntry): FinanceEntryStatus {
    return entry.type === "PAY" ? "PAID" : "RECEIVED"
  }

  function settle(id: string) {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, status: nextStatus(entry) } : entry
      )
    )
  }

  function settleSelected() {
    if (selected.length === 0) return

    setEntries((current) =>
      current.map((entry) =>
        selected.includes(entry.id)
          ? { ...entry, status: nextStatus(entry) }
          : entry
      )
    )
    setSelected([])
    toast("Baixa realizada.")
  }

  function remove(id: string) {
    setEntries((current) => current.filter((entry) => entry.id !== id))
    setSelected((current) => current.filter((item) => item !== id))
  }

  function removeSelected() {
    if (selected.length === 0) return

    setEntries((current) =>
      current.filter((entry) => !selected.includes(entry.id))
    )
    setSelected([])
    toast("Lançamentos excluídos.")
  }

  function addEntry(entry: Omit<FinanceEntry, "id" | "status" | "hasNfse">) {
    setEntries((current) => [
      {
        ...entry,
        id: `f${Date.now()}`,
        status: "PENDING",
        hasNfse: false,
      },
      ...current,
    ])
    toast("Movimentação criada.")
  }

  function downloadEntry(entry: FinanceEntry) {
    const csv = [
      ["Data", "Documento", "Competencia", "Favorecido", "Descricao", "Valor"],
      [
        entry.date,
        entry.documentNumber,
        entry.competence,
        entry.party,
        entry.description,
        entry.amount,
      ],
    ]
      .map((line) => line.map((value) => `"${value}"`).join(";"))
      .join("\r\n")

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `lancamento-${entry.documentNumber}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  function exportCsv() {
    if (rows.length === 0) {
      toast("Nenhum registro para exportar.")
      return
    }

    const csv = [
      ["Data", "Nº Doc.", "Competência", "Favorecido", "Descrição", "Valor"],
      ...rows.map((entry) => [
        entry.date,
        entry.documentNumber,
        entry.competence,
        entry.party,
        entry.description,
        entry.amount,
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
    link.download = "financeiro.csv"
    link.click()
    URL.revokeObjectURL(url)

    toast("Arquivo exportado.")
  }

  return {
    mode,
    tab,
    setTab,
    search,
    setSearch,
    range,
    setRange,
    advanced,
    setAdvanced,
    advancedOpen,
    setAdvancedOpen,
        movementKind,
    setMovementKind,
    settling,
    setSettling,
    deleting,
    setDeleting,
    rows,
    totals,
    counts,
    selected,
    allSelected,
    toggleSelected,
    toggleAll,
    clearFilters,
    settle,
    settleSelected,
    remove,
    removeSelected,
    addEntry,
    exportCsv,
    downloadEntry,
  }
}
