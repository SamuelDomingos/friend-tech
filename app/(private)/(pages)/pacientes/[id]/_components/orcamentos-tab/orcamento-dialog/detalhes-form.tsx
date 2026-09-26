"use client"

import { RichTextEditor } from "@/components/rich-text-editor"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  solicitantesContasMock,
  unidadesContasMock,
} from "../../contas-tab/dados-mock"

interface DetalhesFormProps {
  solicitantePrimario: string
  onSolicitantePrimario: (valor: string) => void
  solicitanteSecundario: string
  onSolicitanteSecundario: (valor: string) => void
  unidade: string
  onUnidade: (valor: string) => void
  observacoes: string
  onObservacoes: (valor: string) => void
}

export function DetalhesForm({
  solicitantePrimario,
  onSolicitantePrimario,
  solicitanteSecundario,
  onSolicitanteSecundario,
  unidade,
  onUnidade,
  observacoes,
  onObservacoes,
}: DetalhesFormProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1.5 block">Solicitante primário</Label>
          <Select
            value={solicitantePrimario}
            onValueChange={onSolicitantePrimario}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {solicitantesContasMock.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1.5 block">Solicitante secundário</Label>
          <Select
            value={solicitanteSecundario}
            onValueChange={onSolicitanteSecundario}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {solicitantesContasMock.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-w-xs">
        <Label className="mb-1.5 block">Unidade</Label>
        <Select value={unidade} onValueChange={onUnidade}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {unidadesContasMock.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1.5 block">Observações adicionais</Label>
        <RichTextEditor
          value={observacoes}
          onChange={onObservacoes}
          className="min-h-48"
        />
      </div>
    </div>
  )
}
