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

import { fluxosMock, type Fluxo } from "../dados-mock"
import { FluxoDialog } from "./fluxo-dialog"

export function FluxosTab() {
  const [fluxos, setFluxos] = useState<Fluxo[]>(fluxosMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Fluxo | null>(null)

  const filtered = search.trim()
    ? fluxos.filter(
        (fluxo) =>
          fluxo.nome.toLowerCase().includes(search.toLowerCase()) ||
          fluxo.sigla.toLowerCase().includes(search.toLowerCase())
      )
    : fluxos

  const salvar = (fluxo: Fluxo) => {
    setFluxos((atual) => {
      const existe = atual.some((f) => f.id === fluxo.id)

      return existe
        ? atual.map((f) => (f.id === fluxo.id ? fluxo : f))
        : [...atual, fluxo]
    })
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (fluxo: Fluxo) => {
    setFluxos((atual) => atual.filter((f) => f.id !== fluxo.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar fluxo..."
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
              <TableHead>Sigla</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead>Cor</TableHead>
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
                  Nenhum fluxo encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((fluxo) => (
                <TableRow key={fluxo.id}>
                  <TableCell className="font-medium">{fluxo.nome}</TableCell>
                  <TableCell>{fluxo.sigla}</TableCell>
                  <TableCell>{fluxo.ordem}</TableCell>
                  <TableCell>
                    <span
                      className="inline-block size-5 rounded-full"
                      style={{ backgroundColor: fluxo.cor }}
                    />
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
                            setEditando(fluxo)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(fluxo)}
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

      <FluxoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        fluxo={editando}
        onSave={salvar}
      />
    </div>
  )
}
