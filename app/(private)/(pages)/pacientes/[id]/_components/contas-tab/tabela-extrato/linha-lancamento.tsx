"use client"

import { ArrowDownRight, ArrowUpRight, HandCoins, Info } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TableCell, TableRow } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { iniciais } from "@/lib/avatar-utils"

import { dataCurta, formatarMoeda } from "../../formatadores"
import type { LancamentoExtrato } from "../dados-mock"

interface LinhaLancamentoProps {
  lancamento: LancamentoExtrato
}

export function LinhaLancamento({ lancamento }: LinhaLancamentoProps) {
  const recebimento = lancamento.tipo === "RECEBIMENTO"

  return (
    <TableRow>
      <TableCell className="align-top whitespace-nowrap">
        {lancamento.mostrarData ? dataCurta(lancamento.criadoEm) : ""}
      </TableCell>

      <TableCell className="align-top whitespace-normal">
        <div className="flex items-start gap-2">
          <span
            className={cn(
              "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
              recebimento
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-destructive/10 text-destructive"
            )}
          >
            <HandCoins className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{lancamento.descricao}</p>
            {lancamento.procedimentos &&
              lancamento.procedimentos.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {lancamento.procedimentos.join(" · ")}
                </p>
              )}
          </div>
        </div>
      </TableCell>

      <TableCell className="align-top whitespace-normal">
        {lancamento.atendimento && (
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>
                {iniciais(lancamento.atendimento.nome)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-xs">{lancamento.atendimento.nome}</p>
              <p className="text-xs text-muted-foreground">
                Atendimento: {lancamento.atendimento.numero}
              </p>
            </div>
          </div>
        )}

        {lancamento.lancamento && (
          <div className="mt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    aria-label={`Lançamento realizado por ${lancamento.lancamento.autor}`}
                  >
                    <Info className="size-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Lançamento realizado por {lancamento.lancamento.autor}
                </TooltipContent>
              </Tooltip>
              Nota Promissória
            </div>
            {lancamento.lancamento.observacao && (
              <p className="mt-0.5 text-[11px]">
                {lancamento.lancamento.observacao}
              </p>
            )}
          </div>
        )}
      </TableCell>

      <TableCell className="align-top text-right whitespace-nowrap">
        {lancamento.valor === null ? (
          <span className="text-muted-foreground">-</span>
        ) : (
          <span
            className={cn(
              "inline-flex items-center gap-1 font-medium",
              recebimento
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-destructive"
            )}
          >
            {formatarMoeda(lancamento.valor, false)}
            {recebimento ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
          </span>
        )}
      </TableCell>
    </TableRow>
  )
}
