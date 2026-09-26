"use client"

import { MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { Paciente } from "../dados-mock"

interface PacienteRowActionsProps {
  paciente: Paciente
  onAbrir: (paciente: Paciente) => void
  onDeletar: (paciente: Paciente) => void
}

export function PacienteRowActions({
  paciente,
  onAbrir,
  onDeletar,
}: PacienteRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm" aria-label="Ações">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAbrir(paciente)}>
          Ver
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDeletar(paciente)}
        >
          <Trash2 className="size-4" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
