"use client"

import { ClipboardList } from "lucide-react"

import type { TipoRegistro } from "../../dados-mock"
import { rotuloRegistro } from "../../dados-mock"
import { FormAnamnese } from "./form-anamnese"
import { FormTexto } from "./form-texto"

interface RegistroFormProps {
  tipo: TipoRegistro
  valores: Record<string, string | string[]>
  onChange: (id: string, valor: string | string[]) => void
}

const TIPOS_TEXTO: TipoRegistro[] = ["TEXTO", "PRIVADO", "EVOLUCAO"]

export function RegistroForm({ tipo, valores, onChange }: RegistroFormProps) {
  if (TIPOS_TEXTO.includes(tipo)) {
    return (
      <FormTexto
        value={(valores._texto as string) ?? ""}
        onChange={(value) => onChange("_texto", value)}
      />
    )
  }

  if (tipo === "ANAMNESE") {
    return <FormAnamnese valores={valores} onChange={onChange} />
  }

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/30 p-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted">
        <ClipboardList className="size-5 text-muted-foreground" />
      </span>
      <p className="text-sm text-muted-foreground">
        Formulário de {rotuloRegistro(tipo)} em breve.
      </p>
    </div>
  )
}
