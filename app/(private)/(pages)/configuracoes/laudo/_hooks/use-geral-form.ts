"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { geralSchema, type GeralFormData } from "../_schemas/geral.schema"

export const useGeralForm = () => {
  const form = useForm<GeralFormData>({
    resolver: zodResolver(geralSchema),
    defaultValues: {
      integracaoPacs: "",
      urlResultado: "",
      risLogin: "",
      risSenha: "",
      logoImpressao: "DEFAULT",
      cabecalhoPaciente: false,
    },
  })

  return { form }
}
