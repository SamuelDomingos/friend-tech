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

import { useGrupoForm } from "../../_hooks/use-grupo-form"
import type { GrupoFormData } from "../../_schemas/grupo.schema"
import type { Grupo } from "../dados-mock"

interface GrupoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  grupo?: Grupo | null
  onSave: (grupo: Grupo) => void
}

export function GrupoDialog({
  open,
  onOpenChange,
  grupo,
  onSave,
}: GrupoDialogProps) {
  const { form } = useGrupoForm(grupo)
  const { control, handleSubmit } = form

  const onSubmit = (data: GrupoFormData) => {
    onSave({
      id: grupo?.id ?? crypto.randomUUID(),
      nome: data.nome,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{grupo ? "Editar grupo" : "Novo grupo"}</DialogTitle>
          <DialogDescription>
            {grupo
              ? "Altere o nome do grupo."
              : "Cadastre um novo grupo de laudos."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="nome"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Nome <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id={field.name}
                  placeholder="Ex.: Radiologia"
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
