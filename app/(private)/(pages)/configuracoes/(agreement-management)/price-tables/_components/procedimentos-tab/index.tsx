"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatDate } from "@/lib/utils"

import { ProcedureDialog } from "./procedure-dialog"
import {
  procedureTablesMock,
  procedureTypeLabel,
  statusLabel,
  type ProcedureTable,
} from "../mock-data"

export function ProcedimentosTab() {
  const [tabelas, setTabelas] = useState<ProcedureTable[]>(
    procedureTablesMock
  )
  const [exibirDesativados, setExibirDesativados] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [visualizando, setVisualizando] = useState<ProcedureTable | null>(
    null
  )

  const filtradas = exibirDesativados
    ? tabelas
    : tabelas.filter((t) => t.ativa)

  const abrirNova = () => {
    setVisualizando(null)
    setDialogOpen(true)
  }

  const abrirVisualizacao = (tabela: ProcedureTable) => {
    setVisualizando(tabela)
    setDialogOpen(true)
  }

  const adicionar = (tabela: ProcedureTable) => {
    setTabelas((atual) => [...atual, tabela])
    setDialogOpen(false)
  }

  const remover = (id: string) => {
    setTabelas((atual) => atual.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={exibirDesativados}
            onCheckedChange={(checked) =>
              setExibirDesativados(checked === true)
            }
          />
          <Label className="font-normal">Exibir desativados</Label>
        </label>

        <Button type="button" onClick={abrirNova}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Importado por</TableHead>
              <TableHead>Importado em</TableHead>
              <TableHead>Início da Vigência</TableHead>
              <TableHead>Fim da Vigência</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtradas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma tabela de preço cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              filtradas.map((tabela) => (
                <TableRow
                  key={tabela.id}
                  className="cursor-pointer"
                  onClick={() => abrirVisualizacao(tabela)}
                >
                  <TableCell className="font-medium">
                    {procedureTypeLabel(tabela.type)}
                  </TableCell>
                  <TableCell>{tabela.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {tabela.importadoPor}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(tabela.importadoEm)}
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
                      size="icon-sm"
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

      <ProcedureDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        table={visualizando}
        onSave={adicionar}
      />
    </div>
  )
}
