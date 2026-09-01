"use client"

import { addDays, formatDate, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SingleDateFilterProps {
  date: Date
  onChange: (date: Date) => void
}

export function SingleDateFilter({ date, onChange }: SingleDateFilterProps) {
  const label = formatDate(date, "EEEE, dd MMM yyyy", { locale: ptBR })
  const isToday = isSameDay(date, new Date())

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        className="size-8 px-0"
        onClick={() => onChange(addDays(date, -1))}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <span className="min-w-40 text-center text-sm text-muted-foreground capitalize">
        {label}
      </span>

      <Button
        type="button"
        variant="outline"
        className="size-8 px-0"
        onClick={() => onChange(addDays(date, 1))}
      >
        <ChevronRight className="size-4" />
      </Button>

      <Button
        type="button"
        variant={isToday ? "default" : "outline"}
        size="sm"
        onClick={() => onChange(new Date())}
      >
        Hoje
      </Button>
    </div>
  )
}
