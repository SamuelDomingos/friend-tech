"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import { useAnalysis } from "../_hooks/use-analysis"
import { useAnalysisFilters } from "../_hooks/use-analysis-filters"
import { useGlosses } from "../_hooks/use-glosses"
import { useInsurance, type InsuranceTab } from "../_hooks/use-insurance"
import { AnalysisTab } from "./analysis-tab"
import { BillingTab } from "./billing-tab"
import { GlossesTab } from "./glosses-tab"
import { PaymentsTab } from "./payments-tab"

const TABS: { value: InsuranceTab; label: string }[] = [
  { value: "billing", label: "Faturamento" },
  { value: "payments", label: "Baixas" },
  { value: "glosses", label: "Glosas" },
  { value: "analysis", label: "Análise geral" },
]

export function InsuranceView() {
  const insurance = useInsurance()
  const analysisFilters = useAnalysisFilters()
  const analysis = useAnalysis(analysisFilters.filters.insurances)
  const glosses = useGlosses()

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ButtonGroup>
          {TABS.map((tab) => (
            <Button
              key={tab.value}
              type="button"
              size="sm"
              variant={insurance.tab === tab.value ? "default" : "secondary"}
              onClick={() => insurance.setTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {insurance.tab === "billing" && (
        <BillingTab
          totalSent={insurance.totalSent}
          batches={insurance.batches}
          pendingGuides={insurance.pendingGuides.length}
          pendingAmount={insurance.pendingAmount}
          series={insurance.series}
          period={insurance.period}
          onPeriod={insurance.setPeriod}
          insurances={insurance.insurances}
          insuranceTotals={insurance.insuranceTotals}
          responsibles={insurance.responsibles}
          responsibleTotals={insurance.responsibleTotals}
          classificationTotals={insurance.classificationTotals}
        />
      )}

      {insurance.tab === "payments" && (
        <PaymentsTab guides={insurance.guides} />
      )}

      {insurance.tab === "glosses" && (
        <GlossesTab
          period={insurance.period}
          onPeriod={insurance.setPeriod}
          data={glosses}
        />
      )}

      {insurance.tab === "analysis" && (
        <AnalysisTab
          subTab={analysisFilters.subTab}
          onSubTab={analysisFilters.setSubTab}
          filters={analysisFilters.filters}
          onFilters={analysisFilters.updateFilters}
          onMoveMonth={analysisFilters.moveMonth}
          onExport={analysis.exportCsv}
          rows={analysis.rows}
          totals={analysis.totals}
          expanded={analysis.expanded}
          onExpand={analysis.setExpanded}
          batchesFor={analysis.batchesFor}
        />
      )}
    </div>
  )
}
