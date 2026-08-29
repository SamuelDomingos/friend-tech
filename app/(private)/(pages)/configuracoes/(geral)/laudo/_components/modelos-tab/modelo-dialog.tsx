"use client"

import { Controller } from "react-hook-form"

import { RichTextEditor } from "@/components/rich-text-editor"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

import { useModeloForm } from "../../_hooks/use-modelo-form"
import type { ModeloFormData } from "../../_schemas/modelo.schema"
import { gruposMock, type Modelo } from "../dados-mock"

interface ModeloDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  modelo?: Modelo | null
  onSave: (modelo: Modelo) => void
}

export function ModeloDialog({
  open,
  onOpenChange,
  modelo,
  onSave,
}: ModeloDialogProps) {
  const { form } = useModeloForm(modelo)
  const { control, handleSubmit } = form

  const onSubmit = (data: ModeloFormData) => {
    onSave({
      id: modelo?.id ?? crypto.randomUUID(),
      nome: data.nome,
      grupoId: data.grupoId,
      titulo: data.titulo,
      ocultarTitulo: data.ocultarTitulo,
      conteudo: data.conteudo,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Modelo personalizado de laudo</DialogTitle>
          <DialogDescription>
            {modelo
              ? "Altere as informações do modelo."
              : "Cadastre um novo modelo de laudo."}
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
                    placeholder="Ex.: Raio-X padrão"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Título</FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="Título do laudo"
                    {...field}
                  />
                </Field>
              )}
            />

            <Controller
              name="ocultarTitulo"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2 pb-1 sm:mt-6">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />

                  <label htmlFor={field.name} className="text-sm font-medium">
                    Ocultar título
                  </label>
                </div>
              )}
            />
          </div>

          <Controller
            name="conteudo"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Conteúdo</FieldLabel>

                <RichTextEditor value={field.value} onChange={field.onChange} />
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Fechar
              </Button>
            </DialogClose>

            <Button type="submit">Salvar template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
