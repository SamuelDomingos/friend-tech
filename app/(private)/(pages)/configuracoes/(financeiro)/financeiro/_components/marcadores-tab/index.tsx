"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { marcadoresMock, type MarcadorFinanceiro } from "../dados-mock"
import { NameDialog } from "../name-dialog"

export function MarcadoresTab() {
  const [marcadores, setMarcadores] =
    useState<MarcadorFinanceiro[]>(marcadoresMock)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<MarcadorFinanceiro | null>(null)

  const salvar = (nome: string) => {
    if (editando) {
      setMarcadores((atual) =>
        atual.map((item) =>
          item.id === editando.id ? { ...item, nome } : item
        )
      )
    } else {
      setMarcadores((atual) => [...atual, { id: crypto.randomUUID(), nome }])
    }
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (marcador: MarcadorFinanceiro) => {
    setMarcadores((atual) => atual.filter((m) => m.id !== marcador.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditando(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {marcadores.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum marcador encontrado.
                </TableCell>
              </TableRow>
            ) : (
              marcadores.map((marcador) => (
                <TableRow key={marcador.id}>
                  <TableCell className="font-medium">{marcador.nome}</TableCell>
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
                        <DropdownMenuItem
                          onClick={() => {
                            setEditando(marcador)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(marcador)}
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

      <NameDialog
        key={editando?.id ?? "novo"}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editando ? "Editar marcador" : "Novo marcador"}
        description="Cadastre um novo marcador/tag financeira."
        initialValue={editando?.nome ?? ""}
        onSave={salvar}
      />
    </div>
  )
}
