"use client"

import { MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { iniciais } from "@/lib/avatar-utils"

import { dataCurta, formatarMoeda, horaMin } from "../../formatadores"
import type { AtendimentoFinanceiro } from "../dados-mock"
import { StatusAtendimentoBadge } from "./status-atendimento"

interface LinhaAtendimentoProps {
  atendimento: AtendimentoFinanceiro
  onEditar: (atendimento: AtendimentoFinanceiro) => void
}

export function LinhaAtendimento({
  atendimento,
  onEditar,
}: LinhaAtendimentoProps) {
  return (
    <TableRow>
      <TableCell className="align-top">
        <p className="font-medium">{dataCurta(atendimento.criadoEm)}</p>
        <p className="text-xs text-muted-foreground">
          {horaMin(atendimento.criadoEm)}
        </p>
      </TableCell>

      <TableCell className="align-top whitespace-normal">
        <p className="font-medium">{atendimento.descricao}</p>
        {atendimento.procedimentos.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {atendimento.procedimentos.join(" · ")}
          </p>
        )}
      </TableCell>

      <TableCell className="align-top text-center">
        <StatusAtendimentoBadge status={atendimento.status} />
      </TableCell>

      <TableCell className="align-top">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {iniciais(atendimento.profissional.nome)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm">
              {atendimento.profissional.nome}
            </p>
            <p className="text-xs text-muted-foreground">
              {atendimento.numero}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="align-top whitespace-normal">
        {atendimento.formaPagamento ? (
          <p className="text-sm">{atendimento.formaPagamento}</p>
        ) : (
          <p className="text-sm text-muted-foreground">-</p>
        )}
        {atendimento.emAberto && (
          <Badge
            variant="secondary"
            className="mt-1 border-transparent bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
          >
            Em aberto
          </Badge>
        )}
      </TableCell>

      <TableCell className="align-top text-right whitespace-nowrap">
        {formatarMoeda(atendimento.valor)}
      </TableCell>

      <TableCell className="align-top text-right whitespace-nowrap">
        {atendimento.baixa === null ? (
          <span className="text-muted-foreground">-</span>
        ) : (
          formatarMoeda(atendimento.baixa)
        )}
      </TableCell>

      <TableCell className="align-top text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Ações do atendimento"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditar(atendimento)}>
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
