"use client"

import { useState } from "react"
import { AlertTriangle, Heart, Plus, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import type { Etiqueta, PacienteDetalhe } from "../dados-mock"

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
    <Card size="sm" className="gap-2 p-4">
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-medium">
          Etiquetas do paciente
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex min-h-14 flex-wrap items-start gap-2 rounded-lg border border-dashed p-2">
          {paciente.alergia && (
            <Badge variant="destructive">
              <AlertTriangle className="size-3" />
              Alérgico
            </Badge>
          )}

          {paciente.gravidezData && (
            <Badge>
              <Heart className="size-3" />
              Gestante
            </Badge>
          )}

          {etiquetas.length === 0 &&
            !paciente.alergia &&
            !paciente.gravidezData && (
              <Badge variant="outline">Paciente não possui etiqueta</Badge>
            )}

          {etiquetas.map((etiqueta) => (
            <Badge key={etiqueta.id} variant="secondary">
              {etiqueta.nome}
              <button
                type="button"
                aria-label={`Remover etiqueta ${etiqueta.nome}`}
                onClick={() => onRemover(etiqueta.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-end border-0 bg-transparent p-0 pb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="secondary" size="icon-sm">
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
            <Button
              type="button"
              size="sm"
              className="mt-2 w-full"
              onClick={adicionar}
            >
              Adicionar
            </Button>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  )
}
