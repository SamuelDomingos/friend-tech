"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  consultorioSchema,
  type ConsultorioFormData,
} from "../_schemas/consultorio.schema"

export const useConsultorioForm = () => {
  const form = useForm<ConsultorioFormData>({
    resolver: zodResolver(consultorioSchema),
    defaultValues: {
      tipo: "consultorio",
      nome: "",
      nomeExibicao: "",
    },
  })

  return { form }
}
