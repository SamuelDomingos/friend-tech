"use client"

import { Controller, type UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { CadastroPacienteFormData } from "../../_schemas/cadastro-paciente.schema"
import { Campo, SecaoCadastro } from "./secao-cadastro"

interface DadosPessoaisProps {
  form: UseFormReturn<CadastroPacienteFormData>
  alterarCpf: (valor: string) => void
  selecionarSexo: (valor: string) => void
  selecionarEstadoCivil: (valor: string) => void
}

const SEXOS = ["Feminino", "Masculino", "Outro", "Prefiro não informar"]
const ESTADOS_CIVIS = [
  "Solteiro(a)",
  "Casado(a)",
  "Divorciado(a)",
  "Viúvo(a)",
  "União estável",
]

export function DadosPessoais({
  form,
  alterarCpf,
  selecionarSexo,
  selecionarEstadoCivil,
}: DadosPessoaisProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form

  return (
    <SecaoCadastro
      titulo="Dados pessoais"
      descricao="Informações de identificação do paciente."
    >
      <Campo rotulo="Nome completo" erro={errors.nomeCompleto?.message}>
        <Input {...register("nomeCompleto")} />
      </Campo>

      <Campo rotulo="Nome social">
        <Input {...register("nomeSocial")} />
      </Campo>

      <Campo rotulo="CPF" erro={errors.cpf?.message}>
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={(event) => alterarCpf(event.target.value)}
              onBlur={field.onBlur}
              placeholder="000.000.000-00"
            />
          )}
        />
      </Campo>

      <Campo rotulo="RG">
        <Input {...register("rg")} placeholder="Insira o nº do RG" />
      </Campo>

      <Campo rotulo="Data de nascimento" erro={errors.nascimento?.message}>
        <Input type="date" {...register("nascimento")} />
      </Campo>

      <Campo rotulo="Sexo">
        <Controller
          name="sexo"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={selecionarSexo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {SEXOS.map((sexo) => (
                  <SelectItem key={sexo} value={sexo}>
                    {sexo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Campo>

      <Campo rotulo="Estado civil">
        <Controller
          name="estadoCivil"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={selecionarEstadoCivil}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {ESTADOS_CIVIS.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Campo>

      <Campo rotulo="Profissão">
        <Input {...register("profissao")} placeholder="Insira a profissão" />
      </Campo>

      <Campo rotulo="Nome da mãe">
        <Input
          {...register("nomeMae")}
          placeholder="Insira o nome da mãe do paciente"
        />
      </Campo>

      <Campo rotulo="Responsável">
        <Input
          {...register("responsavel")}
          placeholder="Insira o nome do responsável"
        />
      </Campo>
    </SecaoCadastro>
  )
}
