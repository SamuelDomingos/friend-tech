"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { daDataISO, paraDataISO } from "@/lib/masks"

import { BRASINDICE_SUBTYPES, type BrasIndiceTable } from "../mock-data"

interface BrasindiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (table: BrasIndiceTable) => void
}

export function BrasindiceDialog({
  open,
  onOpenChange,
  onSave,
}: BrasindiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Tabela de Preço</DialogTitle>
          <DialogDescription>
            Envie uma nova tabela BrasÍndice.
          </DialogDescription>
        </DialogHeader>

        <BrasindiceForm
          key={open ? "open" : "closed"}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface BrasindiceFormProps {
  onSave: (table: BrasIndiceTable) => void
  onCancel: () => void
}

function BrasindiceForm({ onSave, onCancel }: BrasindiceFormProps) {
  const [subtype, setSubtype] = useState("")
  const [startDate, setStartDate] = useState("")
  const [arquivo, setArquivo] = useState<File | null>(null)

  const podeEnviar = subtype && startDate && arquivo

  const enviar = () => {
    if (!podeEnviar) return

    onSave({
      id: `bi-${Date.now()}`,
      subtype,
      startDate,
      endDate: "",
      importadoPor: "Você",
      importadoEm: new Date().toISOString().slice(0, 10),
      status: "PROCESSING",
    })
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="brasindice-tipo">Tipo</FieldLabel>
          <Select value={subtype} onValueChange={setSubtype}>
            <SelectTrigger id="brasindice-tipo">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {BRASINDICE_SUBTYPES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="brasindice-vigencia">Vigência</FieldLabel>
          <DatePicker
            value={daDataISO(startDate)}
            onChange={(d) => setStartDate(d ? paraDataISO(d) : "")}
            placeholder="Selecione"
          />
        </Field>

        {subtype && startDate && (
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="brasindice-arquivo">
              Arquivo para importação
            </FieldLabel>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  document.getElementById("brasindice-arquivo")?.click()
                }
              >
                <Upload className="size-4" />
                Selecionar arquivo (.txt)
              </Button>
              {arquivo && (
                <span className="text-sm text-muted-foreground">
                  {arquivo.name}
                </span>
              )}
            </div>
            <input
              id="brasindice-arquivo"
              type="file"
              accept=".txt"
              className="hidden"
              onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
            />
          </Field>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" disabled={!podeEnviar} onClick={enviar}>
          Enviar
        </Button>
      </DialogFooter>
    </>
  )
}
