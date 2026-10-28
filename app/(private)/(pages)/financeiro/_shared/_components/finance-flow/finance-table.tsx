"use client"

import { Receipt } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { FinanceEntry } from "../finance-flow-mock"
import type { FinanceColumn, FinanceFlowMode } from "../../_lib/finance"
import { FinanceRow } from "./finance-row"

interface FinanceTableProps {
  mode: FinanceFlowMode
  entries: FinanceEntry[]
  columns: FinanceColumn[]
  selected: string[]
  allSelected: boolean
  onToggleAll: () => void
  onToggle: (id: string) => void
  onSettle: (entry: FinanceEntry) => void
  onDownload: (entry: FinanceEntry) => void
  onDelete: (entry: FinanceEntry) => void
}

export function FinanceTable({
  mode,
  entries,
  columns,
  selected,
  allSelected,
  onToggleAll,
  onToggle,
  onSettle,
  onDownload,
  onDelete,
}: FinanceTableProps) {
  const selectable = mode !== "cash-bank"

  if (entries.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Receipt />
          </EmptyMedia>
          <EmptyTitle>Nenhum registro encontrado</EmptyTitle>
          <EmptyDescription>
            Ajuste a busca, o período ou os filtros aplicados.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <ScrollArea className="h-[560px]">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={onToggleAll}
                    aria-label="Selecionar todos"
                  />
                </TableHead>
              )}

              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                        ? "text-center"
                        : undefined
                  }
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </TableHead>
              ))}

              <TableHead className="w-[80px] text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {entries.map((entry) => (
              <FinanceRow
                key={entry.id}
                entry={entry}
                columns={columns}
                mode={mode}
                selected={selected.includes(entry.id)}
                onToggle={() => onToggle(entry.id)}
                onSettle={() => onSettle(entry)}
                onDownload={() => onDownload(entry)}
                onDelete={() => onDelete(entry)}
              />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
