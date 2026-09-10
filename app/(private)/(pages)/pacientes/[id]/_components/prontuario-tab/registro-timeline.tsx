"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { TipoRegistro } from "../dados-mock"
import { rotuloRegistro } from "../dados-mock"
import { RegistroIcone } from "./registro-icones"
import type { TimelineAno } from "../../_hooks/use-prontuario"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
    <div className="flex h-20 items-center gap-6 overflow-x-auto rounded-lg border bg-card px-4">
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

              <div className="flex items-center gap-1">
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
                          aria-label={rotuloRegistro(tipo)}
                          onClick={() => onFiltrar(data.chave, tipo)}
                          className={cn(
                            ativo &&
                              "border-primary bg-primary/10 text-primary hover:bg-primary/15"
                          )}
                        >
                          <RegistroIcone tipo={tipo} className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{rotuloRegistro(tipo)}</TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
