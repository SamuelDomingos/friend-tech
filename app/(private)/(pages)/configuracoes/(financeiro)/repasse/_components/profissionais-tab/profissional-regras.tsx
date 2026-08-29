"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  regrasMock,
  STATUS_LABELS,
  type Profissional,
  type RegraRepasse,
  type StatusRegra,
} from "../dados-mock"
import { RegraDialog } from "./regra-dialog"

const statusClass: Record<StatusRegra, string> = {
  EM_VIGENCIA:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  AGUARDANDO:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  DESATIVADO: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  EXPIRADO: "bg-muted text-muted-foreground",
}

interface ProfissionalRegrasProps {
  profissional: Profissional
  onVoltar: () => void
}

export function ProfissionalRegras({
  profissional,
  onVoltar,
}: ProfissionalRegrasProps) {
  const [tipoProfissional, setTipoProfissional] = useState("")
  const [regraAberta, setRegraAberta] = useState<RegraRepasse | null>(null)

  const regras = regrasMock.filter(
    (regra) => !tipoProfissional || regra.tipoProfissional === tipoProfissional
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onVoltar}>
          <ArrowLeft data-icon="inline-start" />
          Voltar
        </Button>

        <h2 className="text-lg font-semibold">{profissional.nome}</h2>

        <Select value={tipoProfissional} onValueChange={setTipoProfissional}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Tipo de profissional" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="Executante">Executante</SelectItem>
              <SelectItem value="Solicitante">Solicitante</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Regra</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fórmula</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {regras.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma regra encontrada.
                </TableCell>
              </TableRow>
            ) : (
              regras.map((regra) => (
                <TableRow
                  key={regra.id}
                  className="cursor-pointer"
                  onClick={() => setRegraAberta(regra)}
                >
                  <TableCell className="font-medium">{regra.nome}</TableCell>
                  <TableCell>{regra.tipoProfissional}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-mono text-foreground"
                    >
                      {regra.formula}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusClass[regra.status]}
                    >
                      {STATUS_LABELS[regra.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RegraDialog
        regra={regraAberta}
        onOpenChange={(open) => {
          if (!open) {
            setRegraAberta(null)
          }
        }}
      />
    </div>
  )
}
