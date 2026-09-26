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

import { ConvenioDialog } from "./convenio-dialog"

interface RegraConvenio {
  id: string
  convenio: string
  tipoRegra: string
  unidade: string
  dias: string
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const regrasMock: RegraConvenio[] = [
  {
    id: "1",
    convenio: "Unimed",
    tipoRegra: "Restrição de tipos de atendimento",
    unidade: "Unidade A",
    dias: "Seg–Sex",
  },
  {
    id: "2",
    convenio: "Amil",
    tipoRegra: "Quantidade máxima por período",
    unidade: "Unidade A",
    dias: "Seg–Sáb",
  },
  {
    id: "3",
    convenio: "SulAmérica",
    tipoRegra: "Antecedência do agendamento",
    unidade: "Unidade B",
    dias: "Seg–Sex",
  },
  {
    id: "4",
    convenio: "Bradesco Saúde",
    tipoRegra: "Tempo mínimo para refazer o tipo de atendimento",
    unidade: "Unidade C",
    dias: "Todos",
  },
]

export function ConveniosTab() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = search.trim()
    ? regrasMock.filter((regra) =>
        regra.convenio.toLowerCase().includes(search.toLowerCase())
      )
    : regrasMock

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar convênio..."
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
              <TableHead>Convênio</TableHead>
              <TableHead>Tipo de regra</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Dias da semana</TableHead>
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
                  Nenhuma regra de convênio encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((regra) => (
                <TableRow key={regra.id}>
                  <TableCell className="font-medium">{regra.convenio}</TableCell>
                  <TableCell>{regra.tipoRegra}</TableCell>
                  <TableCell>{regra.unidade}</TableCell>
                  <TableCell>{regra.dias}</TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConvenioDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
