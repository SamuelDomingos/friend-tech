"use client"

import { Badge } from "@/components/ui/badge"

import type { StatusAtendimento } from "../dados-mock"

const STATUS: Record<
  StatusAtendimento,
  { rotulo: string; className: string }
> = {
  FINALIZADO: {
    rotulo: "Finalizado",
    className:
      "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  EM_ABERTO: {
    rotulo: "Em aberto",
    className:
      "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  CANCELADO: {
    rotulo: "Cancelou",
    className: "border-transparent bg-destructive/10 text-destructive",
  },
}

interface StatusAtendimentoBadgeProps {
  status: StatusAtendimento
}

export function StatusAtendimentoBadge({
  status,
}: StatusAtendimentoBadgeProps) {
  const config = STATUS[status]

  return (
    <Badge variant="secondary" className={config.className}>
      {config.rotulo}
    </Badge>
  )
}
