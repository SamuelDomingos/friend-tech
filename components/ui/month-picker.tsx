"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const MESES = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
]

interface MonthPickerProps {
  value?: string
  onChange: (valor: string) => void
  placeholder?: string
  className?: string
}

function parseMes(valor?: string) {
  if (!valor) {
    return null
  }

  const [ano, mes] = valor.split("-").map(Number)

  if (!ano || !mes) {
    return null
  }

  return new Date(ano, mes - 1, 1)
}

export function MonthPicker({
  value,
  onChange,
  placeholder = "mm/aaaa",
  className,
}: MonthPickerProps) {
  const selecionado = parseMes(value)
  const [aberto, setAberto] = useState(false)
  const [anoVisivel, setAnoVisivel] = useState(
    selecionado?.getFullYear() ?? new Date().getFullYear()
  )

  function selecionar(mes: number) {
    onChange(`${anoVisivel}-${String(mes + 1).padStart(2, "0")}`)
    setAberto(false)
  }

  return (
    <Popover open={aberto} onOpenChange={setAberto}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "justify-start gap-2 font-normal",
            !selecionado && "text-muted-foreground",
            className
          )}
        >
          <CalendarDays className="size-4 shrink-0" />
          <span className="truncate">
            {selecionado
              ? format(selecionado, "MMM/yyyy", { locale: ptBR })
              : placeholder}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-3">
        <div className="flex items-center justify-between pb-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Ano anterior"
            onClick={() => setAnoVisivel((ano) => ano - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <span className="text-sm font-medium">{anoVisivel}</span>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Próximo ano"
            onClick={() => setAnoVisivel((ano) => ano + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {MESES.map((mes, indice) => {
            const ativo =
              selecionado?.getFullYear() === anoVisivel &&
              selecionado.getMonth() === indice

            return (
              <Button
                key={mes}
                type="button"
                size="sm"
                variant={ativo ? "default" : "ghost"}
                className="capitalize"
                onClick={() => selecionar(indice)}
              >
                {mes}
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
