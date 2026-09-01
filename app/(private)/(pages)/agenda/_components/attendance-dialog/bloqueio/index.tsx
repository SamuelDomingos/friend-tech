"use client"

import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { professionalsMock, unidadesFilterMock } from "@/app/(private)/(pages)/agenda/_components/mock-data"

export interface BlockAgendaFormValues {
  profissionalId: string
  unidadeId: string
  dataInicio: Date | undefined
  dataFim: Date | undefined
  horaInicio: string
  horaFim: string
  observacoes: string
}

interface BlockAgendaFormProps {
  values: BlockAgendaFormValues
  onChange: <K extends keyof BlockAgendaFormValues>(
    key: K,
    value: BlockAgendaFormValues[K]
  ) => void
}

const requiredMark = <span className="text-destructive">*</span>

export function BlockAgendaForm({ values, onChange }: BlockAgendaFormProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 py-2">
      <h3 className="text-base font-semibold">Informações do atendimento</h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="block-profissional">
              Nome do profissional {requiredMark}
            </FieldLabel>
            <Select
              value={values.profissionalId}
              onValueChange={(v) => onChange("profissionalId", v)}
            >
              <SelectTrigger id="block-profissional" className="w-full">
                <SelectValue placeholder="Insira o nome do profissional" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {professionalsMock.map((profissional) => (
                    <SelectItem key={profissional.id} value={profissional.id}>
                      {profissional.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="block-unidade">
              Unidade {requiredMark}
            </FieldLabel>
            <Select
              value={values.unidadeId}
              onValueChange={(v) => onChange("unidadeId", v)}
            >
              <SelectTrigger id="block-unidade" className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {unidadesFilterMock.map((unidade) => (
                    <SelectItem key={unidade.id} value={unidade.id}>
                      {unidade.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="block-data-inicio">
                Início {requiredMark}
              </FieldLabel>
              <DatePicker
                value={values.dataInicio}
                onChange={(date) => onChange("dataInicio", date)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="block-data-fim">
                Término {requiredMark}
              </FieldLabel>
              <DatePicker
                value={values.dataFim}
                onChange={(date) => onChange("dataFim", date)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="block-hora-inicio">
                Horário de Início {requiredMark}
              </FieldLabel>
              <Input
                id="block-hora-inicio"
                type="time"
                value={values.horaInicio}
                onChange={(e) => onChange("horaInicio", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="block-hora-fim">
                Horário de Término {requiredMark}
              </FieldLabel>
              <Input
                id="block-hora-fim"
                type="time"
                value={values.horaFim}
                onChange={(e) => onChange("horaFim", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <Field>
          <FieldLabel htmlFor="block-observacoes">Observações</FieldLabel>
          <Textarea
            id="block-observacoes"
            className="h-full min-h-40 resize-none"
            value={values.observacoes}
            onChange={(e) => onChange("observacoes", e.target.value)}
          />
        </Field>
      </div>
    </div>
  )
}
