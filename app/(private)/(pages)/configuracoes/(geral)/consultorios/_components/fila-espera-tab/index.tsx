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
import { cn } from "@/lib/utils"

import { FilaEsperaDialog } from "./fila-espera-dialog"
import { getCorFilaEspera } from "../../_schemas/fila-espera.schema"

interface FilaEspera {
  id: string
  nome: string
  cor: string
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const filasMock: FilaEspera[] = [
  { id: "1", nome: "Fila de retorno", cor: "green" },
  { id: "2", nome: "Fila de exames", cor: "blue" },
  { id: "3", nome: "Fila de consulta", cor: "red" },
]

export function FilaEsperaTab() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = search.trim()
    ? filasMock.filter((fila) =>
        fila.nome.toLowerCase().includes(search.toLowerCase())
      )
    : filasMock

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar fila de espera..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cor</TableHead>
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
                  Nenhuma fila de espera encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((fila) => {
                const cor = getCorFilaEspera(fila.cor)

                return (
                  <TableRow key={fila.id}>
                    <TableCell className="font-medium">{fila.nome}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-block size-5 rounded-md ring-1 ring-border",
                          cor?.className
                        )}
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
                          <DropdownMenuItem>
                            <Pencil className="size-4" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem variant="destructive">
                            <Trash2 className="size-4" />
                            Deletar
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

      <FilaEsperaDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
