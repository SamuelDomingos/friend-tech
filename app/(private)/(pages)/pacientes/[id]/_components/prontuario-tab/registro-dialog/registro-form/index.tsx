"use client"

import { ClipboardList } from "lucide-react"

import type { TipoRegistro } from "../../../dados-mock"
import { rotuloRegistro } from "../../../dados-mock"
import { FormAnamnese } from "./form-anamnese"
import { FormAnexo, estadoAnexoInicial, type EstadoAnexo } from "./form-anexo"
import {
  FormAtestado,
  estadoAtestadoInicial,
  type EstadoAtestado,
} from "./form-atestado"
import { FormLaudo, estadoLaudoInicial, type EstadoLaudo } from "./form-laudo"
import { FormQuestionario } from "./form-questionario"
import {
  FormReceituario,
  estadoReceituarioInicial,
  type EstadoReceituario,
} from "./form-receituario"
import {
  FormSolicitacaoGuia,
  estadoSolicitacaoGuiaInicial,
  type EstadoSolicitacaoGuia,
} from "./form-solicitacao-guia"
import { FormTexto } from "./form-texto"

export { estadoAnexoInicial, type EstadoAnexo } from "./form-anexo"
export {
  estadoAtestadoInicial,
  type EstadoAtestado,
} from "./form-atestado"
export { estadoLaudoInicial, type EstadoLaudo } from "./form-laudo"
export {
  estadoReceituarioInicial,
  type EstadoReceituario,
} from "./form-receituario"
export {
  estadoSolicitacaoGuiaInicial,
  type EstadoSolicitacaoGuia,
} from "./form-solicitacao-guia"

interface RegistroFormProps {
  tipo: TipoRegistro
  valores: Record<string, unknown>
  onChange: (id: string, valor: unknown) => void
}

const TIPOS_TEXTO: TipoRegistro[] = [
  "TEXTO",
  "PRIVADO",
  "EVOLUCAO",
  "SOLICITACAO_EXAME",
]

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

  if (tipo === "ANEXO") {
    return (
      <FormAnexo
        estado={
          (valores._anexo as EstadoAnexo | undefined) ?? estadoAnexoInicial()
        }
        onChange={(estado) => onChange("_anexo", estado)}
      />
    )
  }

  if (tipo === "RECEITUARIO") {
    return (
      <FormReceituario
        estado={
          (valores._receituario as EstadoReceituario | undefined) ??
          estadoReceituarioInicial()
        }
        onChange={(estado) => onChange("_receituario", estado)}
      />
    )
  }

  if (tipo === "SOLICITACAO_EXAME_GUIA") {
    return (
      <FormSolicitacaoGuia
        estado={
          (valores._guia as EstadoSolicitacaoGuia | undefined) ??
          estadoSolicitacaoGuiaInicial()
        }
        onChange={(estado) => onChange("_guia", estado)}
      />
    )
  }

  if (tipo === "LAUDO") {
    return (
      <FormLaudo
        estado={
          (valores._laudo as EstadoLaudo | undefined) ?? estadoLaudoInicial()
        }
        onChange={(estado) => onChange("_laudo", estado)}
      />
    )
  }

  if (tipo === "ATESTADO") {
    return (
      <FormAtestado
        estado={
          (valores._atestado as EstadoAtestado | undefined) ??
          estadoAtestadoInicial()
        }
        onChange={(estado) => onChange("_atestado", estado)}
      />
    )
  }

  if (tipo === "QUESTIONARIO") {
    return <FormQuestionario valores={valores} onChange={onChange} />
  }

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/30 p-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted">
        <ClipboardList className="size-5 text-muted-foreground" />
      </span>
      <p className="text-sm text-muted-foreground">
        Formulário de {rotuloRegistro(tipo)} em breve.
      </p>
    </div>
  )
}
