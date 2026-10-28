"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  outrasInformacoesSchema,
  type OutrasInformacoesFormData,
} from "../_schemas/outras-informacoes.schema"

const valoresIniciais: OutrasInformacoesFormData = {
  agendamentoOnline: true,
  exibirFimDeSemana: false,
  bloquearEncaixe: true,
  antecedenciaCancelamento: "24",
  intervaloAtendimentos: "10",
  observacoes: "",
}

export const useOutrasInformacoesForm = () => {
  const form = useForm<OutrasInformacoesFormData>({
    resolver: zodResolver(outrasInformacoesSchema),
    defaultValues: valoresIniciais,
  })

  const onSubmit = form.handleSubmit(() => {
    toast("Configurações de agenda salvas.")
  })

  function descartar() {
    form.reset(valoresIniciais)
    toast("Alterações descartadas.")
  }

  return { form, onSubmit, descartar }
}
