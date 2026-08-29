"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { contaSchema, type ContaFormData } from "../_schemas/conta.schema"
import { contaMock } from "../_components/dados-mock"

export const useContaForm = (dados: ContaFormData = contaMock) => {
  const form = useForm<ContaFormData>({
    resolver: zodResolver(contaSchema),
    defaultValues: dados,
  })

  return { form }
}
