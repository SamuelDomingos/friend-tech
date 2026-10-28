"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import {
  analysisBatchesMock,
  insurancesMock,
  type AnalysisBatch,
} from "../_components/mock-data"

export interface AnalysisRow {
  insurer: string
  production: number
  billed: number
  writeOffs: number
  glosses: number
  netWriteOff: number
  glossesToRecover: number
  balance: number
  percentages: {
    billed: number
    writeOffs: number
    glosses: number
    netWriteOff: number
    glossesToRecover: number
    balance: number
  }
}

export function useAnalysis(insuranceFilter: string[]) {
  const base = useMemo<AnalysisRow[]>(() => {
    return insurancesMock.map((item) => {
      const billed = item.amount
      const production = Math.round(billed * 1.12)
      const writeOffs = Math.round(billed * 0.72)
      const glosses = Math.round(billed * 0.05)
      const netWriteOff = writeOffs - glosses
      const glossesToRecover = Math.round(glosses * 0.35)
      const balance = billed - netWriteOff

      const pct = (value: number) =>
        billed > 0 ? Number(((value / billed) * 100).toFixed(1)) : 0

      return {
        insurer: item.insurer,
        production,
        billed,
        writeOffs,
        glosses,
        netWriteOff,
        glossesToRecover,
        balance,
        percentages: {
          billed: pct(billed),
          writeOffs: pct(writeOffs),
          glosses: pct(glosses),
          netWriteOff: pct(netWriteOff),
          glossesToRecover: pct(glossesToRecover),
          balance: pct(balance),
        },
      }
    })
  }, [])

  const [expanded, setExpanded] = useState<string[]>([])

  const rows = useMemo(() => {
    if (insuranceFilter.length === 0) {
      return base
    }

    return base.filter((row) => insuranceFilter.includes(row.insurer))
  }, [base, insuranceFilter])

  const totals = useMemo(() => {
    return rows.reduce(
      (total, row) => ({
        production: total.production + row.production,
        billed: total.billed + row.billed,
        writeOffs: total.writeOffs + row.writeOffs,
        glosses: total.glosses + row.glosses,
        netWriteOff: total.netWriteOff + row.netWriteOff,
        glossesToRecover: total.glossesToRecover + row.glossesToRecover,
        balance: total.balance + row.balance,
      }),
      {
        production: 0,
        billed: 0,
        writeOffs: 0,
        glosses: 0,
        netWriteOff: 0,
        glossesToRecover: 0,
        balance: 0,
      }
    )
  }, [rows])

  function batchesFor(insurer: string): AnalysisBatch[] {
    return analysisBatchesMock[insurer] ?? []
  }

  function exportCsv() {
    if (rows.length === 0) {
      toast("Nenhum dado para exportar.")
      return
    }

    const csv = [
      [
        "Convênio",
        "Produção",
        "Faturado",
        "Baixas",
        "Glosas",
        "Baixa líquida",
        "Glosas a recuperar",
        "Saldo",
      ],
      ...rows.map((row) => [
        row.insurer,
        row.production,
        row.billed,
        row.writeOffs,
        row.glosses,
        row.netWriteOff,
        row.glossesToRecover,
        row.balance,
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
    link.download = "analise-convenios.csv"
    link.click()
    URL.revokeObjectURL(url)

    toast("Análise exportada.")
  }

  return {
    rows,
    totals,
    expanded,
    setExpanded,
    batchesFor,
    exportCsv,
  }
}
