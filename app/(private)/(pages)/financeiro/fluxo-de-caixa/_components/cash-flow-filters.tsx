"use client"

import { ChevronLeft, ChevronRight, Download, MapPin, Receipt } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"

import {
  cashFlowCostCentersMock,
  cashFlowUnitsMock,
} from "./cash-flow-mock"

interface CashFlowFiltersProps {
  year: number
  onMoveYear: (delta: number) => void
  units: string[]
  onUnits: (units: string[]) => void
  costCenters: string[]
  onCostCenters: (centers: string[]) => void
  showPaid: boolean
  onShowPaid: (value: boolean) => void
  showUnpaid: boolean
  onShowUnpaid: (value: boolean) => void
  onExport: () => void
}

export function CashFlowFilters({
  year,
  onMoveYear,
  units,
  onUnits,
  costCenters,
  onCostCenters,
  showPaid,
  onShowPaid,
  showUnpaid,
  onShowUnpaid,
  onExport,
}: CashFlowFiltersProps) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <MultiSelect
          label="Unidades"
          icon={MapPin}
          options={cashFlowUnitsMock}
          value={units}
          onChange={onUnits}
        />

        <MultiSelect
          label="Centros de Custo"
          icon={Receipt}
          options={cashFlowCostCentersMock}
          value={costCenters}
          onChange={onCostCenters}
        />

        <div className="flex items-center gap-4 px-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={showPaid}
              onCheckedChange={(value) => onShowPaid(value === true)}
            />
            <Label className="font-normal">Pagos</Label>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={showUnpaid}
              onCheckedChange={(value) => onShowUnpaid(value === true)}
            />
            <Label className="font-normal">Não pagos</Label>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ButtonGroup>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label="Ano anterior"
            onClick={() => onMoveYear(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="flex items-center px-3 text-sm font-medium">
            {year}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label="Próximo ano"
            onClick={() => onMoveYear(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </ButtonGroup>

        <Button type="button" variant="secondary" size="sm" onClick={onExport}>
          <Download className="size-4" />
          Exportar
        </Button>
      </div>
    </div>
  )
}
