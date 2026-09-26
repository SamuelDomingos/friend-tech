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

import { RecepcaoDialog } from "./recepcao-dialog"

interface Recepcao {
  id: string
  nome: string
  salas: string[]
  unidade: string
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const recepcoesMock: Recepcao[] = [
  {
    id: "1",
    nome: "Recepção Principal",
    salas: ["Sala 01", "Sala 02"],
    unidade: "Unidade A",
  },
  {
    id: "2",
    nome: "Recepção Secundária",
    salas: ["Consultório A"],
    unidade: "Unidade B",
  },
]

export function RecepcaoTab() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = search.trim()
    ? recepcoesMock.filter((recepcao) =>
        recepcao.nome.toLowerCase().includes(search.toLowerCase())
      )
    : recepcoesMock

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar recepção..."
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
              <TableHead>Nome</TableHead>
              <TableHead>Salas</TableHead>
              <TableHead>Unidade</TableHead>
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
                  Nenhuma recepção encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((recepcao) => (
                <TableRow key={recepcao.id}>
                  <TableCell className="font-medium">
                    {recepcao.nome}
                  </TableCell>
                  <TableCell>{recepcao.salas.join(", ")}</TableCell>
                  <TableCell>{recepcao.unidade}</TableCell>
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

      <RecepcaoDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
