"use client"

import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface SummaryColumn {
  label: string
  align?: "left" | "center" | "right"
  width?: string
}

interface SummaryTableProps {
  title: string
  year?: string
  columns: SummaryColumn[]
  rows: ReactNode[][]
  footer?: ReactNode[]
}

const alignClass = (align?: SummaryColumn["align"]) => {
  if (align === "center") {
    return "text-center"
  }
  if (align === "right") {
    return "text-right"
  }
  return ""
}

export function SummaryTable({
  title,
  year,
  columns,
  rows,
  footer,
}: SummaryTableProps) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          {year && <span className="text-xs text-muted-foreground">{year}</span>}
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.label}
                  className={cn(alignClass(column.align))}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, columnIndex) => (
                    <TableCell
                      key={columnIndex}
                      className={cn(
                        "text-sm",
                        alignClass(columns[columnIndex]?.align)
                      )}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}

            {footer && (
              <TableRow className="bg-muted/40">
                {footer.map((cell, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    className={cn(
                      "text-sm font-medium",
                      alignClass(columns[columnIndex]?.align)
                    )}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
