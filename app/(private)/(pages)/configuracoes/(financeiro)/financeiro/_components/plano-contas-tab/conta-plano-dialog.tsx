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

import { useContaPlanoForm } from "../../_hooks/use-conta-plano-form"
import type { ContaPlanoFormData } from "../../_schemas/conta-plano.schema"
import { categoriasPlanoMock, type ContaPlano } from "../dados-mock"

interface ContaPlanoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  conta?: ContaPlano | null
  onSave: (conta: ContaPlano) => void
}

export function ContaPlanoDialog({
  open,
  onOpenChange,
  conta,
  onSave,
}: ContaPlanoDialogProps) {
  const { form } = useContaPlanoForm(conta)
  const { control, handleSubmit } = form

  const onSubmit = (data: ContaPlanoFormData) => {
    onSave({
      id: conta?.id ?? crypto.randomUUID(),
      categoriaId: data.categoriaId,
      codigo: conta?.codigo ?? "",
      nome: data.nome,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conta</DialogTitle>
          <DialogDescription>
            {conta
              ? "Altere as informações da conta."
              : "Cadastre uma nova conta."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="categoriaId"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Categoria</FieldLabel>

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
                      {categoriasPlanoMock.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          {categoria.nome}
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

          <Controller
            name="nome"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome</FieldLabel>

                <Input
                  id={field.name}
                  placeholder="Ex.: Receita de aluguel"
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

            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
