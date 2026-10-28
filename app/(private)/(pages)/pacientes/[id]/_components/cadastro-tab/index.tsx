"use client"

import { Button } from "@/components/ui/button"

import { useCadastroForm } from "../../_hooks/use-cadastro-form"
import type { PacienteDetalhe } from "../dados-mock"
import { ContatoEndereco } from "./contato-endereco"
import { ConvenioSaude } from "./convenio-saude"
import { DadosPessoais } from "./dados-pessoais"

interface CadastroTabProps {
  paciente: PacienteDetalhe
}

export function CadastroTab({ paciente }: CadastroTabProps) {
  const cadastro = useCadastroForm(paciente)

  return (
    <form className="space-y-4" onSubmit={cadastro.onSubmit} noValidate>
      <DadosPessoais
        form={cadastro.form}
        alterarCpf={cadastro.alterarCpf}
        selecionarSexo={cadastro.selecionarSexo}
        selecionarEstadoCivil={cadastro.selecionarEstadoCivil}
      />

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <ContatoEndereco form={cadastro.form} />
      </div>

      <ConvenioSaude form={cadastro.form} paciente={paciente} />

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" onClick={cadastro.descartar}>
          Descartar
        </Button>

        <Button type="submit">Salvar alterações</Button>
      </div>
    </form>
  )
}
