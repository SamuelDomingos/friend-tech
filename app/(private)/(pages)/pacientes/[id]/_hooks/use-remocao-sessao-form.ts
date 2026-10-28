"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  remocaoSessaoSchema,
  type RemocaoSessaoFormData,
} from "../_schemas/remocao-sessao.schema"

const valoresIniciais: RemocaoSessaoFormData = { escopo: "CURRENT" }

interface UseRemocaoSessaoFormParams {
  onConfirmar: (escopo: RemocaoSessaoFormData["escopo"]) => void
  onConcluir: () => void
}

export function useRemocaoSessaoForm({
  onConfirmar,
  onConcluir,
}: UseRemocaoSessaoFormParams) {
  const form = useForm<RemocaoSessaoFormData>({
    resolver: zodResolver(remocaoSessaoSchema),
    defaultValues: valoresIniciais,
  })

  const onSubmit = form.handleSubmit((dados) => {
    onConfirmar(dados.escopo)
    toast("Sessão removida.")
    form.reset(valoresIniciais)
    onConcluir()
  })

  function descartar() {
    form.reset(valoresIniciais)
    onConcluir()
  }

  return { form, onSubmit, descartar }
}
