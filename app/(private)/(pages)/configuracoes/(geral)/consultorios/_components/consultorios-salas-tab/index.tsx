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

import { ConsultorioDialog } from "./consultorio-dialog"

interface Consultorio {
  id: string
  tipo: string
  nome: string
  nomeExibicao: string
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const consultoriosMock: Consultorio[] = [
  {
    id: "1",
    tipo: "Consultório",
    nome: "Consultório 01",
    nomeExibicao: "Consulta 1",
  },
  {
    id: "2",
    tipo: "Sala de cirurgia",
    nome: "Sala de cirurgia 01",
    nomeExibicao: "Cirurgia 1",
  },
  {
    id: "3",
    tipo: "Consultório",
    nome: "Consultório 02",
    nomeExibicao: "Consulta 2",
  },
]

export function ConsultoriosSalasTab() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = search.trim()
    ? consultoriosMock.filter((consultorio) =>
        consultorio.nome.toLowerCase().includes(search.toLowerCase())
      )
    : consultoriosMock

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar consultório ou sala..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Nome de exibição</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum consultório ou sala encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((consultorio) => (
                <TableRow key={consultorio.id}>
                  <TableCell>{consultorio.tipo}</TableCell>
                  <TableCell className="font-medium">
                    {consultorio.nome}
                  </TableCell>
                  <TableCell>{consultorio.nomeExibicao}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon-sm"
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

      <ConsultorioDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
