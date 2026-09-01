"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, SearchIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Transfer } from "@/components/transfer"

import {
  conveniosMock,
  gruposConvenioMock,
  type GrupoConvenio,
} from "../dados-mock"

export function GruposTab() {
  const [grupos, setGrupos] = useState<GrupoConvenio[]>(gruposConvenioMock)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [nome, setNome] = useState("")
  const [convenios, setConvenios] = useState<string[]>([])

  const filtered = search.trim()
    ? grupos.filter((g) =>
        g.nome.toLowerCase().includes(search.toLowerCase())
      )
    : grupos

  const abrirModal = (grupo?: GrupoConvenio) => {
    setEditingId(grupo?.id ?? null)
    setNome(grupo?.nome ?? "")
    setConvenios(grupo?.convenios ?? [])
    setModalOpen(true)
  }

  const salvar = () => {
    if (!nome.trim()) return

    if (editingId) {
      setGrupos((atual) =>
        atual.map((g) =>
          g.id === editingId ? { ...g, nome, convenios } : g
        )
      )
    } else {
      setGrupos((atual) => [
        ...atual,
        { id: `gc-${Date.now()}`, nome, convenios },
      ])
    }

    setModalOpen(false)
  }

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

        <Button type="button" onClick={() => abrirModal()}>
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
                        <DropdownMenuItem onClick={() => abrirModal(grupo)}>
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar grupo de convênio" : "Novo grupo de convênio"}
            </DialogTitle>
            <DialogDescription>
              Defina o nome do grupo e selecione os convênios vinculados.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="min-h-0">
            <div className="space-y-6 pr-4 pb-1">
              <Field>
                <FieldLabel htmlFor="grupo-nome">Nome</FieldLabel>
                <Input
                  id="grupo-nome"
                  placeholder="Nome do grupo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Field>

              <Transfer
                disponiveisTitle="Convênios disponíveis"
                inclusosTitle="Convênios no grupo"
                searchPlaceholder="Buscar convênio"
                disponiveis={conveniosMock
                  .map((c) => c.nome)
                  .filter((n) => !convenios.includes(n))}
                inclusos={convenios}
                onIncludedChange={setConvenios}
              />
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={salvar}>
              {editingId ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
