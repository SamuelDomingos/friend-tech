"use client"

import { Controller } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { useAgendaClinicaForm } from "../../_hooks/use-agenda-clinica-form"

const diasSemana = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
  "Domingo",
]

const requiredMark = <span className="text-destructive">*</span>

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export function AgendaClinicaTab() {
  const { form } = useAgendaClinicaForm()
  const { control } = form

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Definições gerais</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="visualizacao"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Visualização padrão</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="dia">Dia</SelectItem>
                    <SelectItem value="semana">Semana</SelectItem>
                    <SelectItem value="fila-de-espera">Fila de espera</SelectItem>
                  </SelectContent>
                </Select>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="intervalo"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Intervalo de blocos {requiredMark}
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    inputMode="numeric"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D/g, ""))
                    }
                  />
                  <InputGroupAddon align="inline-end">Min</InputGroupAddon>
                </InputGroup>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="unidade"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Unidade padrão</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="unidade-a">Unidade A</SelectItem>
                    <SelectItem value="unidade-b">Unidade B</SelectItem>
                    <SelectItem value="unidade-c">Unidade C</SelectItem>
                  </SelectContent>
                </Select>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="atendimento"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Atendimento padrão</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="Selecione"
                  aria-invalid={fieldState.invalid}
                />

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Dias de funcionamento {requiredMark}
        </h2>

        <Controller
          name="diasFuncionamento"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="grid gap-3 sm:grid-cols-2">
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
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Horário de funcionamento</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="inicio"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Início</FieldLabel>

                <InputGroup>
                  <InputGroupInput {...field} id={field.name} type="time" />
                  <InputGroupAddon align="inline-end">Horas</InputGroupAddon>
                </InputGroup>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="fim"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Fim</FieldLabel>

                <InputGroup>
                  <InputGroupInput {...field} id={field.name} type="time" />
                  <InputGroupAddon align="inline-end">Horas</InputGroupAddon>
                </InputGroup>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Outras informações</h2>

        <p className="text-sm text-muted-foreground">Em breve.</p>
      </section>
    </div>
  )
}
