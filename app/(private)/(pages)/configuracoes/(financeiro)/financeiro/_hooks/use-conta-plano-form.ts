"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  contaPlanoSchema,
  type ContaPlanoFormData,
} from "../_schemas/conta-plano.schema"
import type { ContaPlano } from "../_components/dados-mock"

export const useContaPlanoForm = (conta?: ContaPlano | null) => {
  const form = useForm<ContaPlanoFormData>({
    resolver: zodResolver(contaPlanoSchema),
    defaultValues: {
      categoriaId: conta?.categoriaId ?? "",
      nome: conta?.nome ?? "",
    },
  })

  return { form }
}
