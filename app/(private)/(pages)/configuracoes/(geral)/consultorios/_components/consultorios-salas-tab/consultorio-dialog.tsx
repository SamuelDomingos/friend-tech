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
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useConsultorioForm } from "../../_hooks/use-consultorio-form"
import { TIPOS_CONSULTORIO } from "../../_schemas/consultorio.schema"

const requiredMark = <span className="text-destructive">*</span>

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export function ConsultorioDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { form } = useConsultorioForm()
  const { control, handleSubmit, reset } = form

  const onSubmit = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo consultório / sala</DialogTitle>
          <DialogDescription>
            Cadastre um consultório ou sala de cirurgia.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="tipo"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tipo {requiredMark}</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    {TIPOS_CONSULTORIO.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo === "consultorio"
                          ? "Consultório"
                          : "Sala de cirurgia"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="nome"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    placeholder="Ex.: Consultório 01"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="nomeExibicao"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Nome de exibição
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    maxLength={15}
                    placeholder="Ex.: Consulta 1"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                <ErrorText message={fieldState.error?.message} />
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
