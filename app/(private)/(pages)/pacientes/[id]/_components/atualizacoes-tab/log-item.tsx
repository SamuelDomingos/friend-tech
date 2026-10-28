"use client"

import {
  CalendarClock,
  ChevronDown,
  Receipt,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn, formatDate } from "@/lib/utils"

import type { CategoriaLog, LogPaciente } from "./dados-mock"

const ICONES: Record<CategoriaLog, typeof UserRound> = {
  patient: UserRound,
  schedule: CalendarClock,
  finance: Receipt,
}

interface LogItemProps {
  log: LogPaciente
  expandido: boolean
  onAlternar: () => void
}

export function LogItem({ log, expandido, onAlternar }: LogItemProps) {
  const Icone = ICONES[log.categoria]

  return (
    <article className="rounded-lg border bg-card">
      <Button
        type="button"
        variant="ghost"
        className="h-auto w-full items-start justify-between gap-4 rounded-lg px-4 py-3 text-left"
        onClick={onAlternar}
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <Icone className="size-4 text-muted-foreground" />
          </span>

          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium">{log.titulo}</p>

            {log.descricao && (
              <p className="text-xs text-muted-foreground">{log.descricao}</p>
            )}

            <p className="text-[11px] text-muted-foreground">
              {log.autorNome} · {formatDate(log.criadoEm)}
            </p>
          </div>
        </div>

        <ChevronDown
          className={cn(
            "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
            expandido && "rotate-180"
          )}
        />
      </Button>

      {expandido && (
        <div className="border-t px-4 py-3">
          <dl className="grid gap-2 sm:grid-cols-2">
            {log.alteracoes.map((alteracao) => (
              <div
                key={alteracao.campo}
                className="rounded-md border bg-muted/30 px-3 py-2"
              >
                <dt className="text-[10px] text-muted-foreground uppercase">
                  {alteracao.campo}
                </dt>
                <dd className="text-sm">
                  {alteracao.de && (
                    <span className="text-muted-foreground line-through">
                      {alteracao.de}
                    </span>
                  )}
                  {alteracao.de && alteracao.para && (
                    <span className="text-muted-foreground"> → </span>
                  )}
                  {alteracao.para ?? "-"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </article>
  )
}
