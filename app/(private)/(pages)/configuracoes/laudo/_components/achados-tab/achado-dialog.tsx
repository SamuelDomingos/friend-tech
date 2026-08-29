"use client"

import { Controller } from "react-hook-form"

import { RichTextEditor } from "@/components/rich-text-editor"
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

import { useAchadoForm } from "../../_hooks/use-achado-form"
import type { AchadoFormData } from "../../_schemas/achado.schema"
import { gruposMock, type Achado } from "../dados-mock"

interface AchadoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  achado?: Achado | null
  onSave: (achado: Achado) => void
}

export function AchadoDialog({
  open,
  onOpenChange,
  achado,
  onSave,
}: AchadoDialogProps) {
  const { form } = useAchadoForm(achado)
  const { control, handleSubmit } = form

  const onSubmit = (data: AchadoFormData) => {
    onSave({
      id: achado?.id ?? crypto.randomUUID(),
      nome: data.nome,
      grupoId: data.grupoId,
      conteudo: data.conteudo,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Achados críticos</DialogTitle>
          <DialogDescription>
            {achado
              ? "Altere as informações do achado crítico."
              : "Cadastre um novo achado crítico."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
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
                    placeholder="Ex.: Nódulo pulmonar"
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
              name="grupoId"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Grupo</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {gruposMock.map((grupo) => (
                          <SelectItem key={grupo.id} value={grupo.id}>
                            {grupo.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </div>

          <Controller
            name="conteudo"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Descrição</FieldLabel>

                <RichTextEditor value={field.value} onChange={field.onChange} />
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
