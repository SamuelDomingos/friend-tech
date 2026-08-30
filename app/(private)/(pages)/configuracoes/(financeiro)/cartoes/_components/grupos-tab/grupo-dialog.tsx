"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Transfer } from "@/components/transfer"

import { maquinetasMock, type GrupoMaquineta } from "../dados-mock"

const requiredMark = (
  <span className="text-destructive text-xs font-normal">*</span>
)

const maquinetasNomes = maquinetasMock.map((m) => m.nome)

interface GrupoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  grupo: GrupoMaquineta | null
}

export function GrupoDialog({ open, onOpenChange, grupo }: GrupoDialogProps) {
  const [nome, setNome] = useState(grupo?.nome ?? "")
  const [maquinetasSelecionadas, setMaquinetasSelecionadas] = useState<string[]>(
    grupo ? grupo.maquinetas.map((id) => maquinetasMock.find((m) => m.id === id)?.nome ?? "").filter(Boolean) : [],
  )

  const maquinetasDisponiveis = maquinetasNomes.filter(
    (m) => !maquinetasSelecionadas.includes(m),
  )

  const handleSubmit = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{grupo ? "Editar grupo" : "Adicionar grupo"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Field>
            <FieldLabel>Nome {requiredMark}</FieldLabel>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do grupo"
            />
          </Field>

          <Field>
            <FieldLabel>Maquinetas</FieldLabel>
            <Transfer
              disponiveis={maquinetasDisponiveis}
              inclusos={maquinetasSelecionadas}
              onIncludedChange={setMaquinetasSelecionadas}
              disponiveisTitle="Maquinetas cadastradas"
              inclusosTitle="Maquinetas nesse grupo"
            />
          </Field>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="button" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface DeleteGrupoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  grupo: GrupoMaquineta | null
}

export function DeleteGrupoDialog({ open, onOpenChange, grupo }: DeleteGrupoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover grupo</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover o grupo{" "}
            <strong>{grupo?.nome}</strong>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={() => onOpenChange(false)}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
