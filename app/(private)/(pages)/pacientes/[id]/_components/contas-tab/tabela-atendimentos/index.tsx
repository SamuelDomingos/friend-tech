"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { AtendimentoFinanceiro } from "../dados-mock"
import { LinhaAtendimento } from "./linha-atendimento"

interface TabelaAtendimentosProps {
  atendimentos: AtendimentoFinanceiro[]
  onEditar: (atendimento: AtendimentoFinanceiro) => void
}

export function TabelaAtendimentos({
  atendimentos,
  onEditar,
}: TabelaAtendimentosProps) {
  if (atendimentos.length === 0) {
    return (
      <p className="rounded-lg border bg-card py-10 text-center text-sm text-muted-foreground">
        Nenhum atendimento encontrado.
      </p>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Data</TableHead>
            <TableHead className="w-[260px]">Descrição</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="w-[240px]">Detalhamento</TableHead>
            <TableHead className="w-[180px]">Pagamento</TableHead>
            <TableHead className="w-[120px] text-right">Valor (R$)</TableHead>
            <TableHead className="w-[120px] text-right">Baixa (R$)</TableHead>
            <TableHead className="w-[48px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {atendimentos.map((atendimento) => (
            <LinhaAtendimento
              key={atendimento.id}
              atendimento={atendimento}
              onEditar={onEditar}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
