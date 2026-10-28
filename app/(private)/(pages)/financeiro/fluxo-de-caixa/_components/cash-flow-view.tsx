"use client"

import { useCashFlow } from "../_hooks/use-cash-flow"
import { CashFlowFilters } from "./cash-flow-filters"
import { CashFlowTable } from "./cash-flow-table"

export function CashFlowView() {
  const cashFlow = useCashFlow()

  return (
    <div className="space-y-4">
      <CashFlowFilters
        year={cashFlow.year}
        onMoveYear={cashFlow.moveYear}
        units={cashFlow.units}
        onUnits={cashFlow.setUnits}
        costCenters={cashFlow.costCenters}
        onCostCenters={cashFlow.setCostCenters}
        showPaid={cashFlow.showPaid}
        onShowPaid={cashFlow.setShowPaid}
        showUnpaid={cashFlow.showUnpaid}
        onShowUnpaid={cashFlow.setShowUnpaid}
        onExport={cashFlow.exportCsv}
      />

      <CashFlowTable
        months={cashFlow.months}
        accounts={cashFlow.accounts}
        summary={cashFlow.summary}
      />
    </div>
  )
}
