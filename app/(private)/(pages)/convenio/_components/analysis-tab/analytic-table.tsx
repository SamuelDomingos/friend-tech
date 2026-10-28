"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"

import type { AnalysisRow } from "../../_hooks/use-analysis"
import type { AnalysisBatch } from "../mock-data"
import { ValueWithPercentage } from "./value-with-percentage"

const GRID =
  "grid grid-cols-[minmax(160px,200px)_repeat(7,minmax(0,1fr))] items-center gap-2"

interface AnalyticTableProps {
  rows: AnalysisRow[]
  totals: {
    production: number
    billed: number
    writeOffs: number
    glosses: number
    netWriteOff: number
    glossesToRecover: number
    balance: number
  }
  expanded: string[]
  onExpand: (values: string[]) => void
  batchesFor: (insurer: string) => AnalysisBatch[]
}

export function AnalyticTable({
  rows,
  totals,
  expanded,
  onExpand,
  batchesFor,
}: AnalyticTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div
        className={`${GRID} border-b bg-muted/40 px-4 py-2 text-xs font-medium`}
      >
        <span>Convênio</span>
        <span className="text-right">Produção(R$)</span>
        <span className="text-right">Faturado(R$)</span>
        <span className="text-right">Baixas(R$)</span>
        <span className="text-right">Glosas(R$)</span>
        <span className="text-right">Baixa líquida(R$)</span>
        <span className="text-right">Glosas a recup.(R$)</span>
        <span className="text-right">Saldo(R$)</span>
      </div>

      <Accordion type="multiple" value={expanded} onValueChange={onExpand}>
        {rows.map((row) => {
          const batches = batchesFor(row.insurer)

          return (
            <AccordionItem key={row.insurer} value={row.insurer}>
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className={`${GRID} w-full text-sm`}>
                  <span className="text-left">{row.insurer}</span>
                  <span className="text-right">
                    {formatCurrency(row.production)}
                  </span>
                  <span className="text-right">
                    <ValueWithPercentage
                      value={row.billed}
                      percentage={row.percentages.billed}
                    />
                  </span>
                  <span className="text-right">
                    <ValueWithPercentage
                      value={row.writeOffs}
                      percentage={row.percentages.writeOffs}
                    />
                  </span>
                  <span className="text-right">
                    <ValueWithPercentage
                      value={row.glosses}
                      percentage={row.percentages.glosses}
                    />
                  </span>
                  <span className="text-right">
                    <ValueWithPercentage
                      value={row.netWriteOff}
                      percentage={row.percentages.netWriteOff}
                    />
                  </span>
                  <span className="text-right">
                    <ValueWithPercentage
                      value={row.glossesToRecover}
                      percentage={row.percentages.glossesToRecover}
                    />
                  </span>
                  <span className="text-right">
                    <ValueWithPercentage
                      value={row.balance}
                      percentage={row.percentages.balance}
                    />
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-3">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data enviado</TableHead>
                        <TableHead>Competência</TableHead>
                        <TableHead>Nº lote/Tipo guia</TableHead>
                        <TableHead className="text-right">Baixa(R$)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {batches.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="py-4 text-center text-sm text-muted-foreground"
                          >
                            Nenhum lote encontrado.
                          </TableCell>
                        </TableRow>
                      ) : (
                        batches.map((batch) => (
                          <TableRow key={batch.batch}>
                            <TableCell className="text-sm">
                              {formatDate(batch.sentAt)}
                            </TableCell>
                            <TableCell className="text-sm">
                              {batch.competence}
                            </TableCell>
                            <TableCell className="text-sm">
                              {batch.batch} / {batch.guideType}
                            </TableCell>
                            <TableCell className="text-right text-sm">
                              {formatCurrency(batch.writeOff)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <div
        className={`${GRID} border-t bg-muted/40 px-4 py-2 text-sm font-medium`}
      >
        <span>Total</span>
        <span className="text-right">{formatCurrency(totals.production)}</span>
        <span className="text-right">{formatCurrency(totals.billed)}</span>
        <span className="text-right">{formatCurrency(totals.writeOffs)}</span>
        <span className="text-right">{formatCurrency(totals.glosses)}</span>
        <span className="text-right">{formatCurrency(totals.netWriteOff)}</span>
        <span className="text-right">
          {formatCurrency(totals.glossesToRecover)}
        </span>
        <span className="text-right">{formatCurrency(totals.balance)}</span>
      </div>
    </div>
  )
}
