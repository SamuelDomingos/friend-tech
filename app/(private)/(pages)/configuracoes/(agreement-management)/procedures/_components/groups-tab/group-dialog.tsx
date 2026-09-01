"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Transfer } from "@/components/transfer"

import type { Procedure, ProcedureGroup } from "../mock-data"

interface GroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: ProcedureGroup | null
  procedures: Procedure[]
  onSave: (group: ProcedureGroup) => void
}

export function GroupDialog({
  open,
  onOpenChange,
  group,
  procedures,
  onSave,
}: GroupDialogProps) {
  const isEdit = !!group

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar grupo" : "Adicionar grupo"}
          </DialogTitle>
          <DialogDescription>
            Informe o nome do grupo e selecione os procedimentos vinculados.
          </DialogDescription>
        </DialogHeader>

        <GroupForm
          key={group?.id ?? "new"}
          group={group}
          procedures={procedures}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface GroupFormProps {
  group: ProcedureGroup | null
  procedures: Procedure[]
  onSave: (group: ProcedureGroup) => void
  onCancel: () => void
}

function GroupForm({ group, procedures, onSave, onCancel }: GroupFormProps) {
  const isEdit = !!group
  const [nome, setNome] = useState(group?.nome ?? "")
  const [procedimentoIds, setProcedimentoIds] = useState<string[]>(
    group?.procedimentoIds ?? []
  )

  const nomePorId = new Map(procedures.map((p) => [p.id, p.nome]))
  const idPorNome = new Map(procedures.map((p) => [p.nome, p.id]))
  const selecionados = procedimentoIds
    .map((id) => nomePorId.get(id))
    .filter((nome): nome is string => !!nome)

  const salvar = () => {
    if (!nome.trim()) return
    onSave({
      id: group?.id ?? `g-${Date.now()}`,
      nome,
      procedimentoIds,
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <Field>
            <FieldLabel htmlFor="grupo-nome">Nome</FieldLabel>
            <Input
              id="grupo-nome"
              placeholder="Nome do grupo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Field>

          <div>
            <FieldLabel className="mb-2">Procedimentos</FieldLabel>
            <Transfer
              disponiveisTitle="Disponíveis"
              inclusosTitle="No grupo"
              searchPlaceholder="Buscar procedimento"
              disponiveis={procedures
                .map((p) => p.nome)
                .filter((nome) => !selecionados.includes(nome))}
              inclusos={selecionados}
              onIncludedChange={(nomes) =>
                setProcedimentoIds(
                  nomes
                    .map((nome) => idPorNome.get(nome))
                    .filter((id): id is string => !!id)
                )
              }
            />
          </div>
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={salvar}>
          {isEdit ? "Salvar" : "Adicionar"}
        </Button>
      </DialogFooter>
    </>
  )
}
