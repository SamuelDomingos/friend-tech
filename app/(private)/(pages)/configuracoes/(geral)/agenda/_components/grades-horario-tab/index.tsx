"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, SearchIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { GradeHorarioDialog } from "./grade-horario-dialog"

interface GradeHorario {
  id: string
  titulo: string
  unidade: string
  recorrencia: string
  dias: string
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const gradesMock: GradeHorario[] = [
  {
    id: "1",
    titulo: "Atendimento padrão",
    unidade: "Unidade A",
    recorrencia: "Semanal",
    dias: "Seg–Sex",
  },
  {
    id: "2",
    titulo: "Plantão de fim de semana",
    unidade: "Unidade B",
    recorrencia: "Quinzenal",
    dias: "Sáb",
  },
  {
    id: "3",
    titulo: "Consultas de retorno",
    unidade: "Unidade A",
    recorrencia: "Mensal",
    dias: "Seg–Sáb",
  },
]

export function GradesHorarioTab() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = search.trim()
    ? gradesMock.filter((grade) =>
        grade.titulo.toLowerCase().includes(search.toLowerCase())
      )
    : gradesMock

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar grade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="size-4" />
          Criar grade
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Recorrência</TableHead>
              <TableHead>Dias da semana</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma grade de horário encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.titulo}</TableCell>
                  <TableCell>{grade.unidade}</TableCell>
                  <TableCell>{grade.recorrencia}</TableCell>
                  <TableCell>{grade.dias}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Ações"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <GradeHorarioDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
