"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { nomeSchema, type NomeFormData } from "../_schemas/nome.schema"

export const useNomeForm = (nome = "") => {
  const form = useForm<NomeFormData>({
    resolver: zodResolver(nomeSchema),
    defaultValues: {
      nome,
    },
  })

  return { form }
}
