"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { TipoRegistro } from "../../dados-mock"
import { rotuloRegistro } from "../../dados-mock"
import type { TimelineAno } from "../../../_hooks/use-prontuario"
import { RegistroIcone } from "./icones"

interface RegistroTimelineProps {
  anos: TimelineAno[]
  filtroData: string
  filtroTipo: TipoRegistro | ""
  onFiltrar: (chave: string, tipo: TipoRegistro) => void
}

export function RegistroTimeline({
  anos,
  filtroData,
  filtroTipo,
  onFiltrar,
}: RegistroTimelineProps) {
  if (anos.length === 0) {
    return null
  }

  return (
    <Card size="sm" className="gap-0 py-0">
      <CardContent className="flex h-20 items-center gap-6 overflow-x-auto px-4 py-0">
        {anos.map((ano) => (
          <div key={ano.ano} className="flex shrink-0 items-center gap-3">
            <p className="text-sm font-semibold text-muted-foreground">
              {ano.ano}
            </p>

            {ano.datas.map((data) => (
              <div
                key={data.chave}
                className="flex shrink-0 items-center gap-1.5"
              >
                <p className="text-xs capitalize text-muted-foreground">
                  {data.rotulo}
                </p>

                <ButtonGroup>
                  {data.tipos.map((tipo) => {
                    const ativo =
                      filtroData === data.chave && filtroTipo === tipo

                    return (
                      <Tooltip key={tipo}>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-xs"
                            aria-pressed={ativo}
                            aria-label={rotuloRegistro(tipo)}
                            onClick={() => onFiltrar(data.chave, tipo)}
                          >
                            <RegistroIcone tipo={tipo} className="size-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{rotuloRegistro(tipo)}</TooltipContent>
                      </Tooltip>
                    )
                  })}
                </ButtonGroup>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
