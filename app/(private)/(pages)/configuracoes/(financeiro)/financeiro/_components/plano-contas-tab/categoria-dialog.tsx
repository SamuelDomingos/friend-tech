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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useCategoriaForm } from "../../_hooks/use-categoria-form"
import {
  GRUPOS_PLANO,
  type CategoriaFormData,
} from "../../_schemas/categoria.schema"
import type { CategoriaPlano } from "../dados-mock"

interface CategoriaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoria?: CategoriaPlano | null
  onSave: (categoria: CategoriaPlano) => void
}

export function CategoriaDialog({
  open,
  onOpenChange,
  categoria,
  onSave,
}: CategoriaDialogProps) {
  const { form } = useCategoriaForm(categoria)
  const { control, handleSubmit } = form

  const onSubmit = (data: CategoriaFormData) => {
    onSave({
      id: categoria?.id ?? crypto.randomUUID(),
      nome: data.nome,
      grupo: data.grupo as CategoriaPlano["grupo"],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Categoria</DialogTitle>
          <DialogDescription>
            {categoria
              ? "Altere as informações da categoria."
              : "Cadastre uma nova categoria."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="nome"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome</FieldLabel>

                <Input
                  id={field.name}
                  placeholder="Ex.: OUTRAS RECEITAS"
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

          <Controller
            name="grupo"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Grupo</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {GRUPOS_PLANO.map((grupo) => (
                        <SelectItem key={grupo.value} value={grupo.value}>
                          {grupo.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

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

            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
