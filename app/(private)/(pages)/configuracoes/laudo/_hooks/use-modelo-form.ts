"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { modeloSchema, type ModeloFormData } from "../_schemas/modelo.schema"
import type { Modelo } from "../_components/dados-mock"

export const useModeloForm = (modelo?: Modelo | null) => {
  const form = useForm<ModeloFormData>({
    resolver: zodResolver(modeloSchema),
    defaultValues: {
      nome: modelo?.nome ?? "",
      grupoId: modelo?.grupoId ?? "",
      titulo: modelo?.titulo ?? "",
      ocultarTitulo: modelo?.ocultarTitulo ?? false,
      conteudo: modelo?.conteudo ?? "",
    },
  })

  return { form }
}
