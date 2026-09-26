"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatDate } from "@/lib/utils"

import { BrasindiceDialog } from "./brasindice-dialog"
import {
  brasindiceSubtypeLabel,
  brasindiceTablesMock,
  statusLabel,
  type BrasIndiceTable,
} from "../mock-data"

export function BrasindiceTab() {
  const [tabelas, setTabelas] = useState<BrasIndiceTable[]>(
    brasindiceTablesMock
  )
  const [dialogOpen, setDialogOpen] = useState(false)

  const enviar = (tabela: BrasIndiceTable) => {
    setTabelas((atual) => [...atual, tabela])
    setDialogOpen(false)
  }

  const remover = (id: string) => {
    setTabelas((atual) => atual.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button type="button" onClick={() => setDialogOpen(true)}>
          <Plus className="size-4" />
          Enviar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Importado por</TableHead>
              <TableHead>Importado em</TableHead>
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
                <TableRow key={tabela.id}>
                  <TableCell className="font-medium">
                    {brasindiceSubtypeLabel(tabela.subtype)}
                  </TableCell>
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
                  <TableCell className="text-right">
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

      <BrasindiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={enviar}
      />
    </div>
  )
}
