"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

import { daDataISO, paraDataISO } from "@/lib/masks"

import { expenseRatingsMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/expenses/_components/mock-data"

import type { MatmedTable } from "../mock-data"

interface MatmedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: MatmedTable | null
  onSave: (table: MatmedTable) => void
}

export function MatmedDialog({
  open,
  onOpenChange,
  table,
  onSave,
}: MatmedDialogProps) {
  const isView = !!table

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Tabela de Preço</DialogTitle>
          <DialogDescription>
            {isView
              ? "Detalhes da tabela de materiais e medicamentos."
              : "Cadastre uma nova tabela de materiais e medicamentos."}
          </DialogDescription>
        </DialogHeader>

        <MatmedForm
          key={table?.id ?? "new"}
          table={table}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface MatmedFormProps {
  table: MatmedTable | null
  onSave: (table: MatmedTable) => void
  onCancel: () => void
}

function MatmedForm({ table, onSave, onCancel }: MatmedFormProps) {
  const isView = !!table
  const [nome, setNome] = useState(table?.nome ?? "")
  const [startDate, setStartDate] = useState(table?.startDate ?? "")
  const [observacao, setObservacao] = useState(table?.observacao ?? "")
  const [classificacaoIds, setClassificacaoIds] = useState<string[]>(
    table?.classificacaoIds ?? []
  )

  const toggleClassificacao = (id: string, checked: boolean) => {
    setClassificacaoIds((atual) =>
      checked ? [...atual, id] : atual.filter((c) => c !== id)
    )
  }

  const adicionar = () => {
    if (!nome.trim() || !startDate) return

    onSave({
      id: `mt-${Date.now()}`,
      nome,
      observacao,
      startDate,
      endDate: "",
      classificacaoIds,
      importadoPor: "Você",
      importadoEm: new Date().toISOString().slice(0, 10),
      status: "ACTIVE",
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="matmed-nome">Nome</FieldLabel>
              <Input
                id="matmed-nome"
                placeholder="Nome da tabela de preço"
                disabled={isView}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="matmed-vigencia">Vigência</FieldLabel>
              <DatePicker
                value={daDataISO(startDate)}
                onChange={(d) => setStartDate(d ? paraDataISO(d) : "")}
                placeholder="Selecione"
                disabled={isView}
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="matmed-observacao">Observação</FieldLabel>
            <Textarea
              id="matmed-observacao"
              disabled={isView}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </Field>

          <div className="space-y-2">
            <FieldLabel>Classificações</FieldLabel>

            {expenseRatingsMock.length === 0 ? (
              <p className="rounded-lg border p-3 text-center text-sm text-muted-foreground">
                Nenhuma classificação cadastrada.
              </p>
            ) : (
              <div className="space-y-2 rounded-lg border p-3">
                {expenseRatingsMock.map((rating) => (
                  <label
                    key={rating.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox
                      disabled={isView}
                      checked={classificacaoIds.includes(rating.id)}
                      onCheckedChange={(checked) =>
                        toggleClassificacao(rating.id, checked === true)
                      }
                    />
                    {rating.nome}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          {isView ? "Fechar" : "Cancelar"}
        </Button>
        {!isView && (
          <Button type="button" onClick={adicionar}>
            Adicionar
          </Button>
        )}
      </DialogFooter>
    </>
  )
}
