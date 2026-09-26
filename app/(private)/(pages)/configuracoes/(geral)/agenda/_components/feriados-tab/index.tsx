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

import { FeriadoDialog } from "./feriado-dialog"

interface Feriado {
  id: string
  tipo: "recorrente" | "especifico"
  nome: string
  dia: number
  mes: number
  obrigatorio: boolean
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const feriadosMock: Feriado[] = [
  { id: "1", tipo: "recorrente", nome: "Ano Novo", dia: 1, mes: 1, obrigatorio: true },
  { id: "2", tipo: "recorrente", nome: "Tiradentes", dia: 21, mes: 4, obrigatorio: true },
  { id: "3", tipo: "recorrente", nome: "Dia do Trabalho", dia: 1, mes: 5, obrigatorio: true },
  { id: "4", tipo: "recorrente", nome: "Natal", dia: 25, mes: 12, obrigatorio: true },
  { id: "5", tipo: "especifico", nome: "Aniversário da clínica", dia: 10, mes: 5, obrigatorio: false },
  { id: "6", tipo: "especifico", nome: "Reunião interna", dia: 15, mes: 7, obrigatorio: false },
]

const meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
]

const formatData = (dia: number, mes: number) =>
  `${String(dia).padStart(2, "0")} de ${meses[mes - 1]}`

export function FeriadosTab() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = search.trim()
    ? feriadosMock.filter((feriado) =>
        feriado.nome.toLowerCase().includes(search.toLowerCase())
      )
    : feriadosMock

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar feriado..."
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
              <TableHead>Nome do feriado</TableHead>
              <TableHead>Data</TableHead>
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
                  Nenhum feriado encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((feriado) => (
                <TableRow key={feriado.id}>
                  <TableCell className="font-medium">{feriado.nome}</TableCell>
                  <TableCell>
                    {formatData(feriado.dia, feriado.mes)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label="Ações"
                          disabled={feriado.obrigatorio}
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

      <FeriadoDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
