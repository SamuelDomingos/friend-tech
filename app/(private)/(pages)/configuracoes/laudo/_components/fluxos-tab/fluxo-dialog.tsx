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
import { cn } from "@/lib/utils"

import { useFluxoForm } from "../../_hooks/use-fluxo-form"
import type { FluxoFormData } from "../../_schemas/fluxo.schema"
import { CORES_FLUXO, type Fluxo } from "../dados-mock"

interface FluxoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fluxo?: Fluxo | null
  onSave: (fluxo: Fluxo) => void
}

export function FluxoDialog({
  open,
  onOpenChange,
  fluxo,
  onSave,
}: FluxoDialogProps) {
  const { form } = useFluxoForm(fluxo)
  const { control, handleSubmit } = form

  const onSubmit = (data: FluxoFormData) => {
    onSave({
      id: fluxo?.id ?? crypto.randomUUID(),
      nome: data.nome,
      sigla: data.sigla,
      ordem: data.ordem,
      cor: data.cor,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {fluxo ? "Editar fluxo" : "Adicionar fluxo"}
          </DialogTitle>
          <DialogDescription>
            {fluxo
              ? "Altere as informações do fluxo."
              : "Cadastre um novo fluxo de laudo."}
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
                    placeholder="Ex.: Laudo pendente"
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
              name="sigla"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Sigla</FieldLabel>

                  <Input
                    id={field.name}
                    maxLength={5}
                    placeholder="Ex.: LP"
                    {...field}
                  />
                </Field>
              )}
            />
          </div>

          <Controller
            name="ordem"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Ordem</FieldLabel>

                <Input
                  id={field.name}
                  inputMode="numeric"
                  placeholder="Ex.: 1"
                  {...field}
                />
              </Field>
            )}
          />

          <Controller
            name="cor"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Cor</FieldLabel>

                <div className="flex items-center gap-2">
                  {CORES_FLUXO.map((cor) => {
                    const selecionada = field.value === cor

                    return (
                      <button
                        key={cor}
                        type="button"
                        aria-label={`Cor ${cor}`}
                        onClick={() => field.onChange(cor)}
                        className={cn(
                          "size-7 rounded-full transition-transform",
                          selecionada &&
                            "ring-2 ring-ring ring-offset-2 ring-offset-background"
                        )}
                        style={{ backgroundColor: cor }}
                      />
                    )
                  })}
                </div>
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
