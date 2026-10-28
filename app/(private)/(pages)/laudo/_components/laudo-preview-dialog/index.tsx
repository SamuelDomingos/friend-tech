"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"

import type { Laudo } from "../dados-mock"

interface LaudoPreviewDialogProps {
  laudo: Laudo | null
  onOpenChange: (open: boolean) => void
}

export function LaudoPreviewDialog({
  laudo,
  onOpenChange,
}: LaudoPreviewDialogProps) {
  return (
    <Dialog open={!!laudo} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 p-0 sm:max-w-3xl"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <DialogTitle className="text-base font-semibold">
            Pré-visualização de Laudo
          </DialogTitle>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </div>

        <div className="h-[500px] overflow-y-auto bg-muted/30 p-6">
          {laudo && (
            <article className="mx-auto flex min-h-full w-full max-w-[620px] flex-col gap-6 bg-background p-8 shadow-sm ring-1 ring-foreground/5">
              <header className="space-y-1 text-center">
                <p className="text-sm font-semibold uppercase">
                  Clínica Amigo
                </p>
                <p className="text-xs text-muted-foreground">
                  CNPJ 00.000.000/0001-00 · (85) 3000-0000
                </p>
                <p className="text-sm font-medium">Laudo médico</p>
              </header>

              <Separator />

              <section className="grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-muted-foreground">Paciente: </span>
                  {laudo.pacienteNome}
                </p>
                <p>
                  <span className="text-muted-foreground">Pedido: </span>
                  {laudo.id}
                </p>
                <p>
                  <span className="text-muted-foreground">Data: </span>
                  {formatDate(laudo.data)}
                </p>
                <p>
                  <span className="text-muted-foreground">Convênio: </span>
                  {laudo.convenio}
                </p>
                <p className="sm:col-span-2">
                  <span className="text-muted-foreground">Procedimento: </span>
                  {laudo.procedimento}
                </p>
                <p className="sm:col-span-2">
                  <span className="text-muted-foreground">Solicitante: </span>
                  {laudo.solicitante}
                </p>
              </section>

              <Separator />

              <section className="space-y-2">
                <p className="text-sm font-semibold">Descrição</p>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {laudo.texto}
                </p>
              </section>

              <section className="mt-auto space-y-1 pt-10 text-center">
                <p className="text-sm">{laudo.executante}</p>
                <p className="text-xs text-muted-foreground">
                  Executante responsável
                </p>
              </section>
            </article>
          )}
        </div>

        <DialogFooter className="border-t px-4 py-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Voltar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
