"use client"

import { useState } from "react"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Paciente } from "@/app/(private)/(pages)/agenda/_components/attendance-dialog/mock-data"

import { PatientSearchField } from "./patient-search-field"
import {
  historicoPorPacienteMock,
  ultimosAtendimentosUrgenciaMock,
} from "./urgency-mock-data"

interface UrgencyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAtender: (paciente: Paciente | null) => void
}

const STATUS_BADGE_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Confirmado: "outline",
  Realizado: "default",
  Cancelado: "destructive",
  Faltou: "secondary",
}

export function UrgencyDialog({ open, onOpenChange, onAtender }: UrgencyDialogProps) {
  const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null)

  const historico = selectedPatient
    ? (historicoPorPacienteMock[selectedPatient.id] ?? [])
    : []

  const atender = () => {
    onAtender(selectedPatient)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Urgência</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Últimos pacientes atendidos</h3>

            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data e hora</TableHead>
                    <TableHead>Paciente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ultimosAtendimentosUrgenciaMock.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                        Nenhum atendimento realizado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    ultimosAtendimentosUrgenciaMock.map((atendimento) => (
                      <TableRow
                        key={atendimento.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedPatient(atendimento.paciente)}
                      >
                        <TableCell className="text-center text-xs">
                          {formatDate(new Date(atendimento.dataHora), "dd/MM/yyyy")}
                          <br />
                          {formatDate(new Date(atendimento.dataHora), "HH:mm")}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{atendimento.paciente.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            CPF: {atendimento.paciente.cpf}
                            {atendimento.paciente.telefone
                              ? ` · Tel: ${atendimento.paciente.telefone}`
                              : ""}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {atendimento.pagamento}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">Buscar atendimentos</h3>
              <Button type="button" onClick={atender}>
                Atender
              </Button>
            </div>

            <PatientSearchField onSelectPatient={setSelectedPatient} />

            {selectedPatient ? (
              <>
                <div className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">{selectedPatient.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    CPF: {selectedPatient.cpf}
                    {selectedPatient.telefone ? ` · Tel: ${selectedPatient.telefone}` : ""}
                    {selectedPatient.dataNascimento
                      ? ` · Nasc: ${formatDate(
                          new Date(`${selectedPatient.dataNascimento}T00:00:00`),
                          "dd/MM/yyyy",
                          { locale: ptBR }
                        )}`
                      : ""}
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Observação</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historico.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-24 text-center text-muted-foreground"
                          >
                            Nenhum atendimento encontrado.
                          </TableCell>
                        </TableRow>
                      ) : (
                        historico.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="text-xs">
                              {formatDate(new Date(item.data), "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell className="text-xs">{item.unidade}</TableCell>
                            <TableCell className="text-xs">{item.descricao}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {item.observacao || "—"}
                            </TableCell>
                            <TableCell>
                              <Badge variant={STATUS_BADGE_VARIANT[item.status] ?? "outline"}>
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : (
              <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
                Busque ou selecione um paciente para ver o histórico de atendimentos.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
