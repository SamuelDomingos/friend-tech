"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { fluxoSchema, type FluxoFormData } from "../_schemas/fluxo.schema"
import type { Fluxo } from "../_components/dados-mock"

export const useFluxoForm = (fluxo?: Fluxo | null) => {
  const form = useForm<FluxoFormData>({
    resolver: zodResolver(fluxoSchema),
    defaultValues: {
      nome: fluxo?.nome ?? "",
      sigla: fluxo?.sigla ?? "",
      ordem: fluxo?.ordem ?? "",
      cor: fluxo?.cor ?? "",
    },
  })

  return { form }
}
