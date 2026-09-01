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

import type { PatientSource } from "./mock-data"

interface PatientSourceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  source: PatientSource | null
  onSave: (source: PatientSource) => void
}

export function PatientSourceDialog({
  open,
  onOpenChange,
  source,
  onSave,
}: PatientSourceDialogProps) {
  const isEdit = !!source

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar como conheceu" : "Adicionar como conheceu"}
          </DialogTitle>
          <DialogDescription>
            Informe o nome que será exibido na opção &quot;Como
            conheceu&quot;.
          </DialogDescription>
        </DialogHeader>

        <PatientSourceForm
          key={source?.id ?? "new"}
          source={source}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface PatientSourceFormProps {
  source: PatientSource | null
  onSave: (source: PatientSource) => void
  onCancel: () => void
}

function PatientSourceForm({
  source,
  onSave,
  onCancel,
}: PatientSourceFormProps) {
  const [nome, setNome] = useState(source?.nome ?? "")

  const salvar = () => {
    if (!nome.trim()) return

    onSave({
      id: source?.id ?? `ps-${Date.now()}`,
      nome: nome.trim(),
    })
  }

  return (
    <>
      <Field>
        <FieldLabel htmlFor="patient-source-nome">
          Nome <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="patient-source-nome"
          maxLength={255}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </Field>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={salvar}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
