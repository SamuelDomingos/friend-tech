"use client"

import type { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"

import type { CadastroPacienteFormData } from "../../_schemas/cadastro-paciente.schema"
import { Campo, SecaoCadastro } from "./secao-cadastro"

interface ContatoEnderecoProps {
  form: UseFormReturn<CadastroPacienteFormData>
}

export function ContatoEndereco({ form }: ContatoEnderecoProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <>
      <SecaoCadastro
        titulo="Contato"
        descricao="Como a clínica fala com o paciente."
      >
        <Campo rotulo="Celular">
          <Input {...register("celular")} placeholder="(99) 99999-9999" />
        </Campo>

        <Campo rotulo="Telefone">
          <Input {...register("telefone")} placeholder="(99) 9999-9999" />
        </Campo>

        <Campo rotulo="E-mail" erro={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="paciente@email.com"
          />
        </Campo>
      </SecaoCadastro>

      <SecaoCadastro
        titulo="Endereço"
        descricao="Endereço residencial do paciente."
      >
        <Campo rotulo="CEP">
          <Input {...register("cep")} placeholder="00000-000" />
        </Campo>

        <Campo rotulo="Logradouro">
          <Input {...register("logradouro")} placeholder="Rua, avenida..." />
        </Campo>

        <Campo rotulo="Número">
          <Input {...register("numero")} />
        </Campo>

        <Campo rotulo="Complemento">
          <Input {...register("complemento")} placeholder="Apto, bloco..." />
        </Campo>

        <Campo rotulo="Bairro">
          <Input {...register("bairro")} />
        </Campo>

        <Campo rotulo="Cidade">
          <Input {...register("cidade")} />
        </Campo>

        <Campo rotulo="Estado">
          <Input {...register("estado")} maxLength={2} />
        </Campo>
      </SecaoCadastro>
    </>
  )
}
