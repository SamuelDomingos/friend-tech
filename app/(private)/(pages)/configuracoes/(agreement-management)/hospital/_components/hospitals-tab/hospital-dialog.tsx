"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatarCnpj } from "@/lib/masks"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"

import type { Hospital, HospitalInsuranceLink } from "../mock-data"

interface HospitalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hospital: Hospital | null
  onSave: (hospital: Hospital) => void
}

function montarConvenios(hospital: Hospital | null): HospitalInsuranceLink[] {
  return conveniosMock.map((convenio) => {
    const existente = hospital?.convenios.find(
      (c) => c.convenioId === convenio.id
    )

    return {
      convenioId: convenio.id,
      convenioNome: convenio.nome,
      hospitalCode: existente?.hospitalCode ?? "",
      hospitalName: existente?.hospitalName ?? "",
      hospitalCnpj: existente?.hospitalCnpj ?? "",
    }
  })
}

export function HospitalDialog({
  open,
  onOpenChange,
  hospital,
  onSave,
}: HospitalDialogProps) {
  const isEdit = !!hospital

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar hospital" : "Adicionar hospital"}
          </DialogTitle>
          <DialogDescription>
            Configure os dados do hospital e o código de cada convênio nesse
            hospital.
          </DialogDescription>
        </DialogHeader>

        <HospitalForm
          key={hospital?.id ?? "new"}
          hospital={hospital}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface HospitalFormProps {
  hospital: Hospital | null
  onSave: (hospital: Hospital) => void
  onCancel: () => void
}

function HospitalForm({ hospital, onSave, onCancel }: HospitalFormProps) {
  const [nome, setNome] = useState(hospital?.nome ?? "")
  const [cnes, setCnes] = useState(hospital?.cnes ?? "")
  const [convenios, setConvenios] = useState<HospitalInsuranceLink[]>(() =>
    montarConvenios(hospital)
  )

  const atualizarConvenio = (
    convenioId: string,
    campo: "hospitalCode" | "hospitalName" | "hospitalCnpj",
    valor: string
  ) => {
    setConvenios((atual) =>
      atual.map((c) =>
        c.convenioId === convenioId ? { ...c, [campo]: valor } : c
      )
    )
  }

  const salvar = () => {
    if (!nome.trim() || !cnes.trim()) return

    onSave({
      id: hospital?.id ?? `h-${Date.now()}`,
      nome,
      cnes,
      convenios,
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="hospital-nome">
                Nome <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="hospital-nome"
                placeholder="Nome do hospital"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="hospital-cnes">
                CNES <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="hospital-cnes"
                placeholder="CNES"
                value={cnes}
                onChange={(e) => setCnes(e.target.value)}
              />
            </Field>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Convênio</TableHead>
                  <TableHead>Código da Operadora</TableHead>
                  <TableHead>Nome do Contratado</TableHead>
                  <TableHead>CNPJ do Contratado</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {convenios.map((convenio) => (
                  <TableRow key={convenio.convenioId}>
                    <TableCell className="font-medium">
                      {convenio.convenioNome}
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Código da Operadora"
                        value={convenio.hospitalCode}
                        onChange={(e) =>
                          atualizarConvenio(
                            convenio.convenioId,
                            "hospitalCode",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Nome do Contratado"
                        value={convenio.hospitalName}
                        onChange={(e) =>
                          atualizarConvenio(
                            convenio.convenioId,
                            "hospitalName",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="CNPJ do Contratado"
                        inputMode="numeric"
                        value={convenio.hospitalCnpj}
                        onChange={(e) =>
                          atualizarConvenio(
                            convenio.convenioId,
                            "hospitalCnpj",
                            formatarCnpj(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={salvar}>
          Salvar alterações
        </Button>
      </DialogFooter>
    </>
  )
}
