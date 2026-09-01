"use client"

import { useMemo, useState } from "react"
import { Filter } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { actionLogMock } from "./mock-data"
import { LogFilterSheet, type LogFilters } from "./log-filter-sheet"

const PAGE_SIZE = 5

const emptyFilters: LogFilters = {
  startDate: "",
  endDate: "",
  actionType: "",
}

function iniciais(nome: string) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase()
}

export function ActionLogPanel() {
  const [filters, setFilters] = useState<LogFilters>(emptyFilters)
  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)

  const filteredLog = useMemo(() => {
    return actionLogMock.filter((entry) => {
      const combinaTipo =
        !filters.actionType || entry.actionType === filters.actionType
      const combinaInicio =
        !filters.startDate || entry.dateISO >= filters.startDate
      const combinaFim = !filters.endDate || entry.dateISO <= filters.endDate
      return combinaTipo && combinaInicio && combinaFim
    })
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(filteredLog.length / PAGE_SIZE))
  const paginated = filteredLog.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const filtersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Histórico de ações</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="relative"
          onClick={() => setFilterOpen(true)}
        >
          <Filter className="size-4" />
          {filtersCount > 0 && (
            <Badge
              variant="default"
              className="absolute -top-2 -right-2 size-5 justify-center rounded-full p-0 text-xs"
            >
              {filtersCount}
            </Badge>
          )}
        </Button>
      </div>

      <div className="mt-4 rounded-lg border">
        <Table>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell className="h-24 text-center text-muted-foreground">
                  Nenhuma ação especial registrada
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="w-10 align-top">
                    <Avatar size="sm">
                      <AvatarFallback>{iniciais(entry.userName)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="whitespace-normal align-top">
                    <p className="font-semibold">{entry.description}</p>
                    {entry.details.length > 0 && (
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {entry.details.map((detail) => (
                          <p key={detail.label}>
                            <strong className="text-foreground">
                              {detail.label}:
                            </strong>{" "}
                            {detail.value}
                          </p>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="w-36 align-top text-sm whitespace-nowrap text-muted-foreground">
                    {entry.date}
                    {entry.canUndoUnify && (
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="mt-1 block h-auto p-0"
                      >
                        Desfazer unificação
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4 justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="Anterior"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPage((p) => Math.max(1, p - 1))
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  href="#"
                  isActive={n === page}
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(n)
                  }}
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                text="Próximo"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPage((p) => Math.min(totalPages, p + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <LogFilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filters={filters}
        onApply={(novos) => {
          setFilters(novos)
          setPage(1)
          setFilterOpen(false)
        }}
      />
    </div>
  )
}
