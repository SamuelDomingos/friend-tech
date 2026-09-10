"use client"

import { useMemo } from "react"

import {
  getProntuarioPorPaciente,
  type PacienteDetalhe,
  type ProntuarioDados,
} from "../_components/dados-mock"

export function usePacienteProntuario(id: string) {
  return useMemo(() => {
    const { paciente, dados } = getProntuarioPorPaciente(id)
    return {
      paciente: paciente as PacienteDetalhe | null,
      dados: dados as ProntuarioDados | null,
      notFound: !paciente || !dados,
    }
  }, [id])
}
