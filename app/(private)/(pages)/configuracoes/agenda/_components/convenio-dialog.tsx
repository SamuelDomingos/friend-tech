"use client"

import { useState } from "react"
import { Controller } from "react-hook-form"

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
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useConvenioForm } from "../_hooks/use-convenio-form"
import { TIPOS_ATENDIMENTO, TiposTransfer } from "./tipos-transfer"

const convenios = ["Amil", "Unimed", "SulAmérica", "Bradesco Saúde"]

const tiposRegra = [
  "Restrição de tipos de atendimento",
  "Quantidade máxima por período",
  "Tempo mínimo para refazer o tipo de atendimento",
  "Antecedência do agendamento",
]

const unidades = ["Unidade A", "Unidade B", "Unidade C"]

const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
]

const requiredMark = <span className="text-destructive">*</span>

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export function ConvenioDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { form } = useConvenioForm()
  const { control, handleSubmit, reset } = form
  const [inclusos, setInclusos] = useState<string[]>([])

  const disponiveis = TIPOS_ATENDIMENTO.filter(
    (tipo) => !inclusos.includes(tipo)
  )

  const onSubmit = () => {
    // Sem persistência por enquanto — apenas fecha e reseta.
    reset()
    setInclusos([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nova regra de convênio</DialogTitle>
          <DialogDescription>
            Configure a regra de restrição do convênio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Controller
              name="convenio"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Convênio {requiredMark}</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {convenios.map((convenio) => (
                        <SelectItem key={convenio} value={convenio}>
                          {convenio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />

            <Controller
              name="tipoRegra"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tipo de regra {requiredMark}</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {tiposRegra.map((tipo, index) => (
                        <SelectItem key={tipo} value={String(index + 1)}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />

            <Controller
              name="unidade"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Unidade {requiredMark}</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {unidades.map((unidade) => (
                        <SelectItem key={unidade} value={unidade}>
                          {unidade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />

            <Controller
              name="inicio"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Início {requiredMark}
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput {...field} id={field.name} type="time" />
                  </InputGroup>

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />

            <Controller
              name="final"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Final {requiredMark}
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput {...field} id={field.name} type="time" />
                  </InputGroup>

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />
          </div>

          <Controller
            name="diasSemana"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Dias da semana {requiredMark}</FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                  {diasSemana.map((dia) => {
                    const checked = field.value.includes(dia)

                    return (
                      <label
                        key={dia}
                        className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(c) => {
                            const next = Boolean(c)

                            field.onChange(
                              next
                                ? [...field.value, dia]
                                : field.value.filter((d) => d !== dia)
                            )
                          }}
                        />
                        {dia}
                      </label>
                    )
                  })}
                </div>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <TiposTransfer
            disponiveis={disponiveis}
            inclusos={inclusos}
            onIncludedChange={setInclusos}
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
