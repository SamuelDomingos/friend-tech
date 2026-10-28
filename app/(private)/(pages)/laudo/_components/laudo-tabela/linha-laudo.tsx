"use client"

import { cn } from "@/lib/utils"

import { TableCell, TableRow } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { Laudo } from "../dados-mock"
import { AcoesLaudo, IconesExame, SeloRevisado } from "./acoes-laudo"

const formatarData = (iso: string) => {
  if (!iso) {
    return "—"
  }
  const [data] = iso.split("T")
  const [ano, mes, dia] = data.split("-")
  return `${dia}/${mes}/${ano}`
}

const formatarHora = (iso: string) => {
  const [, hora = ""] = iso.split("T")
  return hora.slice(0, 5)
}

interface LinhaLaudoProps {
  laudo: Laudo
  onVisualizar: (laudo: Laudo) => void
  onImprimir: (laudo: Laudo) => void
  onLiberar: (laudo: Laudo) => void
  onEntregar: (laudo: Laudo) => void
}

export function LinhaLaudo({
  laudo,
  onVisualizar,
  onImprimir,
  onLiberar,
  onEntregar,
}: LinhaLaudoProps) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const prazo = new Date(`${laudo.prazo}T00:00:00`)
  const atrasado = prazo < hoje && laudo.status !== "ENTREGUE"

  return (
    <TableRow>
      <TableCell>
        <p className="text-sm font-medium">{laudo.id}</p>
        <p className="text-xs text-muted-foreground">{laudo.attendanceId}</p>
      </TableCell>

      <TableCell>
        <p className="text-sm">{formatarData(laudo.data)}</p>
        <p className="text-xs text-muted-foreground">
          {formatarHora(laudo.data)}
        </p>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatarData(laudo.prazo)}</span>

          {atrasado && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={cn("inline-block size-2 rounded-full bg-destructive")}
                  aria-label="Prazo vencido"
                />
              </TooltipTrigger>
              <TooltipContent>Prazo vencido</TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>

      <TableCell className="max-w-[200px]">
        <p className="truncate text-sm">
          {laudo.pacienteId} - {laudo.pacienteNome}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {laudo.convenio}
        </p>
      </TableCell>

      <TableCell className="max-w-[240px]">
        <p className="truncate text-sm">{laudo.executante}</p>
        <p className="truncate text-xs text-muted-foreground">
          {laudo.solicitante}
        </p>
      </TableCell>

      <TableCell className="max-w-[220px]">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm">{laudo.procedimento}</p>

          <div className="flex shrink-0 items-center gap-1.5">
            <IconesExame laudo={laudo} />
            {laudo.revisado && <SeloRevisado />}
          </div>
        </div>

        <p className="truncate text-xs text-muted-foreground">
          {laudo.classificacao}
        </p>
      </TableCell>

      <TableCell className="text-center">
        <AcoesLaudo
          laudo={laudo}
          onVisualizar={onVisualizar}
          onImprimir={onImprimir}
          onLiberar={onLiberar}
          onEntregar={onEntregar}
        />
      </TableCell>
    </TableRow>
  )
}
