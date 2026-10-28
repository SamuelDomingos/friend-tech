"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import {
  teleconsultaSchema,
  type TeleconsultaFormData,
} from "../_schemas/teleconsulta.schema"
import type { PacienteDetalhe } from "../_components/dados-mock"

export const CANAIS_FLOW = [
  { value: "whatsapp", label: "WhatsApp principal" },
  { value: "whatsapp-2", label: "WhatsApp secundário" },
] as const

interface UseTeleconsultaFormParams {
  paciente: PacienteDetalhe
  emailPaciente?: string
  onConcluir: () => void
}

export function useTeleconsultaForm({
  paciente,
  emailPaciente = "",
  onConcluir,
}: UseTeleconsultaFormParams) {
  const valoresIniciais: TeleconsultaFormData = {
    telefoneOrigem: "cadastrado",
    telefoneCadastrado: paciente.telefone,
    telefoneNovo: "",
    enviarPor: "SMS",
    canal: "",
    emailOrigem: "cadastrado",
    emailNovo: "",
  }

  const form = useForm<TeleconsultaFormData>({
    resolver: zodResolver(teleconsultaSchema),
    defaultValues: valoresIniciais,
  })

  const enviarPor = useWatch({ control: form.control, name: "enviarPor" })
  const telefoneOrigem = useWatch({
    control: form.control,
    name: "telefoneOrigem",
  })
  const emailOrigem = useWatch({ control: form.control, name: "emailOrigem" })

  function selecionarTelefoneOrigem(valor: string) {
    form.setValue("telefoneOrigem", valor as "cadastrado" | "novo", {
      shouldValidate: false,
    })
  }

  function selecionarEmailOrigem(valor: string) {
    form.setValue("emailOrigem", valor as "cadastrado" | "novo", {
      shouldValidate: false,
    })
  }

  function selecionarEnviarPor(valor: string) {
    form.setValue("enviarPor", valor as "FLOW" | "SMS", {
      shouldValidate: false,
    })
  }

  const onSubmit = form.handleSubmit((dados) => {
    const telefone =
      dados.telefoneOrigem === "cadastrado"
        ? dados.telefoneCadastrado
        : dados.telefoneNovo

    toast(
      `Link da videochamada de ${paciente.nome} enviado por ${
        dados.enviarPor === "FLOW" ? "Amigo Flow" : "SMS"
      }${telefone ? ` para ${telefone}` : ""}.`
    )
    form.reset(valoresIniciais)
    onConcluir()
  })

  function descartar() {
    form.reset(valoresIniciais)
    onConcluir()
  }

  return {
    form,
    enviarPor,
    telefoneOrigem,
    emailOrigem,
    emailPaciente,
    selecionarTelefoneOrigem,
    selecionarEmailOrigem,
    selecionarEnviarPor,
    onSubmit,
    descartar,
  }
}
