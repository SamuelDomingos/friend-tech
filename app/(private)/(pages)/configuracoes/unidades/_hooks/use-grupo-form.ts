"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { grupoSchema, type GrupoFormData } from "../_schemas/grupo.schema"
import type { Grupo } from "../_components/dados-mock"

export const useGrupoForm = (grupo?: Grupo | null) => {
  const form = useForm<GrupoFormData>({
    resolver: zodResolver(grupoSchema),
    defaultValues: {
      nome: grupo?.nome ?? "",
      unidades: grupo?.unidades ?? [],
    },
  })

  return { form }
}
