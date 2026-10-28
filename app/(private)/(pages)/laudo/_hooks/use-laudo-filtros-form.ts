"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  LAUDO_FILTROS_INICIAIS,
  laudoFiltrosSchema,
  type LaudoFiltrosFormData,
} from "../_schemas/laudo-filtros.schema"

interface UseLaudoFiltrosFormParams {
  iniciais: LaudoFiltrosFormData
  onAplicar: (dados: LaudoFiltrosFormData) => void
  onLimpar: () => void
}

export function useLaudoFiltrosForm({
  iniciais,
  onAplicar,
  onLimpar,
}: UseLaudoFiltrosFormParams) {
  const form = useForm<LaudoFiltrosFormData>({
    resolver: zodResolver(laudoFiltrosSchema),
    defaultValues: iniciais,
  })

  const onSubmit = form.handleSubmit((dados) => {
    onAplicar(dados)
  })

  function limpar() {
    form.reset(LAUDO_FILTROS_INICIAIS)
    onLimpar()
  }

  function selecionar(campo: keyof LaudoFiltrosFormData, valor: string) {
    form.setValue(campo, valor, { shouldDirty: true, shouldValidate: true })
  }

  return { form, onSubmit, limpar, selecionar }
}
