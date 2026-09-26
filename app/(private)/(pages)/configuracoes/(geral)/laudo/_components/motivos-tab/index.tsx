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

import { motivosMock, type Motivo } from "../dados-mock"
import { MotivoDialog } from "./motivo-dialog"

export function MotivosTab() {
  const [motivos, setMotivos] = useState<Motivo[]>(motivosMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Motivo | null>(null)

  const filtered = search.trim()
    ? motivos.filter((motivo) =>
        motivo.titulo.toLowerCase().includes(search.toLowerCase())
      )
    : motivos

  const salvar = (motivo: Motivo) => {
    setMotivos((atual) => {
      const existe = atual.some((m) => m.id === motivo.id)

      return existe
        ? atual.map((m) => (m.id === motivo.id ? motivo : m))
        : [...atual, motivo]
    })
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (motivo: Motivo) => {
    setMotivos((atual) => atual.filter((m) => m.id !== motivo.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar motivo..."
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
              <TableHead>Título</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum motivo encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((motivo) => (
                <TableRow key={motivo.id}>
                  <TableCell className="font-medium">{motivo.titulo}</TableCell>
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
                            setEditando(motivo)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(motivo)}
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

      <MotivoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        motivo={editando}
        onSave={salvar}
      />
    </div>
  )
}
