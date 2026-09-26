"use client"

import { Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { calcularIdade } from "@/lib/utils"
import { iniciais } from "@/lib/avatar-utils"

import type { PacienteDetalhe } from "../dados-mock"

interface CabecalhoPacienteProps {
  paciente: PacienteDetalhe
}

export function CabecalhoPaciente({ paciente }: CabecalhoPacienteProps) {
  const idade = paciente.dataNascimento
    ? calcularIdade(new Date(paciente.dataNascimento))
    : "—"

  return (
    <div className="flex items-start gap-3">
      <Avatar className="size-8">
        <AvatarImage src={paciente.avatar} alt={paciente.nome} />
        <AvatarFallback className="text-[10px]">
          {iniciais(paciente.nome)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-semibold">{paciente.nome}</span>
          {paciente.vip && (
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
          )}
          {paciente.alergia && <Badge variant="destructive">Alérgico</Badge>}
        </div>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Idade: <span className="text-foreground">{idade} anos</span>
          {"  ·  "}
          Convênio:{" "}
          <span className="text-foreground">{paciente.convenioPrincipal}</span>
        </p>
      </div>
    </div>
  )
}
