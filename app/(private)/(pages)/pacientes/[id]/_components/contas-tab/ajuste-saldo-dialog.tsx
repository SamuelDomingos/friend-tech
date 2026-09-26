"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RichTextEditor } from "@/components/rich-text-editor"

import type { PacienteDetalhe } from "../dados-mock"
import { CabecalhoPaciente } from "./cabecalho-paciente"

interface AjusteSaldoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paciente: PacienteDetalhe
}

export function AjusteSaldoDialog({
  open,
  onOpenChange,
  paciente,
}: AjusteSaldoDialogProps) {
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState<"CREDITO" | "DEBITO">("CREDITO")
  const [observacao, setObservacao] = useState("")

  function salvar() {
    if (!valor.trim()) {
      toast("Informe o valor do ajuste.")
      return
    }
    toast("Ajuste de saldo salvo.")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle className="sr-only">Ajuste de saldo</DialogTitle>

        <CabecalhoPaciente paciente={paciente} />

        <div className="border-t pt-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-[180px]">
              <Label className="mb-1.5 block">Valor</Label>
              <Input
                inputMode="decimal"
                placeholder="R$ 0,00"
                className="text-right"
                value={valor}
                onChange={(event) => setValor(event.target.value)}
              />
            </div>

            <RadioGroup
              value={tipo}
              onValueChange={(v) => setTipo(v as "CREDITO" | "DEBITO")}
              className="flex gap-4 pb-2"
            >
              <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="CREDITO" />
                Crédito
              </label>
              <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="DEBITO" />
                Débito
              </label>
            </RadioGroup>
          </div>

          <div className="mt-5">
            <Label className="mb-1.5 block">Observação</Label>
            <RichTextEditor
              value={observacao}
              onChange={setObservacao}
              className="min-h-60"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={salvar}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
