"use client"

import { formatDate } from "@/lib/utils"

import { useFinanceFlow } from "../../_hooks/use-finance-flow"
import {
  financeColumns,
  financeFlowConfig,
  type FinanceFlowMode,
} from "../../_lib/finance"
import { DeleteDialog } from "./delete-dialog"
import { FinanceAdvancedFilters } from "./finance-advanced-filters"
import { FinanceFilters } from "./finance-filters"
import { FinanceSummary } from "./finance-summary"
import { FinanceTable } from "./finance-table"
import { FinanceTabs } from "./finance-tabs"
import { MovementDialog } from "./movement-dialog"
import { SettleDialog } from "./settle-dialog"

interface FinanceFlowProps {
  mode: FinanceFlowMode
}

export function FinanceFlow({ mode }: FinanceFlowProps) {
  const flow = useFinanceFlow(mode)
  const rangeLabel = `${formatDate(flow.range.from)} a ${formatDate(
    flow.range.to
  )}`

  return (
    <div className="space-y-4">
      {mode === "to-pay" && (
        <FinanceTabs tab={flow.tab} onTab={flow.setTab} counts={flow.counts} />
      )}

      <FinanceFilters
        mode={mode}
        search={flow.search}
        onSearch={flow.setSearch}
        from={flow.range.from}
        to={flow.range.to}
        onRange={flow.setRange}
        advancedOpen={flow.advancedOpen}
        onToggleAdvanced={() => flow.setAdvancedOpen(!flow.advancedOpen)}
        onExportCsv={flow.exportCsv}
        onExportPdf={() => window.print()}
        onMovement={(kind) => flow.setMovementKind(kind)}
      />

      {flow.advancedOpen && (
        <FinanceAdvancedFilters
          mode={mode}
          initial={flow.advanced}
          onApply={(filters) => {
            flow.setAdvanced(filters)
            flow.setAdvancedOpen(false)
          }}
          onClose={() => flow.setAdvancedOpen(false)}
        />
      )}

      <FinanceSummary
        mode={mode}
        rangeLabel={rangeLabel}
        totalLabel={financeFlowConfig[mode].totalLabel}
        total={flow.totals.amount}
        incomeTotal={flow.totals.incomeTotal}
        incomeCount={flow.totals.incomeCount}
        expenseTotal={flow.totals.expenseTotal}
        expenseCount={flow.totals.expenseCount}
        count={flow.totals.count}
        todayCount={flow.totals.todayCount}
        delayedCount={flow.totals.delayedCount}
        selectedCount={flow.selected.length}
        onSettleSelected={flow.settleSelected}
        onDeleteSelected={flow.removeSelected}
      />

      <FinanceTable
        mode={mode}
        entries={flow.rows}
        columns={financeColumns[mode]}
        selected={flow.selected}
        allSelected={flow.allSelected}
        onToggleAll={flow.toggleAll}
        onToggle={flow.toggleSelected}
        onSettle={flow.setSettling}
        onDownload={flow.downloadEntry}
        onDelete={flow.setDeleting}
      />

      <MovementDialog
        key={flow.movementKind ?? "closed"}
        kind={flow.movementKind ?? "income"}
        open={flow.movementKind !== null}
        onOpenChange={(open) => {
          if (!open) flow.setMovementKind(null)
        }}
        onCreate={flow.addEntry}
      />

      <SettleDialog
        entry={flow.settling}
        onOpenChange={(open) => {
          if (!open) flow.setSettling(null)
        }}
        onConfirm={() => {
          if (flow.settling) flow.settle(flow.settling.id)
          flow.setSettling(null)
        }}
      />

      <DeleteDialog
        entry={flow.deleting}
        onOpenChange={(open) => {
          if (!open) flow.setDeleting(null)
        }}
        onConfirm={() => {
          if (flow.deleting) flow.remove(flow.deleting.id)
          flow.setDeleting(null)
        }}
      />
    </div>
  )
}
