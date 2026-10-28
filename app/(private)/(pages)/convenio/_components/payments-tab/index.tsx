"use client"

import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"

import { SummaryTable } from "@/components/ui/summary-table"
import {
  GUIDE_STATUS_LABELS,
  type Guide,
  type GuideStatus,
} from "../mock-data"

const variants: Record<GuideStatus, "secondary" | "outline" | "destructive"> = {
  PAID: "secondary",
  PENDING: "outline",
  GLOSSED: "destructive",
}

interface PaymentsTabProps {
  guides: Guide[]
}

export function PaymentsTab({ guides }: PaymentsTabProps) {
  return (
    <SummaryTable
      title="Baixas de guias"
      year="2026"
      columns={[
        { label: "Guia", width: "120px" },
        { label: "Paciente" },
        { label: "Convênio", width: "160px" },
        { label: "Data", align: "center", width: "120px" },
        { label: "Valor(R$)", align: "right", width: "140px" },
        { label: "Status", align: "center", width: "120px" },
      ]}
      rows={guides.map((guide) => [
        guide.id,
        guide.patient,
        guide.insurer,
        formatDate(guide.date),
        formatCurrency(guide.amount),
        <Badge key={guide.id} variant={variants[guide.status]}>
          {GUIDE_STATUS_LABELS[guide.status]}
        </Badge>,
      ])}
    />
  )
}
