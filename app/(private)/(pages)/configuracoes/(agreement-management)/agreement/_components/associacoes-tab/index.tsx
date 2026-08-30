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

import { associacoesMock, type Associacao } from "../dados-mock"

export function AssociacoesTab() {
  const [associacoes, setAssociacoes] =
    useState<Associacao[]>(associacoesMock)
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? associacoes.filter(
        (a) =>
          a.nome.toLowerCase().includes(search.toLowerCase()) ||
          a.descricao.toLowerCase().includes(search.toLowerCase())
      )
    : associacoes

  const excluir = (id: string) => {
    setAssociacoes((atual) => atual.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar associação..."
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
              <TableHead>Descrição</TableHead>
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
                  Nenhuma associação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((associacao) => (
                <TableRow key={associacao.id}>
                  <TableCell className="font-medium">
                    {associacao.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {associacao.convenios.length > 0
                      ? associacao.convenios.join(", ")
                      : "Nenhum convênio vinculado"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {associacao.descricao}
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
                          onClick={() => excluir(associacao.id)}
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
