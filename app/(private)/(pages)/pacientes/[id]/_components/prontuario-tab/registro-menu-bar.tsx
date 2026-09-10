"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import type { BarraGrupo, TipoRegistro } from "../dados-mock"
import { rotuloRegistro } from "../dados-mock"
import { RegistroIcone } from "./registro-icones"

interface RegistroMenuBarProps {
  grupos: BarraGrupo[]
  edicao: boolean
  estaAtivo: (grupoId: string, tipo: TipoRegistro) => boolean
  onAlternarAtivo: (grupoId: string, tipo: TipoRegistro) => void
  onSelecionar?: (tipo: TipoRegistro) => void
}

export function RegistroMenuBar({
  grupos,
  edicao,
  estaAtivo,
  onAlternarAtivo,
  onSelecionar,
}: RegistroMenuBarProps) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <ScrollArea className="max-w-full">
          <div className="flex items-start gap-6">
            {grupos.map((grupo) => (
              <div key={grupo.id}>
                <p className="mb-1.5 text-[10px] font-medium text-muted-foreground uppercase">
                  {grupo.rotulo}
                </p>

                <ButtonGroup>
                  {grupo.itens.map((item) => {
                    const ativo = estaAtivo(grupo.id, item.tipo)

                    return (
                      <Tooltip key={item.tipo}>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            aria-label={rotuloRegistro(item.tipo)}
                            className={cn(
                              "relative",
                              edicao &&
                                ativo &&
                                "border-primary bg-primary/10 text-primary hover:bg-primary/15",
                              edicao &&
                                !ativo &&
                                "text-muted-foreground/50 hover:text-muted-foreground/50"
                            )}
                            onClick={() => {
                              if (edicao) {
                                onAlternarAtivo(grupo.id, item.tipo)
                                return
                              }
                              if (onSelecionar) {
                                onSelecionar(item.tipo)
                              } else {
                                toast(`${rotuloRegistro(item.tipo)} em breve.`)
                              }
                            }}
                          >
                            {edicao && (
                              <Checkbox
                                checked={ativo}
                                onCheckedChange={() =>
                                  onAlternarAtivo(grupo.id, item.tipo)
                                }
                                onClick={(event) => event.stopPropagation()}
                                className="absolute top-0.5 left-0.5 size-3.5"
                              />
                            )}
                            <RegistroIcone tipo={item.tipo} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {rotuloRegistro(item.tipo)}
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </ButtonGroup>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
