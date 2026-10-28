"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  tipoAtendimentoSchema,
  type TipoAtendimentoFormData,
} from "../_schemas/tipo-atendimento.schema"

const valoresIniciais: TipoAtendimentoFormData = {
  nome: "",
  duracao: "30",
  prazoRetorno: "30",
  tipo: "",
  cor: "#4f46e5",
  ativo: true,
}

export const useTipoAtendimentoForm = () => {
  const form = useForm<TipoAtendimentoFormData>({
    resolver: zodResolver(tipoAtendimentoSchema),
    defaultValues: valoresIniciais,
  })

  function selecionarTipo(valor: string) {
    form.setValue("tipo", valor, { shouldDirty: true, shouldValidate: true })
  }

  function selecionarCor(valor: string) {
    form.setValue("cor", valor, { shouldDirty: true, shouldValidate: true })
  }

  const onSubmit = form.handleSubmit(() => {
    toast("Tipo de atendimento salvo.")
  })

  function descartar() {
    form.reset(valoresIniciais)
    toast("Alterações descartadas.")
  }

  return { form, selecionarTipo, selecionarCor, onSubmit, descartar }
}
