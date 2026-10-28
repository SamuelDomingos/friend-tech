"use client"

import { CalendarDays, FilterX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

import { useSessoes } from "../../_hooks/use-sessoes"
import { AgendarSessaoDialog } from "./agendar-dialog"
import { CancelarSessaoDialog } from "./cancelar-dialog"
import {
  ROTULOS_PAGAMENTO,
  type SituacaoPagamentoSessao,
} from "./dados-mock"
import { FinalizarSessaoDialog } from "./finalizar-dialog"
import { SessaoCard } from "./sessao-card"

const SITUACOES: SituacaoPagamentoSessao[] = ["PAGO", "PARCIAL", "PENDENTE"]

export function SessoesTab() {
  const sessoes = useSessoes()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <ButtonGroup>
            <DatePicker
              value={sessoes.filtro.inicio}
              onChange={(inicio) =>
                sessoes.setFiltro((atual) => ({ ...atual, inicio }))
              }
              placeholder="00/00/0000"
              className="w-[170px]"
            />
            <DatePicker
              value={sessoes.filtro.fim}
              onChange={(fim) => sessoes.setFiltro((atual) => ({ ...atual, fim }))}
              placeholder="00/00/0000"
              className="w-[170px]"
            />
            <Button variant="secondary" size="sm" onClick={sessoes.selecionarMes}>
              Mês
            </Button>
          </ButtonGroup>

          <Select
            value={sessoes.filtro.situacao || "TODAS"}
            onValueChange={(valor) =>
              sessoes.setFiltro((atual) => ({
                ...atual,
                situacao:
                  valor === "TODAS" ? "" : (valor as SituacaoPagamentoSessao),
              }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pagamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODAS">Todos os pagamentos</SelectItem>
              {SITUACOES.map((situacao) => (
                <SelectItem key={situacao} value={situacao}>
                  {ROTULOS_PAGAMENTO[situacao]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {sessoes.temFiltro && (
            <Button variant="ghost" size="sm" onClick={sessoes.limparFiltros}>
              <FilterX className="size-4" />
              Limpar
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          {sessoes.totalRealizado}/{sessoes.totalAgendado} sessões ·{" "}
          {formatCurrency(sessoes.valorTotal)}
        </p>
      </div>

      {sessoes.sessoes.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border bg-card p-8 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-muted">
            <CalendarDays className="size-5 text-muted-foreground" />
          </span>
          <p className="text-sm text-muted-foreground">
            {sessoes.temFiltro
              ? "Nenhuma sessão encontrada para os filtros aplicados."
              : "Não há sessões registradas para este paciente"}
          </p>
          {sessoes.temFiltro && (
            <Button variant="outline" size="sm" onClick={sessoes.limparFiltros}>
              Limpar filtros
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {sessoes.sessoes.map((sessao) => (
            <SessaoCard
              key={sessao.id}
              sessao={sessao}
              onFinalizar={sessoes.setFinalizando}
              onAgendar={sessoes.setAgendando}
              onCancelar={sessoes.setCancelando}
            />
          ))}
        </div>
      )}

      <FinalizarSessaoDialog
        sessao={sessoes.finalizando}
        onOpenChange={(open) => {
          if (!open) sessoes.setFinalizando(null)
        }}
        onConfirmar={() => {
          if (sessoes.finalizando) {
            sessoes.finalizar(sessoes.finalizando.id)
          }
          sessoes.setFinalizando(null)
        }}
      />

      <AgendarSessaoDialog
        sessao={sessoes.agendando}
        onOpenChange={(open) => {
          if (!open) sessoes.setAgendando(null)
        }}
        onConfirmar={(quantidade) => {
          if (sessoes.agendando) {
            sessoes.agendar(sessoes.agendando.id, quantidade)
          }
          sessoes.setAgendando(null)
        }}
      />

      <CancelarSessaoDialog
        sessao={sessoes.cancelando}
        onOpenChange={(open) => {
          if (!open) sessoes.setCancelando(null)
        }}
        onConfirmar={(escopo) => {
          if (sessoes.cancelando) {
            sessoes.cancelar(sessoes.cancelando.id, escopo)
          }
          sessoes.setCancelando(null)
        }}
      />
    </div>
  )
}
