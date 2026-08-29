"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  feriadoSchema,
  type FeriadoFormData,
} from "../_schemas/feriado.schema"

export const useFeriadoForm = () => {
  const form = useForm<FeriadoFormData>({
    resolver: zodResolver(feriadoSchema),
    defaultValues: {
      tipo: "recorrente",
      nome: "",
      dia: "",
      mes: "",
    },
  })

  return { form }
}
