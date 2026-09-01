"use client"

import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { calcularIdade, formatCPF } from "@/lib/utils"

import { PatientSearch } from "./patient-search"
import { PatientAdditionalFields } from "./patient-additional-fields"
import { PatientDocumentsCard } from "./patient-documents-card"
import { PatientTagsCard } from "./patient-tags-card"
import type { AgendamentoFormValues } from "./types"
import { conveniosMock, type Paciente } from "../mock-data"

interface PatientInfoSectionProps {
  values: AgendamentoFormValues
  onChange: <K extends keyof AgendamentoFormValues>(
    key: K,
    value: AgendamentoFormValues[K]
  ) => void
  onSelectPatient: (paciente: Paciente | null) => void
}

const CAMPOS_ESSENCIAIS: (keyof AgendamentoFormValues)[] = [
  "cpf",
  "rg",
  "telefone",
  "email",
  "convenioId",
]

export function PatientInfoSection({
  values,
  onChange,
  onSelectPatient,
}: PatientInfoSectionProps) {
  const patientPresent = values.pacienteNome.trim().length > 0

  const camposFaltando = values.pacienteSelecionado
    ? CAMPOS_ESSENCIAIS.filter((campo) => !values[campo]).length
    : 0

  const idade = values.dataNascimento
    ? calcularIdade(values.dataNascimento)
    : null

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-base font-semibold">Informações do paciente</h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="mb-1.5 flex items-center gap-2">
            <Button
              type="button"
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => toast("Prontuário em construção.")}
            >
              Ver prontuário
            </Button>
            {camposFaltando > 0 && (
              <Badge variant="destructive">
                {camposFaltando} falta{camposFaltando > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <PatientSearch
            value={values.pacienteNome}
            onChange={(nome) => onChange("pacienteNome", nome)}
            selectedPatient={values.pacienteSelecionado}
            onSelectPatient={onSelectPatient}
          />
        </div>

        <Field>
          <FieldLabel htmlFor="patient-cpf">CPF do paciente</FieldLabel>
          <Input
            id="patient-cpf"
            placeholder="000.000.000-00"
            value={formatCPF(values.cpf)}
            onChange={(e) =>
              onChange("cpf", e.target.value.replace(/\D/g, "").slice(0, 11))
            }
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="patient-rg">RG</FieldLabel>
          <Input
            id="patient-rg"
            placeholder="Insira o nº do RG"
            value={values.rg}
            onChange={(e) => onChange("rg", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="patient-nascimento">
            Data de nascimento
          </FieldLabel>
          <div className="flex items-center gap-2">
            <Input
              id="patient-nascimento"
              type="date"
              className="flex-1"
              value={
                values.dataNascimento
                  ? values.dataNascimento.toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                onChange(
                  "dataNascimento",
                  e.target.value ? new Date(`${e.target.value}T00:00:00`) : undefined
                )
              }
            />
            {idade !== null && (
              <span className="shrink-0 text-sm text-muted-foreground">
                {idade} anos
              </span>
            )}
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="patient-telefone">Telefone</FieldLabel>
          <Input
            id="patient-telefone"
            placeholder="(99) 99999-9999"
            value={values.telefone}
            onChange={(e) => onChange("telefone", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="patient-email">E-mail</FieldLabel>
          <Input
            id="patient-email"
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="patient-convenio">Convênio</FieldLabel>
          <Select
            value={values.convenioId}
            onValueChange={(v) => onChange("convenioId", v)}
          >
            <SelectTrigger id="patient-convenio">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="particular">Particular</SelectItem>
                {conveniosMock.map((convenio) => (
                  <SelectItem key={convenio.id} value={convenio.id}>
                    {convenio.nome}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="patient-matricula">Matrícula</FieldLabel>
            <Input
              id="patient-matricula"
              placeholder="000000000"
              value={values.matricula}
              onChange={(e) => onChange("matricula", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="patient-validade">Validade</FieldLabel>
            <Input
              id="patient-validade"
              placeholder="00/00/0000"
              value={values.validade}
              onChange={(e) => onChange("validade", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <PatientAdditionalFields values={values} onChange={onChange} />

      <div className="grid gap-4 sm:grid-cols-2">
        <PatientDocumentsCard values={values} onChange={onChange} />
        <PatientTagsCard
          values={values}
          onChange={onChange}
          patientPresent={patientPresent}
        />
      </div>
    </div>
  )
}
