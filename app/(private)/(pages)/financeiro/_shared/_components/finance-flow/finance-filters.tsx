"use client"

import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowLeftRight,
  Download,
  FileSpreadsheet,
  FileText,
  Plus,
  SearchIcon,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { DatePicker } from "@/components/ui/date-picker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  todayRange,
  weekRange,
  type FinanceFlowMode,
} from "../../_lib/finance"
import type { MovementKind } from "../../_schemas/finance-movement.schema"

interface FinanceFiltersProps {
  mode: FinanceFlowMode
  search: string
  onSearch: (value: string) => void
  from: string
  to: string
  onRange: (range: { from: string; to: string }) => void
  advancedOpen: boolean
  onToggleAdvanced: () => void
  onExportCsv: () => void
  onExportPdf: () => void
  onMovement: (kind: MovementKind) => void
}

export function FinanceFilters({
  mode,
  search,
  onSearch,
  from,
  to,
  onRange,
  advancedOpen,
  onToggleAdvanced,
  onExportCsv,
  onExportPdf,
  onMovement,
}: FinanceFiltersProps) {
  const fromDate = new Date(`${from}T00:00:00`)
  const toDate = new Date(`${to}T00:00:00`)
  const cashBank = mode === "cash-bank"

  function monthRangeSelection() {
    const now = new Date()
    const first = new Date(now.getFullYear(), now.getMonth(), 1)
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    onRange({
      from: first.toISOString().slice(0, 10),
      to: last.toISOString().slice(0, 10),
    })
  }

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="w-64">
          <InputGroupAddon align="inline-start">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
        </InputGroup>

        <ButtonGroup>
          <DatePicker
            value={fromDate}
            onChange={(date) =>
              date &&
              onRange({ from: date.toISOString().slice(0, 10), to })
            }
            placeholder="00/00/0000"
            className="w-[150px]"
          />
          <DatePicker
            value={toDate}
            onChange={(date) =>
              date &&
              onRange({ from, to: date.toISOString().slice(0, 10) })
            }
            placeholder="00/00/0000"
            className="w-[150px]"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onRange(todayRange())}
          >
            Hoje
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onRange(weekRange())}
          >
            Semana
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={monthRangeSelection}
          >
            Mês
          </Button>
        </ButtonGroup>

        <Button
          type="button"
          variant={advancedOpen ? "default" : "outline"}
          size="sm"
          aria-pressed={advancedOpen}
          onClick={onToggleAdvanced}
        >
          <SlidersHorizontal className="size-4" />
          Filtro avançado
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="secondary" size="sm">
              <Download className="size-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {cashBank ? (
              <>
                <DropdownMenuLabel>PDF</DropdownMenuLabel>
                <DropdownMenuItem onClick={onExportPdf}>
                  - Resumo completo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportPdf}>
                  - Por categoria
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Excel</DropdownMenuLabel>
                <DropdownMenuItem onClick={onExportCsv}>
                  - Resumo completo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportCsv}>
                  - Detalhado
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={onExportPdf}>
                  <FileText className="size-4" />
                  Exportar em PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportCsv}>
                  <FileSpreadsheet className="size-4" />
                  Exportar em EXCEL
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {cashBank ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" size="sm">
                <Plus className="size-4" />
                Movimentar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => onMovement("income")}>
                <ArrowUpRight className="size-4 text-primary" />
                Entrada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMovement("expense")}>
                <ArrowDownRight className="size-4 text-destructive" />
                Saída
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMovement("transfer")}>
                <ArrowLeftRight className="size-4" />
                Transferência
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button type="button" size="sm" onClick={() => onMovement(mode === "to-pay" ? "expense" : "income")}>
            <Plus className="size-4" />
            Movimentar
          </Button>
        )}
      </div>
    </div>
  )
}
