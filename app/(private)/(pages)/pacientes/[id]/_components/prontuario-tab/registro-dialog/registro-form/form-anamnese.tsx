"use client"

import { camposAnamneseMock } from "../../../dados-mock"
import { RegistroCampos } from "./registro-campos"

interface FormAnamneseProps {
  valores: Record<string, unknown>
  onChange: (id: string, valor: unknown) => void
}

export function FormAnamnese({ valores, onChange }: FormAnamneseProps) {
  return (
    <RegistroCampos
      campos={camposAnamneseMock}
      valores={valores as Record<string, string | string[]>}
      onChange={(id, valor) => onChange(id, valor)}
    />
  )
}
