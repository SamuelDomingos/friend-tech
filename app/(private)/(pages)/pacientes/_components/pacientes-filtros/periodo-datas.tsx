"use client"

import { DatePicker } from "@/components/ui/date-picker"

import { daDataISO, paraDataISO } from "@/lib/masks"

interface PeriodoDatasProps {
  inicio: string
  fim: string
  onInicioChange: (valor: string) => void
  onFimChange: (valor: string) => void
}

export function PeriodoDatas({
  inicio,
  fim,
  onInicioChange,
  onFimChange,
}: PeriodoDatasProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <DatePicker
        value={daDataISO(inicio)}
        onChange={(data) => onInicioChange(data ? paraDataISO(data) : "")}
        placeholder="Início"
      />
      <DatePicker
        value={daDataISO(fim)}
        onChange={(data) => onFimChange(data ? paraDataISO(data) : "")}
        placeholder="Fim"
      />
    </div>
  )
}
