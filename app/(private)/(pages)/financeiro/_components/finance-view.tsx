"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { MultiSelect } from "@/components/ui/multi-select"

import {
  useFinanceDashboard,
  type FinanceTab,
} from "../_hooks/use-finance-dashboard"
import { ProductionTab } from "./production-tab"
import { ReceivableTab } from "./receivable-tab"

const TABS: { value: FinanceTab; label: string }[] = [
  { value: "production", label: "Produção / Recebimento" },
  { value: "receivable", label: "A Receber" },
]

export function FinanceView() {
  const dashboard = useFinanceDashboard()

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ButtonGroup>
          {TABS.map((tab) => (
            <Button
              key={tab.value}
              type="button"
              size="sm"
              variant={dashboard.tab === tab.value ? "default" : "secondary"}
              onClick={() => dashboard.setTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>

        <MultiSelect
          label="Selecionar usuário"
          options={dashboard.professionalOptions}
          value={dashboard.professionals}
          onChange={dashboard.setProfessionals}
        />
      </div>

      {dashboard.tab === "production" ? (
        <ProductionTab
          year={dashboard.year}
          onMoveYear={dashboard.moveYear}
          production={dashboard.production}
          receipts={dashboard.receipts}
        />
      ) : (
        <ReceivableTab
          paymentMethods={dashboard.paymentMethods}
          dateTotals={dashboard.dateTotals}
          summary={dashboard.receivableSummary}
          total={dashboard.receivableTotal}
          rows={dashboard.rows}
          onExport={dashboard.exportCsv}
        />
      )}
    </div>
  )
}
