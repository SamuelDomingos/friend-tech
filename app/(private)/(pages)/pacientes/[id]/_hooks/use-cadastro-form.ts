"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  cadastroPacienteSchema,
  type CadastroPacienteFormData,
} from "../_schemas/cadastro-paciente.schema"
import type { PacienteDetalhe } from "../_components/dados-mock"
import { montarCadastro } from "../_components/cadastro-tab/dados-mock"
import { formatCPF } from "@/lib/utils"

export const useCadastroForm = (paciente: PacienteDetalhe) => {
  const cadastro = montarCadastro(paciente)

  const form = useForm<CadastroPacienteFormData>({
    resolver: zodResolver(cadastroPacienteSchema),
    defaultValues: cadastro,
  })

  function alterarCpf(valor: string) {
    form.setValue("cpf", formatCPF(valor), {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  function selecionarSexo(valor: string) {
    form.setValue("sexo", valor, { shouldDirty: true })
  }

  function selecionarEstadoCivil(valor: string) {
    form.setValue("estadoCivil", valor, { shouldDirty: true })
  }

  const onSubmit = form.handleSubmit(() => {
    toast("Dados do paciente atualizados.")
  })

  function descartar() {
    form.reset(cadastro)
    toast("Alterações descartadas.")
  }

  return {
    form,
    alterarCpf,
    selecionarSexo,
    selecionarEstadoCivil,
    onSubmit,
    descartar,
  }
}
