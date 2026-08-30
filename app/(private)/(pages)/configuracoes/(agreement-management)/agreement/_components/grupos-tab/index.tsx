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

import { gruposConvenioMock, type GrupoConvenio } from "../dados-mock"

export function GruposTab() {
  const [grupos, setGrupos] = useState<GrupoConvenio[]>(gruposConvenioMock)
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? grupos.filter((g) =>
        g.nome.toLowerCase().includes(search.toLowerCase())
      )
    : grupos

  const excluir = (id: string) => {
    setGrupos((atual) => atual.filter((g) => g.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar grupo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Convênios</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum grupo encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((grupo) => (
                <TableRow key={grupo.id}>
                  <TableCell className="font-medium">{grupo.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {grupo.convenios.length > 0
                      ? grupo.convenios.join(", ")
                      : "Nenhum convênio vinculado"}
                  </TableCell>
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

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(grupo.id)}
                        >
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
    </div>
  )
}
