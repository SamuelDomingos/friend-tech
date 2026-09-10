"use client"

import { useState } from "react"
import { Clipboard, Printer } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { useProntuario } from "../../_hooks/use-prontuario"
import type { PacienteDetalhe, ProntuarioDados, TipoRegistro } from "../dados-mock"
import { EtiquetasPanel } from "./etiquetas-panel"
import { EvolucoesPanel } from "./evolucoes-panel"
import { RegistroCard } from "./registro-card"
import { RegistroDialog } from "./registro-dialog"
import { RegistroMenuBar } from "./registro-menu-bar"
import { RegistroTimeline } from "./registro-timeline"

interface ProntuarioTabProps {
  paciente: PacienteDetalhe
  dados: ProntuarioDados
}

export function ProntuarioTab({ paciente, dados }: ProntuarioTabProps) {
  const prontuario = useProntuario(dados)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [tipoInicial, setTipoInicial] = useState<TipoRegistro>("TEXTO")
  const [dialogKey, setDialogKey] = useState(0)

  function abrirRegistro(tipo: TipoRegistro) {
    setTipoInicial(tipo)
    setDialogAberto(true)
    setDialogKey((k) => k + 1)
  }

  return (
    <div className="space-y-4">
      <RegistroMenuBar
        grupos={prontuario.grupos}
        edicao={prontuario.edicaoMenu}
        estaAtivo={prontuario.estaAtivo}
        onAlternarAtivo={prontuario.alternarAtivoTemp}
        onSelecionar={abrirRegistro}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Evoluções</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Imprimir todo o prontuário"
              onClick={() => toast("Impressão do prontuário em breve.")}
            >
              <Printer className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Imprimir todo o prontuário do Paciente
          </TooltipContent>
        </Tooltip>
      </div>

      <RegistroTimeline
        anos={prontuario.timeline}
        filtroData={prontuario.filtroData}
        filtroTipo={prontuario.filtroTipo}
        onFiltrar={prontuario.filtrarTimeline}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-3">
          {prontuario.registrosVisiveis.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border bg-card p-6 text-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-muted">
                <Clipboard className="size-5 text-muted-foreground" />
              </span>
              <p className="text-sm text-muted-foreground">
                {prontuario.temFiltro
                  ? "Nenhum registro encontrado para os filtros aplicados."
                  : "Não há registros no prontuário"}
              </p>
              {prontuario.temFiltro && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={prontuario.limparFiltros}
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            prontuario.registrosVisiveis.map((registro) => (
              <RegistroCard
                key={registro.id}
                registro={registro}
                onFixar={prontuario.alternarFixado}
                onComentar={prontuario.adicionarComentario}
              />
            ))
          )}
        </div>

        <aside className="space-y-4">
          <EtiquetasPanel
            paciente={paciente}
            etiquetas={prontuario.etiquetas}
            onAdicionar={prontuario.adicionarEtiqueta}
            onRemover={prontuario.removerEtiqueta}
          />

          <EvolucoesPanel
            agrupamento={prontuario.agrupamento}
            onAgrupamentoChange={prontuario.setAgrupamento}
            equipe={dados.equipe}
            filtroEquipe={prontuario.filtroEquipe}
            onAlternarEquipe={prontuario.alternarEquipe}
            onLimparEquipe={prontuario.limparEquipe}
            resumo={prontuario.resumo}
            filtroTipo={prontuario.filtroTipo}
            filtroData={prontuario.filtroData}
            onFiltrarResumo={prontuario.filtrarResumo}
          />
        </aside>
      </div>

      <RegistroDialog
        key={dialogKey}
        open={dialogAberto}
        onOpenChange={setDialogAberto}
        tipoInicial={tipoInicial}
        paciente={paciente}
        grupos={prontuario.grupos}
        registros={prontuario.registrosVisiveis}
        etiquetas={prontuario.etiquetas}
        onAdicionarEtiqueta={prontuario.adicionarEtiqueta}
        onRemoverEtiqueta={prontuario.removerEtiqueta}
        onSalvar={(tipo, texto) => {
          prontuario.adicionarRegistro(tipo, texto)
          toast("Registro adicionado ao prontuário.")
        }}
      />
    </div>
  )
}
