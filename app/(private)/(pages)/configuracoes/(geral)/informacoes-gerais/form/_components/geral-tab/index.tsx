"use client"

import { Controller } from "react-hook-form"
import type { Control } from "react-hook-form"
import { Video } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

import type { ImpressaoFormData } from "../../_schemas/impressao.schema"

interface GeralTabProps {
  control: Control<ImpressaoFormData>
}

export function GeralTab({ control }: GeralTabProps) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Video className="size-5 text-muted-foreground" />
        Telemedicina
      </h2>

      <Controller
        name="termoConsentimento"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>
              Termo de consentimento
            </FieldLabel>

            <Textarea
              id={field.name}
              rows={6}
              placeholder="Descreva o termo de consentimento da telemedicina..."
              {...field}
            />
          </Field>
        )}
      />
    </section>
  )
}
