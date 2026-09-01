"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { daDataISO, paraDataISO } from "@/lib/masks"

import { SPECIAL_ACTION_TYPES } from "./mock-data"

export interface LogFilters {
  startDate: string
  endDate: string
  actionType: string
}

interface LogFilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: LogFilters
  onApply: (filters: LogFilters) => void
}

export function LogFilterSheet({
  open,
  onOpenChange,
  filters,
  onApply,
}: LogFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <LogFilterForm filters={filters} onApply={onApply} />
      </SheetContent>
    </Sheet>
  )
}

function LogFilterForm({
  filters,
  onApply,
}: {
  filters: LogFilters
  onApply: (filters: LogFilters) => void
}) {
  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)
  const [actionType, setActionType] = useState(filters.actionType)

  const limpar = () => {
    setStartDate("")
    setEndDate("")
    setActionType("")
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>Filtrar histórico</SheetTitle>
      </SheetHeader>

      <div className="flex-1 space-y-4 overflow-y-auto px-4">
        <Field>
          <FieldLabel htmlFor="log-filter-start">Data inicial</FieldLabel>
          <DatePicker
            value={daDataISO(startDate)}
            onChange={(d) => setStartDate(d ? paraDataISO(d) : "")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="log-filter-end">Data final</FieldLabel>
          <DatePicker
            value={daDataISO(endDate)}
            onChange={(d) => setEndDate(d ? paraDataISO(d) : "")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="log-filter-action-type">
            Tipo de ação
          </FieldLabel>
          <Select
            value={actionType || "all"}
            onValueChange={(v) => setActionType(v === "all" ? "" : v)}
          >
            <SelectTrigger id="log-filter-action-type">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos</SelectItem>
                {SPECIAL_ACTION_TYPES.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <SheetFooter className="flex-row justify-end gap-2 border-t">
        <Button type="button" variant="outline" onClick={limpar}>
          Limpar
        </Button>
        <Button
          type="button"
          onClick={() => onApply({ startDate, endDate, actionType })}
        >
          Aplicar filtros
        </Button>
      </SheetFooter>
    </>
  )
}
