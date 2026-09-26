"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import {
  carateresGuiaMock,
  conveniosGuiaMock,
  equipeMock,
} from "../../../../dados-mock"
import { ProcedimentosExame } from "./procedimentos-exame"

export interface ProcedimentoGuia {
  codigo: string
  descricao: string
  quantidade: number
}

export interface EstadoSolicitacaoGuia {
  subtipo: string
  convenio: string
  carater: string
  solicitante: string
  indicacaoClinica: string
  observacao: string
  exibirDataHora: "Sim" | "Não"
  gerarCincoProcedimentos: "Sim" | "Não"
  codigo: string
  descricao: string
  quantidade: string
  procedimentos: ProcedimentoGuia[]
  ocultarData: boolean
  ocultarAssinatura: boolean
}

const SUBTIPOS = ["Solicitação de Exame", "SP/SADT"]
const OPCOES_SIM_NAO = ["Sim", "Não"] as const

export function estadoSolicitacaoGuiaInicial(): EstadoSolicitacaoGuia {
  return {
    subtipo: "Solicitação de Exame",
    convenio: "",
    carater: "01 - Eletivo",
    solicitante: "",
    indicacaoClinica: "",
    observacao: "",
    exibirDataHora: "Sim",
    gerarCincoProcedimentos: "Não",
    codigo: "",
    descricao: "",
    quantidade: "1",
    procedimentos: [],
    ocultarData: false,
    ocultarAssinatura: false,
  }
}

interface FormSolicitacaoGuiaProps {
  estado: EstadoSolicitacaoGuia
  onChange: (estado: EstadoSolicitacaoGuia) => void
}

export function FormSolicitacaoGuia({
  estado,
  onChange,
}: FormSolicitacaoGuiaProps) {
  const atualizar = (patch: Partial<EstadoSolicitacaoGuia>) =>
    onChange({ ...estado, ...patch })

  return (
    <div className="space-y-5">
      <Field>
        <FieldLabel>Tipo:</FieldLabel>
        <Select
          value={estado.subtipo}
          onValueChange={(valor) => atualizar({ subtipo: valor })}
        >
          <SelectTrigger className="w-full sm:max-w-xs">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {SUBTIPOS.map((subtipo) => (
              <SelectItem key={subtipo} value={subtipo}>
                {subtipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <FieldGroup className="gap-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <FieldLabel>Convênio</FieldLabel>
            <Select
              value={estado.convenio}
              onValueChange={(valor) => atualizar({ convenio: valor })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {conveniosGuiaMock.map((convenio) => (
                  <SelectItem key={convenio} value={convenio}>
                    {convenio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Caráter</FieldLabel>
            <Select
              value={estado.carater}
              onValueChange={(valor) => atualizar({ carater: valor })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {carateresGuiaMock.map((carater) => (
                  <SelectItem key={carater} value={carater}>
                    {carater}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Profissional Solicitante</FieldLabel>
            <Select
              value={estado.solicitante}
              onValueChange={(valor) => atualizar({ solicitante: valor })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {equipeMock.map((profissional) => (
                  <SelectItem key={profissional.id} value={profissional.nome}>
                    {profissional.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field>
          <FieldLabel>Indicação Clínica</FieldLabel>
          <Textarea
            rows={3}
            placeholder="Digite aqui"
            value={estado.indicacaoClinica}
            onChange={(event) =>
              atualizar({ indicacaoClinica: event.target.value })
            }
          />
        </Field>

        <Field>
          <FieldLabel>Observação</FieldLabel>
          <Textarea
            rows={3}
            placeholder="Digite aqui"
            value={estado.observacao}
            onChange={(event) => atualizar({ observacao: event.target.value })}
          />
        </Field>

        <Field>
          <FieldLabel>Exibir data / hora da solicitação na guia</FieldLabel>
          <RadioGroup
            value={estado.exibirDataHora}
            onValueChange={(valor) =>
              atualizar({ exibirDataHora: valor as "Sim" | "Não" })
            }
            className="flex gap-6"
          >
            {OPCOES_SIM_NAO.map((opcao) => (
              <label key={opcao} className="flex items-center gap-2 text-sm">
                <RadioGroupItem value={opcao} />
                {opcao}
              </label>
            ))}
          </RadioGroup>
        </Field>

        <Field>
          <FieldLabel>Gerar guia com 5 procedimentos</FieldLabel>
          <RadioGroup
            value={estado.gerarCincoProcedimentos}
            onValueChange={(valor) =>
              atualizar({ gerarCincoProcedimentos: valor as "Sim" | "Não" })
            }
            className="flex gap-6"
          >
            {OPCOES_SIM_NAO.map((opcao) => (
              <label key={opcao} className="flex items-center gap-2 text-sm">
                <RadioGroupItem value={opcao} />
                {opcao}
              </label>
            ))}
          </RadioGroup>
        </Field>
      </FieldGroup>

      <Separator />

      <ProcedimentosExame estado={estado} onChange={atualizar} />

      <div className="grid gap-2.5 sm:grid-cols-2">
        <label className="flex items-start gap-2 text-sm">
          <Checkbox
            checked={estado.ocultarData}
            onCheckedChange={(checked) =>
              atualizar({ ocultarData: checked === true })
            }
            className="mt-0.5"
          />
          Ocultar data na impressão
        </label>

        <label className="flex items-start gap-2 text-sm">
          <Checkbox
            checked={estado.ocultarAssinatura}
            onCheckedChange={(checked) =>
              atualizar({ ocultarAssinatura: checked === true })
            }
            className="mt-0.5"
          />
          Ocultar assinatura na impressão
        </label>
      </div>
    </div>
  )
}
