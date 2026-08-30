"use client"

import { Controller, type Control } from "react-hook-form"

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { GLOSA_METHODS, type ConvenioFormData } from "../../_schemas/convenio.schema"

interface GlosasTabProps {
  control: Control<ConvenioFormData>
}

export function GlosasTab({ control }: GlosasTabProps) {
  return (
    <section className="space-y-4">
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="deadlineSendGlosa"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Prazo de Revisão de Glosas
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  maxLength={3}
                  inputMode="numeric"
                  className="text-right"
                  {...field}
                />
                <InputGroupAddon align="inline-end">dias</InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="deadlineExpectancyGlosa"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Prazo de Pagamento</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  maxLength={3}
                  inputMode="numeric"
                  className="text-right"
                  {...field}
                />
                <InputGroupAddon align="inline-end">dias</InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="glosaMethod"
          control={control}
          render={({ field }) => (
            <Field className="sm:col-span-2">
              <FieldLabel>Glosa</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {GLOSA_METHODS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>
    </section>
  )
}
