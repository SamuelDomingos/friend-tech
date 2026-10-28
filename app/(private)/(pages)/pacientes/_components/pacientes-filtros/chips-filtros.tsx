"use client"

import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { FiltroAtivo } from "../../_hooks/use-pacientes"

interface ChipsFiltrosProps {
  filtros: FiltroAtivo[]
  onRemover: (chave: string) => void
  onLimpar: () => void
}

export function ChipsFiltros({
  filtros,
  onRemover,
  onLimpar,
}: ChipsFiltrosProps) {
  if (filtros.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filtros.map((filtro) => (
        <Badge
          key={filtro.chave}
          variant="secondary"
          className="gap-1 pr-1 font-normal"
        >
          {filtro.rotulo}

          <button
            type="button"
            aria-label={`Remover filtro ${filtro.rotulo}`}
            className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            onClick={() => onRemover(filtro.chave)}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}

      <Button type="button" variant="link" size="sm" onClick={onLimpar}>
        Limpar tudo
      </Button>
    </div>
  )
}
