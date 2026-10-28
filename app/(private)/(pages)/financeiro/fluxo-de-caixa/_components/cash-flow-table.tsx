"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

interface CashFlowAccountRow {
  title: string
  values: number[]
}

interface CashFlowTableProps {
  months: string[]
  accounts: CashFlowAccountRow[]
  summary: { net: number[]; previous: number[]; final: number[] }
}

export function CashFlowTable({ months, accounts, summary }: CashFlowTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <ScrollArea className="w-full">
        <div className="min-w-[1240px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[220px]">Conta</TableHead>
                {months.map((month) => (
                  <TableHead key={month} className="w-[90px] text-right">
                    {month}
                  </TableHead>
                ))}
                <TableHead className="w-[130px] text-right">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.title}>
                  <TableCell className="font-medium">{account.title}</TableCell>
                  {account.values.map((value, index) => (
                    <TableCell
                      key={`${account.title}-${months[index]}`}
                      className="text-right text-sm"
                    >
                      {formatCurrency(value)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right text-sm font-medium">
                    {formatCurrency(
                      account.values.reduce((sum, value) => sum + value, 0)
                    )}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="bg-muted/40">
                <TableCell className="font-medium">
                  Fluxo de caixa líquido do período
                </TableCell>
                {summary.net.map((value, index) => (
                  <TableCell
                    key={`net-${months[index]}`}
                    className="text-right text-sm font-medium"
                  >
                    {formatCurrency(value)}
                  </TableCell>
                ))}
                <TableCell className="text-right text-sm font-medium">
                  {formatCurrency(
                    summary.net.reduce((sum, value) => sum + value, 0)
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-sm">Saldo Anterior</TableCell>
                {summary.previous.map((value, index) => (
                  <TableCell
                    key={`previous-${months[index]}`}
                    className="text-right text-sm text-muted-foreground"
                  >
                    {formatCurrency(value)}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>

              <TableRow className="bg-muted/60">
                <TableCell className="font-medium">Saldo final</TableCell>
                {summary.final.map((value, index) => (
                  <TableCell
                    key={`final-${months[index]}`}
                    className="text-right text-sm font-semibold"
                  >
                    {formatCurrency(value)}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
