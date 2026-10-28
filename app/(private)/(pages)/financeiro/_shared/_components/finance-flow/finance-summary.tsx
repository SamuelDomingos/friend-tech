"use client"

import { CheckCheck, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/utils"

import type { FinanceFlowMode } from "../../_lib/finance"

interface FinanceSummaryProps {
  mode: FinanceFlowMode
  rangeLabel: string
  totalLabel: string
  total: number
  incomeTotal: number
  incomeCount: number
  expenseTotal: number
  expenseCount: number
  count: number
  todayCount: number
  delayedCount: number
  selectedCount: number
  onSettleSelected: () => void
  onDeleteSelected: () => void
}

function signed(value: number) {
  return formatCurrency(Math.abs(value)).replace("R$", "").trim()
}

export function FinanceSummary({
  mode,
  rangeLabel,
  totalLabel,
  total,
  incomeTotal,
  incomeCount,
  expenseTotal,
  expenseCount,
  count,
  todayCount,
  delayedCount,
  selectedCount,
  onSettleSelected,
  onDeleteSelected,
}: FinanceSummaryProps) {
  const result = incomeTotal - expenseTotal

  if (mode === "cash-bank") {
    return (
      <div className="space-y-2">
        <h2 className="text-center text-base font-semibold">{rangeLabel}</h2>
        <div className="grid max-w-md grid-cols-[1fr_auto] gap-x-6 gap-y-1 text-sm">
          <span className="text-muted-foreground">
            Total de entradas ({incomeCount}):
          </span>
          <strong className="text-right text-primary">
            {signed(incomeTotal)}
          </strong>
          <span className="text-muted-foreground">
            Total de saídas ({expenseCount}):
          </span>
          <strong className="text-right text-destructive">
            ({signed(expenseTotal)})
          </strong>
          <span className="text-muted-foreground">Resultado (1) - (2):</span>
          <strong
            className={
              result >= 0
                ? "text-right text-primary"
                : "text-right text-destructive"
            }
          >
            {result >= 0 ? signed(result) : `(${signed(result)})`}
          </strong>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">
          {totalLabel}: {formatCurrency(total)}
        </span>
        <span className="rounded-full bg-muted px-2 text-xs text-muted-foreground">
          {count} lançamentos
        </span>
        <span className="rounded-full bg-muted px-2 text-xs text-muted-foreground">
          Hoje: {todayCount}
        </span>
        <span className="rounded-full bg-destructive/10 px-2 text-xs text-destructive">
          Atrasadas: {delayedCount}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={selectedCount === 0}
          >
            Ações Múltiplas ({selectedCount})
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem onClick={onSettleSelected}>
            <CheckCheck className="size-4" />
            Dar baixa
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={onDeleteSelected}>
            <Trash2 className="size-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
