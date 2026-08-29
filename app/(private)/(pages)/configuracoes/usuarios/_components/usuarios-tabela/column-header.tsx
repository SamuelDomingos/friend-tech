import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import type { CellData, Column, RowData } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import type { TableFeatures } from "@/components/ui/data-table-features"
import { cn } from "@/lib/utils"

interface DataTableColumnHeaderProps<
  TData extends RowData,
  TValue extends CellData
> {
  column: Column<TableFeatures, TData, TValue>
  title: string
  className?: string
}

export function DataTableColumnHeader<
  TData extends RowData,
  TValue extends CellData = CellData
>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-7", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {column.getIsSorted() === "asc" ? (
        <ArrowUp data-icon="inline-end" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown data-icon="inline-end" />
      ) : (
        <ArrowUpDown data-icon="inline-end" />
      )}
    </Button>
  )
}
