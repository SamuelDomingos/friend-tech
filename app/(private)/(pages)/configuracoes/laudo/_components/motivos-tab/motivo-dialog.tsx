"use client"

import { Controller } from "react-hook-form"

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
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useMotivoForm } from "../../_hooks/use-motivo-form"
import type { MotivoFormData } from "../../_schemas/motivo.schema"
import type { Motivo } from "../dados-mock"

interface MotivoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  motivo?: Motivo | null
  onSave: (motivo: Motivo) => void
}

export function MotivoDialog({
  open,
  onOpenChange,
  motivo,
  onSave,
}: MotivoDialogProps) {
  const { form } = useMotivoForm(motivo)
  const { control, handleSubmit } = form

  const onSubmit = (data: MotivoFormData) => {
    onSave({
      id: motivo?.id ?? crypto.randomUUID(),
      titulo: data.titulo,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {motivo ? "Editar motivo de revisão" : "Novo motivo de revisão"}
          </DialogTitle>
          <DialogDescription>
            {motivo
              ? "Altere o título do motivo."
              : "Cadastre um novo motivo de revisão."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="titulo"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Título <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id={field.name}
                  placeholder="Ex.: Laudo incorreto"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />

                <FieldError
                  errors={
                    fieldState.error
                      ? [{ message: fieldState.error.message }]
                      : []
                  }
                />
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
