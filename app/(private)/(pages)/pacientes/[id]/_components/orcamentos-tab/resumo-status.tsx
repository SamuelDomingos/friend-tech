"use client"

import { CircleCheck, CircleDollarSign, CircleDot, CircleX } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { formatarMoeda } from "../formatadores"
import type { ResumoOrcamentos, StatusOrcamento } from "./dados-mock"

interface ResumoStatusProps {
  resumo: ResumoOrcamentos
  selecionado: StatusOrcamento | ""
  onSelecionar: (status: StatusOrcamento | "") => void
}

interface CardStatusProps {
  rotulo: string
  valor: string
  detalhe: string
  cor: string
  icone: React.ReactNode
  ativo: boolean
  onClick: () => void
}

function CardStatus({
  rotulo,
  valor,
  detalhe,
  cor,
  icone,
  ativo,
  onClick,
}: CardStatusProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "w-44 cursor-pointer gap-0 py-0 transition-colors",
        ativo && "ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="px-3 py-3">
        <p
          className={cn(
            "flex items-center justify-end gap-1 text-right text-xs font-medium",
            cor
          )}
        >
          {rotulo}
          {icone}
        </p>
        <div className="mt-2 flex items-center justify-end gap-1">
          <span className="text-sm font-medium">{valor}</span>
          <span className="text-xs text-muted-foreground">{detalhe}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function ResumoStatus({
  resumo,
  selecionado,
  onSelecionar,
}: ResumoStatusProps) {
  const alternar = (status: StatusOrcamento) =>
    onSelecionar(selecionado === status ? "" : status)

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <Card size="sm" className="w-44 gap-0 border-0 py-0 ring-0">
        <CardContent className="px-3 py-3 text-right">
          <p className="text-xs text-muted-foreground">Total</p>
          <div className="mt-2 flex items-center justify-end gap-1">
            <span className="text-sm font-medium">
              {formatarMoeda(resumo.total)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({resumo.totalQtd})
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <CardStatus
          rotulo="Em aberto"
          valor={formatarMoeda(resumo.emAberto)}
          detalhe={`(${resumo.emAbertoQtd})`}
          cor="text-primary"
          icone={<CircleDot className="size-3" />}
          ativo={selecionado === "EM_ABERTO"}
          onClick={() => alternar("EM_ABERTO")}
        />
        <CardStatus
          rotulo="Perdido"
          valor={formatarMoeda(resumo.perdido)}
          detalhe={`(${resumo.perdidoQtd})`}
          cor="text-destructive"
          icone={<CircleX className="size-3" />}
          ativo={selecionado === "PERDIDO"}
          onClick={() => alternar("PERDIDO")}
        />
        <CardStatus
          rotulo="Fechado"
          valor={formatarMoeda(resumo.fechado)}
          detalhe={`(${resumo.fechadoQtd})`}
          cor="text-emerald-600 dark:text-emerald-400"
          icone={<CircleCheck className="size-3" />}
          ativo={selecionado === "FECHADO"}
          onClick={() => alternar("FECHADO")}
        />
        <CardStatus
          rotulo="Crédito disponível"
          valor={formatarMoeda(resumo.creditoDisponivel)}
          detalhe={`(${resumo.creditoPercentual}%)`}
          cor="text-muted-foreground"
          icone={<CircleDollarSign className="size-3" />}
          ativo={selecionado === "CREDITO_DISPONIVEL"}
          onClick={() => alternar("CREDITO_DISPONIVEL")}
        />
      </div>
    </div>
  )
}
