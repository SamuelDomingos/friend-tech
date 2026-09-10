"use client"

import { camposAnamneseMock } from "../../dados-mock"
import { RegistroCampos } from "./registro-campos"

interface FormAnamneseProps {
  valores: Record<string, string | string[]>
  onChange: (id: string, valor: string | string[]) => void
}

export function FormAnamnese({ valores, onChange }: FormAnamneseProps) {
  return (
    <RegistroCampos
      campos={camposAnamneseMock}
      valores={valores}
      onChange={onChange}
    />
  )
}
