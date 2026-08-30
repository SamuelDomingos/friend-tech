"use client"

import { Controller, type Control } from "react-hook-form"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { formatarCep, formatarCnpj } from "@/lib/masks"

import { ESTADOS_BRASIL, type ConvenioFormData } from "../../_schemas/convenio.schema"
import { ibgeMock } from "../../_components/dados-mock"

interface DadosTomadorTabProps {
  control: Control<ConvenioFormData>
}

export function DadosTomadorTab({ control }: DadosTomadorTabProps) {
  return (
    <section className="space-y-4">
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="tomadorCnpj"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                CNPJ <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id={field.name}
                placeholder="00.000.000/0000-00"
                inputMode="numeric"
                maxLength={18}
                aria-invalid={!!fieldState.error}
                {...field}
                onChange={(event) =>
                  field.onChange(formatarCnpj(event.target.value))
                }
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
          name="tomadorRazaoSocial"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                Razão Social <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id={field.name}
                placeholder="Razão social do tomador"
                maxLength={255}
                aria-invalid={!!fieldState.error}
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
          name="tomadorEnderecoCep"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>CEP</FieldLabel>
              <Input
                id={field.name}
                placeholder="00000-000"
                inputMode="numeric"
                maxLength={9}
                {...field}
                onChange={(event) =>
                  field.onChange(formatarCep(event.target.value))
                }
              />
            </Field>
          )}
        />

        <Controller
          name="tomadorEnderecoEndereco"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Endereço</FieldLabel>
              <Input
                id={field.name}
                placeholder="Rua, Avenida, etc."
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="tomadorEnderecoNumero"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Número</FieldLabel>
              <Input
                id={field.name}
                placeholder="Número"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="tomadorEnderecoComplemento"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Complemento</FieldLabel>
              <Input
                id={field.name}
                placeholder="Complemento"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="tomadorEnderecoUf"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>UF</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ESTADOS_BRASIL.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="tomadorEnderecoIbge"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Município (Código IBGE)</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ibgeMock.map((m) => (
                      <SelectItem key={m.code} value={m.code}>
                        {m.name} ({m.code})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="tomadorEnderecoBairro"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Bairro</FieldLabel>
              <Input
                id={field.name}
                placeholder="Bairro"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />
      </FieldGroup>
    </section>
  )
}
