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
import { Usuario } from "../dados-mock"

interface DeleteUsuarioDialogProps {
  usuario: Usuario | null
  onOpenChange: (open: boolean) => void
  onConfirmar: () => void
}

export function DeleteUsuarioDialog({
  usuario,
  onOpenChange,
  onConfirmar,
}: DeleteUsuarioDialogProps) {
  return (
    <AlertDialog open={!!usuario} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle>Excluir usuário?</AlertDialogTitle>

          <AlertDialogDescription>
            Tem certeza que deseja excluir {usuario?.nome}? Esta ação não pode
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
