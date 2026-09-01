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

import type { ExpenseRating } from "../mock-data"

interface RatingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rating: ExpenseRating | null
  onSave: (rating: ExpenseRating) => void
}

export function RatingDialog({
  open,
  onOpenChange,
  rating,
  onSave,
}: RatingDialogProps) {
  const isEdit = !!rating

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar classificação" : "Adicionar classificação"}
          </DialogTitle>
          <DialogDescription>
            Informe o nome da classificação (BrasÍndice).
          </DialogDescription>
        </DialogHeader>

        <RatingForm
          key={rating?.id ?? "new"}
          rating={rating}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface RatingFormProps {
  rating: ExpenseRating | null
  onSave: (rating: ExpenseRating) => void
  onCancel: () => void
}

function RatingForm({ rating, onSave, onCancel }: RatingFormProps) {
  const isEdit = !!rating
  const [nome, setNome] = useState(rating?.nome ?? "")

  const salvar = () => {
    if (!nome.trim()) return

    onSave({
      id: rating?.id ?? `r-${Date.now()}`,
      nome,
      criadoEm: rating?.criadoEm ?? new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <>
      <Field>
        <FieldLabel htmlFor="classificacao-nome">Nome</FieldLabel>
        <Input
          id="classificacao-nome"
          placeholder="Nome da classificação"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </Field>

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
