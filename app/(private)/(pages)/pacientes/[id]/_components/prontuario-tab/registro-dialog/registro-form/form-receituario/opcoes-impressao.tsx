"use client"

import { Checkbox } from "@/components/ui/checkbox"

import type { EstadoReceituario } from "."

type ChaveOcultar = keyof EstadoReceituario["ocultar"]

const OPCOES: { chave: ChaveOcultar; rotulo: string }[] = [
  { chave: "data", rotulo: "Ocultar data na impressão" },
  { chave: "assinatura", rotulo: "Ocultar assinatura na impressão" },
  { chave: "endereco", rotulo: "Ocultar endereço na impressão" },
  { chave: "numeracao", rotulo: "Ocultar numeração na impressão" },
  {
    chave: "laboratorio",
    rotulo: "Ocultar laboratório do medicamento na impressão",
  },
  { chave: "cpf", rotulo: "Ocultar CPF do paciente na impressão" },
]

interface OpcoesImpressaoProps {
  ocultar: EstadoReceituario["ocultar"]
  onChange: (ocultar: EstadoReceituario["ocultar"]) => void
}

export function OpcoesImpressao({
  ocultar,
  onChange,
}: OpcoesImpressaoProps) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {OPCOES.map(({ chave, rotulo }) => (
        <label key={chave} className="flex items-start gap-2 text-sm">
          <Checkbox
            checked={ocultar[chave]}
            onCheckedChange={(checked) =>
              onChange({ ...ocultar, [chave]: checked === true })
            }
            className="mt-0.5"
          />
          {rotulo}
        </label>
      ))}
    </div>
  )
}
