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
import { cn } from "@/lib/utils"

import { contasBancariasMock, type ContaBancaria } from "../dados-mock"
import { ContaBancariaDialog } from "./conta-bancaria-dialog"

type FiltroConta = "ativas" | "inativas"

export function ContasBancariasTab() {
  const [contas, setContas] = useState<ContaBancaria[]>(contasBancariasMock)
  const [filtro, setFiltro] = useState<FiltroConta>("ativas")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<ContaBancaria | null>(null)

  const filtradas = contas.filter((conta) =>
    filtro === "ativas" ? conta.ativa : !conta.ativa
  )

  const salvar = (conta: ContaBancaria) => {
    setContas((atual) => {
      const existe = atual.some((c) => c.id === conta.id)

      return existe
        ? atual.map((c) => (c.id === conta.id ? conta : c))
        : [...atual, conta]
    })
    setDialogOpen(false)
    setEditando(null)
  }

  const excluir = (conta: ContaBancaria) => {
    setContas((atual) => atual.filter((c) => c.id !== conta.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ButtonGroup className="rounded-lg border">
          {(["ativas", "inativas"] as const).map((opcao) => (
            <Button
              key={opcao}
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                filtro === opcao && "bg-accent text-accent-foreground"
              )}
              onClick={() => setFiltro(opcao)}
            >
              {opcao === "ativas" ? "Contas ativas" : "Contas inativas"}
            </Button>
          ))}
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
              <TableHead>Banco</TableHead>
              <TableHead>Agência</TableHead>
              <TableHead>Conta</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtradas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma conta bancária encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtradas.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="font-medium">{conta.banco}</TableCell>
                  <TableCell>{conta.agencia}</TableCell>
                  <TableCell>
                    {conta.conta}
                    {conta.digito ? `-${conta.digito}` : ""}
                  </TableCell>
                  <TableCell>
                    {conta.principal ? (
                      <span className="text-sm font-medium text-primary">
                        Principal
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Ações"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditando(conta)
                            setDialogOpen(true)
                          }}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(conta)}
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

      <ContaBancariaDialog
        key={editando?.id ?? "nova"}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        conta={editando}
        onSave={salvar}
      />
    </div>
  )
}
