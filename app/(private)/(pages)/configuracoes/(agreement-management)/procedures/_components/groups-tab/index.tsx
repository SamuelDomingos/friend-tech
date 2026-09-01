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

import { GroupDialog } from "./group-dialog"
import type { Procedure, ProcedureGroup } from "../mock-data"

interface GroupsTabProps {
  groups: ProcedureGroup[]
  onGroupsChange: (groups: ProcedureGroup[]) => void
  procedures: Procedure[]
}

export function GroupsTab({
  groups,
  onGroupsChange,
  procedures,
}: GroupsTabProps) {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ProcedureGroup | null>(null)

  const filtered = search.trim()
    ? groups.filter((g) =>
        g.nome.toLowerCase().includes(search.toLowerCase())
      )
    : groups

  const abrirNovo = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (group: ProcedureGroup) => {
    setEditing(group)
    setDialogOpen(true)
  }

  const salvar = (group: ProcedureGroup) => {
    const existe = groups.some((g) => g.id === group.id)
    onGroupsChange(
      existe
        ? groups.map((g) => (g.id === group.id ? group : g))
        : [...groups, group]
    )
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    onGroupsChange(groups.filter((g) => g.id !== id))
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

        <Button type="button" onClick={abrirNovo}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Procedimentos</TableHead>
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
                  Nenhum grupo cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {group.procedimentoIds.length > 0
                      ? `${group.procedimentoIds.length} procedimento(s)`
                      : "Nenhum procedimento vinculado"}
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
                        <DropdownMenuItem onClick={() => abrirEdicao(group)}>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(group.id)}
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

      <GroupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        group={editing}
        procedures={procedures}
        onSave={salvar}
      />
    </div>
  )
}
