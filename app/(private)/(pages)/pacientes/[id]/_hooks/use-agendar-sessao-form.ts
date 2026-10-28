"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import {
  agendarSessaoSchema,
  type AgendarSessaoFormData,
} from "../_schemas/agendar-sessao.schema"

const valoresIniciais: AgendarSessaoFormData = {
  frequencia: "WEEKLY",
  quantidade: "4",
  inicio: new Date(),
  hora: "",
  dias: [],
  reembolso: false,
  faturamentoConvenio: false,
  autorizacao: "",
}

interface UseAgendarSessaoFormParams {
  onConfirmar: (quantidade: number) => void
  onConcluir: () => void
}

export function useAgendarSessaoForm({
  onConfirmar,
  onConcluir,
}: UseAgendarSessaoFormParams) {
  const form = useForm<AgendarSessaoFormData>({
    resolver: zodResolver(agendarSessaoSchema),
    defaultValues: valoresIniciais,
  })

  const frequencia = useWatch({ control: form.control, name: "frequencia" })
  const dias = useWatch({ control: form.control, name: "dias" }) ?? []

  function alternarDia(dia: string) {
    const atuais = form.getValues("dias")
    const proximos = atuais.includes(dia)
      ? atuais.filter((item) => item !== dia)
      : [...atuais, dia]

    form.setValue("dias", proximos, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const onSubmit = form.handleSubmit((dados) => {
    if (dados.frequencia === "WEEKLY" && dados.dias.length === 0) {
      form.setError("dias", { message: "Selecione ao menos um dia" })
      return
    }

    const quantidade = Number(dados.quantidade)

    onConfirmar(quantidade)
    toast(`${quantidade} sessão(ões) agendada(s).`)
    form.reset(valoresIniciais)
    onConcluir()
  })

  function descartar() {
    form.reset(valoresIniciais)
    onConcluir()
  }

  return { form, frequencia, dias, alternarDia, onSubmit, descartar }
}
