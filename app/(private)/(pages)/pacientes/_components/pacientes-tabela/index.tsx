"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { iniciais } from "@/lib/avatar-utils"

import type { Paciente } from "../dados-mock"
import { PacienteRowActions } from "./row-actions"

function formatarData(iso: string): string {
  if (!iso) {
    return "—"
  }
  const [ano, mes, dia] = iso.split("-")
  return `${dia}/${mes}/${ano}`
}

interface PacientesTabelaProps {
  pacientes: Paciente[]
  onAbrir: (paciente: Paciente) => void
  onDeletar: (paciente: Paciente) => void
}

export function PacientesTabela({
  pacientes,
  onAbrir,
  onDeletar,
}: PacientesTabelaProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Último atendimento</TableHead>
            <TableHead>Próximo atendimento</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pacientes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhum paciente encontrado.
              </TableCell>
            </TableRow>
          ) : (
            pacientes.map((paciente) => (
              <TableRow
                key={paciente.id}
                className="cursor-pointer"
                onClick={() => onAbrir(paciente)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {paciente.avatar ? (
                        <AvatarImage
                          src={paciente.avatar}
                          alt={paciente.nome}
                        />
                      ) : (
                        <AvatarFallback>
                          {iniciais(paciente.nome)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium">{paciente.nome}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {paciente.telefone || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {paciente.cidade || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatarData(paciente.ultimoAtendimento)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatarData(paciente.proximoAtendimento)}
                </TableCell>
                <TableCell
                  className="text-right"
                  onClick={(event) => event.stopPropagation()}
                >
                  <PacienteRowActions
                    paciente={paciente}
                    onAbrir={onAbrir}
                    onDeletar={onDeletar}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
