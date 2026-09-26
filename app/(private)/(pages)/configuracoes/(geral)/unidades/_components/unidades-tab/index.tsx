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

import { unidadesMock, type Unidade } from "../dados-mock"
import { UnidadeDialog } from "./unidade-dialog"

export function UnidadesTab() {
  const [unidades, setUnidades] = useState<Unidade[]>(unidadesMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Unidade | null>(null)

  const filtered = search.trim()
    ? unidades.filter(
        (unidade) =>
          unidade.nome.toLowerCase().includes(search.toLowerCase()) ||
          unidade.prefixo.toLowerCase().includes(search.toLowerCase())
      )
    : unidades

  const salvar = (unidade: Unidade) => {
    setUnidades((atual) => {
      const existe = atual.some((u) => u.id === unidade.id)

      return existe
        ? atual.map((u) => (u.id === unidade.id ? unidade : u))
        : [...atual, unidade]
    })
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (unidade: Unidade) => {
    setUnidades((atual) => atual.filter((u) => u.id !== unidade.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar unidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button
          onClick={() => {
            setEditando(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prefixo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Endereço</TableHead>
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
                  Nenhuma unidade encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((unidade) => (
                <TableRow key={unidade.id}>
                  <TableCell className="font-medium">
                    {unidade.prefixo}
                  </TableCell>
                  <TableCell>{unidade.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {unidade.endereco}, {unidade.numero}
                  </TableCell>
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
                        <DropdownMenuItem
                          onClick={() => {
                            setEditando(unidade)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(unidade)}
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

      <UnidadeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        unidade={editando}
        onSave={salvar}
      />
    </div>
  )
}
