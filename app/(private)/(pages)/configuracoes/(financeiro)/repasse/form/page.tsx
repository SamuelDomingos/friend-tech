"use client"

import { Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Transfer } from "@/components/transfer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { daDataISO, paraDataISO } from "@/lib/masks"

import {
  CONVENIOS_LISTA,
  PROCEDIMENTOS_LISTA,
  PROFISSIONAIS_LISTA,
  UNIDADES_LISTA,
} from "../_components/dados-mock"
import { useRepasseForm } from "../_hooks/use-repasse-form"
import {
  TIPOS_PROFISSIONAL_REPASSE,
  TIPOS_VIGENCIA,
  VARIAVEIS_FORMULA,
} from "../_schemas/repasse.schema"

function listaSem(inclusos: string[]) {
  return (lista: string[]) => lista.filter((item) => !inclusos.includes(item))
}

export default function RepasseFormPage() {
  const router = useRouter()
  const { form } = useRepasseForm()
  const { control, handleSubmit, watch } = form

  const tipoVigencia = watch("tipoVigencia")

  const onSubmit = () => {
    toast("Regra de repasse salva.")
    router.push("/configuracoes/repasse")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Regra de repasse</h1>

        <p className="max-w-2xl text-muted-foreground">
          Configure a fórmula de cálculo do repasse para os profissionais.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="nomeExibicao"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome de exibição</FieldLabel>

                <Input
                  id={field.name}
                  placeholder="Digite um texto para identificação da fórmula"
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
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-semibold">Vigência</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <Controller
              name="tipoVigencia"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Tipo de vigência</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {TIPOS_VIGENCIA.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="inicioVigencia"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Início da vigência
                  </FieldLabel>

                  <DatePicker
                    value={daDataISO(field.value)}
                    onChange={(data) =>
                      field.onChange(data ? paraDataISO(data) : "")
                    }
                    placeholder="dd/mm/aaaa"
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

            {tipoVigencia === "DETERMINADO" && (
              <Controller
                name="fimVigencia"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Fim da vigência
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
            )}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-semibold">Tipo de profissional</h2>

          <Controller
            name="tipoProfissional"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                {TIPOS_PROFISSIONAL_REPASSE.map((tipo) => (
                  <label
                    key={tipo.value}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <RadioGroupItem value={tipo.value} />
                    {tipo.label}
                  </label>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-semibold">Fórmula de cálculo</h2>

          <Controller
            name="formula"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Textarea
                  rows={4}
                  placeholder="Digite a fórmula para sua regra de repasse. Ex.: (@@procedimento*0.3) - @@taxacartao"
                  className="font-mono"
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

          <div className="mt-3 flex flex-wrap gap-1.5">
            {VARIAVEIS_FORMULA.map((variavel) => (
              <Badge
                key={variavel.variavel}
                variant="outline"
                className="font-mono"
              >
                {variavel.variavel}
              </Badge>
            ))}
          </div>
        </div>

        <Controller
          name="profissionais"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Profissionais</FieldLabel>

              <Transfer
                disponiveis={listaSem(field.value)(PROFISSIONAIS_LISTA)}
                inclusos={field.value}
                onIncludedChange={field.onChange}
                inclusosTitle="Em uso"
              />
            </Field>
          )}
        />

        <Controller
          name="procedimentos"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Procedimentos</FieldLabel>

              <Transfer
                disponiveis={listaSem(field.value)(PROCEDIMENTOS_LISTA)}
                inclusos={field.value}
                onIncludedChange={field.onChange}
                inclusosTitle="Em uso"
              />
            </Field>
          )}
        />

        <Controller
          name="convenios"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Convênios</FieldLabel>

              <Transfer
                disponiveis={listaSem(field.value)(CONVENIOS_LISTA)}
                inclusos={field.value}
                onIncludedChange={field.onChange}
                inclusosTitle="Em uso"
              />
            </Field>
          )}
        />

        <Controller
          name="unidades"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Unidades</FieldLabel>

              <Transfer
                disponiveis={listaSem(field.value)(UNIDADES_LISTA)}
                inclusos={field.value}
                onIncludedChange={field.onChange}
                inclusosTitle="Em uso"
              />
            </Field>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/configuracoes/repasse")}
          >
            Cancelar
          </Button>

          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </div>
  )
}
