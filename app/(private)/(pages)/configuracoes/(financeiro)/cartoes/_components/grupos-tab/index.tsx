"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type GrupoMaquineta } from "../dados-mock"
import { GrupoDialog, DeleteGrupoDialog } from "./grupo-dialog"

interface GruposTabProps {
  grupos: GrupoMaquineta[]
  search: string
  onSearchChange: (value: string) => void
}

export function GruposTab({ grupos, search, onSearchChange }: GruposTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingGrupo, setEditingGrupo] = useState<GrupoMaquineta | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingGrupo, setDeletingGrupo] = useState<GrupoMaquineta | null>(null)

  const filteredGrupos = grupos.filter((g) =>
    g.nome.toLowerCase().includes(search.toLowerCase()),
  )

  const handleEdit = (grupo: GrupoMaquineta) => {
    setEditingGrupo(grupo)
    setDialogOpen(true)
  }

  const handleDelete = (grupo: GrupoMaquineta) => {
    setDeletingGrupo(grupo)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 py-4">
        <InputGroup className="w-full sm:w-72">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar grupo"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>

        <Button onClick={() => { setEditingGrupo(null); setDialogOpen(true) }}>
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-center">Maquinetas</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredGrupos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  Nenhum grupo encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredGrupos.map((grupo) => (
                <TableRow key={grupo.id}>
                  <TableCell className="font-medium">{grupo.nome}</TableCell>
                  <TableCell className="text-center">{grupo.maquinetas.length}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon-sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(grupo)}>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(grupo)}
                        >
                          <Trash2 className="size-4" />
                          Remover
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

      <GrupoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        grupo={editingGrupo}
      />

      <DeleteGrupoDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        grupo={deletingGrupo}
      />
    </>
  )
}
