"use client"

import { Badge } from "@/components/ui/badge"

import type { StatusOrcamento } from "../dados-mock"

const STATUS: Record<
  StatusOrcamento,
  { rotulo: string; className: string }
> = {
  EM_ABERTO: {
    rotulo: "Em aberto",
    className:
      "border-transparent bg-primary/10 text-primary",
  },
  PERDIDO: {
    rotulo: "Perdido",
    className: "border-transparent bg-destructive/10 text-destructive",
  },
  FECHADO: {
    rotulo: "Fechado",
    className:
      "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  CREDITO_DISPONIVEL: {
    rotulo: "Crédito disponível",
    className: "border-transparent bg-muted text-muted-foreground",
  },
}

interface StatusOrcamentoBadgeProps {
  status: StatusOrcamento
}

export function StatusOrcamentoBadge({
  status,
}: StatusOrcamentoBadgeProps) {
  const config = STATUS[status]

  return (
    <Badge variant="secondary" className={config.className}>
      {config.rotulo}
    </Badge>
  )
}
