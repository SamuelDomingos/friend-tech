"use client"

import { Controller, type Control } from "react-hook-form"
import { Upload } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
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

import {
  daDataISO,
  formatarCpf,
  formatarTelefone,
  paraDataISO,
} from "@/lib/masks"

import { SEXOS, type ContaFormData } from "../_schemas/conta.schema"
import { contaAvatar, iniciais } from "./dados-mock"

interface InformacoesPessoaisTabProps {
  control: Control<ContaFormData>
}

export function InformacoesPessoaisTab({
  control,
}: InformacoesPessoaisTabProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Informações Pessoais</h2>

      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarImage src={contaAvatar.url} alt={contaAvatar.nome} />
          <AvatarFallback>{iniciais(contaAvatar.nome)}</AvatarFallback>
        </Avatar>

        <Button type="button" variant="outline" size="sm">
          <Upload data-icon="inline-start" />
          Carregar
        </Button>
      </div>

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="nomeCompleto"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                Nome Completo <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id={field.name}
                placeholder="Nome completo"
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
          name="cpf"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                CPF <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id={field.name}
                placeholder="000.000.000-00"
                inputMode="numeric"
                maxLength={14}
                aria-invalid={!!fieldState.error}
                {...field}
                onChange={(event) =>
                  field.onChange(formatarCpf(event.target.value))
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
          name="dataNascimento"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                Data de nascimento <span className="text-destructive">*</span>
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

        <Controller
          name="sexo"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Sexo</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {SEXOS.map((sexo) => (
                      <SelectItem key={sexo} value={sexo}>
                        {sexo}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Telefone</FieldLabel>

              <Input
                id={field.name}
                placeholder="(DDD) número"
                inputMode="numeric"
                maxLength={15}
                {...field}
                onChange={(event) =>
                  field.onChange(formatarTelefone(event.target.value))
                }
              />
            </Field>
          )}
        />
      </FieldGroup>
    </section>
  )
}
