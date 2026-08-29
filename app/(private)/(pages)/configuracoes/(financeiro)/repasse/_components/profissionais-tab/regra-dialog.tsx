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

import {
  CONVENIOS_LISTA,
  PROCEDIMENTOS_REGRA,
  STATUS_LABELS,
  type RegraRepasse,
  type StatusRegra,
} from "../dados-mock"

const statusClass: Record<StatusRegra, string> = {
  EM_VIGENCIA:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  AGUARDANDO:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  DESATIVADO: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  EXPIRADO: "bg-muted text-muted-foreground",
}

interface RegraDialogProps {
  regra: RegraRepasse | null
  onOpenChange: (open: boolean) => void
}

export function RegraDialog({ regra, onOpenChange }: RegraDialogProps) {
  const [convenio, setConvenio] = useState("")

  if (!regra) {
    return null
  }

  return (
    <Dialog open={!!regra} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {regra.nome}
            <Badge variant="secondary" className={statusClass[regra.status]}>
              {STATUS_LABELS[regra.status]}
            </Badge>
          </DialogTitle>

          <DialogDescription>Detalhes da regra de repasse.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Início de vigência</p>
            <p className="text-sm">{regra.inicioVigencia}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Fim de vigência</p>
            <p className="text-sm">{regra.fimVigencia ?? "Indeterminado"}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Tipo de responsável</p>
            <p className="text-sm">{regra.tipoProfissional}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Unidade</p>
            <p className="text-sm">
              {regra.unidades.map((unidade, index) => (
                <span key={unidade}>
                  {unidade}
                  {index < regra.unidades.length - 1 ? " • " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="mb-1 text-xs text-muted-foreground">Fórmula</p>
          <p className="font-mono text-sm">{regra.formula}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Convênio</p>

          <Select value={convenio} onValueChange={setConvenio}>
            <SelectTrigger className="w-full sm:w-72">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {CONVENIOS_LISTA.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {regra.tipoRepasse === "Procedimento" && (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-right">Custo</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {PROCEDIMENTOS_REGRA.map((procedimento) => (
                  <TableRow key={procedimento.id}>
                    <TableCell className="font-medium">
                      {procedimento.codigo && (
                        <span className="text-muted-foreground">
                          {procedimento.codigo} -{" "}
                        </span>
                      )}
                      {procedimento.nome}
                    </TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right">
                      {procedimento.preco}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
