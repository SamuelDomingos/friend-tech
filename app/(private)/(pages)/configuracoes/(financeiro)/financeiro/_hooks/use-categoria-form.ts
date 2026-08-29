"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  categoriaSchema,
  type CategoriaFormData,
} from "../_schemas/categoria.schema"
import type { CategoriaPlano } from "../_components/dados-mock"

export const useCategoriaForm = (categoria?: CategoriaPlano | null) => {
  const form = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nome: categoria?.nome ?? "",
      grupo: categoria?.grupo ?? "",
    },
  })

  return { form }
}
