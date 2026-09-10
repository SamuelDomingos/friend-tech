"use client"

import { useState } from "react"
import { Heart, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AlertTriangle } from "lucide-react"

import type { Etiqueta } from "../dados-mock"
import type { PacienteDetalhe } from "../dados-mock"

interface EtiquetasPanelProps {
  paciente: PacienteDetalhe
  etiquetas: Etiqueta[]
  onAdicionar: (nome: string) => void
  onRemover: (id: string) => void
}

export function EtiquetasPanel({
  paciente,
  etiquetas,
  onAdicionar,
  onRemover,
}: EtiquetasPanelProps) {
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState("")

  const adicionar = () => {
    onAdicionar(nome)
    setNome("")
    setOpen(false)
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">Etiquetas do paciente</p>
      </div>

      <div className="flex min-h-14 flex-wrap items-start gap-2 rounded-lg border border-dashed p-2">
        {paciente.alergia && (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">
            <AlertTriangle className="size-3" />
            Alérgico
          </span>
        )}

        {paciente.gravidezData && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <Heart className="size-3" />
            Gestante
          </span>
        )}

        {etiquetas.length === 0 && !paciente.alergia && !paciente.gravidezData && (
          <span className="self-center text-sm text-muted-foreground">
            Paciente não possui etiqueta
          </span>
        )}

        {etiquetas.map((etiqueta) => (
          <span
            key={etiqueta.id}
            className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
          >
            {etiqueta.nome}
            <button
              type="button"
              aria-label={`Remover etiqueta ${etiqueta.nome}`}
              onClick={() => onRemover(etiqueta.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="mt-2 flex justify-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="secondary" size="icon-xs">
              <Plus className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64">
            <p className="text-sm font-medium">Adicionar etiqueta</p>
            <Input
              placeholder="Nome da etiqueta"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  adicionar()
                }
              }}
            />
            <Button type="button" size="sm" className="mt-2 w-full" onClick={adicionar}>
              Adicionar
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
