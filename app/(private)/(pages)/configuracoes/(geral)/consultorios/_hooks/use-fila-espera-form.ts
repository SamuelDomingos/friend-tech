"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  filaEsperaSchema,
  type FilaEsperaFormData,
} from "../_schemas/fila-espera.schema"

export const useFilaEsperaForm = () => {
  const form = useForm<FilaEsperaFormData>({
    resolver: zodResolver(filaEsperaSchema),
    defaultValues: {
      nome: "",
      cor: "",
    },
  })

  return { form }
}
