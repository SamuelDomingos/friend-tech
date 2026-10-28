"use client"

import { CalendarPlus, CheckCheck, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

import {
  ROTULOS_FREQUENCIA,
  ROTULOS_PAGAMENTO,
  type Sessao,
} from "./dados-mock"

interface SessaoCardProps {
  sessao: Sessao
  onFinalizar: (sessao: Sessao) => void
  onAgendar: (sessao: Sessao) => void
  onCancelar: (sessao: Sessao) => void
}

const variantesPagamento = {
  PAGO: "secondary",
  PARCIAL: "outline",
  PENDENTE: "destructive",
} as const

export function SessaoCard({
  sessao,
  onFinalizar,
  onAgendar,
  onCancelar,
}: SessaoCardProps) {
  const concluida = sessao.realizado >= sessao.agendado && sessao.agendado > 0
  const pendente = sessao.realizado === 0 && sessao.situacaoPagamento === "PENDENTE"

  return (
    <article className="rounded-lg border bg-card">
      <div className="grid gap-4 border-b px-4 py-3 md:grid-cols-[135px_140px_100px_1fr_120px_160px] md:items-center">
        <Coluna rotulo="Data">
          <span className="text-sm font-medium">
            {formatDate(sessao.criadaEm)}
          </span>
        </Coluna>

        <Coluna rotulo="Frequência">
          <span className="text-sm">
            {ROTULOS_FREQUENCIA[sessao.frequencia]}
          </span>
        </Coluna>

        <Coluna rotulo="Realizado/Agendado">
          <Badge variant={concluida ? "secondary" : "outline"}>
            {sessao.realizado}/{sessao.agendado}
          </Badge>
        </Coluna>

        <Coluna rotulo="Pagamento">
          <div className="flex flex-col gap-1">
            <span className="text-sm">
              {sessao.convenio ?? sessao.formaPagamento ?? "Não informado"}
            </span>
            <Badge
              variant={variantesPagamento[sessao.situacaoPagamento]}
              className="w-fit"
            >
              {ROTULOS_PAGAMENTO[sessao.situacaoPagamento]}
            </Badge>
          </div>
        </Coluna>

        <Coluna rotulo="Senha/Nº Guia">
          <span className="text-sm">
            {sessao.senhaGuia || sessao.numeroGuia ? (
              <>
                {sessao.senhaGuia && <span>{sessao.senhaGuia}</span>}
                {sessao.senhaGuia && sessao.numeroGuia && (
                  <span className="text-muted-foreground"> · </span>
                )}
                {sessao.numeroGuia && (
                  <span className="font-medium">{sessao.numeroGuia}</span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </span>
        </Coluna>

        <Coluna rotulo="Valor total" className="md:text-right">
          <span
            className={cn(
              "text-sm font-semibold",
              sessao.situacaoPagamento === "PAGO"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {formatCurrency(sessao.valorTotal)}
          </span>
        </Coluna>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          {sessao.realizado} de {sessao.agendado} sessões realizadas
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={pendente ? "default" : "outline"}
            onClick={() => onFinalizar(sessao)}
          >
            <CheckCheck className="size-4" />
            Finalizar atendimentos
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onAgendar(sessao)}
          >
            <CalendarPlus className="size-4" />
            Agendar
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Ações da sessão"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onCancelar(sessao)}
              >
                Cancelar sessão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  )
}

function Coluna({
  rotulo,
  children,
  className,
}: {
  rotulo: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("min-w-0 space-y-1", className)}>
      <span className="block text-[10px] leading-4 text-muted-foreground uppercase">
        {rotulo}
      </span>
      {children}
    </div>
  )
}
