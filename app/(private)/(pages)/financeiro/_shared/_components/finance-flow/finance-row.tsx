"use client"

import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Download,
  FileText,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

import type { FinanceEntry } from "../finance-flow-mock"
import type { FinanceColumn, FinanceFlowMode } from "../../_lib/finance"

interface FinanceRowProps {
  entry: FinanceEntry
  columns: FinanceColumn[]
  mode: FinanceFlowMode
  selected: boolean
  onToggle: () => void
  onSettle: () => void
  onDownload: () => void
  onDelete: () => void
}

export function FinanceRow({
  entry,
  columns,
  mode,
  selected,
  onToggle,
  onSettle,
  onDownload,
  onDelete,
}: FinanceRowProps) {
  const selectable = mode !== "cash-bank"

  function renderCell(column: FinanceColumn) {
    switch (column.key) {
      case "date":
        return formatDate(entry.date)
      case "documentNumber":
        return entry.documentNumber
      case "competence":
        return entry.competence
      case "party":
        return entry.party
      case "paidTo":
        return entry.paidTo ?? "-"
      case "description":
        return (
          <span className="flex items-center gap-2">
            {entry.type === "RECEIVE" ? (
              <ArrowDownLeft className="size-4 shrink-0 text-primary" />
            ) : (
              <ArrowUpRight className="size-4 shrink-0 text-destructive" />
            )}
            <span className="truncate">{entry.description}</span>
          </span>
        )
      case "observation":
        return entry.observation ?? "-"
      case "amount": {
        const value = formatCurrency(entry.amount).replace("R$", "").trim()
        if (mode === "cash-bank" && entry.type === "PAY") {
          return (
            <span className="text-destructive">
              ({value.replace("-", "")})
            </span>
          )
        }
        return mode === "cash-bank" ? (
          <span className="text-primary">{value.replace("-", "")}</span>
        ) : (
          value
        )
      }
      case "nfse":
        return entry.hasNfse ? (
          <Badge variant="secondary">NFSe</Badge>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      case "settle":
        return (
          <Button type="button" variant="outline" size="sm" onClick={onSettle}>
            Dar baixa
          </Button>
        )
      case "receipt":
        if (mode === "cash-bank") {
          return <span className="text-muted-foreground">-</span>
        }
        return (
          <Button type="button" variant="outline" size="sm" onClick={onDownload}>
            <FileText className="size-4" />
            Recibo
          </Button>
        )
      case "download":
        return (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Baixar lançamento"
            onClick={onDownload}
          >
            <Download className="size-4" />
          </Button>
        )
      case "conciliated":
        return entry.conciliated ? (
          <CheckCircle2 className="size-4 text-primary" />
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      default:
        return null
    }
  }

  return (
    <TableRow data-state={selected ? "selected" : undefined}>
      {selectable && (
        <TableCell className="w-10">
          <Checkbox
            checked={selected}
            onCheckedChange={onToggle}
            aria-label={`Selecionar ${entry.description}`}
          />
        </TableCell>
      )}

      {columns.map((column) => (
        <TableCell
          key={column.key}
          className={cn(
            column.align === "right" && "text-right",
            column.align === "center" && "text-center"
          )}
        >
          {renderCell(column)}
        </TableCell>
      ))}

      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Ações"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={onSettle}>Dar baixa</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              <Trash2 className="size-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
