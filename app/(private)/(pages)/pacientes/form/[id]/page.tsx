"use client"

import { useParams } from "next/navigation"

import { pacientesMock } from "../../_components/dados-mock"

export default function PacienteDetailPage() {
  const params = useParams<{ id: string }>()
  const paciente = pacientesMock.find((p) => p.id === params.id)

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          {paciente?.nome ?? "Paciente"}
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          {paciente
            ? `Página do paciente ${paciente.nome}.`
            : "Paciente não encontrado."}
        </p>
      </div>
    </div>
  )
}
