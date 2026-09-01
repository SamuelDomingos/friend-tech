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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Transfer } from "@/components/transfer"

import type { Procedure, ProcedureGroup, ProcedureSubgroup } from "../mock-data"

interface SubgroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subgroup: ProcedureSubgroup | null
  groups: ProcedureGroup[]
  procedures: Procedure[]
  onSave: (subgroup: ProcedureSubgroup) => void
}

export function SubgroupDialog({
  open,
  onOpenChange,
  subgroup,
  groups,
  procedures,
  onSave,
}: SubgroupDialogProps) {
  const isEdit = !!subgroup

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar subgrupo" : "Adicionar subgrupo"}
          </DialogTitle>
          <DialogDescription>
            Informe o nome, o grupo e os procedimentos vinculados.
          </DialogDescription>
        </DialogHeader>

        <SubgroupForm
          key={subgroup?.id ?? "new"}
          subgroup={subgroup}
          groups={groups}
          procedures={procedures}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface SubgroupFormProps {
  subgroup: ProcedureSubgroup | null
  groups: ProcedureGroup[]
  procedures: Procedure[]
  onSave: (subgroup: ProcedureSubgroup) => void
  onCancel: () => void
}

function SubgroupForm({
  subgroup,
  groups,
  procedures,
  onSave,
  onCancel,
}: SubgroupFormProps) {
  const isEdit = !!subgroup
  const [nome, setNome] = useState(subgroup?.nome ?? "")
  const [grupoId, setGrupoId] = useState(subgroup?.grupoId ?? "")
  const [procedimentoIds, setProcedimentoIds] = useState<string[]>(
    subgroup?.procedimentoIds ?? []
  )

  const nomePorId = new Map(procedures.map((p) => [p.id, p.nome]))
  const idPorNome = new Map(procedures.map((p) => [p.nome, p.id]))
  const selecionados = procedimentoIds
    .map((id) => nomePorId.get(id))
    .filter((nome): nome is string => !!nome)

  const salvar = () => {
    if (!nome.trim() || !grupoId) return
    onSave({
      id: subgroup?.id ?? `sg-${Date.now()}`,
      nome,
      grupoId,
      procedimentoIds,
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="subgrupo-nome">Nome</FieldLabel>
              <Input
                id="subgrupo-nome"
                placeholder="Nome do subgrupo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="subgrupo-grupo">Grupo</FieldLabel>
              <Select
                value={grupoId || "none"}
                onValueChange={(v) => setGrupoId(v === "none" ? "" : v)}
              >
                <SelectTrigger id="subgrupo-grupo">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">Selecione</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div>
            <FieldLabel className="mb-2">Procedimentos</FieldLabel>
            <Transfer
              disponiveisTitle="Disponíveis"
              inclusosTitle="No subgrupo"
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
