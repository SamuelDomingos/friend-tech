"use client"

import { CalendarDays, FileDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { DatePicker } from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"

import { useConsumo } from "../../_hooks/use-consumo"
import { ConsumoDialog } from "./consumo-dialog"
import { TabelaConsumo } from "./tabela-consumo"

interface ConsumoTabProps {
  pacienteNome: string
}

export function ConsumoTab({ pacienteNome }: ConsumoTabProps) {
  const consumo = useConsumo()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <ButtonGroup>
            <DatePicker
              value={consumo.filtro.inicio}
              onChange={(inicio) =>
                consumo.setFiltro((atual) => ({ ...atual, inicio }))
              }
              placeholder="00/00/0000"
              className="w-[170px]"
            />
            <DatePicker
              value={consumo.filtro.fim}
              onChange={(fim) => consumo.setFiltro((atual) => ({ ...atual, fim }))}
              placeholder="00/00/0000"
              className="w-[170px]"
            />
            <Button
              variant={consumo.atalho === "mes" ? "default" : "secondary"}
              size="sm"
              onClick={consumo.setMesAtual}
            >
              Mês
            </Button>
            <Button
              variant={consumo.atalho === "hoje" ? "default" : "secondary"}
              size="sm"
              onClick={consumo.setHoje}
            >
              Hoje
            </Button>
          </ButtonGroup>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={consumo.exportarParaContas}
            disabled={consumo.selecionados.length === 0}
          >
            <FileDown className="size-4" />
            Exportar para contas
          </Button>

          <Button size="sm" onClick={() => consumo.setDialogAberto(true)}>
            <Plus className="size-4" />
            Adicionar consumo
          </Button>
        </div>
      </div>

      <TabelaConsumo
        itens={consumo.itens}
        selecionados={consumo.selecionados}
        todosSelecionados={consumo.todosSelecionados}
        onAlternar={consumo.alternar}
        onAlternarTodos={consumo.alternarTodos}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {consumo.itens.length} movimentação(ões)
        </span>

        <span className={cn(consumo.totalSelecionado > 0 && "text-foreground")}>
          {consumo.totalSelecionado} item(ns) selecionado(s)
        </span>
      </div>

      <ConsumoDialog
        open={consumo.dialogAberto}
        pacienteNome={pacienteNome}
        onOpenChange={consumo.setDialogAberto}
        onAdicionar={consumo.adicionar}
      />
    </div>
  )
}
