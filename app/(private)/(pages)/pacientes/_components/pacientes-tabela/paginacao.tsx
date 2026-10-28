"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

interface PaginacaoProps {
  paginaAtual: number
  totalPaginas: number
  totalItens: number
  porPagina: number
  onMudarPagina: (pagina: number) => void
}

function paginasVisiveis(paginaAtual: number, totalPaginas: number) {
  const inicio = Math.max(1, Math.min(paginaAtual - 2, totalPaginas - 4))
  const fim = Math.min(totalPaginas, inicio + 4)

  return Array.from({ length: fim - inicio + 1 }, (_, indice) => inicio + indice)
}

export function Paginacao({
  paginaAtual,
  totalPaginas,
  totalItens,
  porPagina,
  onMudarPagina,
}: PaginacaoProps) {
  const primeiro = totalItens === 0 ? 0 : (paginaAtual - 1) * porPagina + 1
  const ultimo = Math.min(paginaAtual * porPagina, totalItens)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Mostrando {primeiro}–{ultimo} de {totalItens}
      </p>

      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Página anterior"
              disabled={paginaAtual <= 1}
              onClick={() => onMudarPagina(paginaAtual - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
          </PaginationItem>

          {paginasVisiveis(paginaAtual, totalPaginas).map((pagina) => (
            <PaginationItem key={pagina}>
              <Button
                type="button"
                variant={pagina === paginaAtual ? "outline" : "ghost"}
                size="icon-sm"
                aria-label={`Página ${pagina}`}
                aria-current={pagina === paginaAtual ? "page" : undefined}
                onClick={() => onMudarPagina(pagina)}
              >
                {pagina}
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Próxima página"
              disabled={paginaAtual >= totalPaginas}
              onClick={() => onMudarPagina(paginaAtual + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
