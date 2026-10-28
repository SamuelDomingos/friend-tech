"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { CampoOrdenacao, Ordenacao } from "../../_hooks/use-laudos"
import type { Laudo } from "../dados-mock"
import { LinhaLaudo } from "./linha-laudo"

interface LaudoTabelaProps {
  laudos: Laudo[]
  ordenacao: Ordenacao
  onOrdenar: (campo: CampoOrdenacao) => void
  onVisualizar: (laudo: Laudo) => void
  onImprimir: (laudo: Laudo) => void
  onLiberar: (laudo: Laudo) => void
  onEntregar: (laudo: Laudo) => void
}

export function LaudoTabela({
  laudos,
  ordenacao,
  onOrdenar,
  onVisualizar,
  onImprimir,
  onLiberar,
  onEntregar,
}: LaudoTabelaProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <BotaoOrdenacao
                rotulo="Pedido"
                ativo={ordenacao.campo === "id"}
                desc={ordenacao.desc}
                onClick={() => onOrdenar("id")}
              />
            </TableHead>

            <TableHead className="w-[110px]">
              <BotaoOrdenacao
                rotulo="Data"
                ativo={ordenacao.campo === "data"}
                desc={ordenacao.desc}
                onClick={() => onOrdenar("data")}
              />
            </TableHead>

            <TableHead className="w-[110px]">Prazo</TableHead>

            <TableHead className="w-[200px]">
              <BotaoOrdenacao
                rotulo="Paciente"
                ativo={ordenacao.campo === "paciente"}
                desc={ordenacao.desc}
                onClick={() => onOrdenar("paciente")}
              />
            </TableHead>

            <TableHead className="w-[240px]">
              Executante/Solicitante
            </TableHead>
            <TableHead className="w-[220px]">Exame/Classificação</TableHead>
            <TableHead className="w-[120px] text-center">Ação</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {laudos.map((laudo) => (
            <LinhaLaudo
              key={laudo.id}
              laudo={laudo}
              onVisualizar={onVisualizar}
              onImprimir={onImprimir}
              onLiberar={onLiberar}
              onEntregar={onEntregar}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function BotaoOrdenacao({
  rotulo,
  ativo,
  desc,
  onClick,
}: {
  rotulo: string
  ativo: boolean
  desc: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-2 h-7 gap-1 px-2 text-xs font-medium"
      onClick={onClick}
      aria-label={`Ordenar por ${rotulo}`}
    >
      {rotulo}
      {ativo &&
        (desc ? (
          <ArrowDown className="size-3" />
        ) : (
          <ArrowUp className="size-3" />
        ))}
    </Button>
  )
}
