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
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useFeriadoForm } from "../_hooks/use-feriado-form"

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export function FeriadoDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { form } = useFeriadoForm()
  const { control, handleSubmit, reset } = form

  const onSubmit = () => {
    // Sem persistência por enquanto — apenas fecha e reseta.
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo feriado</DialogTitle>
          <DialogDescription>
            Cadastre um feriado da clínica.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="tipo"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tipo</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="recorrente">Recorrente</SelectItem>
                      <SelectItem value="especifico">Específico</SelectItem>
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

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Ex.: Confraternização"
                    aria-invalid={fieldState.invalid}
                  />

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />

            <Controller
              name="dia"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Dia</FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      inputMode="numeric"
                      placeholder="Ex.: 25"
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </InputGroup>

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />

            <Controller
              name="mes"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Mês</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {meses.map((mes, index) => (
                        <SelectItem key={mes} value={String(index + 1)}>
                          {mes}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />
          </div>

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
