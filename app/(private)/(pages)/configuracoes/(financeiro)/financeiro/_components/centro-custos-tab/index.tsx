"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
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

import {
  centrosCustoMock,
  modelosCentroCustoMock,
  type CentroCusto,
} from "../dados-mock"
import { NameDialog } from "../name-dialog"

type ModoCentroCusto = "centro-custo" | "modelos"

export function CentroCustosTab() {
  const [modo, setModo] = useState<ModoCentroCusto>("centro-custo")
  const [centros, setCentros] = useState<CentroCusto[]>(centrosCustoMock)
  const [modelos, setModelos] = useState<CentroCusto[]>(modelosCentroCustoMock)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<CentroCusto | null>(null)

  const lista = modo === "centro-custo" ? centros : modelos
  const setLista = modo === "centro-custo" ? setCentros : setModelos

  const salvar = (nome: string) => {
    if (editando) {
      setLista((atual) =>
        atual.map((item) =>
          item.id === editando.id ? { ...item, nome } : item
        )
      )
    } else {
      setLista((atual) => [...atual, { id: crypto.randomUUID(), nome }])
    }
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (item: CentroCusto) => {
    setLista((atual) => atual.filter((i) => i.id !== item.id))
  }

  const tituloDialog = modo === "centro-custo" ? "Centro de custo" : "Modelo"
  const descricaoDialog =
    modo === "centro-custo"
      ? "Cadastre um novo centro de custo."
      : "Cadastre um novo modelo de centro de custo."

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ButtonGroup className="rounded-lg border">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={modo === "centro-custo"}
            onClick={() => setModo("centro-custo")}
          >
            Centro de Custo
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={modo === "modelos"}
            onClick={() => setModo("modelos")}
          >
            Modelos
          </Button>
        </ButtonGroup>

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
            {lista.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              lista.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
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
                            setEditando(item)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(item)}
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
        title={editando ? `Editar ${tituloDialog}` : `Novo ${tituloDialog}`}
        description={descricaoDialog}
        initialValue={editando?.nome ?? ""}
        onSave={salvar}
      />
    </div>
  )
}
