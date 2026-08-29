"use client"

import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Transfer } from "@/components/transfer"

import { TIPOS_ATENDIMENTO } from "../_shared/tipos-atendimento"
import type { GradeHorarioFormData } from "../../_schemas/grade-horario.schema"

const GENEROS = ["Masculino", "Feminino"]

const CONVENIOS = ["Amil", "Unimed", "SulAmérica", "Bradesco Saúde"]

interface AcordeonRestricoesProps {
  form: UseFormReturn<GradeHorarioFormData>
}

export function AcordeonRestricoes({ form }: AcordeonRestricoesProps) {
  const tiposInclusos = form.watch("tiposAtendimento")
  const convenios = form.watch("convenios")

  const disponiveis = TIPOS_ATENDIMENTO.filter(
    (tipo) => !tiposInclusos.includes(tipo)
  )

  const todosConvenios =
    convenios.length > 0 &&
    CONVENIOS.every((convenio) => convenios.includes(convenio))
  const algumConvenio = convenios.length > 0

  const toggleConvenio = (convenio: string) => {
    form.setValue(
      "convenios",
      convenios.includes(convenio)
        ? convenios.filter((item) => item !== convenio)
        : [...convenios, convenio]
    )
  }

  return (
    <Accordion type="multiple" className="rounded-lg border p-1">
      <AccordionItem value="paciente">
        <AccordionTrigger>Paciente</AccordionTrigger>

        <AccordionContent className="space-y-4 px-1 pt-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="idadeMinima"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Idade mínima</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    placeholder="Ex.: 0"
                    {...field}
                  />
                </Field>
              )}
            />

            <Controller
              name="idadeMaxima"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Idade máxima</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    placeholder="Ex.: 120"
                    {...field}
                  />
                </Field>
              )}
            />
          </div>

          <Controller
            name="generos"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Gênero</FieldLabel>

                <div className="flex gap-4">
                  {GENEROS.map((genero) => {
                    const checked = field.value.includes(genero)

                    return (
                      <label
                        key={genero}
                        className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(c) => {
                            const next = Boolean(c)

                            field.onChange(
                              next
                                ? [...field.value, genero]
                                : field.value.filter((item) => item !== genero)
                            )
                          }}
                        />
                        {genero}
                      </label>
                    )
                  })}
                </div>
              </Field>
            )}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="tipos-atendimento">
        <AccordionTrigger>Tipos de atendimentos</AccordionTrigger>

        <AccordionContent className="px-1 pt-3">
          <Transfer
            disponiveis={disponiveis}
            inclusos={tiposInclusos}
            onIncludedChange={(inclusos) =>
              form.setValue("tiposAtendimento", inclusos)
            }
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="convenio">
        <AccordionTrigger>Convênio</AccordionTrigger>

        <AccordionContent className="px-1 pt-3">
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <Checkbox
                checked={
                  todosConvenios
                    ? true
                    : algumConvenio
                      ? "indeterminate"
                      : false
                }
                onCheckedChange={(c) =>
                  form.setValue("convenios", Boolean(c) ? [...CONVENIOS] : [])
                }
              />
              Selecionar todos
            </label>

            {CONVENIOS.map((convenio) => {
              const checked = convenios.includes(convenio)

              return (
                <label
                  key={convenio}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleConvenio(convenio)}
                  />
                  {convenio}
                </label>
              )
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
