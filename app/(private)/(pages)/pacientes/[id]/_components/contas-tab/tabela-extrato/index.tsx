"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { LancamentoExtrato } from "../dados-mock"
import { LinhaLancamento } from "./linha-lancamento"

interface TabelaExtratoProps {
  lancamentos: LancamentoExtrato[]
}

export function TabelaExtrato({ lancamentos }: TabelaExtratoProps) {
  if (lancamentos.length === 0) {
    return (
      <p className="rounded-lg border bg-card py-10 text-center text-sm text-muted-foreground">
        Nenhum lançamento encontrado.
      </p>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Data</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[300px]">Detalhamento</TableHead>
            <TableHead className="w-[160px] text-right">
              Lançamentos (R$)
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {lancamentos.map((lancamento) => (
            <LinhaLancamento key={lancamento.id} lancamento={lancamento} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
