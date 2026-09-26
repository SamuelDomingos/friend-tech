"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Orcamento } from "../dados-mock"
import { LinhaOrcamento } from "./linha-orcamento"

interface TabelaOrcamentosProps {
  orcamentos: Orcamento[]
  onEditar: (orcamento: Orcamento) => void
  onExcluir: (orcamento: Orcamento) => void
}

export function TabelaOrcamentos({
  orcamentos,
  onEditar,
  onExcluir,
}: TabelaOrcamentosProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[4%]" />
            <TableHead className="w-[14%]">Data</TableHead>
            <TableHead className="w-[36%]">Descrição</TableHead>
            <TableHead className="w-[16%]">Pagamento</TableHead>
            <TableHead className="w-[12%] text-right">Valor (R$)</TableHead>
            <TableHead className="w-[12%] text-center">Status</TableHead>
            <TableHead className="w-[6%]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {orcamentos.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                Nenhum orçamento encontrado
              </TableCell>
            </TableRow>
          ) : (
            orcamentos.map((orcamento) => (
              <LinhaOrcamento
                key={orcamento.id}
                orcamento={orcamento}
                onEditar={onEditar}
                onExcluir={onExcluir}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
