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

import type { Paciente } from "../dados-mock"

interface DeletePacienteDialogProps {
  paciente: Paciente | null
  onOpenChange: (open: boolean) => void
  onConfirmar: () => void
}

export function DeletePacienteDialog({
  paciente,
  onOpenChange,
  onConfirmar,
}: DeletePacienteDialogProps) {
  return (
    <AlertDialog open={!!paciente} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle>Excluir paciente?</AlertDialogTitle>

          <AlertDialogDescription>
            Tem certeza que deseja excluir {paciente?.nome}? Esta ação não pode
            ser desfeita.
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
