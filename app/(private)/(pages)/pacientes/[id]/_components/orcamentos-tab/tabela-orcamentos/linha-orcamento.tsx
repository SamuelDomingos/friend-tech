"use client"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"

import { dataCurta, formatarMoeda } from "../../formatadores"
import type { Orcamento } from "../dados-mock"
import { StatusOrcamentoBadge } from "./status-orcamento"

interface LinhaOrcamentoProps {
  orcamento: Orcamento
  onEditar: (orcamento: Orcamento) => void
  onExcluir: (orcamento: Orcamento) => void
}

export function LinhaOrcamento({
  orcamento,
  onEditar,
  onExcluir,
}: LinhaOrcamentoProps) {
  return (
    <TableRow>
      <TableCell className="align-top" />

      <TableCell className="align-top whitespace-nowrap">
        {dataCurta(orcamento.criadoEm)}
        <span className="ml-1 text-xs text-muted-foreground">
          #{orcamento.numero}
        </span>
      </TableCell>

      <TableCell className="align-top whitespace-normal">
        <p className="font-medium">{orcamento.descricao}</p>
        {orcamento.procedimentos.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {orcamento.procedimentos.join(" · ")}
          </p>
        )}
      </TableCell>

      <TableCell className="align-top whitespace-normal">
        <p className="text-sm">{orcamento.pagamento}</p>
      </TableCell>

      <TableCell className="align-top text-right whitespace-nowrap">
        {formatarMoeda(orcamento.valor)}
      </TableCell>

      <TableCell className="align-top text-center">
        <StatusOrcamentoBadge status={orcamento.status} />
      </TableCell>

      <TableCell className="align-top text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Ações do orçamento"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditar(orcamento)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExcluir(orcamento)}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
