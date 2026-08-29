"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { achadoSchema, type AchadoFormData } from "../_schemas/achado.schema"
import type { Achado } from "../_components/dados-mock"

export const useAchadoForm = (achado?: Achado | null) => {
  const form = useForm<AchadoFormData>({
    resolver: zodResolver(achadoSchema),
    defaultValues: {
      nome: achado?.nome ?? "",
      grupoId: achado?.grupoId ?? "",
      conteudo: achado?.conteudo ?? "",
    },
  })

  return { form }
}
