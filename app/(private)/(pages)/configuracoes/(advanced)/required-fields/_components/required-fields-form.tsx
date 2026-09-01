"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { Transfer } from "@/components/transfer"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"

import {
  attendanceFieldGroups,
  patientFieldGroups,
  type RequiredFieldGroup,
} from "./mock-data"

function FieldGroupGrid({ groups }: { groups: RequiredFieldGroup[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string, valor: boolean) => {
    setChecked((atual) => {
      const proximo = new Set(atual)
      if (valor) proximo.add(id)
      else proximo.delete(id)
      return proximo
    })
  }

  return (
    <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title} className="space-y-3">
          <p className="text-sm font-medium">{group.title}</p>
          <div className="space-y-2">
            {group.fields.map((field) => {
              const inputId = `field-${field.id}`
              return (
                <div key={field.id} className="flex items-center gap-2">
                  <Checkbox
                    id={inputId}
                    checked={checked.has(field.id)}
                    onCheckedChange={(valor) => toggle(field.id, valor === true)}
                  />
                  <Label htmlFor={inputId} className="text-sm font-normal">
                    {field.label}
                  </Label>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function RequiredFieldsForm() {
  const [insuranceIds, setInsuranceIds] = useState<string[]>([])

  const nomePorId = new Map(conveniosMock.map((c) => [c.id, c.nome]))
  const idPorNome = new Map(conveniosMock.map((c) => [c.nome, c.id]))
  const selecionados = insuranceIds
    .map((id) => nomePorId.get(id))
    .filter((nome): nome is string => !!nome)

  const salvar = () => {
    toast("Alterações salvas com sucesso.")
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h3 className="text-base font-semibold">Dados do Paciente</h3>
        <FieldGroupGrid groups={patientFieldGroups} />

        <h3 className="mt-8 text-base font-semibold">Dados do atendimento</h3>
        <FieldGroupGrid groups={attendanceFieldGroups} />

        <h3 className="mt-8 text-base font-semibold">
          Exigir Número de Matrícula para seguintes convênios:
        </h3>
        <div className="mt-4">
          <Transfer
            disponiveisTitle="Disponíveis"
            inclusosTitle="Incluso na regra"
            searchPlaceholder="Buscar"
            disponiveis={conveniosMock
              .map((c) => c.nome)
              .filter((nome) => !selecionados.includes(nome))}
            inclusos={selecionados}
            onIncludedChange={(nomes) =>
              setInsuranceIds(
                nomes
                  .map((nome) => idPorNome.get(nome))
                  .filter((id): id is string => !!id)
              )
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={salvar}>
          Salvar alterações
        </Button>
      </div>
    </div>
  )
}
