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

import { RequesterDialog } from "./requester-dialog"
import {
  conselhoLabel,
  formatarDataHora,
  requestersMock,
  type Requester,
} from "../mock-data"

export function RequestersTab() {
  const [requesters, setRequesters] = useState<Requester[]>(requestersMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Requester | null>(null)

  const filtered = search.trim()
    ? requesters.filter((r) => {
        const termo = search.toLowerCase()
        return (
          r.nome.toLowerCase().includes(termo) ||
          r.cpfCnpj.toLowerCase().includes(termo)
        )
      })
    : requesters

  const abrirNovo = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (requester: Requester) => {
    setEditing(requester)
    setDialogOpen(true)
  }

  const salvar = (requester: Requester) => {
    setRequesters((atual) => {
      const existe = atual.some((r) => r.id === requester.id)
      return existe
        ? atual.map((r) => (r.id === requester.id ? requester : r))
        : [...atual, requester]
    })
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    setRequesters((atual) => atual.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Filtrar por nome/CPF/CNPJ"
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
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Conselho</TableHead>
              <TableHead>Última atualização</TableHead>
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
                  Nenhum solicitante cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((requester) => {
                const { data, hora } = formatarDataHora(requester.atualizadoEm)

                return (
                  <TableRow
                    key={requester.id}
                    className="cursor-pointer"
                    onClick={() => abrirEdicao(requester)}
                  >
                    <TableCell className="font-medium">
                      {requester.nome}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {requester.cpfCnpj || "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {conselhoLabel(requester)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {data}
                      <br />
                      <span className="text-xs text-muted-foreground/70">
                        {hora}
                      </span>
                    </TableCell>
                    <TableCell
                      className="text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                            onClick={() => abrirEdicao(requester)}
                          >
                            <Pencil className="size-4" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => excluir(requester.id)}
                          >
                            <Trash2 className="size-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <RequesterDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        requester={editing}
        onSave={salvar}
      />
    </div>
  )
}
