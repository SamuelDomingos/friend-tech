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

import { RatingDialog } from "./rating-dialog"
import type { ExpenseRating } from "../mock-data"

interface RatingsTabProps {
  ratings: ExpenseRating[]
  onRatingsChange: (ratings: ExpenseRating[]) => void
}

export function RatingsTab({ ratings, onRatingsChange }: RatingsTabProps) {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ExpenseRating | null>(null)

  const filtered = search.trim()
    ? ratings.filter((r) =>
        r.nome.toLowerCase().includes(search.toLowerCase())
      )
    : ratings

  const abrirNova = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (rating: ExpenseRating) => {
    setEditing(rating)
    setDialogOpen(true)
  }

  const salvar = (rating: ExpenseRating) => {
    const existe = ratings.some((r) => r.id === rating.id)
    onRatingsChange(
      existe
        ? ratings.map((r) => (r.id === rating.id ? rating : r))
        : [...ratings, rating]
    )
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    onRatingsChange(ratings.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <InputGroup className="sm:max-w-56">
          <InputGroupInput
            placeholder="Filtrar por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button type="button" onClick={abrirNova}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Criado em</TableHead>
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
                  Nenhuma classificação cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell className="font-medium">{rating.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {rating.criadoEm}
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
                        <DropdownMenuItem onClick={() => abrirEdicao(rating)}>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(rating.id)}
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

      <RatingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        rating={editing}
        onSave={salvar}
      />
    </div>
  )
}
