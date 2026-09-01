"use client"

import { useState } from "react"
import { Download, MoreHorizontal, Pencil, Plus, SearchIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"
import { formatDate } from "@/lib/utils"

import { ProcedureDialog } from "./procedure-dialog"
import { tipoGuiaLabel, type Procedure } from "../mock-data"

const POR_PAGINA = 10

interface ProceduresTabProps {
  procedures: Procedure[]
  onProceduresChange: (procedures: Procedure[]) => void
}

export function ProceduresTab({
  procedures,
  onProceduresChange,
}: ProceduresTabProps) {
  const [search, setSearch] = useState("")
  const [convenioFiltro, setConvenioFiltro] = useState("")
  const [pagina, setPagina] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Procedure | null>(null)

  const filtered = procedures.filter((p) => {
    const termo = search.trim().toLowerCase()
    return (
      !termo ||
      p.codigoTuss.toLowerCase().includes(termo) ||
      p.nome.toLowerCase().includes(termo) ||
      tipoGuiaLabel(p.tipoGuia).toLowerCase().includes(termo)
    )
  })

  const totalPaginas = Math.max(1, Math.ceil(filtered.length / POR_PAGINA))
  const paginaAtual = Math.min(pagina, totalPaginas)
  const paginados = filtered.slice(
    (paginaAtual - 1) * POR_PAGINA,
    paginaAtual * POR_PAGINA
  )

  const valorExibido = (procedure: Procedure) => {
    if (!convenioFiltro) return `R$ ${procedure.precoParticular || "0,00"}`

    const convenio = procedure.convenios.find(
      (c) => c.convenioId === convenioFiltro
    )
    if (convenio?.naoSeAplica) return "—"
    return convenio?.price ? `R$ ${convenio.price}` : "—"
  }

  const abrirNovo = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (procedure: Procedure) => {
    setEditing(procedure)
    setDialogOpen(true)
  }

  const salvar = (procedure: Procedure) => {
    const existe = procedures.some((p) => p.id === procedure.id)
    onProceduresChange(
      existe
        ? procedures.map((p) => (p.id === procedure.id ? procedure : p))
        : [...procedures, procedure]
    )
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    onProceduresChange(procedures.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <InputGroup className="sm:max-w-64">
          <InputGroupInput
            placeholder="Buscar por nome, código ou tipo"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPagina(1)
            }}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Select
          value={convenioFiltro || "private"}
          onValueChange={(v) => setConvenioFiltro(v === "private" ? "" : v)}
        >
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Particular" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">Particular</SelectItem>
              {conveniosMock.map((convenio) => (
                <SelectItem key={convenio.id} value={convenio.id}>
                  {convenio.nome}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="size-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>PDF - Resumo Completo</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Excel - Resumo Completo</DropdownMenuItem>
              <DropdownMenuItem>Excel - Detalhado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button type="button" onClick={abrirNovo}>
            <Plus className="size-4" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome de exibição</TableHead>
              <TableHead>Tipo de guia</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginados.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum procedimento cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              paginados.map((procedure) => (
                <TableRow
                  key={procedure.id}
                  className="cursor-pointer"
                  onClick={() => abrirEdicao(procedure)}
                >
                  <TableCell className="font-mono text-sm">
                    {procedure.codigoTuss || "—"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {procedure.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {tipoGuiaLabel(procedure.tipoGuia)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {valorExibido(procedure)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(procedure.criadoEm)}
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                          onClick={() => abrirEdicao(procedure)}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(procedure.id)}
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

      {totalPaginas > 1 && (
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="Anterior"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPagina((p) => Math.max(1, p - 1))
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
              (n) => (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#"
                    isActive={n === paginaAtual}
                    onClick={(e) => {
                      e.preventDefault()
                      setPagina(n)
                    }}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                text="Próximo"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPagina((p) => Math.min(totalPaginas, p + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <ProcedureDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        procedure={editing}
        onSave={salvar}
      />
    </div>
  )
}
