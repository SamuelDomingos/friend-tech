"use client"

import { Controller, useWatch, type Control } from "react-hook-form"
import { CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { formatarTelefone } from "@/lib/masks"

import type { ContaFormData } from "../_schemas/conta.schema"

interface SegurancaTabProps {
  control: Control<ContaFormData>
}

function VerificadoBadge() {
  return (
    <Badge
      variant="secondary"
      className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
    >
      <CheckCircle2 data-icon="inline-start" />
      Verificado
    </Badge>
  )
}

export function SegurancaTab({ control }: SegurancaTabProps) {
  const emailVerificado = useWatch({ control, name: "emailVerificado" })
  const celularVerificado = useWatch({ control, name: "celularVerificado" })

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Segurança da conta</h2>

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                E-mail <span className="text-destructive">*</span>
              </FieldLabel>

              <div className="flex items-center gap-2">
                <Input
                  id={field.name}
                  type="email"
                  className="flex-1"
                  disabled={emailVerificado}
                  aria-invalid={!!fieldState.error}
                  {...field}
                />

                {emailVerificado && <VerificadoBadge />}
              </div>

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
          name="celularAtivacao"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                Celular de ativação <span className="text-destructive">*</span>
              </FieldLabel>

              <div className="flex items-center gap-2">
                <Input
                  id={field.name}
                  className="flex-1"
                  placeholder="(DDD) 00000-0000"
                  inputMode="numeric"
                  maxLength={15}
                  disabled={celularVerificado}
                  aria-invalid={!!fieldState.error}
                  {...field}
                  onChange={(event) =>
                    field.onChange(formatarTelefone(event.target.value))
                  }
                />

                {celularVerificado && <VerificadoBadge />}
              </div>

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
      </FieldGroup>
    </section>
  )
}
