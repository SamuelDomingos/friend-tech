"use client"

import type { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import type { PacienteDetalhe } from "../dados-mock"
import type { CadastroPacienteFormData } from "../../_schemas/cadastro-paciente.schema"
import { Campo, SecaoCadastro } from "./secao-cadastro"

interface ConvenioSaudeProps {
  form: UseFormReturn<CadastroPacienteFormData>
  paciente: PacienteDetalhe
}

export function ConvenioSaude({ form, paciente }: ConvenioSaudeProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <SecaoCadastro
      titulo="Convênio e observações"
      descricao="Dados do plano de saúde e anotações gerais."
    >
      <Campo rotulo="Convênio" erro={errors.convenio?.message}>
        <Input
          {...register("convenio")}
          placeholder="Particular, UNIMED..."
          list="convenios-paciente"
        />
        <datalist id="convenios-paciente">
          {paciente.convenios.map((convenio) => (
            <option key={convenio} value={convenio} />
          ))}
        </datalist>
      </Campo>

      <Campo rotulo="Plano">
        <Input {...register("plano")} placeholder="Insira o plano" />
      </Campo>

      <Campo rotulo="Carteirinha">
        <Input {...register("carteirinha")} placeholder="000000000" />
      </Campo>

      <Campo rotulo="Validade da carteirinha">
        <Input type="date" {...register("validadeCarteirinha")} />
      </Campo>

      <Campo rotulo="Observações" className="sm:col-span-2">
        <Textarea
          {...register("observacoes")}
          placeholder="Informações relevantes sobre o paciente"
          className="min-h-24"
        />
      </Campo>
    </SecaoCadastro>
  )
}
