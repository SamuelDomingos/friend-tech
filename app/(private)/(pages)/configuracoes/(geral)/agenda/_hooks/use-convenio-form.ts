"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  convenioSchema,
  type ConvenioFormData,
} from "../_schemas/convenio.schema"

export const useConvenioForm = () => {
  const form = useForm<ConvenioFormData>({
    resolver: zodResolver(convenioSchema),
    defaultValues: {
      convenio: "",
      tipoRegra: "",
      unidade: "",
      inicio: "",
      final: "",
      diasSemana: [],
    },
  })

  return { form }
}
