"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  enviarImpressoSchema,
  type EnviarImpressoFormData,
} from "../_schemas/enviar-impresso.schema"

export const IMPRESSOS_DISPONIVEIS = [
  { value: "RECEITUARIO", label: "Receituário", limite: 3 },
  { value: "ATESTADO", label: "Atestado", limite: 1 },
  { value: "SOLICITACAO_EXAME", label: "Solicitação de exames", limite: 2 },
  { value: "LAUDO", label: "Laudo", limite: 1 },
] as const

const valoresIniciais: EnviarImpressoFormData = {
  documentos: IMPRESSOS_DISPONIVEIS.map((item) => item.value),
}

interface UseEnviarImpressoFormParams {
  pacienteNome: string
  onConcluir: () => void
}

export function useEnviarImpressoForm({
  pacienteNome,
  onConcluir,
}: UseEnviarImpressoFormParams) {
  const form = useForm<EnviarImpressoFormData>({
    resolver: zodResolver(enviarImpressoSchema),
    defaultValues: valoresIniciais,
  })

  function alternarDocumento(valor: string, marcado: boolean) {
    const atuais = form.getValues("documentos")
    const proximos = marcado
      ? [...atuais, valor]
      : atuais.filter((item) => item !== valor)

    form.setValue("documentos", proximos, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const onSubmit = form.handleSubmit((dados) => {
    toast(
      `${dados.documentos.length} impresso(s) enviado(s) por e-mail para o paciente ${pacienteNome}.`
    )
    form.reset(valoresIniciais)
    onConcluir()
  })

  function descartar() {
    form.reset(valoresIniciais)
    onConcluir()
  }

  return { form, alternarDocumento, onSubmit, descartar }
}
