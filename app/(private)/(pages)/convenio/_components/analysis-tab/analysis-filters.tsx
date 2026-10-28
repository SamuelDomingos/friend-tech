"use client"

import {
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Receipt,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { MonthPicker } from "@/components/ui/month-picker"
import { MultiSelect } from "@/components/ui/multi-select"

import type {
  AnalysisFilters as AnalysisFiltersState,
  AnalysisSubTab,
} from "../../_hooks/use-analysis-filters"
import {
  BILLING_TYPES,
  INSURANCE_UNITS,
  insurancesMock,
} from "../mock-data"

interface AnalysisFiltersProps {
  subTab: AnalysisSubTab
  onSubTab: (subTab: AnalysisSubTab) => void
  filters: AnalysisFiltersState
  onFilters: (partial: Partial<AnalysisFiltersState>) => void
  onMoveMonth: (delta: number) => void
  onExport: () => void
}

export function AnalysisFilters({
  subTab,
  onSubTab,
  filters,
  onFilters,
  onMoveMonth,
  onExport,
}: AnalysisFiltersProps) {
  const analytic = subTab === "ANALYTIC"

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <ButtonGroup>
          <Button
            type="button"
            size="sm"
            variant={subTab === "SYNTHETIC" ? "default" : "secondary"}
            onClick={() => onSubTab("SYNTHETIC")}
          >
            Sintético
          </Button>
          <Button
            type="button"
            size="sm"
            variant={analytic ? "default" : "secondary"}
            onClick={() => onSubTab("ANALYTIC")}
          >
            Analítico
          </Button>
        </ButtonGroup>

        {analytic && (
          <ButtonGroup>
            <MonthPicker
              value={filters.startMonth}
              onChange={(value) => onFilters({ startMonth: value })}
              placeholder="Competência inicial"
              className="w-[170px]"
            />
            <MonthPicker
              value={filters.endMonth}
              onChange={(value) => onFilters({ endMonth: value })}
              placeholder="Competência final"
              className="w-[170px]"
            />
          </ButtonGroup>
        )}

        <MultiSelect
          label="Convênios"
          options={insurancesMock.map((item) => item.insurer)}
          value={filters.insurances}
          onChange={(value) => onFilters({ insurances: value })}
        />

        <MultiSelect
          label="Tipo de faturamento"
          icon={Receipt}
          options={BILLING_TYPES}
          value={filters.billingTypes}
          onChange={(value) => onFilters({ billingTypes: value })}
        />

        <MultiSelect
          label="Unidades"
          icon={MapPin}
          options={INSURANCE_UNITS}
          value={filters.units}
          onChange={(value) => onFilters({ units: value })}
        />

        <MonthPicker
          value={filters.paidUntil}
          onChange={(value) => onFilters({ paidUntil: value })}
          placeholder="Pago até"
          className="w-[150px]"
        />
      </div>

      <div className="flex items-center gap-2">
        {!analytic && (
          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              aria-label="Mês anterior"
              onClick={() => onMoveMonth(-1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              aria-label="Próximo mês"
              onClick={() => onMoveMonth(1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </ButtonGroup>
        )}

        <Button type="button" variant="secondary" size="sm" onClick={onExport}>
          <Download className="size-4" />
          Exportar
        </Button>
      </div>
    </div>
  )
}
