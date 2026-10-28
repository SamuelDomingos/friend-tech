"use client"

import { History } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useAtualizacoes, type FiltroLog } from "../../_hooks/use-atualizacoes"
import { LogItem } from "./log-item"

const FILTROS: { value: FiltroLog; label: string }[] = [
  { value: "all", label: "Tudo" },
  { value: "patient", label: "Paciente" },
  { value: "schedule", label: "Agendamentos" },
  { value: "finance", label: "Financeiro" },
]

export function AtualizacoesTab() {
  const atualizacoes = useAtualizacoes()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Histórico de todas as alterações atreladas ao paciente
        </p>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-primary"
          onClick={atualizacoes.alternarTodos}
          disabled={atualizacoes.vazio}
        >
          {atualizacoes.todosExpandidos ? "Ocultar todos" : "Expandir todos"}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-lg border bg-muted/30 p-1">
        {FILTROS.map((filtro) => (
          <Button
            key={filtro.value}
            type="button"
            size="sm"
            variant={atualizacoes.categoria === filtro.value ? "default" : "ghost"}
            className={cn(
              "gap-1.5",
              atualizacoes.categoria !== filtro.value && "text-muted-foreground"
            )}
            onClick={() => atualizacoes.setCategoria(filtro.value)}
          >
            {filtro.label}
            <Badge variant="secondary" className="px-1.5">
              {atualizacoes.contagens[filtro.value]}
            </Badge>
          </Button>
        ))}
      </div>

      {atualizacoes.vazio ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border bg-card p-8 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-muted">
            <History className="size-5 text-muted-foreground" />
          </span>
          <p className="text-sm text-muted-foreground">
            Nenhuma modificação realizada
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {atualizacoes.logs.map((log) => (
            <LogItem
              key={log.id}
              log={log}
              expandido={atualizacoes.expandidos.includes(log.id)}
              onAlternar={() => atualizacoes.alternar(log.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
