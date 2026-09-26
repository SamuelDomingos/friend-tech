"use client"

import { camposQuestionarioMock } from "../../../dados-mock"
import { RegistroCampos } from "./registro-campos"

interface FormQuestionarioProps {
  valores: Record<string, unknown>
  onChange: (id: string, valor: unknown) => void
}

export function FormQuestionario({
  valores,
  onChange,
}: FormQuestionarioProps) {
  return (
    <RegistroCampos
      campos={camposQuestionarioMock}
      valores={valores as Record<string, string | string[]>}
      onChange={(id, valor) => onChange(id, valor)}
    />
  )
}
