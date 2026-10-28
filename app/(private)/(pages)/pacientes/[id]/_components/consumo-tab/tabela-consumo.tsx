"use client"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"

import type { ConsumoItem } from "./dados-mock"

interface TabelaConsumoProps {
  itens: ConsumoItem[]
  selecionados: string[]
  todosSelecionados: boolean
  onAlternar: (id: string) => void
  onAlternarTodos: () => void
}

export function TabelaConsumo({
  itens,
  selecionados,
  todosSelecionados,
  onAlternar,
  onAlternarTodos,
}: TabelaConsumoProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={todosSelecionados}
                onCheckedChange={onAlternarTodos}
                aria-label="Selecionar todos"
              />
            </TableHead>
            <TableHead className="w-[110px]">Data</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="w-[80px]">Quant.</TableHead>
            <TableHead className="w-[100px]">Lote</TableHead>
            <TableHead className="w-[110px]">Validade</TableHead>
            <TableHead className="w-[190px]">Origem</TableHead>
            <TableHead className="w-[110px]">Exportado</TableHead>
            <TableHead className="w-[190px]">MatMeds</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {itens.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                Nenhuma movimentação encontrada.
              </TableCell>
            </TableRow>
          ) : (
            itens.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selecionados.includes(item.id)}
                    onCheckedChange={() => onAlternar(item.id)}
                    aria-label={`Selecionar ${item.item}`}
                  />
                </TableCell>
                <TableCell className="text-sm">{formatDate(item.data)}</TableCell>
                <TableCell className="text-sm font-medium">{item.item}</TableCell>
                <TableCell className="text-sm">
                  {item.quantidade}{" "}
                  <span className="text-muted-foreground">
                    {item.quantidade > 1 ? "itens" : "item"}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{item.lote ?? "-"}</TableCell>
                <TableCell className="text-sm">
                  {item.validade ? formatDate(item.validade) : "-"}
                </TableCell>
                <TableCell className="text-sm">{item.origem ?? "-"}</TableCell>
                <TableCell className="text-sm">
                  {item.exportadoEm ? formatDate(item.exportadoEm) : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.matmeds.length === 0 ? (
                      <span className="text-sm text-muted-foreground">-</span>
                    ) : (
                      item.matmeds.map((matmed) => (
                        <Badge key={matmed} variant="outline">
                          {matmed}
                        </Badge>
                      ))
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
