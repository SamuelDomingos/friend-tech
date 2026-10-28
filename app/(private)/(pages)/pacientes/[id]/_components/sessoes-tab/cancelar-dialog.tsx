"use client"

import { Controller } from "react-hook-form"
import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useRemocaoSessaoForm } from "../../_hooks/use-remocao-sessao-form"
import type { RemocaoSessaoFormData } from "../../_schemas/remocao-sessao.schema"
import type { Sessao } from "./dados-mock"

interface CancelarSessaoDialogProps {
  sessao: Sessao | null
  onOpenChange: (open: boolean) => void
  onConfirmar: (escopo: RemocaoSessaoFormData["escopo"]) => void
}

export function CancelarSessaoDialog({
  sessao,
  onOpenChange,
  onConfirmar,
}: CancelarSessaoDialogProps) {
  const { form, onSubmit, descartar } = useRemocaoSessaoForm({
    onConfirmar,
    onConcluir: () => onOpenChange(false),
  })

  return (
    <Dialog
      open={!!sessao}
      onOpenChange={(open) => {
        if (!open) descartar()
        onOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Atenção!</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-[110px_minmax(0,1fr)]">
            <div className="flex items-start justify-center pt-1">
              <TriangleAlert className="size-20 text-amber-500" strokeWidth={1.2} />
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold">Remoção da Sessão</h3>

              <p className="text-sm text-muted-foreground">
                Você deseja remover apenas essa ou as demais sessões?
              </p>

              <Controller
                name="escopo"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-2"
                  >
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <RadioGroupItem value="CURRENT" />
                      Não, excluir somente esta
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <RadioGroupItem value="CURRENT_AND_NEXT" />
                      Sim, excluir esta e as próximas
                    </label>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="default" onClick={descartar}>
              Cancelar
            </Button>
            <Button type="submit" variant="secondary">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
