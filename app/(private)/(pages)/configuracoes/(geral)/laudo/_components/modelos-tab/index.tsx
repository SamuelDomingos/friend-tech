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

import { gruposMock, modelosMock, type Modelo } from "../dados-mock"
import { ModeloDialog } from "./modelo-dialog"

export function ModelosTab() {
  const [modelos, setModelos] = useState<Modelo[]>(modelosMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Modelo | null>(null)

  const filtered = search.trim()
    ? modelos.filter((modelo) =>
        modelo.nome.toLowerCase().includes(search.toLowerCase())
      )
    : modelos

  const nomeGrupo = (id: string) =>
    gruposMock.find((grupo) => grupo.id === id)?.nome ?? "—"

  const salvar = (modelo: Modelo) => {
    setModelos((atual) => {
      const existe = atual.some((m) => m.id === modelo.id)

      return existe
        ? atual.map((m) => (m.id === modelo.id ? modelo : m))
        : [...atual, modelo]
    })
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (modelo: Modelo) => {
    setModelos((atual) => atual.filter((m) => m.id !== modelo.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar modelo..."
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
              <TableHead>Nome</TableHead>
              <TableHead>Grupo</TableHead>
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
                  Nenhum modelo encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((modelo) => (
                <TableRow key={modelo.id}>
                  <TableCell className="font-medium">{modelo.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {nomeGrupo(modelo.grupoId)}
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
                            setEditando(modelo)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(modelo)}
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

      <ModeloDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        modelo={editando}
        onSave={salvar}
      />
    </div>
  )
}
