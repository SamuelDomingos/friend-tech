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

import { achadosMock, gruposMock, type Achado } from "../dados-mock"
import { AchadoDialog } from "./achado-dialog"

export function AchadosTab() {
  const [achados, setAchados] = useState<Achado[]>(achadosMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Achado | null>(null)

  const filtered = search.trim()
    ? achados.filter((achado) =>
        achado.nome.toLowerCase().includes(search.toLowerCase())
      )
    : achados

  const nomeGrupo = (id: string) =>
    gruposMock.find((grupo) => grupo.id === id)?.nome ?? "—"

  const salvar = (achado: Achado) => {
    setAchados((atual) => {
      const existe = atual.some((a) => a.id === achado.id)

      return existe
        ? atual.map((a) => (a.id === achado.id ? achado : a))
        : [...atual, achado]
    })
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (achado: Achado) => {
    setAchados((atual) => atual.filter((a) => a.id !== achado.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar achado..."
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
                  Nenhum achado encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((achado) => (
                <TableRow key={achado.id}>
                  <TableCell className="font-medium">{achado.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {nomeGrupo(achado.grupoId)}
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
                        <DropdownMenuItem
                          onClick={() => {
                            setEditando(achado)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(achado)}
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

      <AchadoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        achado={editando}
        onSave={salvar}
      />
    </div>
  )
}
