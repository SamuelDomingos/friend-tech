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
import { formatCurrency } from "@/lib/utils"

import type { FinanceEntry } from "../finance-flow-mock"

interface SettleDialogProps {
  entry: FinanceEntry | null
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function SettleDialog({
  entry,
  onOpenChange,
  onConfirm,
}: SettleDialogProps) {
  return (
    <AlertDialog open={!!entry} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <CheckCheck />
          </AlertDialogMedia>

          <AlertDialogTitle>Dar baixa no lançamento?</AlertDialogTitle>

          <AlertDialogDescription>
            {entry
              ? `${entry.description} — ${formatCurrency(entry.amount)}`
              : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
