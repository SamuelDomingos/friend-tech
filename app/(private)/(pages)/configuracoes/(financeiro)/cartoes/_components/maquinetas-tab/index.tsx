"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
} from "lucide-react"

import { type Maquineta } from "../dados-mock"

import { MaquinetaDialog } from "./maquineta-dialog"

interface MaquinetasTabProps {
  maquinetas: Maquineta[]
  search: string
  onSearchChange: (value: string) => void
}

export function MaquinetasTab({
  maquinetas,
  search,
  onSearchChange,
}: MaquinetasTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMaquineta, setEditingMaquineta] = useState<Maquineta | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingMaquineta, setDeletingMaquineta] = useState<Maquineta | null>(null)

  const filteredMaquinetas = maquinetas.filter((m) =>
    m.nome.toLowerCase().includes(search.toLowerCase()),
  )

  const handleEdit = (maquineta: Maquineta) => {
    setEditingMaquineta(maquineta)
    setDialogOpen(true)
  }

  const handleDelete = (maquineta: Maquineta) => {
    setDeletingMaquineta(maquineta)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 py-4">
        <InputGroup className="w-full sm:w-72">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar maquineta"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>

        <Button onClick={() => { setEditingMaquineta(null); setDialogOpen(true) }}>
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da maquineta</TableHead>
              <TableHead>Conta bancária/Favorecido</TableHead>
              <TableHead className="text-center">Primeira parcela</TableHead>
              <TableHead className="text-center">Demais parcelas</TableHead>
              <TableHead className="text-center">Débito</TableHead>
              <TableHead className="text-center">Antecipação automática</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredMaquinetas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  Nenhuma maquineta encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredMaquinetas.map((maquineta) => (
                <TableRow key={maquineta.id}>
                  <TableCell className="font-medium">{maquineta.nome}</TableCell>
                  <TableCell>{maquineta.contaBancaria}</TableCell>
                  <TableCell className="text-center">{maquineta.primeiraParcela} dias</TableCell>
                  <TableCell className="text-center">{maquineta.demaisParcelas} dias</TableCell>
                  <TableCell className="text-center">{maquineta.debito} dia(s)</TableCell>
                  <TableCell className="text-center">
                    {maquineta.antecipacaoAutomatica ? (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                        Sim
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        Não
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon-sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(maquineta)}>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(maquineta)}
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

      <MaquinetaDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        maquineta={editingMaquineta}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover maquineta</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover a maquineta{" "}
              <strong>{deletingMaquineta?.nome}</strong>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
