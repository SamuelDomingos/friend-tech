"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { repasseSchema, type RepasseFormData } from "../_schemas/repasse.schema"

export const useRepasseForm = () => {
  const form = useForm<RepasseFormData>({
    resolver: zodResolver(repasseSchema),
    defaultValues: {
      nomeExibicao: "",
      tipoVigencia: "INDETERMINADO",
      inicioVigencia: "",
      fimVigencia: "",
      tipoProfissional: "EXECUTANT",
      formula: "",
      profissionais: [],
      procedimentos: [],
      convenios: [],
      unidades: [],
    },
  })

  return { form }
}
