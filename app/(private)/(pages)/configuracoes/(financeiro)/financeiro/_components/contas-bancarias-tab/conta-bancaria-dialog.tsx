"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

import { daDataISO, formatarMoeda, paraDataISO } from "@/lib/masks"

import { useContaBancariaForm } from "../../_hooks/use-conta-bancaria-form"
import type { ContaBancariaFormData } from "../../_schemas/conta-bancaria.schema"
import type { ContaBancaria } from "../dados-mock"

interface ContaBancariaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  conta?: ContaBancaria | null
  onSave: (conta: ContaBancaria) => void
}

export function ContaBancariaDialog({
  open,
  onOpenChange,
  conta,
  onSave,
}: ContaBancariaDialogProps) {
  const { form } = useContaBancariaForm(conta)
  const { control, handleSubmit } = form

  const onSubmit = (data: ContaBancariaFormData) => {
    onSave({
      id: conta?.id ?? crypto.randomUUID(),
      ...data,
      ativa: conta?.ativa ?? true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Conta bancária</DialogTitle>
          <DialogDescription>
            {conta
              ? "Altere as informações da conta bancária."
              : "Cadastre uma nova conta bancária."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="codigo"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Código <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Input
                    id={field.name}
                    maxLength={5}
                    placeholder="Ex.: 001"
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
              name="banco"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Banco <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="Ex.: Banco do Brasil"
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
              name="agencia"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Agência <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Input
                    id={field.name}
                    maxLength={5}
                    placeholder="Ex.: 1234"
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
              name="conta"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Conta <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="Número da conta"
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
              name="digito"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Dígito</FieldLabel>

                  <Input
                    id={field.name}
                    maxLength={1}
                    placeholder="0"
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
              name="saldoInicial"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Saldo inicial</FieldLabel>

                  <Input
                    id={field.name}
                    inputMode="numeric"
                    placeholder="0,00"
                    {...field}
                    onChange={(event) =>
                      field.onChange(formatarMoeda(event.target.value))
                    }
                  />
                </Field>
              )}
            />

            <Controller
              name="dataSaldoInicial"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Data saldo inicial
                  </FieldLabel>

                  <DatePicker
                    value={daDataISO(field.value)}
                    onChange={(data) =>
                      field.onChange(data ? paraDataISO(data) : "")
                    }
                    placeholder="dd/mm/aaaa"
                  />
                </Field>
              )}
            />

            <Controller
              name="limiteCredito"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Limite de Crédito
                  </FieldLabel>

                  <Input
                    id={field.name}
                    inputMode="numeric"
                    placeholder="0,00"
                    {...field}
                    onChange={(event) =>
                      field.onChange(formatarMoeda(event.target.value))
                    }
                  />
                </Field>
              )}
            />

            <Controller
              name="principal"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3 pb-1 sm:mt-6">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label="Marcar como principal"
                  />

                  <span className="text-sm font-medium">
                    Marcar como principal
                  </span>
                </div>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-4">
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
