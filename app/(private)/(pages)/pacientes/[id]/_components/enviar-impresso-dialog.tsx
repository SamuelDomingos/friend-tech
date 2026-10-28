"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { FieldError } from "@/components/ui/field"
import { Label } from "@/components/ui/label"

import {
  IMPRESSOS_DISPONIVEIS,
  useEnviarImpressoForm,
} from "../_hooks/use-enviar-impresso-form"
import type { PacienteDetalhe } from "./dados-mock"

interface EnviarImpressoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paciente: PacienteDetalhe
}

export function EnviarImpressoDialog({
  open,
  onOpenChange,
  paciente,
}: EnviarImpressoDialogProps) {
  const { form, alternarDocumento, onSubmit, descartar } =
    useEnviarImpressoForm({
      pacienteNome: paciente.nome,
      onConcluir: () => onOpenChange(false),
    })

  return (
    <Dialog
      open={open}
      onOpenChange={(novo) => {
        if (!novo) descartar()
        onOpenChange(novo)
      }}
    >
      <DialogContent className="p-[30px] sm:max-w-[560px]">
        <DialogTitle className="sr-only">Enviar impressos</DialogTitle>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <p className="text-sm">
            Confirme quais impressos deseja enviar por e-mail ao paciente:
          </p>

          <Controller
            name="documentos"
            control={form.control}
            render={({ field }) => (
              <div className="space-y-3">
                {IMPRESSOS_DISPONIVEIS.map((impresso) => {
                  const marcado = field.value.includes(impresso.value)

                  return (
                    <div
                      key={impresso.value}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={`impresso-${impresso.value}`}
                        checked={marcado}
                        onCheckedChange={(valor) =>
                          alternarDocumento(impresso.value, valor === true)
                        }
                      />
                      <Label
                        htmlFor={`impresso-${impresso.value}`}
                        className="font-normal"
                      >
                        {impresso.label} ({impresso.limite})
                      </Label>
                    </div>
                  )
                })}
              </div>
            )}
          />

          <FieldError errors={[form.formState.errors.documentos]} />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={descartar}>
              Cancelar
            </Button>
            <Button type="submit">Sim</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
