"use client"

import type { AnalysisRow } from "../../_hooks/use-analysis"
import type {
  AnalysisFilters as AnalysisFiltersState,
  AnalysisSubTab,
} from "../../_hooks/use-analysis-filters"
import type { AnalysisBatch } from "../mock-data"
import { SectionHeader } from "../section-header"
import { AnalysisFilters } from "./analysis-filters"
import { AnalyticTable } from "./analytic-table"
import { SyntheticTable } from "./synthetic-table"

interface AnalysisTabProps {
  subTab: AnalysisSubTab
  onSubTab: (subTab: AnalysisSubTab) => void
  filters: AnalysisFiltersState
  onFilters: (partial: Partial<AnalysisFiltersState>) => void
  onMoveMonth: (delta: number) => void
  onExport: () => void
  rows: AnalysisRow[]
  totals: {
    production: number
    billed: number
    writeOffs: number
    glosses: number
    netWriteOff: number
    glossesToRecover: number
    balance: number
  }
  expanded: string[]
  onExpand: (values: string[]) => void
  batchesFor: (insurer: string) => AnalysisBatch[]
}

export function AnalysisTab({
  subTab,
  onSubTab,
  filters,
  onFilters,
  onMoveMonth,
  onExport,
  rows,
  totals,
  expanded,
  onExpand,
  batchesFor,
}: AnalysisTabProps) {
  return (
    <div className="space-y-4">
      <SectionHeader description="Este relatório é baseado na data de competência do atendimento." />

      <AnalysisFilters
        subTab={subTab}
        onSubTab={onSubTab}
        filters={filters}
        onFilters={onFilters}
        onMoveMonth={onMoveMonth}
        onExport={onExport}
      />

      {subTab === "SYNTHETIC" ? (
        <SyntheticTable referenceMonth={filters.referenceMonth} />
      ) : (
        <AnalyticTable
          rows={rows}
          totals={totals}
          expanded={expanded}
          onExpand={onExpand}
          batchesFor={batchesFor}
        />
      )}
    </div>
  )
}
