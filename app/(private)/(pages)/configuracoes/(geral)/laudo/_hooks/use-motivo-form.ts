"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { motivoSchema, type MotivoFormData } from "../_schemas/motivo.schema"
import type { Motivo } from "../_components/dados-mock"

export const useMotivoForm = (motivo?: Motivo | null) => {
  const form = useForm<MotivoFormData>({
    resolver: zodResolver(motivoSchema),
    defaultValues: {
      titulo: motivo?.titulo ?? "",
    },
  })

  return { form }
}
