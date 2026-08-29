"use client"

import { Download, SearchIcon } from "lucide-react"
import { useTable } from "@tanstack/react-table"

import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { features } from "@/components/ui/data-table-features"
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
import { cn } from "@/lib/utils"

import { exportarCsv } from "../csv-export"
import type { Usuario } from "../dados-mock"
import { useUsuariosColumns } from "./columns"

interface UsuariosTabelaProps {
  usuarios: Usuario[]
  onEditar: (usuario: Usuario) => void
  onDeletar: (usuario: Usuario) => void
}

const PAGE_SIZE = 10

export function UsuariosTabela({
  usuarios,
  onEditar,
  onDeletar,
}: UsuariosTabelaProps) {
  const columns = useUsuariosColumns({ onEditar, onDeletar })

  const table = useTable({
    features,
    data: usuarios,
    columns,
    initialState: {
      columnVisibility: { status: false, busca: false },
      pagination: { pageIndex: 0, pageSize: PAGE_SIZE },
    },
  })

  const { columnFilters, pagination } = table.state
  const search =
    (columnFilters.find((filtro) => filtro.id === "busca")?.value as string) ??
    ""
  const tipo =
    (columnFilters.find((filtro) => filtro.id === "tipo")?.value as string) ??
    "all"
  const status =
    (columnFilters.find((filtro) => filtro.id === "status")?.value as string) ??
    "all"

  const totalPages = table.getPageCount()
  const paginaAtual = pagination.pageIndex + 1

  function atualizarFiltro(id: string, valor: string) {
    table.setColumnFilters((atual) => {
      const restantes = atual.filter((filtro) => filtro.id !== id)

      if (valor === "all" || valor === "") {
        return restantes
      }

      return [...restantes, { id, value: valor }]
    })
    table.setPageIndex(0)
  }

  function exportar() {
    exportarCsv(table.getFilteredRowModel().rows.map((row) => row.original))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="w-full sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar por nome ou email..."
            value={search}
            onChange={(event) => atualizarFiltro("busca", event.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Select value={tipo} onValueChange={(v) => atualizarFiltro("tipo", v)}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Tipo de usuário" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="doctor">Profissional de saúde</SelectItem>
              <SelectItem value="finance">Financeiro</SelectItem>
              <SelectItem value="scheduler">Central de Agendamento</SelectItem>
              <SelectItem value="receptionist">Recepcionista</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(v) => atualizarFiltro("status", v)}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="ms-auto">
          <Button type="button" variant="outline" size="sm" onClick={exportar}>
            <Download data-icon="inline-start" />
            Exportar
          </Button>
        </div>
      </div>

      <DataTable
        table={table}
        emptyMessage="Nenhum usuário encontrado."
        onRowClick={(row, event) => {
          if ((event.target as HTMLElement).closest("[data-acao]")) {
            return
          }

          onEditar(row.original)
        }}
      />

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent className="gap-0 divide-x overflow-hidden rounded-lg border">
            <PaginationItem>
              <PaginationPrevious
                text="Anterior"
                href="#"
                className="rounded-none"
                onClick={(event) => {
                  event.preventDefault()
                  table.previousPage()
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (numero) => (
                <PaginationItem key={numero}>
                  <PaginationLink
                    href="#"
                    isActive={numero === paginaAtual}
                    onClick={(event) => {
                      event.preventDefault()
                      table.setPageIndex(numero - 1)
                    }}
                    className={cn(
                      {
                        [buttonVariants({
                          variant: "default",
                          className: "hover:text-primary-foreground!",
                        })]: numero === paginaAtual,
                      },
                      "rounded-none border-none"
                    )}
                  >
                    {numero}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                text="Próximo"
                href="#"
                className="rounded-none"
                onClick={(event) => {
                  event.preventDefault()
                  table.nextPage()
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
