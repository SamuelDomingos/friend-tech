"use client"

import { CheckCheck } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import type { Sessao } from "./dados-mock"

interface FinalizarSessaoDialogProps {
  sessao: Sessao | null
  onOpenChange: (open: boolean) => void
  onConfirmar: () => void
}

export function FinalizarSessaoDialog({
  sessao,
  onOpenChange,
  onConfirmar,
}: FinalizarSessaoDialogProps) {
  const restantes = sessao ? sessao.agendado - sessao.realizado : 0

  return (
    <AlertDialog open={!!sessao} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <CheckCheck />
          </AlertDialogMedia>

          <AlertDialogTitle>Finalizar atendimentos?</AlertDialogTitle>

          <AlertDialogDescription>
            {restantes > 0
              ? `${restantes} sessão(ões) pendente(s) serão marcadas como realizadas.`
              : "Todas as sessões deste pacote já estão realizadas."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={onConfirmar}>
            Finalizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
