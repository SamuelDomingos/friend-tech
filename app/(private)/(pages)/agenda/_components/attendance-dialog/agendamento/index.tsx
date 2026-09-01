"use client"

import { PatientInfoSection } from "./patient-info-section"
import { AttendanceInfoSection } from "./attendance-info-section"
import type { Paciente } from "../mock-data"
import type { AgendamentoFormValues } from "./types"

export type { AgendamentoFormValues } from "./types"

interface AgendamentoTabProps {
  values: AgendamentoFormValues
  onChange: <K extends keyof AgendamentoFormValues>(
    key: K,
    value: AgendamentoFormValues[K]
  ) => void
}

/** Campos do paciente preenchidos automaticamente ao selecionar um cadastro existente. */
export function valoresDoPaciente(
  paciente: Paciente
): Partial<AgendamentoFormValues> {
  return {
    pacienteSelecionado: paciente,
    pacienteNome: paciente.nome,
    cpf: paciente.cpf ?? "",
    rg: paciente.rg ?? "",
    dataNascimento: paciente.dataNascimento
      ? new Date(`${paciente.dataNascimento}T00:00:00`)
      : undefined,
    telefone: paciente.telefone ?? "",
    email: paciente.email ?? "",
    convenioId: paciente.convenioId ?? "particular",
    matricula: paciente.matricula ?? "",
    validade: paciente.validade ?? "",
    nomeSocial: paciente.nomeSocial ?? "",
    outroDocumentoTipo: paciente.outroDocumentoTipo ?? "",
    outroDocumentoNumero: paciente.outroDocumentoNumero ?? "",
    sexo: paciente.sexo ?? "",
    raca: paciente.raca ?? "",
    etnia: paciente.etnia ?? "",
    naturalidade: paciente.naturalidade ?? "",
    nacionalidade: paciente.nacionalidade ?? "",
    estadoCivil: paciente.estadoCivil ?? "",
    plano: paciente.plano ?? "",
    utilizarRnGuia: paciente.utilizarRnGuia ?? "Não",
    telefone2: paciente.telefone2 ?? "",
    comoConheceu: paciente.comoConheceu ?? "",
    profissao: paciente.profissao ?? "",
    cep: paciente.cep ?? "",
    tipoLogradouro: paciente.tipoLogradouro ?? "",
    endereco: paciente.endereco ?? "",
    numero: paciente.numero ?? "",
    complemento: paciente.complemento ?? "",
    bairro: paciente.bairro ?? "",
    cidade: paciente.cidade ?? "",
    estado: paciente.estado ?? "",
    alergias: paciente.alergias ?? "",
    tipoSanguineo: paciente.tipoSanguineo ?? "",
    nomeResponsavel: paciente.nomeResponsavel ?? "",
    cpfResponsavel: paciente.cpfResponsavel ?? "",
    nomeMae: paciente.nomeMae ?? "",
    observacoesResponsavel: paciente.observacoesResponsavel ?? "",
    etiquetas: paciente.etiquetas ?? [],
  }
}

export function AgendamentoTab({ values, onChange }: AgendamentoTabProps) {
  const handleSelectPatient = (paciente: Paciente | null) => {
    if (!paciente) {
      onChange("pacienteSelecionado", null)
      return
    }

    const preenchido = valoresDoPaciente(paciente)
    for (const chave of Object.keys(preenchido) as Array<
      keyof AgendamentoFormValues
    >) {
      onChange(chave, preenchido[chave] as AgendamentoFormValues[typeof chave])
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 py-2">
      <PatientInfoSection
        values={values}
        onChange={onChange}
        onSelectPatient={handleSelectPatient}
      />
      <AttendanceInfoSection values={values} onChange={onChange} />
    </div>
  )
}
