"use client"

import { useState } from "react"
import { UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { daDataISO, paraDataISO } from "@/lib/masks"
import { cn } from "@/lib/utils"

import { SPECIAL_ACTION_TYPES } from "./mock-data"

export function SpecialActionForm() {
  const [action, setAction] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [keepPatient, setKeepPatient] = useState("")
  const [removePatient, setRemovePatient] = useState("")

  const selected = SPECIAL_ACTION_TYPES.find((t) => t.value === action)

  const selecionarAcao = (valor: string) => {
    setAction(valor)
    setStartDate("")
    setEndDate("")
  }

  return (
    <div className="rounded-lg border p-6">
      <p className="text-base font-medium">Realizar ação especial</p>

      <div className="mt-4">
        <Field>
          <FieldLabel htmlFor="special-action-type">Tipo</FieldLabel>
          <Select value={action} onValueChange={selecionarAcao}>
            <SelectTrigger id="special-action-type">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SPECIAL_ACTION_TYPES.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      {selected && (
        <div className="mt-6 space-y-4 border-t pt-6">
          {selected.category === "restore" && (
            <>
              {selected.needsDateFilter && (
                <div>
                  <p className="mb-2 text-sm font-medium">
                    {selected.dateLabel}
                  </p>
                  <div
                    className={cn(
                      "grid gap-2",
                      selected.needsEndDate ? "grid-cols-2" : "grid-cols-1"
                    )}
                  >
                    <DatePicker
                      placeholder="Data inicial"
                      value={daDataISO(startDate)}
                      onChange={(d) => setStartDate(d ? paraDataISO(d) : "")}
                    />
                    {selected.needsEndDate && (
                      <DatePicker
                        placeholder="Data final"
                        value={daDataISO(endDate)}
                        onChange={(d) => setEndDate(d ? paraDataISO(d) : "")}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-lg border">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="h-20 text-center text-muted-foreground">
                        {selected.emptyMessage}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {selected.category === "import" && (
            <Field>
              <FieldLabel htmlFor="special-action-file">Arquivo</FieldLabel>
              <Input id="special-action-file" type="file" />
              <Button type="button" className="mt-2 w-fit">
                <UploadCloud className="size-4" />
                Importar
              </Button>
            </Field>
          )}

          {selected.category === "export" && (
            <div>
              <p className="text-sm text-muted-foreground">
                Exporta todos os pacientes cadastrados na sua clínica em uma
                planilha.
              </p>
              <Button type="button" className="mt-3">
                Exportar pacientes
              </Button>
            </div>
          )}

          {selected.category === "unify" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="special-action-keep">
                  Paciente a manter
                </FieldLabel>
                <Input
                  id="special-action-keep"
                  placeholder="Nome ou código do paciente"
                  value={keepPatient}
                  onChange={(e) => setKeepPatient(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="special-action-remove">
                  Paciente a remover
                </FieldLabel>
                <Input
                  id="special-action-remove"
                  placeholder="Nome ou código do paciente"
                  value={removePatient}
                  onChange={(e) => setRemovePatient(e.target.value)}
                />
              </Field>
              <Button type="button" className="w-fit sm:col-span-2">
                Unificar pacientes
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
