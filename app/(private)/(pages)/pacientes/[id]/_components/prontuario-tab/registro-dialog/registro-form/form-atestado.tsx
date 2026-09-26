"use client"

import { RichTextEditor } from "@/components/rich-text-editor"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

export type SubtipoAtestado = "ATESTADO" | "DECLARACAO" | "OUTROS"

export interface EstadoAtestado {
  subtipo: SubtipoAtestado
  texto: string
  ocultarData: boolean
  ocultarAssinatura: boolean
}

export function estadoAtestadoInicial(): EstadoAtestado {
  return {
    subtipo: "ATESTADO",
    texto: "",
    ocultarData: false,
    ocultarAssinatura: false,
  }
}

const SUBTIPOS: { valor: SubtipoAtestado; rotulo: string }[] = [
  { valor: "ATESTADO", rotulo: "Atestado" },
  { valor: "DECLARACAO", rotulo: "Declaração" },
  { valor: "OUTROS", rotulo: "Outros" },
]

interface FormAtestadoProps {
  estado: EstadoAtestado
  onChange: (estado: EstadoAtestado) => void
}

export function FormAtestado({ estado, onChange }: FormAtestadoProps) {
  const atualizar = (patch: Partial<EstadoAtestado>) =>
    onChange({ ...estado, ...patch })

  return (
    <div className="space-y-5">
      <Field>
        <FieldLabel>Tipo</FieldLabel>
        <ButtonGroup>
          {SUBTIPOS.map(({ valor, rotulo }) => (
            <Button
              key={valor}
              type="button"
              variant="outline"
              aria-pressed={estado.subtipo === valor}
              onClick={() => atualizar({ subtipo: valor })}
            >
              {rotulo}
            </Button>
          ))}
        </ButtonGroup>
      </Field>

      <Field>
        <FieldLabel className="sr-only">Atestado</FieldLabel>
        <RichTextEditor
          value={estado.texto}
          onChange={(texto) => atualizar({ texto })}
          className="min-h-64"
        />
      </Field>

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
