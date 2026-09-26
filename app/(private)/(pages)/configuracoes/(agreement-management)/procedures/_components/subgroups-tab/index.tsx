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

import { SubgroupDialog } from "./subgroup-dialog"
import type { Procedure, ProcedureGroup, ProcedureSubgroup } from "../mock-data"

interface SubgroupsTabProps {
  subgroups: ProcedureSubgroup[]
  onSubgroupsChange: (subgroups: ProcedureSubgroup[]) => void
  groups: ProcedureGroup[]
  procedures: Procedure[]
}

export function SubgroupsTab({
  subgroups,
  onSubgroupsChange,
  groups,
  procedures,
}: SubgroupsTabProps) {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ProcedureSubgroup | null>(null)

  const grupoNomePorId = new Map(groups.map((g) => [g.id, g.nome]))

  const filtered = search.trim()
    ? subgroups.filter((sg) =>
        sg.nome.toLowerCase().includes(search.toLowerCase())
      )
    : subgroups

  const abrirNovo = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (subgroup: ProcedureSubgroup) => {
    setEditing(subgroup)
    setDialogOpen(true)
  }

  const salvar = (subgroup: ProcedureSubgroup) => {
    const existe = subgroups.some((sg) => sg.id === subgroup.id)
    onSubgroupsChange(
      existe
        ? subgroups.map((sg) => (sg.id === subgroup.id ? subgroup : sg))
        : [...subgroups, subgroup]
    )
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    onSubgroupsChange(subgroups.filter((sg) => sg.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar subgrupo..."
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
                  Nenhum subgrupo cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((subgroup) => (
                <TableRow key={subgroup.id}>
                  <TableCell className="font-medium">
                    {subgroup.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {grupoNomePorId.get(subgroup.grupoId) ?? "—"}
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
                          onClick={() => abrirEdicao(subgroup)}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(subgroup.id)}
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

      <SubgroupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        subgroup={editing}
        groups={groups}
        procedures={procedures}
        onSave={salvar}
      />
    </div>
  )
}
