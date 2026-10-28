"use client"

import { Trash2 } from "lucide-react"

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

import type { Orcamento } from "./dados-mock"

interface ExcluirOrcamentoDialogProps {
  orcamento: Orcamento | null
  onOpenChange: (open: boolean) => void
  onConfirmar: () => void
}

export function ExcluirOrcamentoDialog({
  orcamento,
  onOpenChange,
  onConfirmar,
}: ExcluirOrcamentoDialogProps) {
  return (
    <AlertDialog open={!!orcamento} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle>Excluir orçamento?</AlertDialogTitle>

          <AlertDialogDescription>
            O orçamento nº {orcamento?.numero} — {orcamento?.descricao} — será
            removido. Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction variant="destructive" onClick={onConfirmar}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
