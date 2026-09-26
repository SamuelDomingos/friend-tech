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

import { ExpenseDialog } from "./expense-dialog"
import {
  TIPOS_DESPESA,
  expensesMock,
  tipoDespesaLabel,
  type Expense,
  type ExpenseRating,
} from "../mock-data"

interface ExpensesTabProps {
  ratings: ExpenseRating[]
}

export function ExpensesTab({ ratings }: ExpensesTabProps) {
  const [expenses, setExpenses] = useState<Expense[]>(expensesMock)
  const [search, setSearch] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState("")
  const [convenioFiltro, setConvenioFiltro] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Expense | null>(null)

  const filtered = expenses.filter((despesa) => {
    const termo = search.trim().toLowerCase()
    const combinaBusca =
      !termo ||
      despesa.codigoTuss.toLowerCase().includes(termo) ||
      despesa.nome.toLowerCase().includes(termo)
    const combinaTipo = !tipoFiltro || despesa.tipo === tipoFiltro

    return combinaBusca && combinaTipo
  })

  const abrirNova = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (despesa: Expense) => {
    setEditing(despesa)
    setDialogOpen(true)
  }

  const salvar = (despesa: Expense) => {
    setExpenses((atual) => {
      const existe = atual.some((d) => d.id === despesa.id)
      return existe
        ? atual.map((d) => (d.id === despesa.id ? despesa : d))
        : [...atual, despesa]
    })
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    setExpenses((atual) => atual.filter((d) => d.id !== id))
  }

  const valorExibido = (despesa: Expense) => {
    if (!convenioFiltro) return `R$ ${despesa.valorParticular || "0,00"}`

    const convenio = despesa.convenios.find(
      (c) => c.convenioId === convenioFiltro
    )
    return convenio?.valor ? `R$ ${convenio.valor}` : "—"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <InputGroup className="sm:max-w-56">
          <InputGroupInput
            placeholder="Filtrar por código/nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Select value={tipoFiltro || "all"} onValueChange={(v) => setTipoFiltro(v === "all" ? "" : v)}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todos</SelectItem>
              {TIPOS_DESPESA.map((tipo) => (
                <SelectItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

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
              <DropdownMenuItem>PDF Sintético</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Excel Resumo Completo</DropdownMenuItem>
              <DropdownMenuItem>Excel Detalhado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button type="button" onClick={abrirNova}>
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
              <TableHead>Unidade</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma despesa cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((despesa) => (
                <TableRow key={despesa.id}>
                  <TableCell className="font-mono text-sm">
                    {despesa.codigoTuss}
                  </TableCell>
                  <TableCell className="font-medium">
                    {despesa.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {despesa.unidade || "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {tipoDespesaLabel(despesa.tipo)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {valorExibido(despesa)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {despesa.criadoEm}
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
                        <DropdownMenuItem onClick={() => abrirEdicao(despesa)}>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(despesa.id)}
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

      <ExpenseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        expense={editing}
        ratings={ratings}
        onSave={salvar}
      />
    </div>
  )
}
