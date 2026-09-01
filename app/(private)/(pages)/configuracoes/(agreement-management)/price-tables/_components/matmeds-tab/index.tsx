"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatDate } from "@/lib/utils"

import { MatmedDialog } from "./matmed-dialog"
import {
  matmedTablesMock,
  statusLabel,
  type MatmedTable,
} from "../mock-data"

export function MatmedsTab() {
  const [tabelas, setTabelas] = useState<MatmedTable[]>(matmedTablesMock)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [visualizando, setVisualizando] = useState<MatmedTable | null>(null)

  const abrirNova = () => {
    setVisualizando(null)
    setDialogOpen(true)
  }

  const abrirVisualizacao = (tabela: MatmedTable) => {
    setVisualizando(tabela)
    setDialogOpen(true)
  }

  const adicionar = (tabela: MatmedTable) => {
    setTabelas((atual) => [...atual, tabela])
    setDialogOpen(false)
  }

  const remover = (id: string) => {
    setTabelas((atual) => atual.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button type="button" onClick={abrirNova}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Importado por</TableHead>
              <TableHead>Importado em</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Início da Vigência</TableHead>
              <TableHead>Fim da Vigência</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tabelas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma tabela de preço cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              tabelas.map((tabela) => (
                <TableRow
                  key={tabela.id}
                  className="cursor-pointer"
                  onClick={() => abrirVisualizacao(tabela)}
                >
                  <TableCell className="text-muted-foreground">
                    {tabela.importadoPor}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(tabela.importadoEm)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {tabela.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(tabela.startDate)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {tabela.endDate ? formatDate(tabela.endDate) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tabela.status === "ACTIVE"
                          ? "default"
                          : tabela.status === "ERROR"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {statusLabel(tabela.status)}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={() => remover(tabela.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <MatmedDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        table={visualizando}
        onSave={adicionar}
      />
    </div>
  )
}
