"use client"

import { RichTextEditor } from "@/components/rich-text-editor"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { equipeMock, type ProcedimentoExame } from "../../../dados-mock"
import { BuscaProcedimento } from "./busca-procedimento"

export interface EstadoLaudo {
  procedimento: string
  executante: string
  solicitante: string
  titulo: string
  ocultarTitulo: boolean
  ocultarAssinatura: boolean
  texto: string
}

export function estadoLaudoInicial(): EstadoLaudo {
  return {
    procedimento: "",
    executante: "",
    solicitante: "",
    titulo: "",
    ocultarTitulo: false,
    ocultarAssinatura: false,
    texto: "",
  }
}

interface FormLaudoProps {
  estado: EstadoLaudo
  onChange: (estado: EstadoLaudo) => void
}

export function FormLaudo({ estado, onChange }: FormLaudoProps) {
  const atualizar = (patch: Partial<EstadoLaudo>) =>
    onChange({ ...estado, ...patch })

  function selecionarProcedimento(procedimento: ProcedimentoExame) {
    atualizar({
      procedimento: `${procedimento.codigo} - ${procedimento.descricao}`,
    })
  }

  return (
    <div className="space-y-5">
      <FieldGroup className="gap-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <FieldLabel>Procedimento/Exame</FieldLabel>
            <BuscaProcedimento
              valor={estado.procedimento}
              onTexto={(texto) => atualizar({ procedimento: texto })}
              onSelecionar={selecionarProcedimento}
            />
          </Field>

          <Field>
            <FieldLabel>Executante</FieldLabel>
            <Select
              value={estado.executante}
              onValueChange={(valor) => atualizar({ executante: valor })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Buscar" />
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

          <Field>
            <FieldLabel>Solicitante</FieldLabel>
            <Select
              value={estado.solicitante}
              onValueChange={(valor) => atualizar({ solicitante: valor })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Buscar" />
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
          <FieldLabel>Título</FieldLabel>
          <div className="flex flex-wrap items-center gap-4">
            <Input
              className="max-w-xl"
              value={estado.titulo}
              onChange={(event) => atualizar({ titulo: event.target.value })}
            />

            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={estado.ocultarTitulo}
                onCheckedChange={(checked) =>
                  atualizar({ ocultarTitulo: checked === true })
                }
              />
              Ocultar título
            </label>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={estado.ocultarAssinatura}
                onCheckedChange={(checked) =>
                  atualizar({ ocultarAssinatura: checked === true })
                }
              />
              Ocultar assinatura na impressão
            </label>
          </div>
        </Field>

        <Field>
          <FieldLabel className="sr-only">Laudo</FieldLabel>
          <RichTextEditor
            value={estado.texto}
            onChange={(texto) => atualizar({ texto })}
            className="min-h-50"
          />
        </Field>
      </FieldGroup>
    </div>
  )
}
