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

import { PatientSourceDialog } from "./_components/patient-source-dialog"
import { patientSourcesMock, type PatientSource } from "./_components/mock-data"

export default function PatientSourcesPage() {
  const [sources, setSources] = useState<PatientSource[]>(patientSourcesMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<PatientSource | null>(null)

  const filtered = search.trim()
    ? sources.filter((s) =>
        s.nome.toLowerCase().includes(search.trim().toLowerCase())
      )
    : sources

  const abrirNovo = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (source: PatientSource) => {
    setEditing(source)
    setDialogOpen(true)
  }

  const salvar = (source: PatientSource) => {
    setSources((atual) => {
      const existe = atual.some((s) => s.id === source.id)
      return existe
        ? atual.map((s) => (s.id === source.id ? source : s))
        : [...atual, source]
    })
    setDialogOpen(false)
  }

  const remover = (id: string) => {
    setSources((atual) => atual.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Como Conheceu</h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar o Como Conheceu.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <InputGroup className="sm:max-w-xs">
            <InputGroupInput
              placeholder="Buscar por nome"
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
                    Nenhum registro cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((source) => (
                  <TableRow
                    key={source.id}
                    className="cursor-pointer"
                    onClick={() => abrirEdicao(source)}
                  >
                    <TableCell className="font-medium">
                      {source.nome}
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
                          <DropdownMenuItem onClick={() => abrirEdicao(source)}>
                            <Pencil className="size-4" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => remover(source.id)}
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
      </div>

      <PatientSourceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        source={editing}
        onSave={salvar}
      />
    </div>
  )
}
